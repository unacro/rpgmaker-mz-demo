import {
	statSync,
	readdirSync,
	readFileSync,
	writeFileSync,
	existsSync,
} from "node:fs";
import path from "node:path";

// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
class JsonFormatter {
	static #readData(filePath) {
		try {
			const jsonString = readFileSync(filePath, "utf8");
			return JSON.parse(jsonString);
		} catch (err) {
			console.error(err);
		}
		return undefined;
	}

	static #writeData(filePath, space = 0) {
		try {
			const jsonData = JsonFormatter.#readData(filePath);
			if (typeof jsonData === "object" || Array.isArray(jsonData)) {
				writeFileSync(
					filePath,
					JSON.stringify(jsonData, undefined, space),
					"utf8",
				);
				return true;
			}
		} catch (err) {
			console.error(err);
		}
		return false;
	}

	static uncompress(filePath) {
		return JsonFormatter.#writeData(filePath, 2);
	}

	static compress(filePath) {
		return JsonFormatter.#writeData(filePath);
	}

	static getFilePathList(targetPathList) {
		const filePathList = [];
		targetPathList.map((targetPath) => {
			try {
				const stats = statSync(targetPath);
				if (stats.isDirectory()) {
					// 遍历指定目录下的 JSON 文件
					filePathList.push(
						...readdirSync(targetPath)
							.filter((file) => file.endsWith(".json"))
							.map((file) => path.join(targetPath, file)),
					);
				} else if (stats.isFile()) {
					// 指定特定的单个文件 无视后缀名直接加入列表
					filePathList.push(targetPath);
				} else {
					console.warn(`path ${targetPath} is invalid`);
				}
			} catch (err) {
				console.error(err);
			}
		});
		const uniquefilePathList = [];
		filePathList.map((filePath) => {
			// 将 Windows 风格的分隔符替换为通用的正常斜杠
			const uniquefilePath = filePath.replace(/\\/g, "/").replace(/^\.\//, "");
			if (!uniquefilePathList.includes(uniquefilePath)) {
				uniquefilePathList.push(uniquefilePath);
			}
		});
		return uniquefilePathList;
	}
}

function main(method, ...paths) {
	const filePathList = JsonFormatter.getFilePathList(paths);
	const fileCount = filePathList.length;
	console.log(`try to ${method}:`, filePathList);
	filePathList.map((filePath, index) => {
		const tips = [`[${index + 1}/${fileCount}]`];
		if (existsSync(filePath)) {
			if (["unminify"].includes(method)) {
				JsonFormatter.uncompress(filePath);
				tips.push(`\u001b[36m${filePath}\u001b[30m is uncompressed.`);
			} else {
				JsonFormatter.compress(filePath); // minify
				tips.push(`\u001b[34m${filePath}\u001b[30m is compressed.`);
			}
			console.info("\u001b[32msuccess\u001b[30m", tips.join(" "));
		} else {
			console.warn(
				`\u001b[33mfailed \u001b[30m ${tips[0]}\u001b[31m${filePath}\u001b[30m does not exist.`,
			);
		}
	});
}

// node ./.githooks/json_formatter.mjs minify input.json inputDir
// node ./.githooks/json_formatter.mjs unminify input.json inputDir
main(...process.argv.slice(2));

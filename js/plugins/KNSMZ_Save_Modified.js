//=============================================================================
// KNSMZ_Save_Modified.js
//=============================================================================
/*:
 * @target MZ
 * @plugindesc ver.1.0.2 Add screenshots on Save/Load scene.
 * @author Kanji the Grass
 * @url https://kanjinokusargss3.hatenablog.com/
 *
 * @param MaxSaveFile
 * @text Number of save files
 * @type number
 * @min 1
 * @default 25
 * @desc This number includes auto save
 *
 * @param InfoHorzLineColor
 * @text Border color on info window
 * @type string
 * @default gray
 *
 * @param Vocab
 * @text About Terms
 *
 * @param VocabPrice
 * @type string
 * @parent Vocab
 * @text Money of the party
 * @default Money
 *
 * @param VocabPlace
 * @type string
 * @parent Vocab
 * @text Current location
 * @default Location
 *
 * @param Screenshot
 * @text About Screenshot
 *
 * @param ImageSize
 * @text Image size for display
 * @desc Images of save file will be expanded to this size.
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"280","height":"220"}
 *
 * @param ImagePivot
 * @text Pivot of images
 * @type struct<Point>
 * @parent Screenshot
 * @default {"x":"408","y":"224"}
 *
 * @param RadiusSize
 * @text Moving Radius of images
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"560","height":"80"}
 *
 * @param ImageBorderColor
 * @text Border color of images
 * @type string
 * @parent Screenshot
 * @default black
 *
 * @param ArrowImage
 * @parent Screenshot
 * @text Arrow HUD
 * @type file
 * @dir img/system
 * @default KnsSave_HUD
 *
 * @param ImageExists
 * @parent Screenshot
 * @text Image when file exists
 * @type file
 * @dir img/system
 * @default KnsSave_HasData
 * @desc Used when file exists but screenshot does not.
 *
 * @param NoImageExists
 * @parent Screenshot
 * @text Image when file doesn't exist
 * @type file
 * @dir img/system
 * @default KnsSave_NoData
 * @desc Used when file does not exist.
 *
 * @param UseScreenshot
 * @parent Screenshot
 * @text Use screenshot?
 * @type boolean
 * @default true
 *
 * @param WhenUseImage
 * @text when use screenshot
 * @parent Screenshot
 *
 * @param ImageSaveSize
 * @text Actual Size of Screenshot
 * @desc Screenshots will be saved in this size, and expanded when displayed.
 * @type struct<Surface>
 * @parent WhenUseImage
 * @default {"width":"128","height":"96"}
 *
 * @param ImageType
 * @parent WhenUseImage
 * @text Image extension(PNG/JPEG)
 * @type select
 * @default jpeg
 *
 * @option .PNG
 * @value png
 *
 * @option .JPEG
 * @value jpeg
 *
 * @param JpegQuality
 * @parent WhenUseImage
 * @text JPEG Quality(1-100)
 * @desc When saved in JPEG format, the lower this value, the lower the image quality and the size.
 * @type number
 * @default 50
 * @min 1
 * @max 100
 *
 * @param SetMonochrome
 * @parent WhenUseImage
 * @text Set Monochrome?
 * @desc Setting monochrome makes the size reduced, but this is not so effective.
 * @type boolean
 * @default false
 *
 * @param Windows
 * @text About Windows
 *
 * @param HelpWindow
 * @parent Windows
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"0\"}","surface":"{\"width\":\"660\",\"height\":\"72\"}","windowType":"0"}
 *
 * @param InfoWindow
 * @parent Windows
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"432\"}","surface":"{\"width\":\"816\",\"height\":\"192\"}","windowType":"0"}
 *
 * @help
 * This plug-in is published under MTCM Blue Licence.
 * https://en.materialcommons.org/mtcm-b-summary
 *
 * * Two images provided as sample named KnsSave_HasData and
 *  KnsSave_NoData includes a font 'Anton', and it was published
 *  under 'Open Font License'.
 *   If you'd like to use them without editting,
 *  please check articles of the licence below.
 * https://fonts.google.com/specimen/Anton
 *
 * *Change Log
 * ver.1.0.0(2022/02/19)
 * - Published
 *
 * ver.1.0.1(2022/02/20)
 * - Fixed a miss specifying of JPEG Quality.
 * - Added an English description.
 *
 * ver.1.0.2(2022/02/20)
 * - Optimized the code.
 * - Changed the display order of windows and sprites(Z-axis).
 */
/*~struct~Window:
 * @param point
 * @text Point
 * @type struct<Point>
 *
 * @param surface
 * @text Size
 * @type struct<Surface>
 *
 * @param windowType
 * @text Background type
 * @type select
 * @default 1
 *
 * @option Window
 * @value 0
 * @option Dark
 * @value 1
 * @option Transparent
 * @value 2
 */
/*~struct~Point:
 * @param x
 * @text X-axis
 * @type number
 * @default 0
 *
 * @param y
 * @text Y-axis
 * @type number
 * @default 0
 */
/*~struct~Surface:
 * @param width
 * @text Width
 * @type number
 * @default 1
 * @min 1
 *
 * @param height
 * @text Height
 * @type number
 * @default 1
 * @min 1
 */

/*:zh
 * @target MZ
 * @plugindesc ver.1.0.2 为存档读档场景增加照片
 * @author Kanji the Grass
 * @url https://kanjinokusargss3.hatenablog.com/
 *
 * @param MaxSaveFile
 * @text 最大存档数量
 * @type number
 * @min 1
 * @default 25
 * @desc 包括自动存档栏位在内
 *
 * @param InfoHorzLineColor
 * @text 信息窗口的边框颜色
 * @type string
 * @default gray
 *
 * @param Vocab
 * @text 术语相关
 *
 * @param VocabPrice
 * @type string
 * @parent Vocab
 * @text 描述金钱的术语
 * @desc 会显示在读取存档界面的金钱栏位上
 * @default 金钱
 *
 * @param VocabPlace
 * @type string
 * @parent Vocab
 * @text 描述当前位置的术语
 * @desc 会显示在读取存档界面的当前位置栏位上
 * @default 当前位置
 *
 * @param Screenshot
 * @text 截图相关
 *
 * @param ImageSize
 * @text 用于显示的图像尺寸
 * @desc 存档文件的图像会被缩放到的尺寸
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"280","height":"220"}
 *
 * @param ImagePivot
 * @text 图像环形围绕旋转的中轴
 * @type struct<Point>
 * @parent Screenshot
 * @default {"x":"408","y":"224"}
 *
 * @param RadiusSize
 * @text 图像环形围绕选装的半径
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"560","height":"80"}
 *
 * @param ImageBorderColor
 * @text 屏幕截图的边框颜色
 * @type string
 * @parent Screenshot
 * @default black
 *
 * @param ArrowImage
 * @parent Screenshot
 * @text 切换选中存档的箭头按钮图像
 * @type file
 * @dir img/system
 * @default KnsSave_HUD
 *
 * @param ImageExists
 * @parent Screenshot
 * @text 存档存在时显示的图像
 * @type file
 * @dir img/system
 * @default KnsSave_HasData
 * @desc 当存档存在但截图不存在时显示的图像
 *
 * @param NoImageExists
 * @parent Screenshot
 * @text 存档不存在时显示的图像
 * @type file
 * @dir img/system
 * @default KnsSave_NoData
 * @desc 当存档不存在时显示的图像
 *
 * @param UseScreenshot
 * @parent Screenshot
 * @text 是否截图
 * @type boolean
 * @default true
 *
 * @param WhenUseImage
 * @text 启用截图时详细设置
 * @parent Screenshot
 *
 * @param ImageSaveSize
 * @text 截图实际尺寸
 * @desc 截图会被保存为这个尺寸，实际显示时会自动缩放到合适的比例。
 * @type struct<Surface>
 * @parent WhenUseImage
 * @default {"width":"128","height":"96"}
 *
 * @param ImageType
 * @parent WhenUseImage
 * @text 图像扩展名 (PNG/JPEG)
 * @type select
 * @default jpeg
 *
 * @option .PNG
 * @value png
 *
 * @option .JPEG
 * @value jpeg
 *
 * @param JpegQuality
 * @parent WhenUseImage
 * @text JPEG 图像质量 (1-100)
 * @desc 当保存为这个格式时，这个值越低，图像质量越低，文件大小越小。
 * @type number
 * @default 50
 * @min 1
 * @max 100
 *
 * @param SetMonochrome
 * @parent WhenUseImage
 * @text 是否设置为单色
 * @desc 设置为单色会缩减文件大小，但效果不明显。
 * @type boolean
 * @default false
 *
 * @param Windows
 * @text 窗口相关
 *
 * @param HelpWindow
 * @parent Windows
 * @text 帮助窗口
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"0\"}","surface":"{\"width\":\"660\",\"height\":\"72\"}","windowType":"0"}
 *
 * @param InfoWindow
 * @parent Windows
 * @text 存档信息窗口
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"432\"}","surface":"{\"width\":\"816\",\"height\":\"192\"}","windowType":"0"}
 *
 * @help
 * This plug-in is published under MTCM Blue Licence.
 * https://en.materialcommons.org/mtcm-b-summary
 *
 * * Two images provided as sample named KnsSave_HasData and
 *  KnsSave_NoData includes a font 'Anton', and it was published
 *  under 'Open Font License'.
 *   If you'd like to use them without editting,
 *  please check articles of the licence below.
 * https://fonts.google.com/specimen/Anton
 *
 * *Change Log
 * ver.1.0.0(2022/02/19)
 * - Published
 *
 * ver.1.0.1(2022/02/20)
 * - Fixed a miss specifying of JPEG Quality.
 * - Added an English description.
 *
 * ver.1.0.2(2022/02/20)
 * - Optimized the code.
 * - Changed the display order of windows and sprites(Z-axis).
 */
/*~struct~Window:
 * @param point
 * @text 原点
 * @type struct<Point>
 *
 * @param surface
 * @text 尺寸
 * @type struct<Surface>
 *
 * @param windowType
 * @text 窗口背景类型
 * @type select
 * @default 1
 *
 * @option 带边框的窗口
 * @value 0
 * @option 暗淡背景
 * @value 1
 * @option 完全透明
 * @value 2
 */
/*~struct~Point:
 * @param x
 * @text X 坐标
 * @type number
 * @default 0
 *
 * @param y
 * @text Y 坐标
 * @type number
 * @default 0
 */
/*~struct~Surface:
 * @param width
 * @text 宽度
 * @type number
 * @default 1
 * @min 1
 *
 * @param height
 * @text 高度
 * @type number
 * @default 1
 * @min 1
 */

/*:ja
 * @target MZ
 * @plugindesc ver.1.0.2 セーブ/ロード画面にスクリーンショットを追加します。
 * @author 莞爾の草
 * @url https://kanjinokusargss3.hatenablog.com/
 *
 * @param MaxSaveFile
 * @text セーブファイル最大数
 * @type number
 * @min 1
 * @default 25
 * @desc オートセーブ分も含まれます。
 *
 * @param InfoHorzLineColor
 * @text セーブ詳細ウィンドウ横線の色
 * @type string
 * @default gray
 *
 * @param Vocab
 * @text 用語集
 *
 * @param VocabPrice
 * @type string
 * @parent Vocab
 * @text 所持金
 * @default 所持金
 *
 * @param VocabPlace
 * @type string
 * @parent Vocab
 * @text 現在地
 * @default 現在地
 *
 * @param Screenshot
 * @text スクショ関連
 *
 * @param ImageSize
 * @text 画像表示サイズ
 * @desc セーブイメージを表示する際使用する画像のサイズをこのサイズに補正します。
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"280","height":"220"}
 *
 * @param ImagePivot
 * @text 画像の円運動中心
 * @type struct<Point>
 * @parent Screenshot
 * @default {"x":"408","y":"224"}
 *
 * @param RadiusSize
 * @text 画像の円運動サイズ
 * @type struct<Surface>
 * @parent Screenshot
 * @default {"width":"560","height":"80"}
 *
 * @param ImageBorderColor
 * @text 画像の縁取り色
 * @type string
 * @parent Screenshot
 * @default black
 *
 * @param ArrowImage
 * @parent Screenshot
 * @text 矢印画像
 * @type file
 * @dir img/system
 * @default KnsSave_HUD
 *
 * @param ImageExists
 * @parent Screenshot
 * @text データがある場合の画像
 * @type file
 * @dir img/system
 * @default KnsSave_HasData
 * @desc セーブファイルは存在してもスクショがない場合に使われます。
 *
 * @param NoImageExists
 * @parent Screenshot
 * @text データがない場合の画像
 * @type file
 * @dir img/system
 * @default KnsSave_NoData
 * @desc セーブファイルが存在しないときスクショの代わりに使われます。
 *
 * @param UseScreenshot
 * @parent Screenshot
 * @text スクショを保存するか
 * @type boolean
 * @default true
 *
 * @param WhenUseImage
 * @text スクショを保存する場合の設定
 * @parent Screenshot
 *
 * @param ImageSaveSize
 * @text スクショ実寸サイズ
 * @desc セーブデータ上に保存するスクショのサイズです。表示する際は「画像表示サイズ」まで拡大縮小されます。
 * @type struct<Surface>
 * @parent WhenUseImage
 * @default {"width":"128","height":"96"}
 *
 * @param ImageType
 * @parent WhenUseImage
 * @text 画像拡張子(PNG/JPEG)
 * @type select
 * @default jpeg
 *
 * @option .PNG
 * @value png
 *
 * @option .JPEG
 * @value jpeg
 *
 * @param JpegQuality
 * @parent WhenUseImage
 * @text JPEG圧縮率(1-100)
 * @desc JPEG形式で保存したとき、この値が低いほど画質が下がり容量が軽くなります。
 * @type number
 * @default 50
 * @min 1
 * @max 100
 *
 * @param SetMonochrome
 * @parent WhenUseImage
 * @text スクショをモノクロに
 * @desc モノクロにすることで容量軽量化を図ります。効果は薄いです。
 * @type boolean
 * @default false
 *
 * @param Windows
 * @text ウィンドウ関連
 *
 * @param HelpWindow
 * @parent Windows
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"0\"}","surface":"{\"width\":\"660\",\"height\":\"72\"}","windowType":"0"}
 *
 * @param InfoWindow
 * @parent Windows
 * @type struct<Window>
 * @default {"point":"{\"x\":\"0\",\"y\":\"432\"}","surface":"{\"width\":\"816\",\"height\":\"192\"}","windowType":"0"}
 *
 * @help
 * このプラグインはマテコモ青ライセンスの下で提供されます。
 * 利用規約はこちら。
 * https://kanjinokusargss3.hatenablog.com/entry/2020/08/12/184854
 *
 * セーブ時に保存されたスクリーンショットの画像が
 * セーブ画面でぐるぐる回ります。
 *
 * アツマールなどのセーブファイルの容量が限られている環境では
 * スクリーンショットの画質をできるだけ落とすことをお勧めします。
 *
 * ※サンプルで提供されているKnsSave_HasData.png、KnsSave_NoData.pngには
 * 　Open Font Licenseで提供されたフォント『Anton』が使用されています。
 * 　それらの画像を改変しないでそのまま使う場合はそちらをご一読ください。
 * フォント公開ページ：https://fonts.google.com/specimen/Anton
 *
 * 【更新履歴】
 * ver.1.0.0(2022/02/19)
 * - 公開
 * ver.1.0.1(2022/02/20)
 * - JPEG圧縮率の指定方法が間違っていたため修正。
 * - 英文の説明を追加。
 * ver.1.0.2(2022/02/20)
 * - コードを最適化。
 * - ウィンドウ、スプライトの表示順位(いわゆるZ軸)を変更。
 */
/*~struct~Window:ja
 * @param point
 * @text 座標
 * @type struct<Point>
 *
 * @param surface
 * @text サイズ
 * @type struct<Surface>
 *
 * @param windowType
 * @text ウィンドウ背景
 * @type select
 * @default 1
 *
 * @option ウィンドウ
 * @value 0
 * @option 暗くする
 * @value 1
 * @option 透明
 * @value 2
 */
/*~struct~Point:ja
 * @param x
 * @text X座標
 * @type number
 * @default 0
 *
 * @param y
 * @text Y座標
 * @type number
 * @default 0
 */
/*~struct~Surface:ja
 * @param width
 * @text 横幅
 * @desc 横幅を数値で指定します
 * @type number
 * @default 1
 * @min 1
 *
 * @param height
 * @text 縦幅
 * @desc 縦幅を数値で指定します
 * @type number
 * @default 1
 * @min 1
 */

const KNSMZ_Save = {};
(() => {
	const pluginParameters = PluginManager.parameters("KNSMZ_Save_Modified");
	const pluginConfig = {};
	pluginConfig.MaxSaveFile = Number(pluginParameters.MaxSaveFile || 25);

	pluginConfig.VocabPrice = String(pluginParameters.VocabPrice);
	pluginConfig.VocabPlace = String(pluginParameters.VocabPlace);

	pluginConfig.ImagePivot = JsonEx.parse(pluginParameters.ImagePivot) || {};
	pluginConfig.ImageSize = JsonEx.parse(pluginParameters.ImageSize) || {};
	pluginConfig.ImageSaveSize =
		JsonEx.parse(pluginParameters.ImageSaveSize) || {};
	pluginConfig.RadiusSize = JsonEx.parse(pluginParameters.RadiusSize) || {};

	pluginConfig.UseScreenshot = pluginParameters.UseScreenshot === "true";
	// ss settings
	pluginConfig.ImageType = String(pluginParameters.ImageType);
	pluginConfig.JpegQuality = Number(pluginParameters.JpegQuality || 1) / 100;
	pluginConfig.SetMonochrome = pluginParameters.SetMonochrome === "true";
	// img
	pluginConfig.ImageExists = String(pluginParameters.ImageExists);
	pluginConfig.NoImageExists = String(pluginParameters.NoImageExists);
	pluginConfig.ArrowImage = String(pluginParameters.ArrowImage);

	pluginConfig.ImageBorderColor = String(pluginParameters.ImageBorderColor);
	pluginConfig.InfoHorzLineColor = String(pluginParameters.InfoHorzLineColor);

	const parseWindowConfig = (json) => {
		const obj = JsonEx.parse(json) || {};
		const point = JsonEx.parse(obj.point) || {};
		const surface = JsonEx.parse(obj.surface) || {};
		obj.rect = new Rectangle(
			Number(point.x || 0),
			Number(point.y || 0),
			Number(surface.width || 0),
			Number(surface.height || 0),
		);
		obj.windowType = Number(obj.windowType || "0");
		return obj;
	};
	pluginConfig.HelpWindow = parseWindowConfig(pluginParameters.HelpWindow);
	pluginConfig.InfoWindow = parseWindowConfig(pluginParameters.InfoWindow);
	KNSMZ_Save.config = pluginConfig;
	KNSMZ_Save.cache = {};

	//======================================================
	// alias DataManager
	//======================================================
	DataManager.maxSavefiles = () => KNSMZ_Save.config.MaxSaveFile;

	const _DataManagerMakeSavefileInfo = DataManager.makeSavefileInfo;
	/**
	 * 重写生成存档文件方法
	 * @param  {...any} args 原方法参数
	 * @returns 生成存档文件的相关信息
	 */
	DataManager.makeSavefileInfo = function (...args) {
		const savefileInfo = _DataManagerMakeSavefileInfo.apply(this, ...args);
		const bitmap = this.makeScreenshot(); // todo 改成了手动截图
		if (bitmap) {
			savefileInfo.snapUrl = bitmap._canvas.toDataURL(
				`image/${KNSMZ_Save.config.ImageType}`,
				KNSMZ_Save.config.JpegQuality,
			);
		}
		savefileInfo.gold = $gameParty.gold();
		savefileInfo.place = $dataMap ? $dataMap.displayName : ""; // todo 适配无尽模式
		return savefileInfo;
	};

	/**
	 * 新增截图方法
	 * @returns
	 */
	DataManager.makeScreenshot = () => {
		// todo SceneManager.snapForBackground(); // 给当前场景生成快照并保存
		const lastSnapshot = SceneManager.backgroundBitmap(); // 获取保存的上次快照
		if (!lastSnapshot || KNSMZ_Save.config.UseScreenshot === false) {
			return null;
		}
		const targetWidth = Number(KNSMZ_Save.config.ImageSaveSize.width || 0);
		const targetHeight = Number(KNSMZ_Save.config.ImageSaveSize.height || 0);
		const newBitmap = new Bitmap(targetWidth, targetHeight);
		newBitmap.blt(
			lastSnapshot,
			0,
			0,
			lastSnapshot.width,
			lastSnapshot.height,
			0,
			0,
			targetWidth,
			targetHeight,
		);
		if (KNSMZ_Save.config.SetMonochrome === true) {
			newBitmap._context.save();
			newBitmap._context.globalCompositeOperation = "color";
			newBitmap._context.fillStyle = "black";
			newBitmap._context.fillRect(0, 0, targetWidth, targetHeight);
			newBitmap._context.restore();
		}
		KNSMZ_Save.cache.lastSnapshot = newBitmap;
		return newBitmap;
	};

	class ScreenshotSprite extends Sprite {
		constructor(id, moveStepList, noData, hasData) {
			// rmmz_core.js L1858: Sprite.prototype.initialize()
			super(
				new Bitmap(
					Number(KNSMZ_Save.config.ImageSize.width || 0) + 2,
					Number(KNSMZ_Save.config.ImageSize.height || 0) + 2,
				), // 多出来的 2 像素是用来绘制边框的
			);
			this._id = id; // 存档编号
			this._savefileInfo = DataManager.savefileInfo(this._id);
			this._moveStepList = moveStepList;
			this.moveCount = this._moveStepList.length;
			this.anchor.x = 0.5;
			this.anchor.y = 0.5;
			this.scale.x = 0;
			this.scale.y = 0;
			this.bitmap.fillAll(KNSMZ_Save.config.ImageBorderColor);
			this._loadedImg = this.loadSS(noData, hasData);
		}
		loadSS(noData, hasData) {
			if (!this._loadedImg) {
				if (this._savefileInfo) {
					this._loadedImg = hasData;
					// todo 判断移动端
					if (this._savefileInfo.snapUrl) {
						try {
							this._loadedImg = ImageManager.loadBitmapFromUrl(
								this._savefileInfo.snapUrl,
							);
						} catch (e) {
							console.log(e);
						}
					}
				}
				if (!this._loadedImg) {
					this._loadedImg = noData;
				}
			}
			return this._loadedImg;
		}
		_knsZIndex() {
			return this._knsMoveInfo.ty;
		}
		fileTitle() {
			if (this._id === 0) {
				return TextManager.autosave;
			}
			return `${TextManager.file} ${this._id}`;
		}
		_knsMoveTo(rate) {
			this.moveCount = 0;
			const thF = Math.cos(rate);
			this._knsMoveInfo = {
				ox: this.x,
				oy: this.y,
				tx: Number(KNSMZ_Save.config.RadiusSize.width || 0) * Math.sin(rate),
				ty: Number(KNSMZ_Save.config.RadiusSize.height || 0) * thF,
				oldScale: this.scale.x,
				newScale: Math.max(Math.min(thF * 1.25, 1), 0.625),
			};
			this._knsMoveInfo.padX = this._knsMoveInfo.tx - this._knsMoveInfo.ox;
			this._knsMoveInfo.padY = this._knsMoveInfo.ty - this._knsMoveInfo.oy;
			this._knsMoveInfo.padScale =
				this._knsMoveInfo.newScale - this._knsMoveInfo.oldScale;
			this.opacity = Math.max(255 * thF, -20) + 90;
		}
		update() {
			super.update();
			if (this.moveCount < this._moveStepList.length) {
				const rate = this._moveStepList[this.moveCount++];
				this.x = this._knsMoveInfo.padX * rate + this._knsMoveInfo.ox;
				this.y = this._knsMoveInfo.padY * rate + this._knsMoveInfo.oy;
				this.scale.x = this.scale.y =
					this._knsMoveInfo.padScale * rate + this._knsMoveInfo.oldScale;
			}
		}
		refresh() {
			const bmp = this.loadSS();
			this.bitmap.blt(
				bmp,
				0,
				0,
				bmp.width,
				bmp.height,
				1,
				1,
				this.bitmap.width - 2,
				this.bitmap.height - 2,
			);
			// todo 绘制数字有问题吗
			this.drawNumber();
		}
		drawNumber() {
			const h = 28;
			this.bitmap.fontSize = 25;
			this.bitmap.fontFace = $gameSystem.mainFontFace();
			this.bitmap.drawText(this.fileTitle(), 4, 2, this.bitmap.width, h);
			if (!this._savefileInfo) return;
			// プレイ時間の描画
			if (this._savefileInfo.playtime) {
				this.bitmap.drawText(
					this._savefileInfo.playtime,
					0,
					this.bitmap.height - h,
					this.bitmap.width,
					h,
					"right",
				);
			}
		}
	}

	//======================================================
	// new Spriteset_File
	//======================================================
	class Spriteset_File extends Sprite {
		// create
		constructor(listWindow, infoWindow) {
			super();
			this._infoWindow = infoWindow;
			this._listWindow = listWindow;
			this._lastIndex = this._listWindow.index();
			this.x = Number(KNSMZ_Save.config.ImagePivot.x || 0);
			this.y = Number(KNSMZ_Save.config.ImagePivot.y || 0);
			this.createFiles();
		}
		createFiles() {
			// move
			const length = 8;
			const percentStepArray = Array.from(
				{ length },
				(_, index) => (index + 1) / length,
			);
			// img
			const hasData = ImageManager.loadSystem(KNSMZ_Save.config.ImageExists);
			const noData = ImageManager.loadSystem(KNSMZ_Save.config.NoImageExists);

			this.sortedChildren = new Array(this._listWindow.maxItems());
			for (let i = 0; i < this.sortedChildren.length; i++) {
				this.sortedChildren[i] = new ScreenshotSprite(
					this._listWindow.indexToSavefileId(i),
					percentStepArray,
					noData,
					hasData,
				);
			}
			this.addChild(...this.sortedChildren);
		}
		// update
		refreshInfoWindow() {
			this._infoWindow.refresh(this.sortedChildren[this._listWindow.index()]);
		}
		update() {
			super.update();
			this.updateTouchInput();
			const index = this._listWindow.index();
			if (this._lastIndex !== index) {
				this._lastIndex = index;
				SoundManager.playCursor();
				this.updatePosition();
				this.refreshInfoWindow();
			}
		}
		updateTouchInput() {
			if (this._listWindow.active && TouchInput.isRepeated()) {
				if (TouchInput.y < 64) {
					// not to fire cancel button of touch ui simultaneously
					return;
				}
				const tx = TouchInput.x - this.x;
				const sp = this.sortedChildren[this._listWindow.index()];
				const w = 0.5 * sp.width;
				if (sp.x > tx + w) {
					this._listWindow.cursorUp();
				} else if (sp.x + w < tx) {
					this._listWindow.cursorDown();
				} else {
					const ty = TouchInput.y - this.y;
					const h = 0.5 * sp.height;
					if (ty < sp.y + h && ty + h > sp.y) {
						this._listWindow.processOk();
					}
				}
			}
		}
		updatePosition() {
			// set z-axis
			const math = (Math.PI / this.sortedChildren.length) * 2;
			const index = this._listWindow.index();
			this.sortedChildren.forEach((sp, i) => {
				sp._knsMoveTo(math * (i - index));
			});
			this.removeChildren();
			this.addChild(
				...Array.from(this.sortedChildren).sort(
					(a, b) => a._knsZIndex() - b._knsZIndex(),
				),
			);
		}
		__start() {
			this.sortedChildren.map((sp) => sp.refresh());
			this.refreshInfoWindow();
			this.updatePosition();
		}
		__terminate() {
			this.sortedChildren.map((sp) => sp.destroy());
			this.destroy();
		}
	}

	//======================================================
	// new Window_SSStatus
	//======================================================
	class Window_SSStatus extends Window_Base {
		refresh(sp) {
			this.contents.clear();
			if (!sp) {
				return;
			}
			this.resetFontSettings();
			this.contents.fillRect(
				0,
				34,
				this.contents.width,
				2,
				KNSMZ_Save.config.InfoHorzLineColor,
			);
			this.drawText(sp.fileTitle(), 0, 0, 200);
			const info = sp._savefileInfo;
			if (!info) return;
			if (info.playtime) {
				this.drawText(info.playtime, 0, 0, this.contents.width, "right");
			}
			let x = 0;
			const y = 40;
			let w = 124;
			if (info.faces) {
				// biome-ignore lint/complexity/noForEach: <explanation>
				info.faces.forEach(function (actor) {
					this.drawFace(actor[0], actor[1], x, y, w);
					x += w + 2;
				}, this);
			}
			w = 270;
			x = this.contents.width - w;
			// todo 绘制 meta 信息有问题吗
			this.drawSubInfo(
				x,
				40,
				w,
				KNSMZ_Save.config.VocabPrice,
				info.gold,
				TextManager.currencyUnit,
			);
			this.drawSubInfo(
				x,
				100,
				w,
				KNSMZ_Save.config.VocabPlace,
				info.place,
				null,
			);
		}
		drawSubInfo(x, y, w, title, text, unit) {
			// todo  为什么一定要 title
			if (text === undefined) return;
			this.changeTextColor(ColorManager.systemColor());
			this.drawText(title, x, y, w);
			const newY = y + 24;
			let newW = w;
			if (unit) {
				const unitWidth = this.textWidth(unit);
				this.drawText(unit, x + w - unitWidth, newY, w);
				newW -= unitWidth;
			}
			this.changeTextColor(ColorManager.normalColor());
			this.drawText(text, x, newY, newW, "right");
		}
	}

	//======================================================
	// alias Scene_File
	//======================================================
	// create
	const _Scene_File_create = Scene_File.prototype.create;
	Scene_File.prototype.create = function (...args) {
		_Scene_File_create.apply(this, ...args);
		this.knsCreateFileDataWindow();
		this.knsCreateScreenShots();
		this.knsCreateFileTouchSprite();
		this._listWindow.y = Graphics.height;
		// todo 为什么要创建一个返回按钮
	};

	Scene_File.prototype.helpWindowRect = () => KNSMZ_Save.config.HelpWindow.rect;
	const _Scene_File_createHelpWindow = Scene_File.prototype.createHelpWindow;
	Scene_File.prototype.createHelpWindow = function (...args) {
		_Scene_File_createHelpWindow.apply(this, ...args);
		this._helpWindow.setBackgroundType(KNSMZ_Save.config.HelpWindow.windowType);
	};
	Scene_File.prototype.knsCreateFileDataWindow = function () {
		this._infoWindow = new Window_SSStatus(KNSMZ_Save.config.InfoWindow.rect);
		this._infoWindow.setBackgroundType(KNSMZ_Save.config.InfoWindow.windowType);
		this.addWindow(this._infoWindow);
	};
	Scene_File.prototype.knsCreateScreenShots = function () {
		this._spriteset = new Spriteset_File(this._listWindow, this._infoWindow);
		this.addChildAt(
			this._spriteset,
			this.children.indexOf(this._backgroundSprite) + 1,
		);
	};
	Scene_File.prototype.knsCreateFileTouchSprite = function () {
		// todo 为什么只有自动存档时 return
		const img = KNSMZ_Save.config.ArrowImage;
		this._fileTouchSprite = new Sprite(img && ImageManager.loadSystem(img));
		this.addChildAt(
			this._fileTouchSprite,
			this.children.indexOf(this._spriteset) + 1,
		);
	};
	// main
	const _Scene_File_start = Scene_File.prototype.start;
	Scene_File.prototype.start = function (...args) {
		_Scene_File_start.apply(this, ...args);
		this._spriteset.__start();
	};
	const _Scene_File_terminate = Scene_File.prototype.terminate;
	Scene_File.prototype.terminate = function (...args) {
		_Scene_File_terminate.apply(this, ...args);
		this._spriteset.__terminate();
	};

	//======================================================
	// alias Window_SavefileList
	//======================================================
	Window_SavefileList.prototype.refresh = () => {};
	Window_SavefileList.prototype.cursorDown = function (wrap) {
		Window_Selectable.prototype.cursorDown.call(this, true);
	};
	Window_SavefileList.prototype.cursorUp = function (wrap) {
		Window_Selectable.prototype.cursorUp.call(this, true);
	};
	Window_SavefileList.prototype.cursorRight = function (wrap) {
		this.cursorDown(true);
	};
	Window_SavefileList.prototype.cursorLeft = function (wrap) {
		this.cursorUp(true);
	};
})();

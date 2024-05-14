/*:
 * @target MZ
 * @plugindesc Test Plugin
 * @author unacro
 *
 * @help TextPicture.js
 *
 * This plugin provides a command to show text as a picture.
 *
 * Use it in the following procedure.
 *   1. Call the plugin command "Set Text Picture".
 *   2. Execute "Show Picture" without specifying an image.
 *
 * @command set
 * @text Set Text Picture
 * @desc Sets text to display as a picture.
 *       After this, execute "Show Picture" without specifying an image.
 *
 * @arg text
 * @type multiline_string
 * @text Text
 * @desc Text to display as a picture.
 *       Control characters are allowed.
 */

Utils.isNwjs = () =>
	typeof require === "function" && typeof process === "object";
console.debug("Utils", Object.getOwnPropertyDescriptors(Utils));

StorageManager.exists = function (savefileId) {
	if (Utils.isNwjs()) {
		return this.localFileExists(savefileId);
	}
	return this.webStorageExists(savefileId);
};

// $gameParty.lastItem().id // 获取上次使用物品的 ID

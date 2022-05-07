"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.storeJsonData = exports.getFileDataAsJson = exports.setJsonItem = exports.getJsonItem = void 0;
const Util_1 = require("../Util");
const fs = require('fs');
const path = require('path');
function getJsonItem(file, key) {
    const data = getFileDataAsJson(file);
    return data ? data[key] : null;
}
exports.getJsonItem = getJsonItem;
function setJsonItem(file, key, value) {
    let json = getFileDataAsJson(file);
    if (!json) {
        json = {};
    }
    json[key] = value;
    storeJsonData(file, json);
}
exports.setJsonItem = setJsonItem;
function getFileDataAsJson(filePath) {
    var _a;
    try {
        const content = (_a = fs.readFileSync(filePath, 'utf8')) === null || _a === void 0 ? void 0 : _a.trim();
        return JSON.parse(content);
    }
    catch (e) {
        (0, Util_1.logIt)(`Unable to read ${getBaseName(filePath)} info: ${e.message}`, true);
    }
    return null;
}
exports.getFileDataAsJson = getFileDataAsJson;
/**
 * Single place to write json data (json obj or json array)
 * @param filePath
 * @param json
 */
function storeJsonData(filePath, json) {
    try {
        const content = JSON.stringify(json);
        fs.writeFileSync(filePath, content, 'utf8');
    }
    catch (e) {
        (0, Util_1.logIt)(`Unable to write ${getBaseName(filePath)} info: ${e.message}`, true);
    }
}
exports.storeJsonData = storeJsonData;
function getBaseName(filePath) {
    let baseName = filePath;
    try {
        baseName = path.basename(filePath);
    }
    catch (e) { }
    return baseName;
}
//# sourceMappingURL=FileManager.js.map
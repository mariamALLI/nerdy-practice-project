"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveSessionSummaryToDisk = exports.getSessionSummaryFileAsJson = exports.getSessionSummaryData = exports.clearSessionSummaryData = void 0;
const models_1 = require("../model/models");
const Util_1 = require("../Util");
const FileManager_1 = require("../managers/FileManager");
function clearSessionSummaryData() {
    const sessionSummaryData = new models_1.SessionSummary();
    saveSessionSummaryToDisk(sessionSummaryData);
}
exports.clearSessionSummaryData = clearSessionSummaryData;
function getSessionSummaryData() {
    let sessionSummaryData = getSessionSummaryFileAsJson();
    // make sure it's a valid structure
    if (!sessionSummaryData) {
        // set the defaults
        sessionSummaryData = new models_1.SessionSummary();
    }
    // fill in missing attributes
    sessionSummaryData = coalesceMissingAttributes(sessionSummaryData);
    return sessionSummaryData;
}
exports.getSessionSummaryData = getSessionSummaryData;
function coalesceMissingAttributes(data) {
    // ensure all attributes are defined
    const template = new models_1.SessionSummary();
    Object.keys(template).forEach((key) => {
        if (!data[key]) {
            data[key] = 0;
        }
    });
    return data;
}
function getSessionSummaryFileAsJson() {
    const file = (0, Util_1.getSessionSummaryFile)();
    let sessionSummary = (0, FileManager_1.getFileDataAsJson)(file);
    if (!sessionSummary) {
        sessionSummary = new models_1.SessionSummary();
        saveSessionSummaryToDisk(sessionSummary);
    }
    return sessionSummary;
}
exports.getSessionSummaryFileAsJson = getSessionSummaryFileAsJson;
function saveSessionSummaryToDisk(sessionSummaryData) {
    const file = (0, Util_1.getSessionSummaryFile)();
    (0, FileManager_1.storeJsonData)(file, sessionSummaryData);
}
exports.saveSessionSummaryToDisk = saveSessionSummaryToDisk;
//# sourceMappingURL=SessionSummaryData.js.map
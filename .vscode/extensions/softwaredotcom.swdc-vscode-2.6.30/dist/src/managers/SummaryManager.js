"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SummaryManager = void 0;
const SessionSummaryData_1 = require("../storage/SessionSummaryData");
const StatusBarManager_1 = require("./StatusBarManager");
const HttpClient_1 = require("../http/HttpClient");
const vscode_1 = require("vscode");
class SummaryManager {
    constructor() {
        //
    }
    static getInstance() {
        if (!SummaryManager.instance) {
            SummaryManager.instance = new SummaryManager();
        }
        return SummaryManager.instance;
    }
    /**
     * This is only called from the new day checker
     */
    updateSessionSummaryFromServer() {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield (0, HttpClient_1.appGet)('/api/v1/user/session_summary');
            if ((0, HttpClient_1.isResponseOk)(result) && result.data) {
                const summary = result.data;
                if (summary) {
                    (0, SessionSummaryData_1.saveSessionSummaryToDisk)(summary);
                    this.updateCurrentDayStats(summary);
                }
            }
            // update the code time metrics tree views
            vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
        });
    }
    updateCurrentDayStats(summary) {
        if (summary) {
            (0, SessionSummaryData_1.saveSessionSummaryToDisk)(summary);
        }
        (0, StatusBarManager_1.updateStatusBarWithSummaryData)();
    }
}
exports.SummaryManager = SummaryManager;
//# sourceMappingURL=SummaryManager.js.map
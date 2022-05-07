"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncManager = exports.passedThreshold = void 0;
const Util_1 = require("../Util");
const StatusBarManager_1 = require("./StatusBarManager");
const SessionSummaryData_1 = require("../storage/SessionSummaryData");
const FlowManager_1 = require("./FlowManager");
const vscode_1 = require("vscode");
const fs = require('fs');
const thirty_seconds = 1000 * 30;
let last_time_stats_synced = 0;
function passedThreshold(now_in_millis, synced_val) {
    if (!synced_val || now_in_millis - synced_val > thirty_seconds) {
        return true;
    }
    return false;
}
exports.passedThreshold = passedThreshold;
class SyncManager {
    constructor() {
        // make sure the session file exists
        (0, SessionSummaryData_1.getSessionSummaryFileAsJson)();
        // make sure the flow change file exists
        (0, Util_1.getFlowChangeFile)();
        // session.json watch
        fs.watch((0, Util_1.getSessionSummaryFile)(), (curr, prev) => {
            // if there's a change and it's not the primary window, process
            if (curr === 'change' && !(0, Util_1.isPrimaryWindow)()) {
                // prevent rapid session summary change issues
                const now_in_millis = new Date().valueOf();
                if (passedThreshold(now_in_millis, last_time_stats_synced)) {
                    last_time_stats_synced = now_in_millis;
                    (0, StatusBarManager_1.updateStatusBarWithSummaryData)();
                }
            }
        });
        // flowChange.json watch
        fs.watch((0, Util_1.getFlowChangeFile)(), (curr, prev) => {
            const currFlowState = (0, Util_1.isFlowModeEnabled)();
            if (curr === 'change' && (0, FlowManager_1.isInFlowLocally)() !== currFlowState) {
                (0, FlowManager_1.updateInFlowLocally)(currFlowState);
                // update the status bar
                (0, StatusBarManager_1.updateFlowModeStatusBar)();
                // update the sidebar
                vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
            }
        });
    }
    static getInstance() {
        if (!SyncManager._instance) {
            SyncManager._instance = new SyncManager();
        }
        return SyncManager._instance;
    }
}
exports.SyncManager = SyncManager;
//# sourceMappingURL=SyncManger.js.map
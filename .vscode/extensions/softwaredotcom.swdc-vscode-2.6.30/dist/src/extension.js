"use strict";
// Copyright (c) 2018 Software. All Rights Reserved.
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
exports.getCurrentColorKind = exports.intializePlugin = exports.activate = exports.deactivate = exports.isTelemetryOn = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const DataController_1 = require("./DataController");
const OnboardManager_1 = require("./user/OnboardManager");
const Util_1 = require("./Util");
const command_helper_1 = require("./command-helper");
const KpmManager_1 = require("./managers/KpmManager");
const TrackerManager_1 = require("./managers/TrackerManager");
const websockets_1 = require("./websockets");
const StatusBarManager_1 = require("./managers/StatusBarManager");
const SummaryManager_1 = require("./managers/SummaryManager");
const SyncManger_1 = require("./managers/SyncManger");
const ChangeStateManager_1 = require("./managers/ChangeStateManager");
const FlowManager_1 = require("./managers/FlowManager");
let TELEMETRY_ON = true;
let currentColorKind = undefined;
const tracker = TrackerManager_1.TrackerManager.getInstance();
//
// Add the keystroke controller to the ext ctx, which
// will then listen for text document changes.
//
const kpmController = KpmManager_1.KpmManager.getInstance();
function isTelemetryOn() {
    return TELEMETRY_ON;
}
exports.isTelemetryOn = isTelemetryOn;
function deactivate(ctx) {
    // store the deactivate event
    tracker.trackEditorAction('editor', 'deactivate');
    TrackerManager_1.TrackerManager.getInstance().dispose();
    ChangeStateManager_1.ChangeStateManager.getInstance().dispose();
    // dispose the file watchers
    kpmController.dispose();
    (0, websockets_1.disposeWebsocketTimeouts)();
}
exports.deactivate = deactivate;
function activate(ctx) {
    return __awaiter(this, void 0, void 0, function* () {
        if (vscode_1.window.state.focused) {
            (0, Util_1.setItem)('vscode_primary_window', (0, Util_1.getWorkspaceName)());
        }
        // add the code time commands
        ctx.subscriptions.push((0, command_helper_1.createCommands)(ctx, kpmController));
        if ((0, Util_1.getItem)("jwt")) {
            intializePlugin(ctx, false);
        }
        else if (vscode_1.window.state.focused) {
            (0, OnboardManager_1.onboardInit)(ctx, intializePlugin /*successFunction*/);
        }
        else {
            // 5 to 10 second delay
            const secondDelay = (0, Util_1.getRandomNumberWithinRange)(6, 10);
            setTimeout(() => {
                (0, OnboardManager_1.onboardInit)(ctx, intializePlugin /*successFunction*/);
            }, 1000 * secondDelay);
        }
    });
}
exports.activate = activate;
function intializePlugin(ctx, createdAnonUser) {
    return __awaiter(this, void 0, void 0, function* () {
        (0, Util_1.logIt)(`Loaded ${(0, Util_1.getPluginName)()} v${(0, Util_1.getVersion)()}`);
        // INIT websockets
        try {
            (0, websockets_1.initializeWebsockets)();
        }
        catch (e) {
            (0, Util_1.logIt)(`Failed to initialize websockets: ${e.message}`);
        }
        // INIT keystroke analysis tracker
        yield tracker.init();
        // initialize user and preferences
        yield (0, DataController_1.getUser)();
        // show the sidebar if this is the 1st
        const initializedVscodePlugin = (0, Util_1.getItem)('vscode_CtInit');
        if (!initializedVscodePlugin) {
            (0, Util_1.setItem)('vscode_CtInit', true);
            setTimeout(() => {
                vscode_1.commands.executeCommand('codetime.displaySidebar');
            }, 1000);
            (0, Util_1.displayReadme)();
        }
        (0, StatusBarManager_1.initializeStatusBar)();
        if ((0, Util_1.isPrimaryWindow)()) {
            // store the activate event
            tracker.trackEditorAction('editor', 'activate');
            // it's the primary window. initialize flow mode and session summary information
            (0, FlowManager_1.initializeFlowModeState)();
            SummaryManager_1.SummaryManager.getInstance().updateSessionSummaryFromServer();
        }
        else {
            // it's a secondary window. update the statusbar
            (0, StatusBarManager_1.updateFlowModeStatusBar)();
            (0, StatusBarManager_1.updateStatusBarWithSummaryData)();
        }
        setTimeout(() => {
            // INIT doc change events
            ChangeStateManager_1.ChangeStateManager.getInstance();
            // INIT session summary sync manager
            SyncManger_1.SyncManager.getInstance();
        }, 1000);
    });
}
exports.intializePlugin = intializePlugin;
function getCurrentColorKind() {
    if (!currentColorKind) {
        currentColorKind = vscode_1.window.activeColorTheme.kind;
    }
    return currentColorKind;
}
exports.getCurrentColorKind = getCurrentColorKind;
function listExtensions() {
    const allExtensions = vscode_1.extensions.all;
    allExtensions.forEach(extension => {
        var _a;
        if (extension.isActive) {
            const info = {
                id: extension.id,
                author: (_a = extension.packageJSON.author) === null || _a === void 0 ? void 0 : _a.name,
                description: extension.packageJSON.description,
                displayName: extension.packageJSON.displayName,
                name: extension.packageJSON.name,
                publisher: extension.packageJSON.publisher,
                version: extension.packageJSON.version,
                keywords: extension.packageJSON.keywords,
                extensionKind: extension.packageJSON.extensionKind
            };
        }
    });
}
//# sourceMappingURL=extension.js.map
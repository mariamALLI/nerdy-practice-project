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
exports.createCommands = void 0;
const vscode_1 = require("vscode");
const Util_1 = require("./Util");
const AccountManager_1 = require("./menu/AccountManager");
const TrackerManager_1 = require("./managers/TrackerManager");
const Constants_1 = require("./Constants");
const FlowManager_1 = require("./managers/FlowManager");
const ScreenManager_1 = require("./managers/ScreenManager");
const WebViewManager_1 = require("./managers/WebViewManager");
const ConfigManager_1 = require("./managers/ConfigManager");
const StatusBarManager_1 = require("./managers/StatusBarManager");
const OnboardManager_1 = require("./user/OnboardManager");
const CodeTimeView_1 = require("./sidebar/CodeTimeView");
const ProgressManager_1 = require("./managers/ProgressManager");
const KpmItems_1 = require("./events/KpmItems");
function createCommands(ctx, kpmController) {
    let cmds = [];
    const tracker = TrackerManager_1.TrackerManager.getInstance();
    cmds.push(kpmController);
    // INITALIZE SIDEBAR WEB VIEW PROVIDER
    const sidebar = new CodeTimeView_1.CodeTimeView(ctx.extensionUri);
    cmds.push(vscode_1.window.registerWebviewViewProvider('codetime.webView', sidebar, {
        webviewOptions: {
            retainContextWhenHidden: false,
        },
    }));
    // REFRESH EDITOR OPS SIDEBAR
    cmds.push(vscode_1.commands.registerCommand('codetime.refreshCodeTimeView', () => {
        sidebar.refresh();
    }));
    // DISPLAY EDITOR OPS SIDEBAR
    cmds.push(vscode_1.commands.registerCommand('codetime.displaySidebar', () => {
        // opens the sidebar manually from a the above command
        vscode_1.commands.executeCommand('workbench.view.extension.code-time-sidebar');
    }));
    // SWITCH ACCOUNT
    cmds.push(vscode_1.commands.registerCommand('codetime.switchAccount', () => {
        (0, AccountManager_1.showExistingAccountMenu)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.createOrg', () => {
        (0, Util_1.launchWebUrl)(Constants_1.create_org_url);
    }));
    // OPEN SPECIFIED FILE IN EDITOR
    cmds.push(vscode_1.commands.registerCommand('codetime.openFileInEditor', (file) => {
        (0, Util_1.openFileInEditor)(file);
    }));
    // TOGGLE STATUS BAR METRIC VISIBILITY
    cmds.push(vscode_1.commands.registerCommand('codetime.toggleStatusBar', () => {
        tracker.trackUIInteraction((0, KpmItems_1.getHideStatusBarMetricsButton)());
        (0, StatusBarManager_1.toggleStatusBar)();
        vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
    }));
    // LAUNCH EMAIL LOGIN
    cmds.push(vscode_1.commands.registerCommand('codetime.codeTimeLogin', (item, switching_account) => {
        (0, OnboardManager_1.launchLogin)('software', switching_account);
    }));
    // LAUNCH EMAIL LOGIN
    cmds.push(vscode_1.commands.registerCommand('codetime.codeTimeSignup', (item, switching_account) => {
        (0, OnboardManager_1.launchEmailSignup)(switching_account);
    }));
    // LAUNCH EXISTING ACCOUNT LOGIN
    cmds.push(vscode_1.commands.registerCommand('codetime.login', () => {
        // launch the auth selection flow
        (0, AccountManager_1.showExistingAccountMenu)();
    }));
    // LAUNCH SIGN UP FLOW
    cmds.push(vscode_1.commands.registerCommand('codetime.registerAccount', () => {
        // launch the auth selection flow
        (0, AccountManager_1.showSignUpAccountMenu)();
    }));
    // LAUNCH GOOGLE LOGIN
    cmds.push(vscode_1.commands.registerCommand('codetime.googleLogin', (item, switching_account) => {
        (0, OnboardManager_1.launchLogin)('google', switching_account);
    }));
    // LAUNCH GITHUB LOGIN
    cmds.push(vscode_1.commands.registerCommand('codetime.githubLogin', (item, switching_account) => {
        (0, OnboardManager_1.launchLogin)('github', switching_account);
    }));
    // SUBMIT AN ISSUE
    cmds.push(vscode_1.commands.registerCommand('codetime.submitAnIssue', (item) => {
        (0, Util_1.launchWebUrl)(Constants_1.vscode_issues_url);
    }));
    // DISPLAY README MD
    cmds.push(vscode_1.commands.registerCommand('codetime.displayReadme', () => {
        (0, Util_1.displayReadme)();
    }));
    // DISPLAY PROJECT METRICS REPORT
    cmds.push(vscode_1.commands.registerCommand('codetime.viewProjectReports', () => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/reports`);
    }));
    // DISPLAY CODETIME DASHBOARD WEBVIEW
    cmds.push(vscode_1.commands.registerCommand('codetime.viewDashboard', () => {
        (0, WebViewManager_1.showDashboard)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.sendFeedback', () => {
        (0, Util_1.launchWebUrl)('mailto:cody@software.com');
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.connectSlack', () => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/data_sources/integration_types/slack`);
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.disconnectSlackWorkspace', (auth_id) => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/data_sources/integration_types/slack`);
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.showZenMode', () => {
        (0, ScreenManager_1.showZenMode)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.showFullScreen', () => {
        (0, ScreenManager_1.showFullScreenMode)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.exitFullScreen', () => {
        (0, ScreenManager_1.showNormalScreenMode)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.enableFlowMode', () => {
        (0, FlowManager_1.enableFlow)({ automated: false });
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.exitFlowMode', () => {
        (0, FlowManager_1.pauseFlow)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.configureSettings', () => {
        (0, ConfigManager_1.configureSettings)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.showOrgDashboard', (org_name) => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/dashboard/devops_performance?organization_slug=${org_name}`);
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.manageSlackConnection', () => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/data_sources/integration_types/slack`);
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.manageCalendarConnection', () => {
        (0, Util_1.launchWebUrl)(`${Constants_1.app_url}/data_sources/integration_types/calendar`);
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.displayFlowModeInfo', () => {
        (0, Util_1.launchWebUrl)('https://www.software.com/src/auto-flow-mode');
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.skipSlackConnect', () => {
        (0, Util_1.setItem)('vscode_CtskipSlackConnect', true);
        // refresh the view
        vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.reloadOrgs', () => __awaiter(this, void 0, void 0, function* () {
        vscode_1.commands.executeCommand('codetime.refreshCodeTimeView');
    })));
    cmds.push(vscode_1.commands.registerCommand('codetime.updateViewMetrics', () => {
        (0, StatusBarManager_1.updateFlowModeStatusBar)();
        (0, StatusBarManager_1.updateStatusBarWithSummaryData)();
    }));
    cmds.push(vscode_1.commands.registerCommand('codetime.updateSidebarSettings', (payload) => {
        (0, ProgressManager_1.progressIt)('Updating settings...', ConfigManager_1.updateSettings, [payload.path, payload.json, true]);
    }));
    // Update the settings preferences
    cmds.push(vscode_1.commands.registerCommand('codetime.updateSettings', (payload) => {
        (0, ProgressManager_1.progressIt)('Updating settings...', ConfigManager_1.updateSettings, [payload.path, payload.json]);
    }));
    // Close the settings view
    cmds.push(vscode_1.commands.registerCommand('codetime.closeSettings', (payload) => {
        (0, ConfigManager_1.closeSettings)();
    }));
    return vscode_1.Disposable.from(...cmds);
}
exports.createCommands = createCommands;
//# sourceMappingURL=command-helper.js.map
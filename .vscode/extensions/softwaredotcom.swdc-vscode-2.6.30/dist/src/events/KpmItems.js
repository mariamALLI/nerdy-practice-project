"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getActionButton = exports.showMeTheDataKpmItem = exports.configureSettingsKpmItem = exports.getHideStatusBarMetricsButton = void 0;
const Constants_1 = require("../Constants");
const StatusBarManager_1 = require("../managers/StatusBarManager");
const models_1 = require("../model/models");
function getHideStatusBarMetricsButton() {
    let toggleStatusBarTextLabel = Constants_1.SHOW_CODE_TIME_STATUS_LABEL;
    if ((0, StatusBarManager_1.isStatusBarTextVisible)()) {
        toggleStatusBarTextLabel = Constants_1.HIDE_CODE_TIME_STATUS_LABEL;
    }
    const item = getActionButton(toggleStatusBarTextLabel, 'Toggle the Code Time status', 'codetime.toggleStatusBar', 'visible.svg');
    item.location = 'ct_menu_tree';
    item.name = 'ct_toggle_status_bar_metrics_btn';
    item.color = 'blue';
    item.interactionIcon = 'slash-eye';
    return item;
}
exports.getHideStatusBarMetricsButton = getHideStatusBarMetricsButton;
function configureSettingsKpmItem() {
    const item = new models_1.KpmItem();
    item.name = 'ct_configure_settings_btn';
    item.description = 'End of day notification - configure settings';
    item.location = 'ct_notification';
    item.label = 'Settings';
    item.interactionType = models_1.UIInteractionType.Click;
    item.interactionIcon = null;
    item.color = null;
    return item;
}
exports.configureSettingsKpmItem = configureSettingsKpmItem;
function showMeTheDataKpmItem() {
    const item = new models_1.KpmItem();
    item.name = 'ct_show_me_the_data_btn';
    item.description = 'End of day notification - Show me the data';
    item.location = 'ct_notification';
    item.label = 'Show me the data';
    item.interactionType = models_1.UIInteractionType.Click;
    item.interactionIcon = null;
    item.color = null;
    return item;
}
exports.showMeTheDataKpmItem = showMeTheDataKpmItem;
function getActionButton(label, tooltip, command, icon = null, eventDescription = '', color = null, description = '') {
    const item = new models_1.KpmItem();
    item.tooltip = tooltip !== null && tooltip !== void 0 ? tooltip : '';
    item.label = label;
    item.id = label;
    item.command = command;
    item.icon = icon;
    item.contextValue = 'action_button';
    item.eventDescription = eventDescription;
    item.color = color;
    item.description = description;
    return item;
}
exports.getActionButton = getActionButton;
//# sourceMappingURL=KpmItems.js.map
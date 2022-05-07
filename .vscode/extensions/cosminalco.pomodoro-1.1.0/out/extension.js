'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const pomodoro_1 = require("./pomodoro");
function activate(context) {
    const pomodoro = new pomodoro_1.Pomodoro(context);
    const startPause = vscode.commands.registerCommand('extension.pomodoroStartPause', () => pomodoro.startPause());
    const reset = vscode.commands.registerCommand('extension.pomodoroReset', () => pomodoro.reset());
    context.subscriptions.push(startPause, reset);
    vscode.workspace.onDidChangeConfiguration(event => {
        if (event.affectsConfiguration('pomodoro'))
            pomodoro.setup();
    });
}
exports.activate = activate;
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
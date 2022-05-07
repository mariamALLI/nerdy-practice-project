'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode_1 = require("vscode");
const Timer_1 = require("./Timer");
let timer;
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "timer" is now active!');
    timer = new Timer_1.default();
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let startTimer = vscode_1.commands.registerCommand('extension.startTimer', () => {
        // The code you place here will be executed every time your command is executed
        vscode_1.window
            .showInputBox({
            prompt: 'How long?',
            placeHolder: 'Enter time in minutes',
            validateInput: validateTimerInput
        })
            .then(value => {
            if (value) {
                timer.start(parseInt(value));
            }
        });
    });
    let stopTimer = vscode_1.commands.registerCommand('extension.stopTimer', () => {
        timer.stop();
    });
    context.subscriptions.push(startTimer);
    context.subscriptions.push(stopTimer);
}
exports.activate = activate;
function validateTimerInput(value) {
    let numericValue = parseInt(value);
    if (isNaN(numericValue)) {
        return 'Minutes has to be in the form of a valid number';
    }
    else {
        return null;
    }
}
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map
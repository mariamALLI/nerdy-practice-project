"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
class Timer {
    constructor() {
        if (!this._statusBarItem) {
            this._statusBarItem = vscode_1.window.createStatusBarItem(vscode_1.StatusBarAlignment.Left);
            this._statusBarItem.text = '00:00';
        }
    }
    get alarmMessage() {
        let config = vscode_1.workspace.getConfiguration('simpleTimer');
        if (config.showAlarm) {
            return config.alarmMessage;
        }
        else {
            return null;
        }
    }
    start(time) {
        this._statusBarItem.text = `${time}:00`;
        this._statusBarItem.show();
        let deadline = new Date(new Date().getTime() + time * 60000);
        this._timer = setInterval(() => {
            let t = this.getTimeRemaining(deadline);
            this._statusBarItem.text = `${this._zeroBase(t.minutes)}:${this._zeroBase(t.seconds)}`;
            if (t.total <= 0) {
                clearInterval(this._timer);
                this._statusBarItem.hide();
                if (this.alarmMessage) {
                    vscode_1.window.showInformationMessage(this.alarmMessage);
                }
            }
        }, 1000);
    }
    stop() {
        clearInterval(this._timer);
        if (this._statusBarItem) {
            this._statusBarItem.hide();
        }
    }
    getTimeRemaining(endTime) {
        let t = Date.parse(endTime) - Date.parse(new Date().toString());
        let seconds = Math.floor((t / 1000) % 60);
        let minutes = Math.floor((t / 1000 / 60) % 60);
        return {
            total: t,
            minutes: minutes,
            seconds: seconds
        };
    }
    _zeroBase(value) {
        return value < 10 ? `0${value}` : value;
    }
}
exports.default = Timer;
//# sourceMappingURL=Timer.js.map
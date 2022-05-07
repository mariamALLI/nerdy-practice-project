"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const os = require("os");
const path_1 = require("path");
const vscode_1 = require("vscode");
exports.getVSCodeUserPath = () => {
    const appName = vscode_1.env.appName || '';
    const isDev = /dev/i.test(appName);
    const isOSS = isDev && /oss/i.test(appName);
    const isInsiders = /insiders/i.test(appName);
    const vscodePath = getVSCodePath();
    const vscodeAppName = getVSCodeAppName(isInsiders, isOSS, isDev);
    const vscodeAppUserPath = path_1.join(vscodePath, vscodeAppName, 'User');
    return vscodeAppUserPath;
};
const getVSCodeAppName = (isInsiders, isOSS, isDev) => {
    return process.env.VSCODE_PORTABLE
        ? 'user-data'
        : isInsiders
            ? 'Code - Insiders'
            : isOSS
                ? 'Code - OSS'
                : isDev
                    ? 'code-oss-dev'
                    : 'Code';
};
const getVSCodePath = () => {
    switch (process.platform) {
        case 'darwin':
            return `${os.homedir()}/Library/Application Support`;
        case 'linux':
            return `${os.homedir()}/.config`;
        case 'win32':
            return process.env.APPDATA;
        default:
            return '/var/local';
    }
};
//# sourceMappingURL=helpers.js.map
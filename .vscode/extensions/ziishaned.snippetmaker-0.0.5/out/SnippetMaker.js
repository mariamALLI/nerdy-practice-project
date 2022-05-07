"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const util_1 = require("util");
const fs_1 = require("fs");
const stripJsonComments = require("strip-json-comments");
const vscode_1 = require("vscode");
const helpers_1 = require("./helpers");
const readFileSync = util_1.promisify(fs_1.readFile);
const writeFileSync = util_1.promisify(fs_1.writeFile);
class SnippetMaker {
    constructor() {
        this.createSnippet = () => __awaiter(this, void 0, void 0, function* () {
            yield this.setSnippetInfo();
            let snippetsPath = this.getSnippetsPath();
            let snippetFilePath = `${snippetsPath}/${this.snippetInfo.lang}.json`;
            let text = '{}';
            try {
                text = yield readFileSync(snippetFilePath, {
                    encoding: 'utf8',
                });
            }
            catch (e) {
                if (e.code !== 'ENOENT') {
                    vscode_1.window.showErrorMessage('Something went wrong while retrieving snippets.');
                    return;
                }
                yield writeFileSync(snippetFilePath, '{}');
            }
            let snippetFileText = JSON.parse(stripJsonComments(text));
            snippetFileText[this.snippetInfo.name] = {
                body: this.snippetInfo.body,
                prefix: this.snippetInfo.prefix,
                description: this.snippetInfo.description,
            };
            yield writeFileSync(snippetFilePath, JSON.stringify(snippetFileText));
        });
        /**
         * Get snippet information from user.
         *
         * @returns void
         */
        this.setSnippetInfo = () => __awaiter(this, void 0, void 0, function* () {
            let snippetBody = this.selectedText();
            this.snippetInfo.body = snippetBody.split('\n');
            let listOfLanguages = yield vscode_1.languages.getLanguages();
            this.snippetInfo.lang = (yield vscode_1.window.showQuickPick(listOfLanguages, {
                placeHolder: this.editor.document.languageId,
            }));
            this.snippetInfo.name = (yield vscode_1.window.showInputBox({
                prompt: 'Name',
            }));
            this.snippetInfo.prefix = (yield vscode_1.window.showInputBox({
                prompt: 'Trigger',
            }));
            this.snippetInfo.description = (yield vscode_1.window.showInputBox({
                prompt: 'Description',
            }));
        });
        /**
         * Get the user defined snippets path.
         *
         * @returns string
         */
        this.getSnippetsPath = () => {
            let vscodeUserPath = helpers_1.getVSCodeUserPath();
            return `${vscodeUserPath}/snippets`;
        };
        /**
         * Get selected text from active editor.
         *
         * @returns string
         */
        this.selectedText = () => {
            let selectedRegion = this.editor.selection;
            return this.editor.document.getText(selectedRegion);
        };
        this.snippetInfo = {};
        this.editor = vscode_1.window.activeTextEditor;
    }
}
exports.SnippetMaker = SnippetMaker;
//# sourceMappingURL=SnippetMaker.js.map
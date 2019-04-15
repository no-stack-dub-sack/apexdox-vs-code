import * as vscode from 'vscode';
import ApexDoc from './apexDoc/ApexDoc';
import ClassStub from './stubs/ClassStub';
import Configurator, { IApexDocConfig } from './apexDoc/Config';
import Guards from './utils/Guards';
import langConfig from './stubs/apex.config';
import MethodStub from './stubs/MethodStub';
import Stub, { IStubLine, StubType } from './stubs/Stub';
import { createDocServer } from './server';

const disposables = {
    // configure onEnterRules so that we have '*' completion in Apex block comments
    onEnterRules: () => vscode.languages.setLanguageConfiguration('apex', langConfig),

    // main ApexDoc2 command, produces static HTML documentation pages
    runApexDoc2: (context: vscode.ExtensionContext) => vscode.commands.registerCommand('apexDoc2.run', () => {
        try {
            const config: IApexDocConfig = Configurator.getConfig();
            Configurator.validateConfig(config);

            ApexDoc.extensionRoot = context.extensionPath;
            ApexDoc.runApexDoc(config);
        } catch (e) {
            console.log(e);
            vscode.window.showErrorMessage(e.message);
        }
    }),

    // serve created docs over HTTP on local host
    serveDocs: () => vscode.commands.registerCommand('apexDoc2.serveDocs', () => {
        try {
            const config: IApexDocConfig = Configurator.getConfig();
            createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
        } catch (e) {
            console.log(e);
            vscode.window.showErrorMessage(e.message);
        }
    }),

    // stub an ApexDoc2 comment, invoked by command pallette
    stubComment: () => vscode.commands.registerCommand('apexDoc2.stub', () => {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
            const lineIdx = editor.selection.active.line
                , stubLine = Stub.getLineAndType(editor, lineIdx);

            switch (stubLine.type) {
                case StubType.METHOD:
                    new MethodStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.CLASS_OR_INTERFACE:
                    new ClassStub(editor, lineIdx, stubLine).insert();
                    break;
            }
        }
    }),

    // stub an ApexDoc2 comment, invoked by completion item, i.e. '/**'
    stubCompletionProvider: () => {
        const provider = {
            provideCompletionItems: (document: vscode.TextDocument, position: vscode.Position) => {
                const line = document.lineAt(position.line).text;

                if (line.indexOf('/**') === -1) {
                    return Promise.resolve(undefined);
                }

                let item = new vscode.CompletionItem('/** */', vscode.CompletionItemKind.Snippet);
                item.detail = 'ApexDoc2 Comment';
                item.insertText = '';
                item.command = {
                    title: 'ApexDoc2 Comment',
                    command: 'apexdoc2.stubCompletion',
                    arguments: [position]
                };

                return Promise.resolve([item]);
            }
        };

        vscode.commands.registerCommand('apexdoc2.stubCompletion', (position: vscode.Position) => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const lineIdx = editor.selection.active.line;
                const stubLine: IStubLine = Stub.getLineAndType(editor, lineIdx, true);
                let stub: Stub | null;

                switch (stubLine.type) {
                    case StubType.METHOD:
                        stub = new MethodStub(editor, lineIdx, stubLine, true);
                        break;
                    case StubType.CLASS_OR_INTERFACE:
                        stub = new ClassStub(editor, lineIdx, stubLine, true);
                        break;
                    default:
                        stub = null;
                }

                let snippet = stub && stub.contents
                    ? new vscode.SnippetString(stub.contents)
                    : new vscode.SnippetString('\n * $0\n */');

                editor.insertSnippet(snippet, position, { undoStopBefore: false, undoStopAfter: false });
            }
        });

        return vscode.languages.registerCompletionItemProvider('apex', provider, '*');
    }
};

export default disposables;
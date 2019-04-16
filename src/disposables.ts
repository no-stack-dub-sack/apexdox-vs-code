import * as vscode from 'vscode';
import ApexDoc from './apexDoc/ApexDoc';
import ClassStub from './stubs/ClassStub';
import Configurator, { IApexDocConfig } from './apexDoc/Config';
import DefaultStub from './stubs/DefaultStub';
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
                , stubLine = Stub.getLineAndType(editor.document, lineIdx);

            switch (stubLine.type) {
                case StubType.METHOD:
                    new MethodStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.CLASS_INTERFACE_OR_ENUM:
                    new ClassStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.PROP_OR_INNER_ENUM:
                default:
                    new DefaultStub(editor, lineIdx, stubLine).insert();
                    break;
            }
        }
    }),

    // stub an ApexDoc2 comment, invoked by completion item, i.e. '/**'
    stubCompletionProvider: () => {
        class ApexDocCompletionItem extends vscode.CompletionItem {
            constructor(position: vscode.Position) {
                super('/** */', vscode.CompletionItemKind.Snippet);
                this.detail = 'ApexDoc2 Comment';
                this.insertText = '';
                this.command = {
                    title: 'ApexDoc2 Comment',
                    command: 'apexdoc2.stubCompletion',
                    arguments: [position]
                };
            }
        }

        class ApexDocCompletionProvider implements vscode.CompletionItemProvider {
            public provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): Promise<vscode.CompletionItem[] | undefined> {
                const line = document.lineAt(position.line).text;

                if (line.indexOf('/**') === -1) {
                    return Promise.resolve(undefined);
                }

                return Promise.resolve([new ApexDocCompletionItem(position)]);
            }
        }

        vscode.commands.registerCommand('apexdoc2.stubCompletion', (position: vscode.Position) => {
            const editor = vscode.window.activeTextEditor;

            if (editor) {
                const lineIdx = editor.selection.active.line;
                const stubLine: IStubLine = Stub.getLineAndType(editor.document, lineIdx, true);
                let stub: Stub;

                switch (stubLine.type) {
                    case StubType.METHOD:
                        stub = new MethodStub(editor, lineIdx, stubLine, true);
                        break;
                    case StubType.CLASS_INTERFACE_OR_ENUM:
                        stub = new ClassStub(editor, lineIdx, stubLine, true);
                        break;
                    case StubType.PROP_OR_INNER_ENUM:
                    default:
                        stub = new DefaultStub(editor, lineIdx, stubLine, true);
                }

                const snippet = new vscode.SnippetString(stub.contents);
                editor.insertSnippet(snippet, position);
            }
        });

        return vscode.languages.registerCompletionItemProvider('apex', new ApexDocCompletionProvider(), '*');
    }
};

export default disposables;
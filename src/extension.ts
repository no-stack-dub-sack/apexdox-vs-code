import * as vscode from 'vscode';
import ApexDoc from './apexDoc/ApexDoc';
import Configurator, { IApexDocConfig } from './apexDoc/Config';
import Guards from './utils/Guards';
import MethodStub from './stubs/MethodStub';
import Stub, { IStubLine, StubType } from './stubs/Stub';
import { closeServer, createDocServer } from './server';

export function activate(context: vscode.ExtensionContext) {
	// main ApexDoc2 command
	const runApexDoc2 = vscode.commands.registerCommand('apexDoc2.run', () => {
		try {
			const config: IApexDocConfig = Configurator.getConfig();
			Configurator.validateConfig(config);

			ApexDoc.extensionRoot = context.extensionPath;
			ApexDoc.runApexDoc(config);
		} catch (e) {
			console.log(e);
			vscode.window.showErrorMessage(e.message);
		}
	});

	// serve created docs over HTTP on local host
	const serveDocs = vscode.commands.registerCommand('apexDoc2.serveDocs', () => {
		try {
			const config: IApexDocConfig = Configurator.getConfig();
			createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
		} catch (e) {
			console.log(e);
			vscode.window.showErrorMessage(e.message);
		}
	});

	// stub an ApexDoc2 comment, invoked by command pallette
	const stubComment = vscode.commands.registerCommand('apexDoc2.stub', () => {
		const editor = vscode.window.activeTextEditor;

        if (editor) {
			const lineIdx = editor.selection.active.line;
			const result: IStubLine = Stub.getLineAndType(editor, lineIdx);

			if (result.type === StubType.METHOD) {
				const stub = new MethodStub(editor, lineIdx, result);
				stub.contents && stub.insert();
			}
        }
	});

	// stub an ApexDoc2 comment, invoked by completion item, i.e. '/**'
	const stubCompletionProvider = () => {
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
				const result: IStubLine = Stub.getLineAndType(editor, lineIdx, true);

				if (result.type === StubType.METHOD) {
					const stub = new MethodStub(editor, lineIdx, result, true);
					const snippet = stub.contents ? new vscode.SnippetString(stub.contents) : new vscode.SnippetString('\n * $0\n */');
					editor.insertSnippet(snippet, position, { undoStopBefore: false, undoStopAfter: false });
				} else {
					const snippet = new vscode.SnippetString('\n * $0\n */');
					editor.insertSnippet(snippet, position, { undoStopBefore: false, undoStopAfter: false });
				}
			}
		});

		return vscode.languages.registerCompletionItemProvider('apex', provider, '*');
	};

	context.subscriptions.push(...[runApexDoc2, serveDocs, stubComment, stubCompletionProvider()]);
}

export function deactivate() {
	closeServer();
}

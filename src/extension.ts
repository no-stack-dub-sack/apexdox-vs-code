import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Configurator, { IApexDocConfig } from './core/Config';
import Guards from './utils/Guards';
import MethodModel from './models/MethodModel';
import { closeServer, createDocServer } from './server';

export function activate(context: vscode.ExtensionContext) {
	// main ApexDoc2 command
	let runApexDoc2 = vscode.commands.registerCommand('apexDoc2.run', () => {
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
	let serveDocs = vscode.commands.registerCommand('apexDoc2.serveDocs', () => {
		try {
			const config: IApexDocConfig = Configurator.getConfig();
			createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
		} catch (e) {
			console.log(e);
			vscode.window.showErrorMessage(e.message);
		}
	});

	let stubComment = vscode.commands.registerCommand('apexDoc2.stub', () => {
		// set this flag to true so scope parsing uses master
		// list of all scopes, not scopes set in config
		ApexDoc.isStub = true;

		interface ApexDoc2StubConfig {
			alignParams: boolean;
		}

		let config: ApexDoc2StubConfig = { ...vscode.workspace.getConfiguration('apexdoc2')['stubs'] };

        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            return;
        }

        // Declare & initialize our line vars
		let lineIndex = editor.selection.active.line
			, line = editor.document.lineAt(lineIndex);

        // Handle annotations
        while (line.text.trim().startsWith('@')) {
            line = editor.document.lineAt(lineIndex++);
		}

		// Handle line command being invoked on being empty and next
		// line being the line that the method we're stubbing is on
		let nextLineText = editor.document.lineAt(lineIndex + 1).text;
		if (line.isEmptyOrWhitespace && nextLineText.includes('(')) {
			line = editor.document.lineAt(++lineIndex);
		}

        // If line is still empty, do nothing
        if (!line.isEmptyOrWhitespace && line.text.includes('(')) {
			let padTo = line.firstNonWhitespaceCharacterIndex
				, nameLine = line.text.trim()
				, currLineIndex = lineIndex
				, lineNum = lineIndex + 1;

			// handle methods declared over multiple lines
			while (!line.text.includes(')')) {
				line = editor.document.lineAt(++currLineIndex);
				nameLine += line.text.trim();
			}

			// create a method model from our name line to base our stub on
			const method = new MethodModel([], nameLine, lineNum);

			let indent = ' '.repeat(padTo)
				, stub = `${indent}/**\n${indent} * \${1:${method.getMethodName()} description}\n`
				, params = method.getParamsFromNameLine()
				, maxParamLen = Math.max(...params.map(p => p.length))
				, placeholder = 2;

			if (params.length) {
				stub += `${indent} *\n`;
			}

			for (let param of params) {
				let pad = '';

				if (config.alignParams && param.length < maxParamLen) {
					pad = ' '.repeat(maxParamLen - param.length);
				}

				stub += `${indent} * @param ${param + pad} \${${placeholder++}:${param} description}\n`;
			}

			stub += `${indent}*/\n`;
            const position = new vscode.Position(lineIndex, 0);
            editor.insertSnippet(new vscode.SnippetString(`${stub}`), position);
        }
	});

	context.subscriptions.push(...[runApexDoc2, serveDocs, stubComment]);
}

export function deactivate() {
	closeServer();
}

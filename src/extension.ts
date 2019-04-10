import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Configurator, { IApexDocConfig } from './core/Config';
import Guards from './utils/Guards';
import MethodModel from './models/MethodModel';
import Utils from './utils/Utils';
import { closeServer, createDocServer } from './server';

interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTags: boolean;
}

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

		let config: IStubsConfig = { ...vscode.workspace.getConfiguration('apexdoc2')['stubs'] };

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

			const methodName = method.getMethodName()
				, params = method.getParamsFromNameLine()
				, returnType = Utils.previousWord(nameLine, nameLine.indexOf(methodName))
				, maxLength = Math.max(...[methodName.length, ...params.map(p => p.length)])
				, indent = ' '.repeat(padTo);

			let pad = getPadding(config.alignItems, methodName, maxLength);
			let stub = descriptionTemplate(methodName, indent, pad, config.omitDescriptionTags);

			if (params.length) {
				stub += `${indent} *\n`;
			}

			let placeholder = 2;
			for (let param of params) {
				let pad = getPadding(config.alignItems, param, maxLength);
				stub += paramTemplate(param, indent, pad, placeholder++);
			}

			if (returnType !== 'void') {
				let pad = getPadding(config.alignItems, '', maxLength);
				stub += returnTemplate(indent, pad, placeholder++);
			}

			stub += `${indent}*/\n`;

            const position = new vscode.Position(lineIndex, 0);
            editor.insertSnippet(new vscode.SnippetString(`${stub}`), position);
        }
	});

	context.subscriptions.push(...[runApexDoc2, serveDocs, stubComment]);
}

const getPadding = (alignItems: boolean, element: string, maxLength: number): string => {
	if (alignItems && element.length < maxLength) {
		return ' '.repeat(maxLength - element.length);
	}

	return '';
};

const returnTemplate = (indent: string, pad: string, snippetNum: number): string => {
	return `${indent} *\n${indent} * @return ${pad}\${${snippetNum}:return description}\n`;
};

const descriptionTemplate = (methodName: string, indent: string, pad: string, omitDesc: boolean) => {
	return `${indent}/**\n${indent} * ${!omitDesc ? '@description ' : ''}${pad}\${1:${methodName} description}\n`;
};

const paramTemplate = (param: string, indent: string, pad: string, snippetNum: number) => {
	return `${indent} * @param ${param + pad} \${${snippetNum}:${param} description}\n`;
};

export function deactivate() {
	closeServer();
}

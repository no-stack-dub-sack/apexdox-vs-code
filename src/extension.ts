import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Configurator, { IApexDocConfig } from './core/Config';
import Guards from './utils/Guards';
import MethodModel from './models/MethodModel';
import Utils from './utils/Utils';
import { closeServer, createDocServer } from './server';

interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
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

		const
			  PARAM = '@param'
			, RETURN = '@return'
			, DESCRIPTION = '@description';

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
			let indentTo = line.firstNonWhitespaceCharacterIndex
				, nameLine = line.text.trim()
				, currLineIndex = lineIndex
				, lineNum = lineIndex + 1;

			// Capture the method's nameLine, and traverse over
			// enough of it's text to detect whether or not a it
			// throws an exception, if so, we'll include this tag.
			let openCurlies = Utils.countChars(nameLine, '{')
				, closeCurlies = Utils.countChars(nameLine, '}')
				, throwsEx = false
				, start = true;

			while (openCurlies !== closeCurlies || start === true) {
				line = editor.document.lineAt(++currLineIndex);

				openCurlies += Utils.countChars(line.text, '{');
				closeCurlies += Utils.countChars(line.text, '}');

				// be sure to turn this off once our loop begins
				if (openCurlies > 0 && start === true) {
					start = false;
				}

				// keep appending to the nameLine until we find our
				// opening curly brace. This will ensure we capture
				// methods declared over multiple lines
				else if (openCurlies < 2) {
					nameLine += line.text.trim();
				}

				// we're looking for an exception, if we find one, we can break
				// the loop, we already have all the info we need for the model
				if (line.text.trim().toLocaleLowerCase().startsWith('throw')) {
					throwsEx = true;
					break;
				}
			}

			// create a method model from our name line to base our stub on
			const method = new MethodModel([], nameLine, lineNum)
				, methodName = method.getMethodName()
				, params = method.getParamsFromNameLine()
				, returnType = Utils.previousWord(nameLine, nameLine.indexOf(methodName))
				, maxLength = getMaxLength(config, returnType, params, throwsEx)
				, indent = ' '.repeat(indentTo);

			let stub = '';

			// get right-pad for description line
			const pad = !config.omitDescriptionTag
				? getPadding(config.alignItems, DESCRIPTION.length, maxLength)
				: '';

			stub += descriptionTemplate(methodName, indent, pad, config.omitDescriptionTag);

			if (params.length) {
				stub += `${indent} *\n`;
			}

			let snippetNum = 2;
			for (let param of params) {
				const length = param.length + PARAM.length + 1;
				const pad = getPadding(config.alignItems, length, maxLength);
				stub += paramTemplate(param, indent, pad, snippetNum++);
			}

			if (returnType !== 'void') {
				const pad = getPadding(config.alignItems, RETURN.length, maxLength);
				stub += returnTemplate(indent, pad, snippetNum++);
			}

			if (throwsEx) {
				const pad = getPadding(config.alignItems, '@exception'.length, maxLength);
				stub += exceptionTemplate(indent, pad, snippetNum++);
			}

			stub += `${indent}*/$0\n`;

            const position = new vscode.Position(lineIndex, 0);
            editor.insertSnippet(new vscode.SnippetString(`${stub}`), position);
        }
	});

	context.subscriptions.push(...[runApexDoc2, serveDocs, stubComment]);
}

const getMaxLength = (config: IStubsConfig, returnType: string, params: string[], throwsEx: boolean): number => {
	// establish lengths of tags and params
	const returnTag = returnType !== 'void' ? '@return'.length : 0;
	const descriptionTag = config.omitDescriptionTag ? 0 : '@description'.length;
	const paramsLength = params.map(p => '@param '.length + p.length); // 7 = '@param '
	const exceptionLength = throwsEx ? '@exception'.length : 0;

	// gather all lengths and take max
	const lengths = [returnTag, descriptionTag, exceptionLength, ...paramsLength];
	return Math.max(...lengths);
};

const getPadding = (alignItems: boolean, length: number, maxLength: number): string => {
	if (alignItems && length < maxLength) {
		return ' '.repeat((maxLength - length) + 1);
	}

	return ' ';
};

const returnTemplate = (indent: string, pad: string, snippetNum: number): string => {
	return `${indent} *\n${indent} * @return ${pad}\${${snippetNum}:return description}\n`;
};

const exceptionTemplate = (indent: string, pad: string, snippetNum: number): string => {
	return `${indent} *\n${indent} * @exception ${pad}\${${snippetNum}:exception description}\n`;
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

import * as vscode from 'vscode';
import ApexDoc from './apexDoc/ApexDoc';
import Configurator, { IApexDocConfig } from './apexDoc/Config';
import Guards from './utils/Guards';
import MethodModel from './models/MethodModel';
import MethodStub from './stubs/MethodStub';
import Utils from './utils/Utils';
import { closeServer, createDocServer } from './server';

interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
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
		const editor = vscode.window.activeTextEditor;

        if (editor) {
			const stub = new MethodStub(editor);
			stub.contents && stub.insert();
        }
	});

	context.subscriptions.push(...[runApexDoc2, serveDocs, stubComment]);
}

export function deactivate() {
	closeServer();
}

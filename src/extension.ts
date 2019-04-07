import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Configurator, { IApexDocConfig } from './core/Config';
import Guards from './utils/Guards';
import { closeServer, createDocServer } from './server';

export function activate(context: vscode.ExtensionContext) {
	// main ApexDoc2 command
	let runApexDoc2 = vscode.commands.registerCommand('extension.runApexDoc2', () => {
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
	let serveDocs = vscode.commands.registerCommand('extension.serveDocs', () => {
		try {
			const config: IApexDocConfig = Configurator.getConfig();
			createDocServer(config.targetDirectory, config.title, Guards.port(config.port));
		} catch (e) {
			console.log(e);
			vscode.window.showErrorMessage(e.message);
		}
	});

	context.subscriptions.push(...[runApexDoc2, serveDocs]);
}

export function deactivate() {
	closeServer();
}

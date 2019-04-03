import * as vscode from 'vscode';
import ApexDoc from './core/ApexDoc';
import Configurator, { IApexDocConfig } from './core/Config';
import { createDocServer, closeServer } from './server';
import Guards from './utils/Guards';

function getConfig(): IApexDocConfig {
	return Configurator.merge({
		...vscode.workspace.getConfiguration('apexdoc2')['config']
	});
}

export function activate(context: vscode.ExtensionContext) {
	// main ApexDoc2 command
	let runApexDoc2 = vscode.commands.registerCommand('extension.runApexDoc2', () => {
		try {
			const config: IApexDocConfig = getConfig();
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
			const config: IApexDocConfig = getConfig();
			createDocServer(config.targetDirectory, config.title, Guards.portGuard(config.port));
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

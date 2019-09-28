import disposables, { ApexDoc2Command } from './disposables/index';
import { closeServer } from './engine/server';
import { ExtensionContext } from 'vscode';

export const EXTENSION = 'apexdoc2';
export const REPOSITORY = 'https://github.com/no-stack-dub-sack/apexdoc2-vscode';

export function activate(context: ExtensionContext) {
	disposables.forEach((cmd: ApexDoc2Command) => {
		context.subscriptions.push(cmd(context));
	});
}

export function deactivate() {
	closeServer();
}

import disposables, { ApexDoxCommand } from './disposables/index';
import { closeServer } from './engine/server';
import { ExtensionContext } from 'vscode';

export const EXTENSION = 'apexdox';
export const REPOSITORY = 'https://github.com/no-stack-dub-sack/apexdox-vs-code';

export function activate(context: ExtensionContext) {
	disposables.forEach((cmd: ApexDoxCommand) => {
		context.subscriptions.push(cmd(context));
	});
}

export function deactivate() {
	closeServer();
}

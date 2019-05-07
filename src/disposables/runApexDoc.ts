import ApexDoc from '../apex-doc/ApexDoc';
import Configurator from '../apex-doc/Config';
import {
    commands,
    Disposable,
    ExtensionContext,
    window
    } from 'vscode';
import { IApexDocConfig } from '../apex-doc/Config';

const COMMAND = 'apexDoc2.runApexDoc';

export default function(context: ExtensionContext): Disposable {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config: IApexDocConfig = Configurator.getConfig();
            Configurator.validateConfig(config);

            ApexDoc.extensionRoot = context.extensionPath;
            ApexDoc.runApexDoc(config);
        } catch (e) {
            console.log(e);
            window.showErrorMessage(e.message);
        }
    });
}
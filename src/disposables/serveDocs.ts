import createDocServer from '../engine/server';
import Settings, { Feature } from '../common/Settings';
import Validator from '../common/ValidatorEngine';
import { commands, window } from 'vscode';
import { IApexDocConfig } from '../common/models/settings';

const COMMAND = 'apexDoc2.serveDocs';

export default function() {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config = Settings.getConfig<IApexDocConfig>(Feature.ENGINE);
            createDocServer(config.targetDirectory, config.title, Validator.port(config.port));
        } catch (e) {
            console.error(e);
            window.showErrorMessage(e.message);
        }
    });
}
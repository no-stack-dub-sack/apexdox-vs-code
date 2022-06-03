import createDocServer from '../engine/server';
import Settings, { Feature } from '../common/Settings';
import Validator from '../common/ValidatorEngine';
import { commands, window } from 'vscode';
import { IEngineConfig } from '..';

const COMMAND = 'apexdox.serveDocs';

export default function () {
    return commands.registerCommand(COMMAND, () => {
        try {
            const config = Settings.getConfig<IEngineConfig>(Feature.ENGINE);
            createDocServer(config.targetDirectory, config.title, Validator.port(config.port));
        } catch (e) {
            console.error(e);
            window.showErrorMessage(e.message);
        }
    });
}

import ApexDoxError from './ApexDoxError';
import DocblockConfig from './models/DocblockConfig';
import DocblockValidator from './ValidatorDocblock';
import EngineConfig from './models/EngineConfig';
import EngineValidator from './ValidatorEngine';
import LineReader from './LineReader';
import { existsSync, readFileSync } from 'fs';
import { EXTENSION } from '../extension';
import {
    IApexDoxRc,
    IDocblockConfig,
    IEngineConfig,
    Option
    } from '..';
import { resolve } from 'path';
import { safeLoad as yamlToJson } from 'js-yaml';
import { workspace, WorkspaceFolder } from 'vscode';

export enum Feature {
    ENGINE,
    DOC_BLOCK
}

class Settings {

    // this should be a safe cast. If running this tool, workspace folders should always exist.
    private static projectRoot = (<WorkspaceFolder[]>workspace.workspaceFolders)[0].uri.fsPath;

    /**
     * Note that casting user provided configs as ApexDox configs
     * can potentially result in run-time errors. The onus is on
     * the user to ensure the correct shape of their config files,
     * however, the app should fail loudly and gracefully if the
     * user provides an invalid config.
     */
    private static getRcFile(): Option<IApexDoxRc, void> {
        const rcJsonPath = resolve(this.projectRoot, '.apexdoxrc');
        const rcYamlPath = resolve(this.projectRoot, 'apexdox.yaml');
        const rcYmlPath = resolve(this.projectRoot, 'apexdox.yml');
        let fileName = '';

        try {
            // apexdox.yaml
            if (existsSync(rcYamlPath)) {
                fileName = 'apexdox.yaml';
                const rcConfig = yamlToJson(readFileSync(rcYamlPath, 'utf8'));
                return <IApexDoxRc>rcConfig;
            }
            // apexdox.yml
            else if (existsSync(rcYmlPath)) {
                fileName = 'apexdox.yml';
                const rcConfig = yamlToJson(readFileSync(rcYmlPath, 'utf8'));
                return <IApexDoxRc>rcConfig;
            }
            // .apexdoxrc (json)
            else if (existsSync(rcJsonPath)) {
                fileName = '.apexdoxrc';
                const rcString = new LineReader(rcJsonPath).toString();
                return <IApexDoxRc>JSON.parse(rcString);
            }
        } catch (e) {
            throw new ApexDoxError(ApexDoxError.CONFIG_PARSE_ERROR(fileName));
        }
    }

    /**
     * Get user's ApexDox config and set defaults where needed.
     * Order of preference for config files is listed below. If more than one
     * config file is present, this is the order that will be honored by ApexDox.
     *
     *  1. apexdox.yaml
     *  2. apexdox.yml
     *  3. .apexdoxrc
     *  4. settings.json
     *
     * NOTE: since we're supporting .rc and yaml config files, we'll need to
     * maintain defaults in model/settings.ts as well as in package.json.
     */
    public static getConfig<T extends IEngineConfig | IDocblockConfig>(type: Feature): T {
        const rcConfig = this.getRcFile();

        // getting engine config
        if (type === Feature.ENGINE) {
            let config: IEngineConfig;
            if (rcConfig) {
                config = {
                    ...new EngineConfig(),
                    ...rcConfig.engine || {}
                };
            } else {
                // if no .apexdoxrc file found, get config from settings.json
                config = <IEngineConfig>workspace.getConfiguration(EXTENSION).get('engine');
            }
            // pass result of either to directory defaulter and validate
            return <T>new EngineValidator(this.setEngineDirectoryDefaults(config)).validate();
        }

        // getting docblock config
        else if (type === Feature.DOC_BLOCK) {
            let config: IDocblockConfig;
            if (rcConfig) {
                config = {
                    ...new DocblockConfig(),
                    ...rcConfig.docblock || {}
                };
            } else {
                config = <IDocblockConfig>workspace.getConfiguration(EXTENSION).get('docblock');
            }

            return <T>new DocblockValidator(config).validate();
        }

        throw new ApexDoxError('Feature type not supported!');
    }

    /**
     * Source and Target Dir default settings are dynamic and determined at runtime. If user
     * omits these settings or provides invalid values, overwrite with default settings.
     * @param config The `IEngineConfig` instance fetched from the user's settings.json or .apexdoxrc file.
     */
    private static setEngineDirectoryDefaults(config: IEngineConfig): IEngineConfig {

        const defaultSource = [{ path: this.getDefaultDir(this.projectRoot) }];
        const defaultTarget = resolve(this.projectRoot, 'apex-documentation');

        if (
            !config.source ||
            (Array.isArray(config.source) && !config.source.length) ||
            (config.source.length === 1 && !config.source[0].path)
        ) {
            config.source = defaultSource;
        }

        if (!config.targetDirectory) {
            config.targetDirectory = defaultTarget;
        }

        return config;
    }

    /**
     * Get the default source directory based on the type of project.
     *
     * @param projectRoot The workspace's root folder.
     */
    private static getDefaultDir(projectRoot: string): string {
        return !this.isDX(projectRoot)
            ? resolve(projectRoot, 'src', 'classes')
            : resolve(projectRoot, 'force-app', 'main', 'default', 'classes');
    }

    /**
     * Determine with reasonable certainty whether this is a DX project or not.
     * This will help us determine what the default source directory should be.
     *
     * @param projectRoot The workspace's root folder.
     */
    private static isDX(projectRoot: string): boolean {
        if (
            existsSync(resolve(projectRoot, 'force-app')) &&
            !existsSync(resolve(projectRoot, 'src'))
        ) {
            return true;
        }

        return false;
    }
}

export default Settings;
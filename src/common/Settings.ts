import ApexDocError from './ApexDocError';
import DocblockValidator from './ValidatorDocblock';
import EngineValidator from './ValidatorEngine';
import LineReader from './LineReader';
import {
    ApexDocConfig,
    DocBlockConfig,
    IApexDocConfig,
    IApexDocRC,
    IDocBlockConfig
    } from './models/settings';
import { existsSync, readFileSync } from 'fs';
import { EXTENSION } from '../extension';
import { Option } from './Utils';
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
     * Note that casting user provided configs as ApexDoc configs
     * can potentially result in run-time errors. The onus is on
     * the user to ensure the correct shape of their config files,
     * however, the app should fail loudly and gracefully if the
     * user provides an invalid config.
     */
    private static getRcFile(): Option<IApexDocRC, void> {
        const rcJsonPath = resolve(this.projectRoot, '.apexdoc2rc');
        const rcYamlPath = resolve(this.projectRoot, 'apexdoc2.yaml');
        const rcYmlPath = resolve(this.projectRoot, 'apexdoc2.yml');
        let fileName = '';

        try {
            // apexdoc.yaml
            if (existsSync(rcYamlPath)) {
                fileName = 'apexdoc2.yaml';
                const rcConfig = yamlToJson(readFileSync(rcYamlPath, 'utf8'));
                return <IApexDocRC>rcConfig;
            }
            // apexdoc2.yml
            else if (existsSync(rcYmlPath)) {
                fileName = 'apexdoc2.yml';
                const rcConfig = yamlToJson(readFileSync(rcYmlPath, 'utf8'));
                return <IApexDocRC>rcConfig;
            }
            // .apexdoc2rc (json)
            else if (existsSync(rcJsonPath)) {
                fileName = '.apexdoc2rc';
                const rcString = new LineReader(rcJsonPath).toString();
                return <IApexDocRC>JSON.parse(rcString);
            }
        } catch (e) {
            throw new ApexDocError(ApexDocError.CONFIG_PARSE_ERROR(fileName));
        }
    }

    /**
     * Get user's ApexDoc2 config and set defaults where needed.
     * Order of preference for config files is listed below. If more than one
     * config file is present, this is the order that will be honored by ApexDoc2.
     *
     *  1. apexdoc2.yaml
     *  2. apexdoc2.yml
     *  3. .apexdoc2rc
     *  4. settings.json
     *
     * NOTE: since we're supporting .rc and yaml config files, we'll need to
     * maintain defaults in model/settings.ts as well as in package.json.
     */
    public static getConfig<T extends IApexDocConfig | IDocBlockConfig>(type: Feature): T {
        const rcConfig = this.getRcFile();

        // getting engine config
        if (type === Feature.ENGINE) {
            let config: IApexDocConfig;
            if (rcConfig) {
                config = {
                    ...new ApexDocConfig(),
                    ...rcConfig.engine || {}
                };
            } else {
                // if no .apexdoc2rc file found, get config from settings.json
                config = <IApexDocConfig>workspace.getConfiguration(EXTENSION).get('engine');
            }
            // pass result of either to directory defaulter and validate
            return <T>new EngineValidator(this.setEngineDirectoryDefaults(config)).validate();
        }

        // getting docBlock config
        else if (type === Feature.DOC_BLOCK) {
            let config: IDocBlockConfig;
            if (rcConfig) {
                config = {
                    ...new DocBlockConfig(),
                    ...rcConfig.docBlock || {}
                };
            } else {
                config = <IDocBlockConfig>workspace.getConfiguration(EXTENSION).get<IDocBlockConfig>('docBlock');
            }

            return <T>new DocblockValidator(config).validate();
        }

        throw new ApexDocError('Feature type not supported!');
    }

    /**
     * Source and Target Dir default settings are dynamic and determined at runtime. If user
     * omits these settings or provides invalid values, overwrite with default settings.
     * @param config The `IApexDocConfig` instance fetched from the user's settings.json or .apexdoc2rc file.
     */
    private static setEngineDirectoryDefaults(config: IApexDocConfig): IApexDocConfig {

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
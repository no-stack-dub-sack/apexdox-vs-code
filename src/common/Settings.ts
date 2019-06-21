import ApexDocError from './ApexDocError';
import Utils, { Option } from './Utils';
import Validator from './Validator';
import {
    ApexDocConfig,
    DocBlockConfig,
    IApexDocConfig,
    IApexDocRC,
    IDocBlockConfig
    } from './models/settings';
import { existsSync, readFileSync } from 'fs';
import { EXTENSION } from '../extension';
import { resolve } from 'path';
import { workspace, WorkspaceFolder } from 'vscode';

export enum Feature {
    ENGINE,
    DOC_BLOCK
}

class Settings {

    // this should be a safe cast. If running this tool, workspace folders should always exist.
    private static projectRoot = (<WorkspaceFolder[]>workspace.workspaceFolders)[0].uri.fsPath;

    private static getRcFile(): Option<IApexDocRC, void> {
        const rcPath = resolve(this.projectRoot, '.apexdoc2rc');

        if (existsSync(rcPath)) {
            try {
                return <IApexDocRC>JSON.parse(readFileSync(rcPath).toString());
            } catch (e) {
                throw new ApexDocError('Failed to parse .apexdoc2rc!');
            }
        }
    }

    /**
     * Fetch user's config settings and set defaults where needed.
     * First try to get rc file. If it exists, we'll use it's config over any
     * config found in settings.json. For rc files config, we need to establish
     * defaults since we're bypassing VS Code, we don't get that for free anymore.
     *
     * Also, rc files do not have any intellisense, so the onus is completely on
     * the user to provide accurate fields. Any superfluous config settings should
     * be safely and silently ignored, however. Invalid JSON will throw an error.
     *
     * NOTE: this will require maintaining defaults in models/settings.ts as well
     * as in package.json, which is sort of a bummer.
     */
    public static getConfig<T extends IApexDocConfig | IDocBlockConfig>(type: Feature): T {
        const rcConfig = this.getRcFile();

        // getting engine config
        if (type === Feature.ENGINE) {
            let config: IApexDocConfig;
            if (rcConfig) {
                if (rcConfig.engine) {
                    config = {
                        ...new ApexDocConfig(),
                        ...rcConfig.engine
                    };
                } else {
                    throw new ApexDocError(`You provided an .apexdoc2rc file, but no 'engine' config was found.`);
                }
            } else {
                // if no .apexdoc2rc file found, get config from settings.json
                config = <IApexDocConfig>workspace.getConfiguration(EXTENSION).get('engine');
            }
            // pass result of either to defaulter
            return <T>new Validator(this.setEngineDirectoryDefaults(config)).validate();
        }

        // getting docBlock config
        else if (type === Feature.DOC_BLOCK) {
            if (rcConfig) {
                if (rcConfig.docBlock) {
                    return <T>{
                        ...new DocBlockConfig(),
                        ...rcConfig.docBlock
                    };
                } else {
                    throw new ApexDocError(`You provided an .apexdoc2rc file, but no 'docBlock' config was found.`);
                }
            } else {
                return <T>workspace.getConfiguration(EXTENSION).get<IDocBlockConfig>('docBlock');
            }
        }

        throw new ApexDocError('Unrecognized Config Section!');
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
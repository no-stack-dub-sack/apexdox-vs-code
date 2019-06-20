import ApexDocError from './ApexDocError';
import Utils from './Utils';
import Validator from './Guards';
import { ApexDocConfig, IApexDocConfig, IDocBlockConfig } from './models/settings';
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

    /**
     * Fetch user's config settings and set defaults where needed.
     */
    public static getConfig<T extends IApexDocConfig | IDocBlockConfig>(type: Feature): T {

        if (type === Feature.ENGINE) {
            const rcPath = resolve(this.projectRoot, '.apexdoc2rc');
            let config: IApexDocConfig;

            // first look for .apexdoc2rc file
            if (existsSync(rcPath)) {
                try {
                    const defaults = new ApexDocConfig();
                    const rcConfig = <IApexDocConfig>JSON.parse(readFileSync(rcPath).toString());
                     // we may end up with superfluous fields here. with the RC file, the onus
                     // is completely on the user to ensure their config takes the right shape.
                    config = { ...defaults, ...rcConfig };
                } catch (e) {
                    throw new ApexDocError('Failed to parse .apexdoc2rc!');
                }
            } else {
                // if no .apexdoc2rc file found, get config from settings.json
                config = <IApexDocConfig>workspace.getConfiguration(EXTENSION).get('engine');
            }

            // pass result of either to defaulter
            return <T>this.setEngineDirectoryDefaults(config);
        }

        else if (type === Feature.DOC_BLOCK) {
            return <T>workspace.getConfiguration(EXTENSION).get<IDocBlockConfig>('docBlock');
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

    /**
     * Provide additional type checking and defaults where VSCode may not be able to
     * provide the defaults we need.
     *
     * @param config An instance of `IApexDocConfig`.
     */
    public static validateEngineConfig(config: IApexDocConfig): void {
        const validator = new Validator(config);
        validator.validate();
        // validator.scope(config.scope);
        // validator.title(config.title);
        // validator.source(config.source);
        // validator.assets(config.assets);
        // validator.pages(config.pages);
        // validator.sortOrder(config.sortOrder);
        // validator.stringArray(config.includes, 'includes');
        // validator.stringArray(config.excludes, 'excludes');
        // validator.boolGuard(config.cleanDir, 'cleanDir', false);
        // validator.boolGuard(config.showTOCSnippets, 'showTOCSnippets', true);
        // validator.targetDirectory(config.targetDirectory);
        // validator.homePagePath(config.homePagePath);
        // validator.typeGuard('string', config.subtitle, 'subtitle');
    }
}

export default Settings;
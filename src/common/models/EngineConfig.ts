import { IEngineConfig } from '../..';
import { REPOSITORY } from '../../extension';

class EngineConfig implements IEngineConfig {
    public source = [];
	public targetDirectory = '';
	public includes = [];
	public excludes = [];
	public homePagePath = '';
	public scope = [
        'global',
        'public',
        'protected',
        'private',
        'testMethod',
        'webService'
    ];
	public title = 'Apex Documentation';
	public subtitle = `Powered by <a target="_blank" rel="noopener noreferrer" href="${REPOSITORY}">ApexDox VS Code</a>'`;
	public showTOCSnippets = true;
	public sortOrder = 'alpha';
    public cleanDir = false;
    public assets = [];
    public pages = [];
    public port = 8080;
}

export default EngineConfig;

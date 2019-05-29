import { IApexDocConfig } from '../common/Settings';
import { resolve } from 'path';

const testConfig: IApexDocConfig = {
	source: [{
        path: resolve(__dirname, './apex/feature1'),
        sourceUrl: 'https://somefakeurl.com'
    },{
        path: resolve(__dirname, './apex/feature2'),
        sourceUrl: 'https://somefakeurl.com'
    }],
	targetDirectory: resolve(__dirname, './docs'),
	includes: [
        'IncludeTwo.cls',
        'IncludeOne.cls',
        'TEST_*'
    ],
	excludes: [
        '*Exclude.cls',
        '*Test.cls',
        'TEST_ExcuseMe.cls'
    ],
	homePagePath: '',
	bannerPagePath: '',
	scope: [
        'public',
        'private',
        'protected',
        'global'
    ],
	title: 'My Test Docs',
	showTOCSnippets: true,
	sortOrder: 'alpha',
    cleanDir: false, // we delete the directory & its contents in the test-setup command instead
    assets: [],
    pages: [],
    port: 8080
};

export default testConfig;
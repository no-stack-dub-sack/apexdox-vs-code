import * as assert from 'assert';
import ApexDoc from '../engine/ApexDoc';
import apexDoc2TestRunSettings from './testConfig';
import createEngineTests from './engine.test';
import createSnapshotTests from './snapshot.test';
import LineReader from '../common/LineReader';
import { except } from '../common/Utils';
import { readdirSync } from 'fs';
import { resolve as resolvePath } from 'path';

// 1) run `yarn test`
//    - compiles project using typescript compiler - not webpack
//    - runs test setup to copy neccessary assets (ApexDoc2 assets and test Apex files to document)
//      and to clean out any previous test files
//    - instantiates vscode's test runner and runs the contents of this file
//
// 2) Here, before executing any mocha tests, we're manually creating an ApexDoc2 config and
//    running the exposed `runApexDoc` method to simulate the extension's run command. We
//    use mocha's 'delay' option and global `run` function to ensure our async operations
//    complete before beginning any suite runs (which the built-in `suiteSetup` hook is not
//    sufficient for). This is all essential to be able to dynamically create tests for every
//    output HTML file for our snapshot tests and any other tests that might require this.
//
// 3) When ApexDoc2 finishes running, collect the output files to run assertions against and
//    resolve the promise with them. Our `createMochaTestSuite` function awaits this promise
//    and indicates to mocha it is OK to beginning running tests.

export interface ITestFile {
    reader: LineReader;
    name: string;
    snapshot: string;
}

const targetDir = resolvePath(__dirname, './docs');
const runSnapshotTests = true; // easily turn off snapshot tests if desired during dev

const runApexDoc = () => {
    return new Promise((resolve: (value: ITestFile[]) => void) => {
        ApexDoc.extensionRoot = resolvePath(__dirname, '../');
        ApexDoc.runApexDoc(apexDoc2TestRunSettings);

        const fileNames = readdirSync(targetDir);
        const files: ITestFile[] = except(fileNames, 'assets').map(fileName => {
            const reader = new LineReader(resolvePath(targetDir, fileName));
            return {
                reader,
                name: fileName,
                snapshot: <string>reader.toString(false, '\n')
            };
        });

        resolve(files);
    });
};

const createMochaTestSuite = async () => {
    const files = await runApexDoc();

    suite("ApexDoc2 Extension Tests", function () {

        suite('Documentation Engine Tests', function() {
            createEngineTests(files);
        });

        if (runSnapshotTests) {
            suite('Snapshot Tests', function() {
                createSnapshotTests(files);
            });
        }
    });

    run();
};

createMochaTestSuite();

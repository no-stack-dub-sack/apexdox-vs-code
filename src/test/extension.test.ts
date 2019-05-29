import * as assert from 'assert';
import ApexDoc from '../engine/ApexDoc';
import createSnapshotTests from './snapshot.test';
import testConfig from './testConfig';
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

const targetDir = resolvePath(__dirname, './docs');

const runApexDoc = () => {
    return new Promise((resolve: (value: string[]) => void) => {
        ApexDoc.extensionRoot = resolvePath(__dirname, '../');
        ApexDoc.runApexDoc(testConfig);
        resolve(readdirSync(targetDir));
    });
};

const createMochaTestSuite = async () => {
    const files = await runApexDoc();

    suite("ApexDoc2 Extension Tests", function () {

        suite('Documentation Engine Tests', function() {

            test("ApexDoc2 created docs", function() {
                assert.notEqual(files.length, 0);
            });

            test("ApexDoc2 included only files included by 'includes' setting", function() {
                files.forEach(fileOrDirName => {
                    if (fileOrDirName !== 'assets' && fileOrDirName !== 'index.html') {
                        assert.ok(
                            fileOrDirName === 'IncludeOne.html' ||
                            fileOrDirName === 'IncludeTwo.html' ||
                            fileOrDirName.startsWith('TEST_'),
                            `Unexpected files in target directory: ${fileOrDirName}`
                        );
                    }
                });
            });

            test("ApexDoc2 excluded files excluded by 'excludes' setting", function() {
                files.forEach(fileOrDirName => {
                    if (fileOrDirName !== 'assets' && fileOrDirName !== 'index.html') {
                        assert.ok(
                            !fileOrDirName.endsWith('Exclude.html') &&
                            !fileOrDirName.endsWith('Test.html') &&
                            fileOrDirName !== 'TEST_ExcuseMe.html',
                            `Unexpected files in target directory: ${fileOrDirName}`
                        );
                    }
                });
            });
        });

        // SEE: ./snapshot.test.ts
        suite('Snapshot Tests', function() {
            createSnapshotTests(files);
        });
    });

    run();
};

createMochaTestSuite();

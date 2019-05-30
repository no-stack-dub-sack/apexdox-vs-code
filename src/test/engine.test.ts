import assert = require('assert');

const createEngineTests = (files: string[]) => {
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
};

export default createEngineTests;
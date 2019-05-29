import * as assert from 'assert';
import LineReader from '../common/LineReader';
import { basename, resolve as resolvePath } from 'path';

const targetDir = resolvePath(__dirname, './docs');

/* ------------------------------------ SNAPSHOT TESTS ------------------------------------ */
/* ---------------------------------------------------------------------------------------- */
// Create a snapshot test for each file: these tests compare the output documentation with a
// reference string that we have on file. These reference files represent the expected output,
//  and if a test fails, the diff needs to be assessed. Two possible outcomes are that code
// needs to be corrected, or that a change made to code alters the expected output of the
// documentation engine, in which case, the  snapsots need to be updated. Snapshots can be
// updated from the resulting test docs. See: ../../scripts/updateSnapshots.js.

const createSnapshotTests = (files: string[]) => {
    files.forEach(fileOrDirName => {
        if (fileOrDirName !== 'assets') {
            test(`${fileOrDirName} contents matches reference snapshot`, function() {
                let fileReference = require('./snapshots/' + basename(fileOrDirName, '.html'));
                let fileSnapshot = new LineReader(resolvePath(targetDir, fileOrDirName)).toString(false, '\n');
                assert.equal(fileSnapshot, fileReference.default, `Snapshot does not match reference: ${fileOrDirName}`);
            });
        }
    });
};

export default createSnapshotTests;
import * as assert from 'assert';
import LineReader from '../common/LineReader';
import { basename, resolve } from 'path';
import { isolateDiffs, isWhiteSpaceOnlyDiff } from './utils';
import { ITestFile } from './extension.test';

const targetDir = resolve(__dirname, './docs');

/**
 * Create a snapshot test for each file: these tests compare the output documentation with a
 * reference string that we have on file. These reference files represent the expected output,
 *  and if a test fails, the diff needs to be assessed. Two possible outcomes are that code
 * needs to be corrected, or that a change made to code alters the expected output of the
 * documentation engine, in which case, the  snapsots need to be updated. Snapshots can be
 * updated from the resulting test docs. See: ../../scripts/updateSnapshots.js.
 */
const createSnapshotTests = (files: ITestFile[]) => {
    files.forEach(file => {
        test(`${file.name} contents should match reference snapshot`, function() {
            let fileReference: string;

            try {
                fileReference = require('./snapshots/' + basename(file.name, '.html')).default;
            } catch (e) {
                assert.notEqual('', '', `No snapshot found for ${file.name}, please update reference directory if a new test file was added.`);
                return;
            }

            if (fileReference !== file.snapshot) {
                if (isWhiteSpaceOnlyDiff(fileReference, file.snapshot)) {
                    assert.notEqual('', '', `Snapshot differs in whitespace only (diff not shown)`);
                }

                // we have more than just a whitespace diff, which we'd like to show in the terminal.
                // remove trailing and leading identical lines, however, to help consolidate diffs
                const { finalReference, finalSnapshot } = isolateDiffs(fileReference.split('\n'), file.reader.toArray());
                assert.equal(finalSnapshot, finalReference, `Snapshot does not match reference`);
            }
        });
    });
};

export default createSnapshotTests;
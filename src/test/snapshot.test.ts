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
    suite('Snapshot Tests', function() {

        files.forEach(fileOrDirName => {
            if (fileOrDirName !== 'assets') {
                test(`${fileOrDirName} contents should match reference snapshot`, function() {
                    let { default: fileReference } = require('./snapshots/' + basename(fileOrDirName, '.html'));
                    const reader = new LineReader(resolvePath(targetDir, fileOrDirName));
                    let fileSnapshot = <string>(reader).toString(false, '\n');

                    if (fileSnapshot !== fileReference) {
                        const referenceWhiteSpace = fileReference.replace(/[^\s]/g, '');
                        const snapshotWhiteSpace = fileSnapshot.replace(/[^\s]/g, '');
                        const referenceMinified = fileReference.replace(/\s/g, '');
                        const snapshotMinified = fileSnapshot.replace(/\s/g, '');

                        if (referenceMinified === snapshotMinified && snapshotWhiteSpace !== referenceWhiteSpace) {
                            // we know the white space does not match, while everything else does. Avoid
                            // showing a very lengthy diff that does not tell you anything in the terminail.
                            // Instead, use another diffing tool like Meld to understand what's changed.
                            assert.equal('', ' ', `Snapshot differs in whitespace only (diff not shown)`);
                        }

                        // remove trailing and leading chars which are identical to help isolate diffs in terminal
                        const { finalReference, finalSnapshot } = isolateDiffs(fileReference.split('\n'), reader.toArray());

                        assert.equal(finalSnapshot, finalReference, `Snapshot does not match reference`);
                    }
                });
            }
        });
    });
};

const isolateDiffs = (fileReference: string[], fileSnapshot: string[]): {
    finalReference: string,
    finalSnapshot: string
} => {
    let start = 0;
    let end = 0;

    while (fileReference[start] === fileSnapshot[start]) {
        start++;
    }

    for (let i = fileReference.length - 1; i > 0; i--) {
        if (fileReference[i] === fileSnapshot[i]) {
            end--;
        } else {
            break;
        }
    }

    return {
        finalReference: fileReference.slice(start, end).join('\n'),
        finalSnapshot: fileSnapshot.slice(start, end).join('\n')
    };
};

export default createSnapshotTests;
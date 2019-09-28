const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { basename, resolve } = require('path');

/** ==================================================================
 *  Should run only when absolutely sure snapshots need to be updated.
 *  ==================================================================
 */

const sourceDir = resolve(__dirname, '../src/test/test-proj/docs');
const targetDir = resolve(__dirname, '../src/test/snapshots');
const sourceFiles = readdirSync(sourceDir);
const exclude = ['assets', 'Page.html']; // exclude dirs / files snapshots are not needed for

for (let fileOrDirName of sourceFiles) {
    if (!exclude.includes(fileOrDirName)) {
        const htmlString = readFileSync(resolve(sourceDir, fileOrDirName)).toString('utf8');
        const contents = `export default \`${htmlString}\`;`;
        const qualifiedTargetFileName = resolve(targetDir, basename(fileOrDirName, '.html') + '.ts');
        writeFileSync(qualifiedTargetFileName, contents);
    }
}

console.info('Snapshot reference update complete.');
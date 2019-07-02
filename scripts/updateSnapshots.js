const { readdirSync, readFileSync, writeFileSync } = require('fs');
const { basename, resolve } = require('path');

// Requires having run `yarn test` first, since out/ dir must exist to import LineReader from.
// Should run only when absolutely sure snapshots need to be updated.

const sourceDir = resolve(__dirname, '../src/test/test-proj/docs');
const targetDir = resolve(__dirname, '../src/test/snapshots');
const sourceFiles = readdirSync(sourceDir);

sourceFiles.forEach(fileOrDirName => {
    // exclude assets directory and Page.html which a snapshot reference is not needed for
    if (fileOrDirName !== 'assets' && fileOrDirName !== 'Page.html') {
        const htmlString = readFileSync(resolve(sourceDir, fileOrDirName)).toString('utf8');
        const contents = `export default \`${htmlString}\`;`;
        const qualifiedTargetFileName = resolve(targetDir, basename(fileOrDirName, '.html') + '.ts');
        writeFileSync(qualifiedTargetFileName, contents);
    }
});

console.log('Snapshot reference update complete.');
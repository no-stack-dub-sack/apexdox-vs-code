const LineReader = require('../out/common/LineReader.js');
const { readdirSync, writeFileSync } = require('fs');
const { basename, resolve } = require('path');

// Requires having run `yarn test` first.
// Should run only when absolutesly sure snapshots need to be updated.

const sourceDir = resolve(__dirname, '../out/test/docs');
const targetDir = resolve(__dirname, '../src/test/snapshots');
const sourceFiles = readdirSync(sourceDir);

sourceFiles.forEach(fileOrDirName => {
    if (fileOrDirName !== 'assets') {
        const htmlString = new LineReader.default(resolve(sourceDir, fileOrDirName)).toString(false, '\n');
        const contents = `export default \`${htmlString}\`;`;
        const qualifiedTargetFileName = resolve(targetDir, basename(fileOrDirName, '.html') + '.ts');
        writeFileSync(qualifiedTargetFileName, contents);
    }
});

console.log('Snapshot update complete.');
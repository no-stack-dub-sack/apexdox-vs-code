const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

/**
 * js-yaml package command line tool seems to be including some output information
 * in the destination file, not just the JSON we're looking for. Use this small script
 * to strip that information from the output file. Works on Windows. Strips away anything
 * before the opening curly brace, and leaves everything else intact as is.
 */
(function convertYamlToGrammar() {
    const source = path.resolve(__dirname, 'apex.tmLanguage.injection.yml');
    const target = path.resolve(__dirname, 'apex.tmLanguage.injection.json');
    execSync(`yarn run js-yaml ${source} > ${target}`);

    let json = fs.readFileSync(target).toString('utf8');
    const openCurly = json.indexOf('{');
    json = json.slice(openCurly);

    fs.writeFileSync(target, json);
})();
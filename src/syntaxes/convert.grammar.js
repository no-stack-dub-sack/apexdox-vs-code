const { execSync } = require('child_process');
const { readFileSync, writeFileSync } = require('fs');
const { resolve } = require('path');

// js-yaml package command line tool seems to be including some unwanted artifacts
// in the destination file. Use this small script to strip that information from
// the output. Works on Windows. Strips away anything before the opening curly brace.
(function convertYamlToGrammar() {
    const SOURCE = resolve(__dirname, 'apex.tmLanguage.injection.yml');
    const TARGET = resolve(__dirname, 'apex.tmLanguage.injection.json');
    execSync(`yarn run js-yaml ${SOURCE} > ${TARGET}`);
    let json = readFileSync(TARGET).toString('utf8');
    json = json.slice(json.indexOf('{'));
    writeFileSync(TARGET, json);
})();
import * as suites from './suites';
import LineReader from '../common/LineReader';
import { commands } from 'vscode';
import { createSnapshotSuite } from './suites/snapshot.suite';
import { except } from '../common/ArrayUtils';
import { ITestFile } from '..';
import { readdirSync } from 'fs';
import { resolve as resolvePath } from 'path';

export const targetDir = resolvePath(__dirname, '../../src/test/test-proj/docs');

const testSuites: { [index: string]: (files: ITestFile[]) => void } = suites;

// turn off engine or snapshot tests during test dev
const runSnapshotTests = true;
const runEngineTests = true;

const runApexDox = () => {
  return new Promise((resolve) => {
    resolve(commands.executeCommand('apexdox.run'));
  }).then(() => {
    const fileNames = readdirSync(targetDir);
    const files: ITestFile[] = except(fileNames, ['assets', 'Page.html']).map((fileName) => {
      const reader = new LineReader(resolvePath(targetDir, fileName));
      return {
        reader,
        name: fileName,
        snapshot: reader.toString(false, '\n'),
      };
    });

    return files;
  });
};

const runTests = async () => {
  const files = await runApexDox();

  suite('ApexDox Extension Tests', function () {
    if (runEngineTests) {
      suite('Documentation Engine Tests', function () {
        const suiteNames = Object.keys(testSuites);
        suiteNames.forEach((suiteName) => {
          if (suiteName !== 'createSnapshotSuite') {
            const createSuite = testSuites[suiteName];
            createSuite(files);
          }
        });
      });
    }

    if (runSnapshotTests) {
      createSnapshotSuite(files);
    }
  });

  run();
};

runTests();

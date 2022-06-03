import * as assert from 'assert';
import { existsSync } from 'fs';
import { targetDir } from '../extension.test';
import { resolve } from 'path';
import { ITestFile } from '../..';

export const createFilesAndAssetsSuite = (files: ITestFile[]) => {
  suite('Files and Assets', function () {
    test('Should create docs', function () {
      assert.notEqual(files.length, 0);
    });

    test('Should only include files included by "includes" setting', function () {
      files.forEach((file) => {
        if (file.name !== 'index.html') {
          assert.ok(
            file.name === 'IncludeOne.html' || file.name === 'IncludeTwo.html' || file.name.startsWith('TEST_'),
            `Unexpected files in target directory: ${file.name}`
          );
        }
      });
    });

    test('Should exclude files excluded by "excludes" setting', function () {
      files.forEach((file) => {
        if (file.name !== 'index.html') {
          assert.ok(
            !file.name.endsWith('Exclude.html') && !file.name.endsWith('Test.html') && file.name !== 'TEST_ExcludeMe.html',
            `Unexpected files in target directory: ${file.name}`
          );
        }
      });
    });

    test('Should only be HTML files in target directory', function () {
      files.forEach((file) => {
        assert.ok(file.name.endsWith('.html'), `Unexpected file extension found in target directory: ${file.name}`);
      });
    });

    test('Should copy user assets defined by "apexdox.engine.assets" setting', function () {
      assert.equal(existsSync(resolve(targetDir, 'assets', 'info.md')), true, '"info.md" file not found in assets directory.');
    });

    test('Should copy user "Pages" defined by "apexdox.engine.pages" setting', function () {
      assert.equal(existsSync(resolve(targetDir, 'Page.html')), true, '"Page.html" file not found in root directory.');
    });
  });
};

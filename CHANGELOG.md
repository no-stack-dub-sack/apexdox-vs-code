# Change Log

All notable changes to the "apexdox-vs-code" extension will be documented in this file.

## 1.0.0 (10/23/2019)

- Initial release

## 1.0.1 (10/23/2019)

- package.json change only. Updated `galeryBanner.theme` to "light" for better contrast in VS Code Marketplace.

## 1.0.2 (10/23/2019)

- README change only. Removed logo from README.md to avoid redundant presentation in VS Code Marketplace.

## 1.0.3 (12/28/2019)

- Fixes bug reported in #12 thanks to [@dmitry-prohorov](https://github.com/dmitry-prohorov).
- Updates the way unknown configuration settings are handled by the extension.

## 1.4.0 (01/03/2020)

- Deprecates `@returns` in favor of the more standard `@return` tag. Thanks to [@berardo](https://github.com/berardo) for the PR.
- Dependabot security vulnerability updates.
- **NOTE** that versions 1.1.x, 1.2.x, and 1.3.x were skipped. Please see the 1.4.0 release for a note on this.

## 1.4.1 (04/03/2022)

- Fixes [h2/h2 tag mismatch issue](https://github.com/no-stack-dub-sack/apexdox-vs-code/pull/45/files).
- Fixes issue where whitespace / newlines in code examples found in user-provided homepages and other supplementary HTML pages was not being correctly preserved.
- Thanks to [@dschach](https://github.com/dschach) for identifying these issues and opening a PR to fix them.
- Dependabot security vulnerability updates.

## 1.4.2 (09/23/2022)

- Added support for `<b></b>`, `<li></li>` and `<ul></ul>` tags in comment blocks
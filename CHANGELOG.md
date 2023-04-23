# Change Log

**NOTE:** This changelog is no longer maintained. Please refer to the [releases](https://github.com/no-stack-dub-sack/apexdox-vs-code/releases) page for a complete changelog for every release.

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

## 1.5.1 (11/07/2022)

- Adds improved support for `@since` and `@author` tags. Thanks to [@docbill](https://github.com/docbill) for his work on [this feature](https://github.com/no-stack-dub-sack/apexdox-vs-code/pull/55).

## 1.6.0 (04/02/2023)

- Updates HighlightJS to v11 and improves support for Apex highlighting and other languages. Thanks to [@dschach](https://github.com/dschach) for his work on PR #48 for this update.
- Improves support for HTML tags in documentation comments (adds support for b, strong, i, em, s, u, ol, ul, and li tags). Thanks to [@cemerson](https://github.com/cemerson) for his work on this feature in PR #58.
- Improves .cls file discoverability by recursively scanning source directories, reducing the number of explicit directories users have to define in their configs for projects with nested folder structures. Thanks to [@codefriar](https://github.com/codefriar) for his work on this feature in PR #68.
- Interesting theme of PR numbers that made it into this release!

## 2.0.0 (04/23/2023)
- As of this release this changelog is no longer maintained! Please refer to the [releases](https://github.com/no-stack-dub-sack/apexdox-vs-code/releases) page for a complete changelog for every release.
import * as templates from '../../common/templates';
import escape from 'lodash.escape';
import { Option } from '../../common/Utils';

class GeneratorUtils {

    public static mapHTML<T>(arr: T[], mapClb: (val: T) => string): string {
        return arr.map(mapClb).join('');
    }

    public static escapeHTML(str: string, wrapBackticks: boolean = false): string {
        let result = wrapBackticks ? this.wrapWithCode(escape(str)) : escape(str);
        // unescape <br> tags, we want to keep these
        result = result.replace(/&lt;br\s?\/?&gt;/g, '<br>');

        return result;
    }

    private static wrapWithCode(html: string): string {
        const codeWords: Option<RegExpMatchArray, null> = html.match(/(`|&#96;).+?(`|&#96;)/g);
        if (codeWords) {
            codeWords.forEach(word => {
                let codeWord = word.replace(/&#96;|`/, `<code class="inlineCode">`);
                codeWord = codeWord.replace(/&#96;|`/, '</code>');
                html = html.replace(word, codeWord);
            });
        }
        return html;
    }

    public static wrapWithDetail(contents: string, header: string, className: string): string {
        return `
            <details class="${className}" open>
                <summary>${header}</summary>
                ${contents}
            </details>`;
    }

    public static makeHeader(bannerPage: Option<string, void>, documentTitle: string): string {
        let header: string;

        if (bannerPage) {
            header = this.headerOpen(documentTitle) + bannerPage;
        } else {
            header = this.headerOpen(documentTitle) + templates.PROJECT_DETAIL + templates.HEADER_CLOSE;
        }

        return header;
    }

    private static headerOpen(documentTitle: string): string {
        return  `<!DOCTYPE html>
            <html lang="en">
            <head>
                <title>${documentTitle}</title>
                <meta charset="UTF-8">
                <script type="text/javascript" src="./assets/index.js"></script>
                <script charset="UTF-8" src="./assets/highlight.js"></script>
                <link rel="stylesheet" href="./assets/highlight.css" />
                <link rel="stylesheet" type="text/css" href="./assets/index.css" />
                <link rel="shortcut icon" type="image/png" href="./assets/favicon.png"/>
            </head>
            <body>`;
    }
}

export default GeneratorUtils;
import ApexDox from '../ApexDox';
import escape from 'lodash.escape';
import { Option } from '../..';
import { REPOSITORY } from '../../extension';
import { TopLevelModel } from '../../common/models';
import SeeLinkGenerator from './SeeLinkGenerator';

class GeneratorUtils {

    public static mapHTML<T>(arr: T[], mapClb: (val: T) => string): string {
        return arr.map(mapClb).join('');
    }

    public static encodeText(str: string, convertBackticksToCode = false, models?: Map<string, TopLevelModel>): string {
        let result = str;

        if (convertBackticksToCode) {
            result = this.wrapWithCode(escape(result));
        } else {
            result = escape(result);
        }

        if (models) {
            result = this.resolveInlineLinks(result, models);
        }

        // unescape <br> tags, we want to keep these
        result = result.replace(/&lt;br\s?\/?&gt;/g, '<br>');        
        
        // unescape <b> and </b> tags, we want to keep these (ce 20220923)
        result = result.replace(/&lt;b&gt;/g, '<b>');        
        result = result.replace(/&lt;\/b&gt;/g, '</b>');        

        // unescape <li> and </li> tags, we want to keep these (ce 20220923)
        result = result.replace(/&lt;li&gt;/g, '<li>');        
        result = result.replace(/&lt;\/li&gt;/g, '</li>');                

        // unescape <ul> and </ul> tags, we want to keep these (ce 20220923)
        result = result.replace(/&lt;ul&gt;/g, '<ul>');        
        result = result.replace(/&lt;\/ul&gt;/g, '</ul>');   
        
        return result;
    }

    public static resolveInlineLinks(str: string, models: Map<string, TopLevelModel>): any {
        const linkMatches = str.match(/\{@link.*?\}/g);
        if (linkMatches) {
            const linkContents = linkMatches.map(match => match.slice(6, -1).trim());
            const resolvedLinks = SeeLinkGenerator.makeLinks(models, linkContents);
            linkMatches.forEach((match, i) => (str = str.replace(match, resolvedLinks[i])));
            return str;
        } else {
            return str;
        }
    }

    private static wrapWithCode(html: string): string {
        const codeWords: Option<RegExpMatchArray, null> = html.match(/(`|&#96;).+?(`|&#96;)/g);
        if (codeWords) {
            codeWords.forEach(word => {
                let codeWord = word.replace(/&#96;|`/, `<code class="code-inline">`);
                codeWord = codeWord.replace(/&#96;|`/, '</code>');
                html = html.replace(word, codeWord);
            });
        }
        return html;
    }

    public static makeHead(documentTitle: string): string {
        return  `
            <head>
                <title>${documentTitle}</title>
                <meta charset="UTF-8">
                <script type="module" src="./assets/index.js"></script>
                <script type="module" src="./assets/search-idx.js"></script>
                <script type="module" src="./assets/search.js"></script>
                <script charset="UTF-8" src="./assets/highlight.js"></script>
                <script charset="UTF-8" src="./assets/mark.js"></script>
                <script charset="UTF-8" src="./assets/lunr.js"></script>
                <link rel="stylesheet" href="./assets/highlight.css" />
                <link rel="stylesheet" type="text/css" href="./assets/index.css" />
                <link rel="shortcut icon" type="image/png" href="./assets/favicon.png"/>
            </head>`
        ;
    }

    public static makeProjectSplash(): string {
        return `
            <div id="logo-container">
                <div class="title">
                    ${ApexDox.config.title}
                </div>
                <img src="assets/logo.png" />
                <div class="subtitle">
                    ${ApexDox.config.subtitle}
                </div>
            </div>`
        ;
    }

    public static get footer(): string {
        return `
            <div>
                <a href="${REPOSITORY}" target="_blank" rel="noopener noreferrer">
                    Powered By ApexDox VS Code
                </a>
            </div>`
        ;
    }

    public static get defaultHomePage(): string {
        return `
            <h2>
                Project Home
            </h2>
            <p>
                Use the <code class="code-inline">apexdox.homePagePath</code> setting
                to point to an HTML file that contains details about your project.
                The body of the HTML will show up here instead of this default!
            </p>`
        ;
    }
}

export default GeneratorUtils;

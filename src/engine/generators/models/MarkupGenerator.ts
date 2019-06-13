import GeneratorUtils from '../GeneratorUtils';
import Utils from '../../../common/Utils';
import { ApexModel } from '../../../common/models';
import { last } from '../../../common/ArrayUtils';

abstract class MarkupGenerator<T extends ApexModel> {
    protected model: T;

    protected constructor(model: T) {
        this.model = model;
    }

    protected annotations(className: string): string {
        if (!this.model.annotations.length) {
            return '';
        }

        return `<div class="${className}">${this.model.annotations.join(' ')}</div>`;
    }

    protected description(className = '', tag = 'div', override = false): string {
        if (!this.model.description && !override) {
            return '';
        }

        return `<${tag} class="${className}">${GeneratorUtils.escapeHTML(this.model.description, true)}</${tag}>`;
    }

    protected signatureLine(nameLine: string, memberClassName: string, highlightJSify = false): string {
        let signature = highlightJSify ? this.highlightSignature(nameLine) : nameLine;
        let sourceUrl = this.model.sourceUrl;
        if (sourceUrl) {
            // if user leaves off trailing slash, save the day!
            if (!sourceUrl.endsWith('/')) {
                sourceUrl += '/';
            }
            let href = sourceUrl + memberClassName + '.cls#L' + this.model.lineNum;
            return `
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="${href}">
                    ${signature}
                </a>`;
        } else {
            return `<span>${signature}</span>`;
        }
    }

    /**
    * Help highlight.js along, since props and enum signatures are not
    * recognized by highlight.js since they are not full declarations.
    */
    protected highlightSignature(nameLine: string): string {
        if (nameLine.includes('(')) {
            const name = Utils.previousWord(nameLine, nameLine.indexOf('('));
            return nameLine.replace(name, `<span class="hljs-title">${name}</span>`);
        } else {
            const words = GeneratorUtils.escapeHTML(nameLine, false).split(' ');
            words[words.length - 1] = `<span class="hljs-title">${last(words)}<span>`;
            return words.join(' ');
        }
    }
}

export default MarkupGenerator;
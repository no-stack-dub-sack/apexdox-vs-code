import DocGen from '../DocGen';
import Utils, { last } from '../../utils/Utils';
import { ApexModel } from '../../models';

abstract class MarkupGenerator {
    protected model: ApexModel;

    protected constructor(model: ApexModel) {
        this.model = model;
    }

    public getAnnotations(className: string): string {
        return `<div class="${className}">${this.model.annotations.join(' ')}</div>`;
    }

    public getDescription(className = ''): string {
        return `<div class="${className}">${DocGen.escapeHTML(this.model.description, true)}</div>`;
    }

    // TODO: can we rename this maybe? How about getSignature?
    public maybeMakeSourceLink(className: string, title: string): string {
        let sourceUrl = this.model.getSourceUrl();
        if (sourceUrl) {
            // if user leaves off trailing slash, save the day!
            if (!sourceUrl.endsWith('/')) {
                sourceUrl += '/';
            }
            let href = sourceUrl + className + '.cls#L' + this.model.getLineNum();
            return `<a target="_blank" title="Go to source" class="hostedSourceLink" href="${href}">${title}</a>`;
        } else {
            return `<span>${title}</span>`;
        }
    }

    /**
    * Help highlight.js along, since props and enum signatures are not
    * recognized by highlight.js since they are not full declarations.
    */
    public highlightNameLine(nameLine: string): string {
        if (nameLine.includes('(')) {
            const name = Utils.previousWord(nameLine, nameLine.indexOf('('));
            return nameLine.replace(name, `<span class="hljs-title">${name}</span>`);
        } else {
            const words = DocGen.escapeHTML(nameLine, false).split(' ');
            words[words.length - 1] = `<span class="hljs-title">${last(words)}<span>`;
            return words.join(' ');
        }
    }
}

export { MarkupGenerator };
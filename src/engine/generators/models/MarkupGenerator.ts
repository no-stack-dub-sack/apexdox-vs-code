import GeneratorUtils from '../GeneratorUtils';
import Utils from '../../../common/Utils';
import { ApexModel, TopLevelModel } from '../../../common/models';
import { last } from '../../../common/ArrayUtils';
import SeeLinkGenerator from '../SeeLinkGenerator';

/**
 * This class is the base markup generation class and is not instantiated directly. It
 * includes markup generation methods that are common to all ApexModels, and some that
 * are common only to TopLevelModel and MethodModel, so be careful when calling these
 * methods that they correctly correspond to the model you are generating markup for.
 */
abstract class MarkupGenerator<T extends ApexModel> {
    protected constructor(protected model: T, protected models: Map<string, TopLevelModel>) {
        this.model = model;
        this.models = models;
    }

    protected markupTemplate(label: string, contents: string, titleClass = '', contentClass = '', tag = 'div') {
        return `
            <div class="${titleClass}">
                ${label}
            </div>
            <${tag} class="${contentClass}">
                ${contents}
            </${tag}>`;
    }

    protected annotations(className: string): string {
        if (!this.model.annotations.length) {
            return '';
        }

        return `<div class="${className}">${this.model.annotations.join(' ')}</div>`;
    }

    protected deprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', GeneratorUtils.encodeText(this.model.deprecated, true, this.models), 'deprecated');
        }
    }

    protected description(className = '', tag = 'div', override = false): string {
        if (!this.model.description && !override) {
            return '';
        }

        return `
            <${tag} class="${className}">
                ${GeneratorUtils.encodeText(this.model.description, true, this.models)}
            </${tag}>`;
    }

    protected example(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        if (!this.model.example) {
            return '';
        } else {
            return this.markupTemplate(
                'Example',
                `<code>${GeneratorUtils.encodeText(this.model.example)}</code>`,
                '',
                'code-example',
                'pre'
            );
        }
    }

    protected see(): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', SeeLinkGenerator.makeLinks(this.models, this.model.see).join(', '));
        }
    }

    protected signature(signatureType: 'method' | 'class'): string {
        return `
            <div class="${signatureType}-subtitle">
                Signature
            </div>
            ${this.annotations(`${signatureType}-annotations`)}
            <div class="${signatureType}-signature">
                ${GeneratorUtils.encodeText(this.model.nameLine)}
            </div>`;
    }

    protected linkToSource(nameOrSignature: string, topmostTypeName: string, highlightJSify = false): string {
        nameOrSignature = highlightJSify ? this.highlightSignature(nameOrSignature) : nameOrSignature;
        let sourceUrl = this.model.sourceUrl;
        if (sourceUrl) {
            // if user leaves off trailing slash, save the day!
            if (!sourceUrl.endsWith('/')) {
                sourceUrl += '/';
            }
            let href = sourceUrl + topmostTypeName + '.cls#L' + this.model.lineNum;
            return `
                <a target="_blank" rel="noopener noreferrer" title="Go to source" class="source-link" href="${href}">
                    ${nameOrSignature}
                </a>`;
        } else {
            return `<span>${nameOrSignature}</span>`;
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
            const words = GeneratorUtils.encodeText(nameLine, false).split(' ');
            words[words.length - 1] = `<span class="hljs-title">${last(words)}<span>`;
            return words.join(' ');
        }
    }
}

export default MarkupGenerator;

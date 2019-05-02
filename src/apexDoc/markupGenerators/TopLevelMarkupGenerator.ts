import DocGen from '../DocGen';
import { MarkupGenerator } from './MarkupGenerator';
import { TopLevelModel } from '../../models';

class TopLevelMarkupGenerator extends MarkupGenerator {
    public constructor(model: TopLevelModel) {
        super(model);
    }

    // TODO: this is possible redundant. Might be able to put this on MarkupGenerator abstract class and modify for both TopLevel and Method
    private markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'classSubDescription', tag = 'div') {
        return `<div class="classSubtitle ${titleClass}">${label}</div>
                <${tag} class="${contentClass}">${contents}</${tag}>`;
    }

    public getAuthor() {
        if (!this.model.author) {
            return '';
        }

        return `<br/>${DocGen.escapeHTML(this.model.author)}`;
    }

    public getExample(): string {
        // return example and remove trailing white space which
        // may have built up due to the allowance of preserving
        // white pace in complex code example blocks for methods
        if (!this.model.example) {
            return '';
        } else {
            return this.markupTemplate(
                'Example',
                `<code>${DocGen.escapeHTML(this.model.example.trimRight())}</code>`,
                '',
                'codeExample',
                'pre'
            );
        }
    }

    public getSince() {
        if (!this.model.since) {
            return '';
        }

        return `<br/>${DocGen.escapeHTML(this.model.since)}`;
    }

    public getDeprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', DocGen.escapeHTML(this.model.deprecated, true), 'deprecated');
        }
    }

    public getSee(models: Map<string, TopLevelModel>): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', DocGen.makeSeeLinks(models, this.model.see));
        }
    }

    public maybeMakeSourceLink(className: string, title: string): string {
        return `<div class="classSignature">${super.maybeMakeSourceLink(className, title)}</div>`;
    }
}

export { TopLevelMarkupGenerator };
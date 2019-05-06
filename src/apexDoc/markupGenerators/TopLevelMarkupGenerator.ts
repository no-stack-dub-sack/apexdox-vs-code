import DocGen from '../DocGen';
import { MarkupGenerator } from './MarkupGenerator';
import { TopLevelModel } from '../../models';

class TopLevelMarkupGenerator extends MarkupGenerator<TopLevelModel> {
    public constructor(model: TopLevelModel) {
        super(model);
    }

    // TODO: this is possibly redundant. Might be able to put this on MarkupGenerator abstract class and modify for both TopLevel and Method
    private markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'classSubDescription', tag = 'div') {
        return `<div class="classSubtitle ${titleClass}">${label}</div>
                <${tag} class="${contentClass}">${contents}</${tag}>`;
    }

    public author() {
        if (!this.model.author) {
            return '';
        }

        return `<br/>${DocGen.escapeHTML(this.model.author)}`;
    }

    public example(): string {
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

    public since() {
        if (!this.model.since) {
            return '';
        }

        return `<br/>${DocGen.escapeHTML(this.model.since)}`;
    }

    public deprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', DocGen.escapeHTML(this.model.deprecated, true), 'deprecated');
        }
    }

    public see(models: Map<string, TopLevelModel>): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', DocGen.makeSeeLinks(models, this.model.see));
        }
    }

    public signatureLine(memberClassName: string): string {
        return `<div class="classSignature">${super.signatureLine(memberClassName)}</div>`;
    }
}

export { TopLevelMarkupGenerator };
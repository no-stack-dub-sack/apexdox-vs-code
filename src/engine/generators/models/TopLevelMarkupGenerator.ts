import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import SeeLinkGenerator from '../SeeLinkGenerator';
import { TopLevelModel } from '../../../common/models';

class TopLevelMarkupGenerator extends MarkupGenerator<TopLevelModel> {
    protected constructor(model: TopLevelModel) {
        super(model);
    }

    public static generate(model: TopLevelModel, modelMap: Map<string, TopLevelModel>, additionalContent = ''): string {
        const generator = new TopLevelMarkupGenerator(model);

        let markup = '';

        // add any additional content passed in from the caller. currently, only
        // use case is the values table used when documenting class-level enums
        markup += generator.description('class-description');
        markup += generator.signature();
        markup += additionalContent;
        markup += generator.deprecated();
        markup += generator.see(modelMap);
        markup += generator.author();
        markup += generator.since();
        markup += generator.example();

        markup = 
            `<div class="class-details">
                ${markup}
            </div>`;

        return markup;
    }

    private markupTemplate(label: string, contents: string, titleClass = '', contentClass = 'class-subtitle-description', tag = 'div') {
        return `
            <div class="class-subtitle ${titleClass}">
                ${label}
            </div>
            <${tag} class="${contentClass}">
                ${contents}
            </${tag}>`
        ;
    }

    protected author() {
        if (!this.model.author) {
            return '';
        }

        return `<br/>${GeneratorUtils.escapeHTML(this.model.author)}`;
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
                `<code>${GeneratorUtils.escapeHTML(this.model.example.trimRight())}</code>`,
                '',
                'code-example',
                'pre'
            );
        }
    }

    protected since() {
        if (!this.model.since) {
            return '';
        }

        return `<br/>${GeneratorUtils.escapeHTML(this.model.since)}`;
    }

    protected deprecated(): string {
        if (!this.model.deprecated) {
            return '';
        } else {
            return this.markupTemplate('Deprecated', GeneratorUtils.escapeHTML(this.model.deprecated, true), 'deprecated');
        }
    }

    protected see(models: Map<string, TopLevelModel>): string {
        if (!this.model.see.length) {
            return '';
        } else {
            return this.markupTemplate('See', SeeLinkGenerator.makeLinks(models, this.model.see));
        }
    }

    protected signature(): string {
        return `
            <div class="class-subtitle">
                Signature
            </div>
            ${this.annotations('class-annotations')}
            <div class="class-signature">
                ${GeneratorUtils.escapeHTML(this.model.nameLine)}
            </div>`
        ;
    }
}

export default TopLevelMarkupGenerator;
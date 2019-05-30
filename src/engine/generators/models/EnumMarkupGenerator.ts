import * as templates from '../../../common/templates';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import TopLevelMarkupGenerator from './TopLevelMarkupGenerator';
import { EnumModel, TopLevelModel } from '../../../common/models';

class EnumMarkupGenerator extends MarkupGenerator<EnumModel> {
    protected constructor(model: EnumModel) {
        super(model);
    }

    public static generate(eModel: EnumModel, modelMap: Map<string, TopLevelModel>): string {
        const generator = new EnumMarkupGenerator(eModel);
        let markup = generator.header(eModel.name);
        let values = generator.valuesTable();

        markup += TopLevelMarkupGenerator.generate(eModel, modelMap, eModel.name, values);

        return markup;
    }

    protected signatureLine(memberClassName: string) {
        const hasSource = this.model.sourceUrl;
        const sourceLinkIcon = hasSource ? `<span>${templates.EXTERNAL_LINK}</span>` : '';
        return super.signatureLine(GeneratorUtils.escapeHTML(this.model.name), memberClassName) + sourceLinkIcon;
    }

    protected header(memberClassName: string) {
        return `
            <h2 class="sectionTitle" id="${this.model.name}">
                ${this.signatureLine(memberClassName)}
            </h2>`;
    }

    protected valuesTable(): string {
        return `
            <p />
            <table class="attrTable">
                <tr><th>Values</th></tr>
                ${GeneratorUtils.mapHTML(this.model.values, val =>
                    `<tr>
                        <td class="enumValues">
                            ${val}
                        </td>
                    </tr>`
                )}
            </table>`;
    }
}

export default EnumMarkupGenerator;
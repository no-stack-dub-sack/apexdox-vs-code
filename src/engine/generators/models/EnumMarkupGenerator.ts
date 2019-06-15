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

        markup += TopLevelMarkupGenerator.generate(eModel, modelMap, values);

        return markup;
    }

    protected header(topmostTypeName: string) {
        return `
            <h2 class="class-title top-level-type" id="${this.model.name}">
                ${super.linkToSource(GeneratorUtils.escapeHTML(this.model.name), topmostTypeName)}
            </h2>`
        ;
    }

    protected valuesTable(): string {
        return `
            <table class="attributes-table">
                <tr><th>Values</th></tr>
                ${GeneratorUtils.mapHTML(this.model.values, val =>
                    `<tr>
                        <td class="enumValues">
                            ${val}
                        </td>
                    </tr>`
                )}
            </table>`
        ;
    }
}

export default EnumMarkupGenerator;
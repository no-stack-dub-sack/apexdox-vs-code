import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import TopLevelMarkupGenerator from './TopLevelMarkupGenerator';
import { EnumModel, TopLevelModel } from '../../../common/models';

class EnumMarkupGenerator extends MarkupGenerator<EnumModel> {
    protected constructor(model: EnumModel, models: Map<string, TopLevelModel>) {
        super(model, models);
    }

    public static generate(eModel: EnumModel, models: Map<string, TopLevelModel>): string {
        const generator = new EnumMarkupGenerator(eModel, models);
        let markup = generator.header(eModel.name);
        let values = generator.valuesTable();

        markup += TopLevelMarkupGenerator.generate(eModel, models, values);

        return markup;
    }

    protected header(topmostTypeName: string) {
        return `
            <h2 class="class-title top-level-type" id="${this.model.name}">
                ${super.linkToSource(GeneratorUtils.encodeText(this.model.name), topmostTypeName)}
            </h2>`;
    }

    protected valuesTable(): string {
        return `
            <table class="attributes-table">
                <tr><th>Values</th></tr>
                ${GeneratorUtils.mapHTML(
                    this.model.values,
                    (val) =>
                        `<tr>
                        <td class="enum-values">
                            ${val}
                        </td>
                    </tr>`
                )}
            </table>`;
    }
}

export default EnumMarkupGenerator;

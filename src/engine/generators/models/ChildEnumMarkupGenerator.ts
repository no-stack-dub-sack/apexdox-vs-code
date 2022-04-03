import ApexDox from '../../ApexDox';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import { ClassModel, EnumModel, TopLevelModel } from '../../../common/models';

// models not needed!

class ChildEnumMarkupGenerator extends MarkupGenerator<EnumModel> {

    public constructor(model: EnumModel, models: Map<string, TopLevelModel>) {
        super(model, models);
    }

    public static generate(cModel: ClassModel, models: Map<string, TopLevelModel>): string {
        const enums = ApexDox.config.sortOrder === ApexDox.ORDER_ALPHA
            ? cModel.enumsSorted
            : cModel.enums;

        let markup = ChildEnumMarkupGenerator.headerRow(enums);
        const hasDescription = ChildEnumMarkupGenerator.hasDescriptionColumn(markup);

        for (let Enum of enums) {
            const generator = new ChildEnumMarkupGenerator(Enum, models);
            markup += generator.enumRow(cModel.topMostClassName, hasDescription);
        }

        markup =
            `<div class="subsection enums">
                <h3 class="subsection-title enums">Enums</h3>
                <table class="attributes-table enums">
                    ${markup}
                </table>
            </div>`;

        return markup;
    }

    protected static hasDescriptionColumn(headerRow: string): boolean {
        return /<th>Description<\/th>/.test(headerRow);
    }

    protected static headerRow(enums: Array<EnumModel>): string {
        let descriptionCol = '';
        for (let Enum of enums) {
            if (Enum.description) {
                descriptionCol = '<th>Description</th>';
                break;
            }
        }

        return `
            <tr>
                <th>Name</th>
                <th>Signature</th>
                <th>Values</th>
                ${descriptionCol}
            </tr>`;
    }

    protected enumRow(topmostTypeName: string, hasDescriptionColumn: boolean): string {
        return `
            <tr class="enum ${this.model.scope}">
                <td class="attribute-name">${super.linkToSource(this.model.name, topmostTypeName)}</td>
                <td>
                    <div class="attribute-signature">
                        ${GeneratorUtils.encodeText(this.model.nameLine)}
                    </div>
                </td>
                <td class="enum-values">${this.model.values.join(',&nbsp;')}</td>
                ${hasDescriptionColumn ? this.description('attribute-description', 'td') : ''}
            </tr>`;
    }
}

export default ChildEnumMarkupGenerator;
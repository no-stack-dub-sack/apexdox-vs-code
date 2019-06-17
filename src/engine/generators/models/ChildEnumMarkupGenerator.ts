import ApexDoc from '../../ApexDoc';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import { ClassModel, EnumModel } from '../../../common/models';

class ChildEnumMarkupGenerator extends MarkupGenerator<EnumModel> {

    public constructor(model: EnumModel) {
        super(model);
    }

    public static generate(cModel: ClassModel): string {
        const enums = ApexDoc.config.sortOrder === ApexDoc.ORDER_ALPHA
            ? cModel.enumsSorted
            : cModel.enums;

        let markup = ChildEnumMarkupGenerator.headerRow(enums);
        const hasDescription = ChildEnumMarkupGenerator.hasDescriptionColumn(markup);

        for (let Enum of enums) {
            const generator = new ChildEnumMarkupGenerator(Enum);
            markup += generator.enumRow(cModel.topMostClassName, hasDescription);
        }

        markup =
            `<div class="subsection enums">
                <h3 class="subsection-title enums">Enums</h2>
                <table class="attributes-table properties">
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
        enums.forEach(_enum => {
            _enum.description && (descriptionCol = '<th>Description</th>');
        });

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
                <td class="attribute-name">${this.model.name}</td>
                <td class="attribute-signature">${this.linkToSource(this.model.nameLine, topmostTypeName, true)}</td>
                <td class="enumValues">${this.model.values.join(',&nbsp;')}</td>
                ${hasDescriptionColumn ? this.description('attribute-description', 'td') : ''}
            </tr>`;
    }
}

export default ChildEnumMarkupGenerator;
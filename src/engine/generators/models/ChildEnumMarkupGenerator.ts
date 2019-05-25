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

        markup = `
            <div class="subsectionContainer">
                <table class="attrTable properties">
                    ${markup}
                </table>
            </div>
            <p/>`;

        return GeneratorUtils.wrapWithDetail(markup, '<h2 class="subsectionTitle enums">Enums</h2>', 'subSection enums');
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

    protected signatureLine(memberClassName: string): string {
        return `<div class="attrSignature">${super.signatureLine(this.model.nameLine, memberClassName, true)}</div>`;
    }

    protected enumRow(memberClassName: string, hasDescriptionColumn: boolean): string {
        return `
            <tr class="enum ${this.model.scope}">
                <td class="attrName">${this.model.name}</td>
                <td>${this.signatureLine(memberClassName)}</td>
                <td class="enumValues">${this.model.values.join()}</td>
                ${hasDescriptionColumn
                    ? '<td>' + this.description('attrDescription') + '</td>'
                    : ''}
            </tr>`;
    }
}

export default ChildEnumMarkupGenerator;
import ApexDoc from '../../ApexDoc';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import { ClassModel, PropertyModel } from '../../../common/models';

class PropertyMarkupGenerator extends MarkupGenerator<PropertyModel> {

    protected constructor(model: PropertyModel) {
        super(model);
    }

    public static generate(cModel: ClassModel): string {
        const properties = ApexDoc.config.sortOrder === ApexDoc.ORDER_ALPHA
            ? cModel.propertiesSorted
            : cModel.properties;

        let markup = PropertyMarkupGenerator.headerRow(properties);
        const hasAnnotations = PropertyMarkupGenerator.hasAnnotationsColumn(markup);
        const hasDescription = PropertyMarkupGenerator.hasDescriptionColumn(markup);

        for (let prop of properties) {
            const generator = new PropertyMarkupGenerator(prop);
            markup += generator.propRow(cModel.topMostClassName, hasAnnotations, hasDescription);
        }

        markup = `
            <div class="subsectionContainer">
                <table class="attrTable properties">
                    ${markup}
                </table>
            </div>
            <p />`;

        return GeneratorUtils.wrapWithDetail(markup, '<h2 class="subsectionTitle properties">Properties</h2>', `subSection properties ${cModel.name.replace('.', '_')}`);
    }

    protected static hasDescriptionColumn(headerRow: string): boolean {
        return /<th>Description<\/th>/.test(headerRow);
    }

    protected static hasAnnotationsColumn(headerRow: string): boolean {
        return /<th>Annotations<\/th>/.test(headerRow);
    }

    protected static headerRow(properties: Array<PropertyModel>): string {
        let descriptionCol = '', annotationsCol = '';
        properties.forEach(prop => {
            prop.description && (descriptionCol = '<th>Description</th>');
            prop.annotations.length && (annotationsCol = '<th>Annotations</th>');
        });

        return `
            <tr>
                <th>Name</th>
                <th>Signature</th>
                ${annotationsCol}
                ${descriptionCol}
            </tr>`;
    }

    protected signatureLine(memberClassName: string): string {
        return `<td class="attrSignature">${super.signatureLine(this.model.nameLine, memberClassName, true)}</td>`;
    }

    protected propRow(memberClassName: string, hasAnnotationsColumn: boolean, hasDescriptionColumn: boolean): string {
        return `
            <tr class="property ${this.model.scope}">
                <td class="attrName">${this.model.name}</td>
                ${this.signatureLine(memberClassName)}
                ${hasAnnotationsColumn ? '<td>' + this.annotations('propAnnotations') + '</td>' : ''}
                ${hasDescriptionColumn ? this.description('attrDescription', 'td', true) : ''}
            </tr>`;
    }
}

export default PropertyMarkupGenerator;
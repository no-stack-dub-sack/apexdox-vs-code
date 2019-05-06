import { MarkupGenerator } from './MarkupGenerator';
import { PropertyModel } from '../../models';

class PropertyMarkupGenerator extends MarkupGenerator<PropertyModel> {

    public constructor(model: PropertyModel) {
        super(model);
    }

    public static hasDescriptionColumn(headerRow: string): boolean {
        return /<th>Description<\/th>/.test(headerRow);
    }

    public static hasAnnotationsColumn(headerRow: string): boolean {
        return /<th>Annotations<\/th>/.test(headerRow);
    }

    public static headerRow(properties: Array<PropertyModel>): string {
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

    public signatureLine(memberClassName: string): string {
        return `<div class="attrSignature">${super.signatureLine(memberClassName, true)}</div>`;
    }

    public propRow(memberClassName: string, hasAnnotationsColumn: boolean, hasDescriptionColumn: boolean): string {
        return `
            <tr class="property ${this.model.scope}">
                <td class="attrName">${this.model.name}</td>
                <td>${this.signatureLine(memberClassName)}</td>
                ${hasAnnotationsColumn
                    ? '<td>' + this.annotations('propAnnotations') + '</td>'
                    : ''}
                ${hasDescriptionColumn
                    ? '<td>' + this.description('attrDescription') + '</td>'
                    : ''}
            </tr>`;
    }
}

export { PropertyMarkupGenerator };
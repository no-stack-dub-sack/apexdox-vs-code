import ApexDox from '../../ApexDox';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import { ClassModel, PropertyModel, TopLevelModel } from '../../../common/models';

class PropertyMarkupGenerator extends MarkupGenerator<PropertyModel> {

    protected constructor(model: PropertyModel, models: Map<string, TopLevelModel>) {
        super(model, models);
    }

    public static generate(cModel: ClassModel, models: Map<string, TopLevelModel>): string {
        const properties = ApexDox.config.sortOrder === ApexDox.ORDER_ALPHA
            ? cModel.propertiesSorted
            : cModel.properties;

        let markup = PropertyMarkupGenerator.headerRow(properties);
        const hasAnnotations = PropertyMarkupGenerator.hasAnnotationsColumn(markup);
        const hasDescription = PropertyMarkupGenerator.hasDescriptionColumn(markup);

        for (let prop of properties) {
            const generator = new PropertyMarkupGenerator(prop, models);
            markup += generator.propRow(cModel.topMostClassName, hasAnnotations, hasDescription);
        }

        markup =
            `<div class="subsection properties ${cModel.name.replace('.', '_')}">
                <h3 class="subsection-title properties">${cModel.name} Properties</h3>
                <table class="attributes-table properties">
                    ${markup}
                </table>
            </div>`;

        return markup;
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

    protected propRow(topmostTypeName: string, hasAnnotationsColumn: boolean, hasDescriptionColumn: boolean): string {
        return `
            <tr class="property ${this.model.scope}">
                <td class="attribute-name">${super.linkToSource(this.model.name, topmostTypeName)}</td>
                <td>
                    <div class="attribute-signature">
                        ${GeneratorUtils.encodeText(this.model.nameLine)}
                    </div>
                </td>
                ${hasAnnotationsColumn ? '<td>' + this.annotations('prop-annotations') + '</td>' : ''}
                ${hasDescriptionColumn ? this.description('attribute-description', 'td', true) : ''}
            </tr>`;
    }
}

export default PropertyMarkupGenerator;
import * as templates from '../../utils/Templates';
import { EnumModel } from '../../models';
import { MarkupGenerator } from './MarkupGenerator';

class EnumMarkupGenerator extends MarkupGenerator<EnumModel> {
    public constructor(model: EnumModel) {
        super(model);
    }

    public signatureLine(memberClassName: string) {
        const hasSource = this.model.sourceUrl;
        const sourceLinkIcon = hasSource ? `<span>${templates.EXTERNAL_LINK}</span>` : '';
        return super.signatureLine(memberClassName) + sourceLinkIcon;
    }

    public header(memberClassName: string) {
        return `
            <h2 class="sectionTitle" id="${this.model.name}">
                ${this.signatureLine(memberClassName)}
            </h2>`;
    }

    public valuesTable(): string {
        return `
            <p />
            <table class="attrTable">
                <tr><th>Values</th></tr>
                <tr>
                    <td class="enumValues">
                        ${this.model.values.join(', ')}
                    </td>
                </tr>
            </table>`;
    }
}

export { EnumMarkupGenerator };
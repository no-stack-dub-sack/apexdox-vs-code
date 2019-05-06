import * as templates from '../../utils/Templates';
import { ClassModel } from '../../models';
import { MarkupGenerator } from './MarkupGenerator';

class ClassMarkupGenerator extends MarkupGenerator<ClassModel> {
    public constructor(model: ClassModel) {
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
}

export { ClassMarkupGenerator };
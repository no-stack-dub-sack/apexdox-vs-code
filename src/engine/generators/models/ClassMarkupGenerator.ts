import * as templates from '../../../common/templates';
import ChildEnumMarkupGenerator from './ChildEnumMarkupGenerator';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import MethodMarkupGenerator from './MethodMarkupGenerator';
import PropertyMarkupGenerator from './PropertyMarkupGenerator';
import TopLevelMarkupGenerator from './TopLevelMarkupGenerator';
import { ClassModel, TopLevelModel } from '../../../common/models';

class ClassMarkupGenerator extends MarkupGenerator<ClassModel> {
    protected constructor(model: ClassModel) {
        super(model); // <-- haha!
    }

    public static generate(cModel: ClassModel, modelMap: Map<string, TopLevelModel>): string {
        const generator = new ClassMarkupGenerator(cModel);
        const header = generator.header(cModel.topMostClassName);

        let contents = TopLevelMarkupGenerator.generate(cModel, modelMap, cModel.topMostClassName, '');

        if (cModel.properties.length) {
            contents += PropertyMarkupGenerator.generate(cModel);
        }

        if (cModel.enums.length) {
            contents += ChildEnumMarkupGenerator.generate(cModel);
        }

        if (cModel.methods.length) {
            contents += MethodMarkupGenerator.generate(cModel, modelMap);
        }

        return GeneratorUtils.wrapWithDetail(contents, header, 'section');
    }

    protected header(memberClassName: string) {
        return `
            <h2 class="section-title ${this.model.name === memberClassName ? 'top-level-type' : ''}" id="${this.model.name}">
                ${super.signatureLine(GeneratorUtils.escapeHTML(this.model.name), memberClassName)}
            </h2>`;
    }
}

export default ClassMarkupGenerator;
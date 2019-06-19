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

        let contents = TopLevelMarkupGenerator.generate(cModel, modelMap, '');

        if (cModel.properties.length) {
            contents += PropertyMarkupGenerator.generate(cModel);
        }

        if (cModel.enums.length) {
            contents += ChildEnumMarkupGenerator.generate(cModel);
        }

        if (cModel.methods.length) {
            contents += MethodMarkupGenerator.generate(cModel, modelMap);
        }

        return `
            <div class="section">
                ${header}
                ${contents}
            </div>
        `;
    }

    protected header(topmostTypeName: string) {
        return `
            <h2 class="class-title ${this.model.name === topmostTypeName ? 'top-level-type' : ''}" id="${this.model.name}">
                ${super.linkToSource(GeneratorUtils.escapeHTML(this.model.name), topmostTypeName)}
            </h2>`
        ;
    }
}

export default ClassMarkupGenerator;
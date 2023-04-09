import ChildEnumMarkupGenerator from './ChildEnumMarkupGenerator';
import GeneratorUtils from '../GeneratorUtils';
import MarkupGenerator from './MarkupGenerator';
import MethodMarkupGenerator from './MethodMarkupGenerator';
import PropertyMarkupGenerator from './PropertyMarkupGenerator';
import TopLevelMarkupGenerator from './TopLevelMarkupGenerator';
import { ClassModel, TopLevelModel } from '../../../common/models';

class ClassMarkupGenerator extends MarkupGenerator<ClassModel> {
    protected constructor(model: ClassModel, models: Map<string, TopLevelModel>) {
        super(model, models); // <-- haha!
    }

    public static generate(cModel: ClassModel, models: Map<string, TopLevelModel>): string {
        const generator = new ClassMarkupGenerator(cModel, models);
        const header = generator.header(cModel.relativeFilePath);

        let contents = TopLevelMarkupGenerator.generate(cModel, models);

        if (cModel.properties.length) {
            contents += PropertyMarkupGenerator.generate(cModel, models);
        }

        if (cModel.enums.length) {
            contents += ChildEnumMarkupGenerator.generate(cModel, models);
        }

        if (cModel.methods.length) {
            contents += MethodMarkupGenerator.generate(cModel, models);
        }

        return `
            <div class="section">
                ${header}
                ${contents}
            </div>
        `;
    }

    protected header(relativeFilePath: string) {
        return `
            <h2 class="class-title ${relativeFilePath.endsWith(`${this.model.name}.cls`) ? 'top-level-type' : ''}" id="${this.model.name}">
                ${super.linkToSource(GeneratorUtils.encodeText(this.model.name), relativeFilePath)}
            </h2>`
        ;
    }
}

export default ClassMarkupGenerator;
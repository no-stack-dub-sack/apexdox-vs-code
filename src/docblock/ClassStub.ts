import DocBlockStub from './DocBlockStub';
import { AUTHOR, DESCRIPTION, SINCE } from '../common/tags';
import { IStubLine } from '..';
import { TextEditor } from 'vscode';

class ClassStub extends DocBlockStub {
    public constructor(editor: TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
        super(editor, activeLine, stubLine, isCompletion);
    }

    protected make(): void {
        const tags = [AUTHOR.label, SINCE.label]
            , maxLength = !this.config.omitDescriptionTag
                ? this.getMaxLength(DESCRIPTION.label, ...tags)
                : this.getMaxLength(...tags)
            , pad = this.getPadding(this.config.alignItems, DESCRIPTION.label.length, maxLength);

        let stub = this.descriptionTemplate(this.lineIndent, pad, this.config.omitDescriptionTag);

        if (this.config.spacious) {
            stub += `${this.lineIndent} *\n`;
        }

        let tabIndex = 1;
        for (let tag of tags) {
            const pad = this.getPadding(this.config.alignItems, tag.length, maxLength);
            stub += this.tagTemplate(tag, pad, this.lineIndent, tabIndex++);
        }

        this.contents = stub += this.blockClose;
    }

    private getMaxLength(...tags: string[]) {
        return Math.max(...tags.map(tag => tag.length));
    }
}

export default ClassStub;
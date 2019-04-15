import * as vscode from 'vscode';
import Stub, { IStubLine, IStubsConfig } from './Stub';
import { AUTHOR, DATE, DESCRIPTION } from '../models/tokens';

class ClassStub extends Stub {
    public constructor(editor: vscode.TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
        super(editor, activeLine, stubLine, isCompletion);
    }

    protected make(): void {
        const tags = [AUTHOR, DATE]
            , maxLength = this.config.omitDescriptionTag
                ? this.getMaxLength(DESCRIPTION, ...tags)
                : this.getMaxLength(...tags)
            , pad = this.getPadding(this.config.alignItems, DESCRIPTION.length, maxLength);

        let stub = this.descriptionTemplate(this.lineIndent, pad, this.config.omitDescriptionTag);

        if (this.config.spacious) {
            stub += `${this.lineIndent} *\n`;
        }

        let tabIndex = 1;
        for (let tag of tags) {
            const pad = this.getPadding(this.config.alignItems, tag.length, maxLength);
            stub += this.tagTemplate(tag, pad, this.lineIndent, tabIndex++);
        }

        this.contents = stub += this.terminator;
    }

    private getMaxLength(...tags: string[]) {
        return Math.max(...tags.map(tag => tag.length));
    }
}

export default ClassStub;
import StubBase from './StubBase';
import { IStubLine } from '..';
import { TextEditor } from 'vscode';

class DefaultStub extends StubBase {
    public constructor(editor: TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
        super(editor, activeLine, stubLine, isCompletion);
    }

    protected make(): void {
        this.contents = `${this.blockOpen + this.lineIndent} * $0\n${this.blockClose}`;
    }
}

export default DefaultStub;

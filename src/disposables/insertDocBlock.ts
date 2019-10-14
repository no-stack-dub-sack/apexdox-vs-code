import ClassStub from '../docblock/ClassStub';
import DefaultStub from '../docblock/DefaultStub';
import DocBlockStub, { StubType } from '../docblock/DocBlockStub';
import MethodStub from '../docblock/MethodStub';
import { commands, window } from 'vscode';

const COMMAND = 'apexdox.insertDocBlock';

export default function() {
    return commands.registerCommand(COMMAND, () => {
        const editor = window.activeTextEditor;

        if (editor) {
            const lineIdx = editor.selection.active.line
                , stubLine = DocBlockStub.getLineAndType(editor.document, lineIdx);

            switch (stubLine.type) {
                case StubType.METHOD:
                    new MethodStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.TOP_LEVEL_TYPE:
                    new ClassStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.PROP_OR_NESTED_TYPE:
                default:
                    new DefaultStub(editor, lineIdx, stubLine).insert();
                    break;
            }
        }
    });
}

import ClassStub from '../doc-block/ClassStub';
import DefaultStub from '../doc-block/DefaultStub';
import DocBlockStub, { StubType } from '../doc-block/DocBlockStub';
import MethodStub from '../doc-block/MethodStub';
import { commands, window } from 'vscode';

const COMMAND = 'apexDoc2.insertDocBlock';

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
                case StubType.CLASS_INTERFACE_OR_ENUM:
                    new ClassStub(editor, lineIdx, stubLine).insert();
                    break;
                case StubType.PROP_OR_INNER_ENUM:
                default:
                    new DefaultStub(editor, lineIdx, stubLine).insert();
                    break;
            }
        }
    });
}

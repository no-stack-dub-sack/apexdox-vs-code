import ClassStub from '../docblock/ClassStub';
import DefaultStub from '../docblock/DefaultStub';
import StubBase, { StubType } from '../docblock/StubBase';
import MethodStub from '../docblock/MethodStub';
import {
    commands,
    CompletionItem,
    CompletionItemKind,
    CompletionItemProvider,
    Disposable,
    languages,
    Position,
    SnippetString,
    TextDocument,
    window
    } from 'vscode';
import { IStubLine, Option } from '..';

// TODO: change docblock nomenclature to comment, e.g. apexdox.commentCompletion
// this will make more sense and be more consistent overall. Will need to change
// commands and settings names as well.
const COMMAND = 'apexdox.docBlockCompletion';

class DocBlockCompletionItem extends CompletionItem {
    constructor(position: Position) {
        super('/** */', CompletionItemKind.Snippet);
        this.detail = 'ApexDox Comment';
        this.insertText = '';
        this.command = {
            title: 'ApexDox Comment',
            command: COMMAND,
            arguments: [position]
        };
    }
}

class DocBlockCompletionProvider implements CompletionItemProvider {
    public provideCompletionItems(
        document: TextDocument,
        position: Position
        ): Promise<Option<CompletionItem[]>>  {

        const line = document.lineAt(position.line).text;

        if (line.indexOf('/**') === -1) {
            return Promise.resolve(undefined);
        }

        return Promise.resolve([new DocBlockCompletionItem(position)]);
    }
}

export default function docBlockCompletion(): Disposable {
    commands.registerCommand(COMMAND, (position: Position) => {
        const editor = window.activeTextEditor;

        if (editor) {
            const lineIdx = editor.selection.active.line;
            const stubLine: IStubLine = StubBase.getLineAndType(editor.document, lineIdx, true);

            let stub: StubBase;
            switch (stubLine.type) {
                case StubType.METHOD:
                    stub = new MethodStub(editor, lineIdx, stubLine, true);
                    break;
                case StubType.TOP_LEVEL_TYPE:
                    stub = new ClassStub(editor, lineIdx, stubLine, true);
                    break;
                case StubType.PROP_OR_NESTED_TYPE:
                default:
                    stub = new DefaultStub(editor, lineIdx, stubLine, true);
            }

            const snippet = new SnippetString(stub.contents);
            editor.insertSnippet(snippet, position);
        }
    });

    return languages.registerCompletionItemProvider('apex', new DocBlockCompletionProvider(), '*');
}

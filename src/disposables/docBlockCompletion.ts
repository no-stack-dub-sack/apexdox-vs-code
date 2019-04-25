import ClassStub from '../docBlock/ClassStub';
import DefaultStub from '../docBlock/DefaultStub';
import DocBlockStub, { IStubLine, StubType } from '../docBlock/DocBlockStub';
import MethodStub from '../docBlock/MethodStub';
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

const COMMAND = 'apexdoc2.docBlockCompletion';

class ApexDocBlockCompletionItem extends CompletionItem {
    constructor(position: Position) {
        super('/** */', CompletionItemKind.Snippet);
        this.detail = 'ApexDoc2 Comment';
        this.insertText = '';
        this.command = {
            title: 'ApexDoc2 Comment',
            command: COMMAND,
            arguments: [position]
        };
    }
}

class ApexDocBlockCompletionProvider implements CompletionItemProvider {
    public provideCompletionItems(
        document: TextDocument,
        position: Position
        ): Promise<CompletionItem[] | undefined>  {

        const line = document.lineAt(position.line).text;

        if (line.indexOf('/**') === -1) {
            return Promise.resolve(undefined);
        }

        return Promise.resolve([new ApexDocBlockCompletionItem(position)]);
    }
}

export default function docBlockCompletion(): Disposable {
    commands.registerCommand(COMMAND, (position: Position) => {
        const editor = window.activeTextEditor;

        if (editor) {
            const lineIdx = editor.selection.active.line;
            const stubLine: IStubLine = DocBlockStub.getLineAndType(editor.document, lineIdx, true);

            let stub: DocBlockStub;
            switch (stubLine.type) {
                case StubType.METHOD:
                    stub = new MethodStub(editor, lineIdx, stubLine, true);
                    break;
                case StubType.CLASS_INTERFACE_OR_ENUM:
                    stub = new ClassStub(editor, lineIdx, stubLine, true);
                    break;
                case StubType.PROP_OR_INNER_ENUM:
                default:
                    stub = new DefaultStub(editor, lineIdx, stubLine, true);
            }

            const snippet = new SnippetString(stub.contents);
            editor.insertSnippet(snippet, position);
        }
    });

    return languages.registerCompletionItemProvider('apex', new ApexDocBlockCompletionProvider(), '*');
}

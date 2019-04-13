import * as vscode from 'vscode';
import ApexDoc from '../apexDoc/ApexDoc';
import Utils from '../utils/Utils';

export interface IStubLine {
    insertNewLine: boolean;
    line: vscode.TextLine;
    lineIndex: number;
    type: StubType;
    indent: number;
}

export enum StubType {
    CLASS_OR_INTERFACE,
    METHOD,
    OTHER
}

export interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
}

class Stub {
    protected readonly PARAM: string = '@param';
    protected readonly RETURN: string = '@return';
    protected readonly EXCEPTION: string = '@exception';
    protected readonly DESCRIPTION: string = '@description';

    protected config: IStubsConfig;
    protected editor: vscode.TextEditor;
    protected line: vscode.TextLine;
    protected lineIndex: number;
    protected lineIndent: number;
    protected isCompletion: boolean;
    protected insertNewLine: boolean = false;
    private activeLine: number;

    public contents: string | undefined;

    public constructor(editor: vscode.TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
		// set this flag to true so MethodModel does not call
		// functions in the constructor that we don't care about
        ApexDoc.isStub = true;

        this.editor = editor;
        this.line = stubLine.line;
        this.activeLine = activeLine;
        this.lineIndent = stubLine.indent;
        this.lineIndex = stubLine.lineIndex;
        this.insertNewLine = stubLine.insertNewLine;

        this.isCompletion = isCompletion || false;
        this.config = <IStubsConfig>vscode.workspace.getConfiguration('apexdoc2').get('stubs');
    }

    /**
     * Inserts the stub snippet at a given position.
     */
    public insert(): void {
        const position = new vscode.Position(this.activeLine, 0);
        this.editor.insertSnippet(new vscode.SnippetString(this.contents), position);
    }

    /**
     * Establishes the index of the line we're looking to stub, as well as the
     * type of stub we should create. The command may be invoked on a line with
     * an annotation, so traverse downward to find the first non-annotation line.
     * If the command is invoked on an empty line, it will look to see if the next
     * line is an annotation or contains text to be stubbed. If neither, stub type
     * OTHER will be returned, and an empty stub will be inserted on a completion
     * event, while nothing will be inserted on command pallette invocation.
     *
     * @returns The `vscode.TextLine` object on which our method begins.
     */
    public static getLineAndType(editor: vscode.TextEditor, lineIndex: number, isCompletion?: boolean): IStubLine {
        let
              type: StubType
            , insertNewLine = false
            , line = editor.document.lineAt(lineIndex);

        // handle completion event and command being
        // invoked on an empty line
        if (isCompletion || line.isEmptyOrWhitespace) {
            line = editor.document.lineAt(++lineIndex);
            while (line.text.trim().startsWith('@')) {
                line = editor.document.lineAt(++lineIndex);
            }
            type = this.getStubType(line.text);
        }

        // handle command being invoked on a non-empty line
        else {
            insertNewLine = true;
            while (line.text.trim().startsWith('@')) {
                line = editor.document.lineAt(++lineIndex);
            }
            type = this.getStubType(line.text);
        }

        return {
            indent: isCompletion ? 0 : line.firstNonWhitespaceCharacterIndex,
            insertNewLine,
            lineIndex,
            type,
            line
        };
    }

    /**
     * Analyzes our stub line's text and makes a determination
     * about what type of stub we're dealing with.
     * @returns `StubType` enum
     */
    private static getStubType(lineText: string) : StubType {
        if (Utils.isClassOrInterface(lineText.trim())) {
            return StubType.CLASS_OR_INTERFACE;
        } else if (lineText.includes('(')) {
            return StubType.METHOD;
        } else {
            return StubType.OTHER;
        }
    }
}

export default Stub;
import * as vscode from 'vscode';
import ApexDoc from '../apexDoc/ApexDoc';
import Utils from '../utils/Utils';

export interface ILineType {
    annotationLines: number;
    line: vscode.TextLine;
    lineIndex: number;
    type: StubType;
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
    protected annotationLines: number = 0;

    public contents: string | undefined;

    public constructor(editor: vscode.TextEditor, lineInfo: ILineType, isCompletion?: boolean) {
		// set this flag to true so MethodModel does not call
		// functions in the constructor that we don't care about
        ApexDoc.isStub = true;

        this.editor = editor;
        this.line = lineInfo.line;
        this.lineIndex = lineInfo.lineIndex;
        this.annotationLines = lineInfo.annotationLines;
        this.lineIndent = isCompletion ? 0 : this.line.firstNonWhitespaceCharacterIndex;

        this.isCompletion = isCompletion || false;
        this.config = { ...vscode.workspace.getConfiguration('apexdoc2')['stubs'] };
    }

    private static getStubType(lineText: string) : StubType {
        if (Utils.isClassOrInterface(lineText.trim())) {
            return StubType.CLASS_OR_INTERFACE;
        } else if (lineText.includes('(')) {
            return StubType.METHOD;
        } else {
            return StubType.OTHER;
        }
    }

    /**
     * Establishes the first line of the method's text. Our line index
     * and indent point are also derived from this method's results.
     *
     * @returns The `vscode.TextLine` object on which our method begins.
     */
    public static getLineAndType(editor: vscode.TextEditor, lineIndex: number, isCompletion?: boolean): ILineType {
        let
              type: StubType
            , annotationLines = 0
            , line = editor.document.lineAt(lineIndex);

        // handle completion event, we want the next line, unless
        // the next line is an annotation, then find the method
        if (isCompletion || line.isEmptyOrWhitespace) {
            line = editor.document.lineAt(++lineIndex);
            while (line.text.trim().startsWith('@')) {
                line = editor.document.lineAt(++lineIndex);
                annotationLines++;
            }
            type = this.getStubType(line.text);
        }

        // handle command invoked on empty line
        // else if (line.isEmptyOrWhitespace) {
        //     let nextLineText = editor.document.lineAt(lineIndex + 1).text.trim();
        //     if (nextLineText.startsWith('@')) {
        //         line = editor.document.lineAt(++lineIndex);
        //         while (line.text.trim().startsWith('@')) {
        //             line = editor.document.lineAt(++lineIndex);
        //             annotationLines++;
        //         }
        //     } else if (nextLineText.includes('(')) {
        //         line = editor.document.lineAt(++lineIndex);
        //     }
        // }

        // handle command invoked on annotation line
        else {
            while (line.text.trim().startsWith('@')) {
                line = editor.document.lineAt(++lineIndex);
                annotationLines++;
            }
            type = this.getStubType(line.text);
        }

        return {
            annotationLines,
            lineIndex,
            type,
            line
        };
    }
}

export default Stub;
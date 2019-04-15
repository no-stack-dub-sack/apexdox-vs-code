import * as vscode from 'vscode';
import ApexDoc from '../apexDoc/ApexDoc';
import Utils from '../utils/Utils';
import { EXTENSION } from '../extension';

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

abstract class Stub {
    protected config: IStubsConfig;
    protected editor: vscode.TextEditor;
    protected line: vscode.TextLine;
    protected lineIndex: number;
    protected lineIndent: string;
    protected isCompletion: boolean;
    protected terminator: string;
    private activeLine: number;

    public contents: string | undefined;

    public constructor(editor: vscode.TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
		// set this flag to true so MethodModel does not call
		// functions in the constructor that we don't care about
        ApexDoc.isStub = true;

        this.editor = editor;
        this.line = stubLine.line;
        this.activeLine = activeLine;
        this.lineIndex = stubLine.lineIndex;
        this.lineIndent = ' '.repeat(stubLine.indent);
        this.terminator = this.setTerminator(stubLine.insertNewLine);

        this.isCompletion = isCompletion || false;
        this.config = <IStubsConfig>vscode.workspace.getConfiguration(EXTENSION).get('stubs');

        this.make();
    }

    /**
     * This method will be implemented by each deriving class. It
     * is responsible for creating the stub contents for its type
     * and is called in the class's constructor.
     */
    protected abstract make(): void;

    /**
     * Sets the terminator for the comment stub. Closes the block comment
     * and adds the appropriate indentation and newline char if needed.
     *
     * @param insertNewLine Determined during `getLineAndType`,
     * determines whether or not the stub ends with a newline char.
     */
    private setTerminator(insertNewLine: boolean) {
        const terminator = insertNewLine ? '\n' : '';
        return `${this.lineIndent} */${terminator}`;
    }

    /**
     * Inserts the stub snippet at a given position.
     */
    public insert(): void {
        // TODO: if contents are empty, do we want to do nothing, or insert empty block comment?
        // Think about the cases where contents may end up being empty, are there any right now?
        if (this.contents) {
            const position = new vscode.Position(this.activeLine, 0);
            this.editor.insertSnippet(new vscode.SnippetString(this.contents), position);
        }
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
     * @param editor The active editor.
     * @param lineIndex The line index of the the active line when the command was invoked.
     * @param isCompletion Whether or not the command was invoked by completion event or command pallette.
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
     *
     * @param lineText The contents of the line.
     * @returns `StubType` enum
     */
    private static getStubType(lineText: string) : StubType {
        if (Utils.isClassOrInterface(lineText.trim())) {
            return StubType.CLASS_OR_INTERFACE;
        }
        // TODO: equals sign is how we're avoiding confusing methods
        // and properties. Can we think of a better way or will this do?
        else if (lineText.includes('(') && !lineText.includes('=')) {
            return StubType.METHOD;
        } else {
            return StubType.OTHER;
        }
    }

    /**
     * Determines the right-padding needed for a comment
     * line if apexdoc2.stubs.alignItems is set to true.
     *
     * @param alignItems If false, do not calculate padding.
     * @param length Length of the element (tag + value if param).
     * @param maxLength The max length of all elements.
     * @returns An empty or whitespace string - the padding to be applied.
     */
    protected getPadding(alignItems: boolean, length: number, maxLength: number): string {
        if (alignItems && length < maxLength) {
            return ' '.repeat(maxLength - length);
        }

        return '';
    }

    // #region Stub Templates
    protected tagTemplate(tag: string, value: string, indent: string, tabIndex: number, placeholder = ''): string {
        return `${indent} * ${tag} ${value}\${${tabIndex}:${placeholder}}\n`;
    }

    protected descriptionTemplate(indent: string, pad: string, omitDesc: boolean): string {
        const openComment = !this.isCompletion ? `${indent}/**\n` : '\n';
        return `${openComment}${indent} * ${!omitDesc ? '@description ' : ''}${(omitDesc ? '' : pad)}$0\n`;
    }
    // #endregion
}

export default Stub;
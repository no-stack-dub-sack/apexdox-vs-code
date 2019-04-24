import * as vscode from 'vscode';
import ApexDoc from '../apexDoc/ApexDoc';
import Utils from '../utils/Utils';
import { EXTENSION } from '../extension';
import {
    Position,
    SnippetString,
    TextDocument,
    TextEditor,
    TextLine,
    workspace
    } from 'vscode';

export interface IStubLine {
    insertNewLine: boolean;
    line: TextLine;
    lineIndex: number;
    type: StubType;
    indent: number;
}

export enum StubType {
    CLASS_INTERFACE_OR_ENUM,
    PROP_OR_INNER_ENUM,
    METHOD
}

export interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
}

abstract class DocBlockStub {
    public contents: string = '';
    protected config: IStubsConfig;
    protected editor: TextEditor;
    protected line: TextLine;
    protected lineIndex: number;
    protected lineIndent: string;
    protected isCompletion: boolean;
    protected blockClose: string;
    protected blockOpen: string;
    private activeLine: number;

    public constructor(editor: TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
		// set this flag to true so MethodModel does not call
		// functions in the constructor that we don't care about
        ApexDoc.isStub = true;

        this.editor = editor;
        this.line = stubLine.line;
        this.activeLine = activeLine;
        this.lineIndex = stubLine.lineIndex;
        this.lineIndent = ' '.repeat(stubLine.indent);
        this.isCompletion = isCompletion || false;

        // set the comment block opener & closer based on isCompletion
        this.blockOpen = isCompletion ? '\n' : `${this.lineIndent}/**\n`;
        this.blockClose = `${isCompletion ? '' : this.lineIndent + ' */'}${stubLine.insertNewLine ? '\n' : ''}`;

        this.config = this.getConfig();
        this.make();
    }

    /**
     * This method will be implemented by each deriving class. It
     * is responsible for creating the stub contents for its type
     * and is called in the class's constructor.
     */
    protected abstract make(): void;

    /**
     * Establish defaults for missing or incomplete user configuration.
     */
    private getConfig(): IStubsConfig {
        const defaults = {
            alignItems: false,
            omitDescriptionTag: true,
            spacious: false
        };

        const userConfig = workspace.getConfiguration(EXTENSION).get<IStubsConfig>('stubs');

        if (userConfig) {
            return {
                ...defaults,
                ...userConfig
            };
        }

        return defaults;
    }

    /**
     * Inserts the stub snippet at a given position.
     */
    public insert(): void {
        // TODO: if contents are empty, do we want to do nothing, or insert empty block comment?
        // Think about the cases where contents may end up being empty, are there any right now?
        if (this.contents) {
            const position = new Position(this.activeLine, 0);
            this.editor.insertSnippet(new SnippetString(this.contents), position);
        }
    }

    /**
     * Establishes the index of the line we're looking to stub, as well as the
     * type of stub we should create. The command may be invoked on a line with
     * an annotation, so traverse downward to find the first non-annotation line.
     * If the command is invoked on an empty line, it will look to see if the next
     * line is an annotation or contains text to be stubbed. If neither, stub type
     * PROP_OR_INNER_ENUM will be returned, and an empty block comment will be inserted.
     *
     * @param document The active file.
     * @param lineIndex The line index of the the active line when the command was invoked.
     * @param isCompletion Whether or not the command was invoked by completion event or command pallette.
     * @returns The `TextLine` object on which our method begins.
     */
    public static getLineAndType(document: TextDocument, lineIndex: number, isCompletion?: boolean): IStubLine {
        let type: StubType
            , insertNewLine = false
            , line = document.lineAt(lineIndex);

        // handle completion event and command being
        // invoked on an empty line
        if (isCompletion || line.isEmptyOrWhitespace) {
            line = document.lineAt(++lineIndex);
            while (line.text.trim().startsWith('@')) {
                line = document.lineAt(++lineIndex);
            }
            type = this.getStubType(line.text, lineIndex, document);
        }

        // handle command being invoked on a non-empty line
        else {
            insertNewLine = true;
            while (line.text.trim().startsWith('@')) {
                line = document.lineAt(++lineIndex);
            }
            type = this.getStubType(line.text, lineIndex, document);
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
    private static getStubType(lineText: string, lineIndex: number, document: TextDocument) : StubType {
        if (Utils.isClassOrInterface(lineText)) {
            return StubType.CLASS_INTERFACE_OR_ENUM;
        }

        // If we encounter an enum, traverse up the document and
        // find out if we're in a class. If we are, treat stub as
        // inner enum which has different tags than class level enum.
        else if (Utils.isEnum(lineText.trim())) {
            let isNested = false;
            while (lineIndex >= 1 && isNested === false) {
                let prevLineText = document.lineAt(--lineIndex).text.trim();
                if (!prevLineText) { continue; }
                // if line starts with anything except annotation
                // or comment chars, we're nested inside a class
                else if (!/^@|\/\/|\*|\/\*/.test(prevLineText)) {
                    isNested = true;
                    break;
                }
            }

            if (isNested) {
                return StubType.PROP_OR_INNER_ENUM;
            }

            return StubType.CLASS_INTERFACE_OR_ENUM;
        }

        // TODO: equals sign is how we're avoiding confusing methods
        // and properties. Can we think of a better way or will this do?
        else if (lineText.includes('(') && !lineText.includes('=')) {
            return StubType.METHOD;
        }

        else {
            return StubType.PROP_OR_INNER_ENUM;
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

    // #region DocBlockStub Templates
    protected tagTemplate(tag: string, value: string, indent: string, tabIndex: number, placeholder = ''): string {
        return `${indent} * ${tag} ${value}\${${tabIndex}:${placeholder}}\n`;
    }

    protected descriptionTemplate(indent: string, pad: string, omitDesc: boolean): string {
        return `${this.blockOpen}${indent} * ${!omitDesc ? '@description ' : ''}${(omitDesc ? '' : pad)}$0\n`;
    }
    // #endregion
}

export default DocBlockStub;
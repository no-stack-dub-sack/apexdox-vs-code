import * as vscode from 'vscode';
import MethodModel from '../models/MethodModel';
import Stub, { IStubLine, IStubsConfig } from './Stub';
import Utils from '../utils/Utils';

interface IParsedMethod {
    name: string;
    params: string[];
    returnType: string;
    throwsException: boolean;
}

class MethodStub extends Stub {

    public constructor(editor: vscode.TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
        super(editor, activeLine, stubLine, isCompletion);
        this.make();
    }

    /**
     * Our main routine, responsible for parsing the
     * method and creating the stub / snippet's contents.
     */
    private make(): void {
        if (!this.line.isEmptyOrWhitespace && this.line.text.includes('(')) {

            const { throwsException, returnType, params } = this.parseMethod()
                , maxLength = this.getMaxLength(this.config, returnType, params, throwsException)
                , indent = ' '.repeat(this.lineIndent)
			    , pad = !this.config.omitDescriptionTag
                    ? this.getPadding(this.config.alignItems, this.DESCRIPTION.length, maxLength)
                    : '';

			let stub = this.descriptionTemplate(indent, pad, this.config.omitDescriptionTag);

            // If config.spacious is set to true, and there are
            // additional tags after the description add an empty line.
			if (this.config.spacious && (params.length || returnType !== 'void' || throwsException)) {
                stub += `${indent} *\n`;
			}

            let tabIndex = 1;
			for (let param of params) {
				const length = param.length + this.PARAM.length + 1;
				const pad = this.getPadding(this.config.alignItems, length, maxLength);
				stub += this.tagTemplate(this.PARAM, `${param} ${pad}`, indent, tabIndex++);
			}

			if (returnType !== 'void') {
				const pad = this.getPadding(this.config.alignItems, this.RETURN.length, maxLength);
				stub += this.tagTemplate(this.RETURN, pad, indent, tabIndex++);
			}

			if (throwsException) {
				const pad = this.getPadding(this.config.alignItems, this.EXCEPTION.length, maxLength);
				stub += this.tagTemplate(this.EXCEPTION, pad, indent, tabIndex++);
			}

            const terminator = this.insertNewLine ? '\n' : '';
            this.contents = stub += `${indent} */${terminator}`;
        }
    }

    // #region Stub Templates
    private tagTemplate(tag: string, value: string, indent: string, tabIndex: number): string {
        return `${indent} * ${tag} ${value}$${tabIndex}\n`;
    }

    private descriptionTemplate(indent: string, pad: string, omitDesc: boolean): string {
        const openComment = !this.isCompletion ? `${indent}/**\n` : '\n';
        return `${openComment}${indent} * ${!omitDesc ? '@description ' : ''}${pad}$0\n`;
    }
    // #endregion

    // #region Utils
    /**
     * Traverses over the editor lines based from our first line
     * And capture's the method's full text, or enough of it to
     * detect whether or not a it throws an exception. If it does
     * our stub will include this tag. Also gets the method's
     * name, params and return type to drive other stub logic.
     *
     * @returns An `IParsedMethod` object describing the method.
     */
    private parseMethod(): IParsedMethod {
        let methodText = this.line.text.trim()
            , currLineIndex = this.lineIndex
            , openCurlies = Utils.countChars(methodText, '{')
            , closeCurlies = Utils.countChars(methodText, '}')
            , throwsException = false
            , start = true;

        // Capture the method's nameLine, and traverse over
        // enough of it's text to detect whether or not a it
        // throws an exception, if so, we'll include this tag.
        while (openCurlies !== closeCurlies || start === true) {
            this.line = this.editor.document.lineAt(++currLineIndex);

            openCurlies += Utils.countChars(this.line.text, '{');
            closeCurlies += Utils.countChars(this.line.text, '}');
            methodText += this.line.text.trim();

            // be sure to turn this off once our loop begins
            if (openCurlies > 0 && start === true) {
                start = false;
            }

            // we're looking for an exception, if we find one, we can break
            // the loop, we already have all the info we need for the model
            if (this.line.text.trim().toLowerCase().startsWith('throw')) {
                throwsException = true;
                break;
            }
        }

        // create a method model from our name line to base our stub on
        const method = new MethodModel([], methodText.substring(0, methodText.indexOf('{')), 0);
        const name = method.getMethodName(), nameLine = method.getNameLine();

        return {
            throwsException,
            name: method.getMethodName(),
            params: method.getParamsFromNameLine(),
            returnType: Utils.previousWord(nameLine, nameLine.indexOf(name)),
        };
    }

    /**
     * Takes the length of all tags and prams and determines the longest, to assist in
     * determining right-padding if user has apexdoc2.stubs.alignItems set to true.
     *
     * @param config The user's ApexDoc2 Stubs config object
     * @param returnType The method's return type
     * @param params The method's params
     * @param throwsEx Whether or not the method throws
     */
    private getMaxLength(config: IStubsConfig, returnType: string, params: string[], throwsEx: boolean): number {
        // establish lengths of tags and params
        const returnTag = returnType !== 'void' ? this.RETURN.length : 0;
        const descriptionTag = config.omitDescriptionTag ? 0 : this.DESCRIPTION.length;
        const paramsLength = params.map(p => this.PARAM.length + p.length + 1);
        const exceptionLength = throwsEx ? this.EXCEPTION.length : 0;

        // gather all lengths and take max
        const lengths = [returnTag, descriptionTag, exceptionLength, ...paramsLength];
        return Math.max(...lengths);
    }

    /**
     * Determines the right-padding needed for a comment
     * line if apexdoc2.stubs.alignItems is set to true.

     * @param alignItems If false, do not calculate padding.
     * @param length Length of the element (tag + value if param).
     * @param maxLength The max length of all elements.
     */
    private getPadding(alignItems: boolean, length: number, maxLength: number): string {
        if (alignItems && length < maxLength) {
            return ' '.repeat(maxLength - length);
        }

        return '';
    }
    // #endregion
}

export default MethodStub;
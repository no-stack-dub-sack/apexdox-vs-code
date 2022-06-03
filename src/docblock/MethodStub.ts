import ApexDox from '../engine/ApexDox';
import StubBase from './StubBase';
import Utils from '../common/Utils';
import { DESCRIPTION, EXCEPTION, PARAM, RETURN } from '../common/tags';
import { IDocblockConfig, IPairCount, IParsedMethod, IStubLine } from '..';
import { MethodModel } from '../common/models/MethodModel';
import { TextEditor } from 'vscode';

class MethodStub extends StubBase {
    public constructor(editor: TextEditor, activeLine: number, stubLine: IStubLine, isCompletion?: boolean) {
        super(editor, activeLine, stubLine, isCompletion);
    }

    /**
     * Our main routine, responsible for parsing the
     * method and creating the stub / snippet's contents.
     */
    protected make(): void {
        const { throwsException, returnType, params } = this.parseMethod(),
            maxLength = this.getMaxLength(this.config, returnType, params, throwsException),
            pad = this.getPadding(this.config.alignItems, DESCRIPTION.label.length, maxLength);

        let stub = this.descriptionTemplate(this.lineIndent, pad, this.config.omitDescriptionTag);

        // If config.spacious is set to true, and there are
        // additional tags after the description add an empty line.
        if (this.config.spacious && (params.length || returnType !== 'void' || throwsException)) {
            stub += `${this.lineIndent} *\n`;
        }

        let tabIndex = 1;
        for (let param of params) {
            const length = param.length + PARAM.label.length + 1;
            const pad = this.getPadding(this.config.alignItems, length, maxLength);
            stub += this.tagTemplate(PARAM.label, `${param} ${pad}`, this.lineIndent, tabIndex++);
        }

        if (returnType !== 'void') {
            const pad = this.getPadding(this.config.alignItems, RETURN.label.length, maxLength);
            stub += this.tagTemplate(RETURN.label, pad, this.lineIndent, tabIndex++, `\`${returnType}\``);
        }

        if (throwsException) {
            const pad = this.getPadding(this.config.alignItems, EXCEPTION.label.length, maxLength);
            stub += this.tagTemplate(EXCEPTION.label, pad, this.lineIndent, tabIndex++);
        }

        this.contents = stub += this.blockClose;
    }

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
        let methodText = this.line.text.trim(),
            currLineIndex = this.lineIndex,
            pairs = this.countMatchingPairs(methodText),
            throwsException = false,
            start = true;

        if (!this.isInterfaceOrAbstractMethod(methodText, pairs)) {
            // Capture the method's nameLine, and traverse over
            // enough of it's text to detect whether or not a it
            // throws an exception, if so, we'll include this tag.
            while (pairs.openCurlies !== pairs.closeCurlies || start === true) {
                this.line = this.editor.document.lineAt(++currLineIndex);

                // update our pair count with the current line's text
                pairs = this.countMatchingPairs(this.line.text, pairs);
                methodText += this.line.text.trim();

                // if we're dealing with an interface method, break
                if (this.isInterfaceOrAbstractMethod(methodText, pairs)) {
                    break;
                }

                // be sure to turn this off once our loop begins
                if (pairs.openCurlies > 0 && start === true) {
                    start = false;
                }

                // we're looking for an exception, if we find one, we can break
                // the loop, we already have all the info we need for the model
                if (/.*throw\s+new\s+\w+exception\s?\(/i.test(this.line.text)) {
                    throwsException = true;
                    break;
                }
            }
        }

        // trim our method text if needed and create a method model from it
        const endIdx = methodText.indexOf('{');
        methodText = endIdx > -1 ? methodText.substring(0, endIdx) : methodText;
        const method = new MethodModel([], methodText, 0);

        return {
            throwsException,
            name: method.name,
            params: method.paramsFromNameLine,
            returnType: this.getReturnType(method),
        };
    }

    /**
     * Count matching pairs in our method's text, so we can determine if it is an
     * interface method, and when to break the loop for parsing a full method's body.
     *
     * @param lineText The text to count pairs for.
     * @param pairs If called subsequently, the pair object to update.
     */
    private countMatchingPairs(lineText: string, pairs?: IPairCount): IPairCount {
        if (!pairs) {
            return {
                openCurlies: Utils.countChars(lineText, '{'),
                closeCurlies: Utils.countChars(lineText, '}'),
                openParens: Utils.countChars(lineText, '('),
                closeParens: Utils.countChars(lineText, ')'),
            };
        } else {
            pairs.openCurlies += Utils.countChars(lineText, '{');
            pairs.closeCurlies += Utils.countChars(lineText, '}');
            pairs.openParens += Utils.countChars(lineText, '(');
            pairs.closeParens += Utils.countChars(lineText, ')');
            return pairs;
        }
    }

    /**
     * A helper method to determine whether or not a method is part of an interface or an abstract method definition.
     *
     * @param methodText The method's text to analyze.
     * @param pairs An `IPairCount` instance which tracks the number of matching brackets in the method's text.
     */
    private isInterfaceOrAbstractMethod(methodText: string, pairs: IPairCount): boolean {
        if (
            pairs.openParens === 1 &&
            pairs.closeParens === 1 &&
            pairs.openCurlies === 0 &&
            pairs.closeCurlies === 0 &&
            methodText.trim().endsWith(';')
        ) {
            return true;
        }

        return false;
    }

    /**
     * Get the return type for a method based on the word previous to the method name.
     * If we're dealing with a constructor, the previous word could be an access modifier,
     * be sure to treat that as void. If there is no previous word, treat that as void as well.
     * @param method The method to get the return type for
     */
    private getReturnType(method: MethodModel): string {
        const PRECEDING_WORDS = ['public', 'private', 'protected', 'global', 'static', 'virtual', 'testMethod', 'override'];
        const name = method.name,
            nameLine = method.nameLine;
        let prevWord = Utils.previousWord(nameLine, nameLine.indexOf(name));
        let returnType = '';
        // if prev word is access modifier on first run
        // we are dealing with a constructor. Treat as void.
        if (ApexDox.SCOPES.includes(prevWord)) {
            return 'void';
        }
        // handle both simple return types like `Integer` or `List<String>`
        // and return types containing spaces, like `Map<String, String>`.
        // Basically, just keep adding previous word to the front until
        // we hit a keyword which indicates it's no longer part of the
        // type or until we hit the beginning of the line (in the case of
        // an implicitly privacy where start of the sig is return type).
        else if (prevWord) {
            returnType += prevWord;
            while ((prevWord = Utils.previousWord(nameLine, nameLine.indexOf(returnType)))) {
                if (PRECEDING_WORDS.includes(prevWord)) {
                    break;
                } else {
                    returnType = `${prevWord} ${returnType}`;
                }
            }
        }

        return returnType || 'void';
    }

    /**
     * Takes the length of all tags and prams and determines the longest, to assist in
     * determining right-padding if user has apexdox.stubs.alignItems set to true.
     *
     * @param config The user's ApexDox Stubs config object
     * @param returnType The method's return type
     * @param params The method's params
     * @param throwsEx Whether or not the method throws
     */
    private getMaxLength(config: IDocblockConfig, returnType: string, params: string[], throwsEx: boolean): number {
        // establish lengths of tags and params
        const returnTag = returnType && returnType !== 'void' ? RETURN.label.length : 0;
        const descriptionTag = config.omitDescriptionTag ? 0 : DESCRIPTION.label.length;
        const paramsLength = params.map((p) => PARAM.label.length + p.length + 1);
        const exceptionLength = throwsEx ? EXCEPTION.label.length : 0;

        // gather all lengths and take max
        const lengths = [returnTag, descriptionTag, exceptionLength, ...paramsLength];
        return Math.max(...lengths);
    }
    // #endregion
}

export default MethodStub;

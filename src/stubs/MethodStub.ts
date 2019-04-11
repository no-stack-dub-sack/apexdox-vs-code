import * as vscode from 'vscode';
import ApexDoc from '../apexDoc/ApexDoc';
import MethodModel from '../models/MethodModel';
import Utils from '../utils/Utils';

interface IStubsConfig {
	alignItems: boolean;
	omitDescriptionTag: boolean;
	spacious: boolean;
}

class MethodStub {
    private readonly PARAM: string = '@param';
    private readonly RETURN: string = '@return';
    private readonly EXCEPTION: string = '@exception';
    private readonly DESCRIPTION: string = '@description';

    private config: IStubsConfig;
    private editor: vscode.TextEditor;
    private lineIndex: number;
    public stub: string | undefined;

    public constructor(editor: vscode.TextEditor) {
		// set this flag to true so MethodModel does not call
		// functions in the constructor that we don't care about
		ApexDoc.isStub = true;
        this.editor = editor;
        this.lineIndex = this.editor.selection.active.line;
		this.config = { ...vscode.workspace.getConfiguration('apexdoc2')['stubs'] };

        this.make();
    }

    public insert(): void {
        const position = new vscode.Position(this.lineIndex, 0);
        this.editor.insertSnippet(new vscode.SnippetString(this.stub), position);
    }

    private make(): void {
        // Declare & initialize our line vars
		let line = this.editor.document.lineAt(this.lineIndex);

        // Handle annotations
        while (line.text.trim().startsWith('@')) {
            line = this.editor.document.lineAt(this.lineIndex++);
		}

		// Handle line command being invoked on being empty and next
		// line being the line that the method we're stubbing is on
		let nextLineText = this.editor.document.lineAt(this.lineIndex + 1).text;
		if (line.isEmptyOrWhitespace && nextLineText.includes('(')) {
			line = this.editor.document.lineAt(++this.lineIndex);
		}

        // If line is still empty, do nothing
        if (!line.isEmptyOrWhitespace && line.text.includes('(')) {
			let indentTo = line.firstNonWhitespaceCharacterIndex
				, methodText = line.text.trim()
				, currLineIndex = this.lineIndex
				, lineNum = this.lineIndex + 1;

			// Capture the method's nameLine, and traverse over
			// enough of it's text to detect whether or not a it
			// throws an exception, if so, we'll include this tag.
			let openCurlies = Utils.countChars(methodText, '{')
				, closeCurlies = Utils.countChars(methodText, '}')
				, throwsEx = false
				, start = true;

			while (openCurlies !== closeCurlies || start === true) {
				line = this.editor.document.lineAt(++currLineIndex);

				openCurlies += Utils.countChars(line.text, '{');
				closeCurlies += Utils.countChars(line.text, '}');
				methodText += line.text.trim();

				// be sure to turn this off once our loop begins
				if (openCurlies > 0 && start === true) {
					start = false;
				}

				// we're looking for an exception, if we find one, we can break
				// the loop, we already have all the info we need for the model
				if (line.text.trim().toLocaleLowerCase().startsWith('throw')) {
					throwsEx = true;
					break;
				}
			}

			// keep only the method's name line
			methodText = methodText.substring(0, methodText.indexOf('{'));

			// create a method model from our name line to base our stub on
			const
			      method = new MethodModel([], methodText, lineNum)
				, methodName = method.getMethodName()
				, params = method.getParamsFromNameLine()
				, returnType = Utils.previousWord(methodText, methodText.indexOf(methodName))
				, maxLength = this.getMaxLength(this.config, returnType, params, throwsEx)
				, indent = ' '.repeat(indentTo);

			let stub = '';

			// get right-pad for description line
			const pad = !this.config.omitDescriptionTag
				? this.getPadding(this.config.alignItems, this.DESCRIPTION.length, maxLength)
				: '';

			stub += this.descriptionTemplate(methodName, indent, pad, this.config.omitDescriptionTag);

			let snippetNum = 2;
			if (params.length) {
				this.config.spacious && (stub += `${indent} *\n`);
			}

			for (let param of params) {
				const length = param.length + this.PARAM.length + 1;
				const pad = this.getPadding(this.config.alignItems, length, maxLength);
				stub += this.tagTemplate(this.PARAM, `${param} ${pad}`, indent, snippetNum++, param);
			}

			if (returnType !== 'void') {
				params.length && this.config.spacious && (stub += `${indent} *\n`);
				const pad = this.getPadding(this.config.alignItems, this.RETURN.length, maxLength);
				stub += this.tagTemplate(this.RETURN, pad, indent, snippetNum++, this.RETURN.slice(1));
			}

			if (throwsEx) {
				returnType === 'void' && this.config.spacious && (stub += `${indent} *\n`);
				const pad = this.getPadding(this.config.alignItems, this.EXCEPTION.length, maxLength);
				stub += this.tagTemplate(this.EXCEPTION, pad, indent, snippetNum++, this.EXCEPTION.slice(1));
			}

            stub += `${indent}*/$0\n`;

            this.stub = stub;
        }
    }

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

    private getPadding(alignItems: boolean, length: number, maxLength: number): string {
        if (alignItems && length < maxLength) {
            return ' '.repeat((maxLength - length) + 1);
        }

        return ' ';
    }

    private tagTemplate(tag: string, value: string, indent: string, snippetNum: number, placeholder: string): string {
        return `${indent} * ${tag} ${value}\${${snippetNum}:${placeholder} description}\n`;
    }

    private descriptionTemplate(methodName: string, indent: string, pad: string, omitDesc: boolean): string {
        return `${indent}/**\n${indent} * ${!omitDesc ? '@description ' : ''}${pad}\${1:${methodName} description}\n`;
    }
}

export default MethodStub;
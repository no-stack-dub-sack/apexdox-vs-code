import * as tags from '../common/tags';
import { IApexDoxTag, Option } from '..';
import {
    CompletionItem,
    CompletionItemKind,
    CompletionItemProvider,
    SnippetString,
    Disposable,
    languages,
    Position,
    TextDocument,
    MarkdownString,
    } from 'vscode';

class DocTagCompletionItem extends CompletionItem {
    constructor(tag: IApexDoxTag) {
        let snippetString: Option<SnippetString>;
        let kind = CompletionItemKind.Text;
        let tagName = tag.label.slice(1);

        if (tag.snippet) {
            snippetString = new SnippetString(tag.snippet);
            kind = CompletionItemKind.Snippet;
        }

        super(tagName, kind);
        this.label = tagName;
        this.detail = `@${tagName} ApexDox Tag`;
        this.insertText = snippetString || tagName;
        this.documentation = new MarkdownString(tag.documentation);
    }
}

class DocTagCompletionProvider implements CompletionItemProvider {
    public provideCompletionItems(
        document: TextDocument,
        position: Position
        ): Promise<Option<CompletionItem[]>>  {

        const line = document.lineAt(position.line).text.trim();

        if (!/^\*\s+@$/.test(line)) {
            return Promise.resolve(undefined);
        }

        const tagCompletionItems = Object.values(tags)
            .map(tag => new DocTagCompletionItem(tag));

        return Promise.resolve(tagCompletionItems);
    }
}

export default function docTagCompletion(): Disposable {
    return languages.registerCompletionItemProvider('apex', new DocTagCompletionProvider(), '@');
}
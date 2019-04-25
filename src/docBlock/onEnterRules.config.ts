import { IndentAction, LanguageConfiguration } from 'vscode';

// source: https://github.com/kevb34ns/auto-comment-blocks/blob/master/src/rules.ts

const langConfig: LanguageConfiguration = {
    // Pipe symbol represents the cursor in below examples
    onEnterRules: [
        {
            // e.g. /** | */
            // e.g. /* | */
            beforeText: /^\s*\/\*\*?(?!\/)([^\*]|\*(?!\/))*$/,
            afterText: /^\s*\*\/$/,
            action: { indentAction: IndentAction.IndentOutdent, appendText: ' * ' }
        }, {
            // e.g. /** ...|
            // e.g. /* ...|
            beforeText: /^\s*\/\*\*?(?!\/)([^\*]|\*(?!\/))*$/,
            action: { indentAction: IndentAction.None, appendText: ' * ' }
        }, {
            // e.g.  * ...|
            beforeText: /^(\t|(\ ))*\ \*(\ ([^\*]|\*(?!\/))*)?$/,
            action: { indentAction: IndentAction.None, appendText: '* ' }
        }, {
            // Keeps next non-comment line aligned with code, e.g.
            // /**
            //  *
            //  */|
            // public class MyClass { ... }
            beforeText: /^(\t|(\ ))*\ \*\/\s*$/,
            action: { indentAction: IndentAction.None, removeText: 1 }
        },
        {
            // same as above, but when closing */ is not on a new line
            // e.g.  *-----*/|
            beforeText: /^(\t|(\ ))*\ \*[^/]*\*\/\s*$/,
            action: { indentAction: IndentAction.None, removeText: 1 }
        }
    ]
};

export default langConfig;
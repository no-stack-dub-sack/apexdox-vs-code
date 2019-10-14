import { IApexDoxTag } from '..';

export const AUTHOR: IApexDoxTag = {
    label: '@author',
    snippet: `author \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@author [The type or method author]
\`\`\``
};

export const SINCE: IApexDoxTag = {
    label: '@since',
    snippet: `since \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@since [The date the type or method was implemented]
\`\`\``
};

export const DEPRECATED: IApexDoxTag = {
    label: '@deprecated',
    snippet: `deprecated \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@deprecated [The reason the type or method is deprecated & migration path]
\`\`\``
};

export const DESCRIPTION: IApexDoxTag = {
    label: '@description',
    snippet: `description \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum**, **Method**, & **Property**

\`\`\`
@description [Description]
\`\`\``
};

export const EXAMPLE: IApexDoxTag = {
    label: '@example',
    snippet: `example \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@example
[An optionally multi-line code example.
Starts on the line below the tag]
\`\`\``
};

export const EXCEPTION: IApexDoxTag = {
    label: '@exception',
    snippet: `exception \${1:}`,
    documentation:
`For: **Method**

\`\`\`
@exception [A list or description of exceptions a method throws]
\`\`\``
};

export const GROUP: IApexDoxTag = {
    label: '@group ',  // needed to include space to not match group-content
    snippet: `group \${1:}`,
    documentation:
`For: Top-level **Class**, **Interface**, & **Enum**

\`\`\`
@group [The group the type belongs to. Used to create the docs menu, un-grouped types will go under 'Miscellaneous'.]
\`\`\``
};

export const GROUP_CONTENT: IApexDoxTag = {
    label: '@group-content',
    snippet: `group-content \${1:}`,
    documentation:
`For: Top-level **Class**, **Interface**, & **Enum**

\`\`\`
@group-content [A file-path relative to the target directory. Should point to an HTML file that describes a class group.]
\`\`\``
};

export const PARAM: IApexDoxTag = {
    label: '@param',
    snippet: `param \${1:paramName} \${2:description}`,
    documentation:
`For: **Method**

\`\`\`
@param paramName [param description]
\`\`\``
};

export const RETURNS: IApexDoxTag = {
    label: '@returns',
    snippet: `returns \${1:}`,
    documentation:
`For: **Method**

\`\`\`
@returns [description or return type]
\`\`\``
};

export const SEE: IApexDoxTag = {
    label: '@see',
    snippet: `see \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@see [URL, Markdown URL, or Name Path]
\`\`\``
};

export interface IApexDoc2Tag {
    label: string;
    documentation: string;
    snippet: string;
}

export const AUTHOR: IApexDoc2Tag = {
    label: '@author',
    snippet: `author \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@author [The type or method author]
\`\`\``
};

export const SINCE: IApexDoc2Tag = {
    label: '@since',
    snippet: `since \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@since [The date the type or method was implemented]
\`\`\``
};

export const DEPRECATED: IApexDoc2Tag = {
    label: '@deprecated',
    snippet: `deprecated \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@deprecated [The reason the type or method is deprecated & migration path]
\`\`\``
};

export const DESCRIPTION: IApexDoc2Tag = {
    label: '@description',
    snippet: `description \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum**, **Method**, & **Property**

\`\`\`
@description [Description]
\`\`\``
};

export const EXAMPLE: IApexDoc2Tag = {
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

export const EXCEPTION: IApexDoc2Tag = {
    label: '@exception',
    snippet: `exception \${1:}`,
    documentation:
`For: **Method**

\`\`\`
@exception [A list or description of exceptions a method throws]
\`\`\``
};

export const GROUP: IApexDoc2Tag = {
    label: '@group ',  // needed to include space to not match group-content
    snippet: `group \${1:}`,
    documentation:
`For: Top-level **Class**, **Interface**, & **Enum**

\`\`\`
@group [The group the type belongs to. Used to create the docs menu, un-grouped types will go under 'Miscellaneous'.]
\`\`\``
};

export const GROUP_CONTENT: IApexDoc2Tag = {
    label: '@group-content',
    snippet: `group-content \${1:}`,
    documentation:
`For: Top-level **Class**, **Interface**, & **Enum**

\`\`\`
@group-content [A file-path relative to the target directory. Should point to an HTML file that describes a class group.]
\`\`\``
};

export const PARAM: IApexDoc2Tag = {
    label: '@param',
    snippet: `param \${1:paramName} \${2:description}`,
    documentation:
`For: **Method**

\`\`\`
@param paramName [param description]
\`\`\``
};

export const RETURNS: IApexDoc2Tag = {
    label: '@returns',
    snippet: `returns \${1:}`,
    documentation:
`For: **Method**

\`\`\`
@returns [description or return type]
\`\`\``
};

export const SEE: IApexDoc2Tag = {
    label: '@see',
    snippet: `see \${1:}`,
    documentation:
`For: **Class**, **Interface**, **Enum** (top level), & **Method**

\`\`\`
@see [URL, Markdown URL, or Name Path]
\`\`\``
};

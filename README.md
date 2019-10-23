# ApexDox VS Code
ApexDox is A fast, reliable, and configurable documentation generator for Salesforce Apex .cls files, that works with both DX and non-DX projects. ApexDox uses a JSDoc-like inline comment syntax. Simply tell ApexDox where your class files are, and it will generate a set of static HTML pages that fully document each class/class file, including its properties, methods, enums, and annotations.

## Features
- Run ApexDox and immediately launch your docs using the extension's built-in static server
- Supports documenting .cls files across multiple source directories for DX projects
- Includes easy-to-use commands and completion items for contextually auto-stubbing ApexDox comment blocks
- Customizable project "Home page", "project splash" section, and Class Group pages
- Links class, interface, method, prop, and enum signatures to source code hosted on GitHub
- Customize the favicon, and/or use your own logo, and other static assets in your docs
- Produces clean, readable HTML output (complements of [pretty](https://github.com/jonschlinkert/pretty))
- Includes customized syntax highlighting to make your ApexDox comment blocks stand out and easy to read
- Generated documentation is fully searchable, powered by [Lunr](https://lunrjs.com) (supports wildcard searches using the `*` character and searching by page title using `title:<search-term>` syntax)
- Easily configurable using VS Code settings.json file or, for more safely checking configs into source control, using an .apexdoxrc (JSON) or apexdox.yml (YAML) file, depending on you and your team's preference (see examples in the [sample app repo](https://github.com/no-stack-dub-sack/apexdox-sample-app))

<p align="center">
    <a target="_blank" rel="noopener noreferrer"
        href="https://github.com/no-stack-dub-sack/apexdox-vs-code/blob/master/images/apexdox-demo.gif">
        <img src="https://github.com/no-stack-dub-sack/apexdox-vs-code/raw/master/images/apexdox-demo.gif"
             alt="Short Demo" style="max-width:100%;">
    </a>
</p>

## Table of Contents
- [ApexDox Sample Documentation](#apexdox-sample-documentation)
- [Commands](#commands)
- [Favicon & Logo Customization](#favicon--logo-customization)
- [Extension Settings](#extension-settings)
    - [The ${workspaceFolder} Variable](#the-workspacefolder-variable)
    - [Documentation Engine Settings](#documentation-engine-settings)
    - [Comment Block Settings](#comment-block-settings)
    - [Examples](#minimum-settings-example)
- [Documenting Class Files](#documenting-class-files)
    - [Documentation @ Tags](#documentation-tags)
    - [Special Tokens](#special-tokens)
    - [Class Comments](#class-comments-includes-class-level-interfaces-and-enums)
    - [Method Comments](#method-comments)
    - [Property and Inner Enum Comments](#property-and-inner-enum-comments)
- [Tips](#tips)
- [Known Issues](#known-issues)
- [History](#history)

## ApexDox Sample Documentation
Check out our ApexDox sample docs to get a feel for what ApexDox documentation looks like: https://apexdox-sample-docs.surge.sh. The repository that these docs were created from lives [here](https://github.com/no-stack-dub-sack/apexdox-sample-app). If you'd like to easily test out different settings, install the extension and clone the repo; the settings are checked-in in the `.vscode/settings.json` file. Run `ApexDox: Run` from the command pallette, and `ApexDox: Open Docs` to generate new documentation and preview your changes locally.

## Commands
You can launch the following commands via the command pallette (<kbd>Ctrl/Cmd</kbd> + <kbd>Shift</kbd> + <kbd>P</kbd>):

### Create/Preview Docs
- **ApexDox: Run**: Run apexdox. Many aspects of how this command behaves can be configured using the settings below.
- **ApexDox: Open Docs**: Launch a server on localhost and open the generated documentation.

### Auto-Stub Comment Blocks
Auto-stubbing comment blocks allows you to quickly document your class files with minimal effort. The appearance/style of comment stubs can be configured using the settings described in the [next section](#comment-block-settings). Auto-stub commands can be invoked in two ways:

- **ApexDox: Stub Comment Block**: Invoke this command on the line above a method, class/interface, property, or enum to stub an ApexDox comment based on the current context.
- **/\*\***: Same as `ApexDox: Stub Comment Block`, but as a Completion Item. Simply type `/**` and press <kbd>Tab</kbd> when prompted. See demos [here](#class-comments-includes-class-level-interfaces-and-enums) and [here](#method-comments).

## Favicon & Logo Customization
To use your own favicon and logo (for the sidebar's 'Project Splash'), include files named `logo.png` and `favicon.png` in the `apexdox.engine.assets` array in `.vscode/settings.json` (or in the corresponding array of either `.apexdoxrc` or `apexdox.yml`). This will overwrite the existing files. You can read more about this and other ApexDox settings in the next section.

## Extension Settings
The extension's settings can be configured using `.vscode/settings.json`, which optimally takes advantage of built-in VS Code intellisense. Alternatively, if you would like to check your config into source control, and minimize the risk of sharing unwanted VS Code settings across users, you can also use an `.apexdoxrc` (JSON) or `apexdox.yml` (YAML) file. If multiple configuration files happen to be present, the order of precedence is as follows:
1. apexdox.yml
2. .apexdoxrc
3. settings.json

### The ${workspaceFolder} Variable
For any setting that refers to a path on your file system, you can use the variable `${workspaceFolder}` to refer to the root folder of your project. If you have a multi-root setup, you can use `${workspaceFolder:directory-name}` to indicate the correct directory.

To avoid confusion, **please note** that this **_is not_** a supported VS Code feature. VS Code does support this and other variables in other settings files, however, in this case, ApexDox VS Code handles the necessary replacements in `settings.json`, `.apexdoxrc` and in `apexdox.yml` to make checking config into source control and sharing across machines easier.

### Documentation Engine Settings
Use these settings to configure the ApexDox documentation engine.

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| `apexdox.engine.source` | `object[]` |  An array of 'source' objects, each containing the required key `path`, an absolute path of a folder location which contains the Apex .cls files you'd like to document, and optionally a `sourceUrl` key, A URL where the .cls source files are hosted (so ApexDox can provide links to your source code throughout the documentation - confirmed to work with GitHub), e.g.: 'https:\//github.com/no-stack-dub-sack/MyFakeSFProject/tree/master/src/classes'. | If omitted, ApexDox VS Code will default this setting to a single entry with the `path` key defaulting to `${workspaceFolder}/src/classes` for non-DX projects, and `${workspaceFolder}/force-app/main/default/classes` for DX. |
| `apexdox.engine.targetDirectory` | `string` |  The Absolute path of the folder location where ApexDox documentation will be generated to.| `${workspaceFolder}/apex-documentation/` |
| `apexdox.engine.includes` | `string[]` | A case-sensitive array of file names and/or wildcard patterns that indicate which files in your source directory should be documented. Only simple leading and trailing wildcards are supported. E.g. `[ "NotificationsEmailer.cls", "*TriggerHandler.cls", "Contact*" ]` will result in the file 'NotificationsEmailer.cls' being processed, as well as any files that begin with 'Contact' or end with 'TriggerHandler.cls'. An empty array is treated as 'include all'. | `[]` |
| `apexdox.engine.excludes`| `string[]` | A case-sensitive array of file names and/or wildcard patterns that indicate which files in your source directory should NOT be documented. Only simple leading and trailing wildcards are supported. E.g. `[ "NotificationsEmailer.cls", "*TriggerHandler.cls", "Contact*" ]` will result in all files being processed EXCEPT 'NotificationsEmailer.cls' and those begin with 'Contact' or end with 'TriggerHandler.cls'. **Note** that files are excluded before they are included, so keep this in mind when using 'includes' and 'excludes' together. An empty array is treated as 'exclude none'. | `[]` |
| `apexdox.engine.homePagePath` | `string` | An absolute path of an HTML file that contains the project's 'home page' markup. Only the markup inside the `<body>` tags will be used, or if the file contains only a partial HTML page, e.g. `<h2>Cool!</h2>`, the entire contents will be used. | |
| `apexdox.engine.scope` | `string[]` | An array of access modifier scopes to document. | `[ 'global', 'public', 'protected', 'private', 'testMethod', 'webService' ]` |
| `apexdox.engine.title` | `string` | The value for the output HTML's `<title>` attribute, as well as the header text for the sidebar's banner / logo section. | `Apex Documentation` |
| `apexdox.engine.subtitle` | `string` | The subtitle for the sidebar's banner / logo section. | `Powered by ApexDox` |
| `apexdox.engine.showTOCSnippets` | `boolean` | If set to `false`, ApexDox will hide the method's description snippet in the class's table of contents. | `true` |
| `apexdox.engine.sortOrder` | `'logical' \| 'alpha'` | The order in which class methods, properties, and inner classes are presented to the user in your documentation. Either 'logical', the order they appear in the source file, or 'alpha', alphabetically.| `alpha` |
| `apexdox.engine.assets` | `string[]` | An array of absolute paths of files you would like to be included in the target directory's 'assets' folder (this is where ApexDox keeps its JavaScript, CSS, and images). For instance, if you'd like to include images in your banner, home page, or class group HTML files, include their path's here, and set the `<img>` tag's `src` attribute to be `./assets/yourImage.png`. If you'd like to override the default favicon, include a file named `favicon.png` in your assets array. | `[]` |
| `apexdox.engine.pages` | `string[]` | An array of absolute paths of non-ApexDox generated HTML files that you'd like to be available to your documentation. These files will be placed in your target directory alongside generated HTML files. For example, if you'd like to link to a page from your project's home page or from one of it's class group pages, include that page here. If your file's name is `MyCoolPage.html`, you can then link to it with `href=\"./MyCoolPage.html\"`. | `[]` |
| `apexdox.engine.cleanDir` | `boolean` | If set to `true`, ApexDox will run remove any files or folders in your target directory before creating your docs. | `false` |
| `apexdox.engine.port` | `number` | The port number that the `ApexDox: Open Docs` command will serve your docs on. | `8080` |

### Comment Block Settings
Use these settings to configure the appearance of ApexDox comment block stubs (see the [commands](#commands) section for how to contextually stub a comment block).

| Setting | Type | Description | Default |
|---------|------|-------------|---------|
| `apexdox.docblock.alignItems` | `boolean` | Vertically align anything after an ApexDox @tag. | `false` |
| `apexdox.docblock.omitDescriptionTag` | `boolean` | ApexDox `@description` tags are optional. Set this to `false` to include them in the comment block stub. | `true` |
| `apexdox.docblock.spacious` | `boolean` | When set to `true` ApexDox comment block stubs will add an empty line after the description line and before the next tag. | `false` |

### Minimum Settings Example
This is all that's required to run apexdox. Technically, you could skip this too, and if your project is a standard DX or Salesforce project, the defaults should pick up your source files, but it's better to be explicit.

**settings.json**:
```jsonc
{
    "apexdox.engine.targetDirectory": "${workspaceFolder}\\documentation",
    "apexdox.engine.source": [{
        "path": "${workspaceFolder}\\src\\classes"
    }]
}
```
**apexdox.yaml**:
```yaml
engine:
  targetDirectory: "${workspaceFolder}/documentation"
  source:
    - path: "${workspaceFolder}/src/classes"
```
**.apexdoxrc**:
```jsonc
{
  "engine": {
    "targetDirectory": "${workspaceFolder}/documentation",
    "source": [{
      "path": "${workspaceFolder}/src/classes"
    }]
  }
}
```

### Expanded Settings Example
See our [sample project](https://github.com/no-stack-dub-sack/apexdox-sample-app) for more complex configuration examples of all three config file flavors.

## Documenting Class Files
ApexDox scans each class file, and looks for comment blocks with special tags (identified by `@` similar to JS and JavaDoc), to find the documentation to include for a given class, interface, enum, method, or property. The comment blocks must always begin with `/**`, end with `*/`, and can cover multiple lines (each subsequent line must begin with `*` or whitespace and then `*`). Here's an example of the most basic ApexDox comment block:

```
/**
 * @description This is the description!
 */
```

### Documentation Tags
Note that in the table below, the 'Class' column includes any top-level types that live within a .cls file, including interfaces and enums. Tags are all optional and are located in the lines above the type's declaration.

| Tag | Description | Class | Method | Enum | Property |
|-------|-------------|-------|--------|------|----------|
| **@description** | A description or overview of the code you are documenting. | Y | Y | Y | Y |
| **@group** | The group to display a class under in the menu hierarchy. Un-grouped classes will be placed under 'Miscellaneous'. | Y | N | N | N |
| **@group-content** | A relative path (to the project's root directory) to a static HTML file that provides content about the class group. The group's menu item will be hyperlinked to this content, which will be parsed and placed into the documentation's content window. Only one group-content tag is required for all classes in the group. | Y | N | N | N |
| **@author** | The author of a class or method. | Y | Y | N | N |
| **@since** | The date a class or method was first implemented. | Y | Y | N | N |
| **@deprecated** | Indicates class or method should no longer be used; message should indicate replacement path. | Y | Y | N | N |
| **@example** | Example code usage. There may only be one `@example` tag per class or method. Start your example on the line below the tag. Code will be given syntax highlighting complements of [highlight.js](https://highlightjs.org/) and be wrapped in `<pre><code>` tags to preserve whitespace. | Y | Y | N | N |
| **@param** *param name* | A description of what a method's parameter does. | N | Y | N | N |
| **@returns** | A description of a method's return value. | N | Y | N | N |
| **@exception** | A description of or list of exceptions that a method throws. | N | Y | N | N |
| **@see** | A URL, markdown URL (e.g. '\[ApexDox\]\(https://github.com/no-stack-dub-sack/ApexDox-VS-Code)', or fully qualified class or method name. The latter creates link(s) to that class or method in the documentation. The name must be a fully qualified name, even if its a reference to another method in the same class, e.g. 'Class.Method', 'Class.InnerClass', 'Class.InnerClass.InnerClassMethod'. For overloaded constructors and methods, the `@see` tag accepts a special syntax: 'MyClass.MyInnerClass.MyOverloadedMethod[3]' where '3' is a zero based index indicating the overloaded method to link to (this would indicate the 4th overload of `MyOverloadedMethod`). When a link cannot be made, a tooltip will be shown on hover. There may be more than one `@see` tag per class / method. | Y | Y | N | N |

### Special Tokens
In addition to the `@tag`s listed above, there are a few other special tokens to be aware of:

| Token | Description |
|-------|-------------|
| `{@link}` | Unlike the `@see` tag, this syntax can be used in the text of any other tag to create inline links throughout your documentation. It accepts the same kinds of links as the `@see` tag (URL, markdown URL, or fully qualified class or method name; see `@see` description above), e.g. `{@link MyClass.MyInnerClass.MyOverloadedMethod[3]}` or `{@link https://github.com/no-stack-dub-sack/apexdox-vs-code}` |
| \` \` | Backticks, \` \`, can be used to indicate inline code within your ApexDox comments. E.g. \`String cool = 'cool!';\` &mdash; the expression within the backticks will be formatted as code. |
| &lt;br&gt; | The &lt;br&gt; tag can be used to render line breaks in your comments when more complex formatting is needed. &lt;br /&gt; is also acceptable. |

### Class Comments (includes class-level Interfaces and Enums)
Located in the lines above any top-level type that lives within a .cls file, or in the lines above inner classes and interfaces.

<p align="center">
    <a target="_blank" rel="noopener noreferrer"
        href="https://github.com/no-stack-dub-sack/apexdox-vs-code/blob/master/images/class-docblock.gif">
        <img src="https://github.com/no-stack-dub-sack/apexdox-vs-code/raw/master/images/class-docblock.gif"
             alt="Class Comment Example" style="max-width:100%;">
    </a>
</p>

### Method Comments
In order for ApexDox to best identify class methods, the method line must contain an explicit access modifier / scope: global, public, private, testMethod, webService (some implicitly private methods can be detected, but be wary of this. See the note on implicit privacy in the [Tips](#Tips) section below).

<p align="center">
    <a target="_blank" rel="noopener noreferrer"
        href="https://github.com/no-stack-dub-sack/apexdox-vs-code/blob/master/images/method-docblock.gif">
        <img src="https://github.com/no-stack-dub-sack/apexdox-vs-code/raw/master/images/method-docblock.gif"
             alt="Method Comment Example" style="max-width:100%;">
    </a>
</p>

### Property and Inner Enum Comments
These are the simplest comment blocks. They only support description tags (the tag itself may optionally be omitted for brevity). For properties to be detected by ApexDox, they **must** be given an explicit access modifier or have signatures beginning with the `static` keywork. **Other implicitly private properties will not be detected.**

<p align="center">
    <a target="_blank" rel="noopener noreferrer"
        href="https://github.com/no-stack-dub-sack/apexdox-vs-code/blob/master/images/prop-enum-docblock.PNG">
        <img src="https://github.com/no-stack-dub-sack/apexdox-vs-code/raw/master/images/prop-enum-docblock.PNG"
             alt="Prop / Inner Enum Comment Example" style="max-width:100%;">
    </a>
</p>

### Tips
- `@description` tags are optional; you may omit them. ApexDox comments without a tag will be interpreted as the type's description.
- All tags except `@see`, `@group`, and `@group-name` support comments over multiple lines.
- **Important note** on implicitly privacy: For ApexDox to best document your class files, it is generally best practice to always give your classes, methods, properties, interfaces, and emums explicit access modifiers. That said, ApexDox does have some ability to detect implicitly private types and methods. For instance, implicitly private `@IsTest` and inner classes, or methods whose signatures start with keywords like `void`, `abstract`, `override` and `virtual`, or with collections or primitive types can still be detected and will be assumed to be private (methods without access modifiers and whose signatures start with custom types or complex built-in types e.g. `Messaging.SendEmailResult[]` will not be detectable). However, in order to not confuse properties with local variables, properties *must* start with access modifiers or the `static` keyword in order to be detected. To best ensure accurate documentation, please always use access modifiers, which can only help to keep your code readable and easily understood!

## Known Issues
ApexDox2 uses some modern HTML5 tags and JavaScript features, so unfortunately Internet Explorer is not supported (namely `<summary>` and `<details>` for easy, script-less collapsible menus and sections).

## History
ApexDox VS Code is a complete TypeScript re-write of [a Java project, originally maintained by Salesforce](https://github.com/SalesforceFoundation/ApexDoc). After spending a considerable amount of time [enhancing the Java project](https://github.com/no-stack-dub-sack/ApexDoc2/blob/master/CHANGELOG.md), originally intended for re-release as ApexDoc2 (a command line tool), I decided that given the current state of Apex/Salesforce development, abandoning that in favor of a VS Code extension made much more sense. That being said, TypeScript was the obvious choice. In addition to re-writing (and in many cases modifying, and hopefully improving!) all of the program's core logic, several major enhancements to the original have been made, including new features that take advantage of the VS Code eco-system.

I hope you enjoy the new and improved ApexDox VS Code!
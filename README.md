# apexdoc2-vs-code README

ApexDoc2 is A fast, reliable, and configurable documentation generator for Salesforce Apex .cls files, using a JavaDoc-like inline comment syntax. Tell ApexDoc2 where your class files are, and it will generate a set of static HTML pages that fully document each class, including its properties, methods, enums, and annotations.

## Features

- Run ApexDoc2 and immediately launch your docs using the extension's built-in static server.
- Customizable project "Home" page, banner, and Class Group pages.
- Documentation can be easily linked to source code hosted on GitHub.
- Customize the favicon, and/or use your own logo, and other static assets in your docs.
- Produces clean, readable HTML output (complements of [pretty](https://github.com/jonschlinkert/pretty)).

## Commands

- **ApexDoc2: Run**: Run ApexDoc2
- **ApexDoc2: Open Docs**: Launch a server on localhost and open the generated documentation.

## Extension Settings

This extension contributes the following settings:

| Setting | Type | Required | Description |
|------|-----------|----------|-------------|
| `apexdoc2.config.sourceDirectory` | `string` | :heavy_check_mark: | Absolute path of the folder location which contains your Apex .cls files. |
| `apexdoc2.config.targetDirectory` | `string` | :heavy_check_mark: | Absolute path of the folder location where ApexDoc2 documentation will be generated to.|
| `apexdoc2.config.includes` | `string[]` |  | A case-sensitive array of file names and/or wildcard patterns that indicate which files in your source directory should be documented. Only simple leading and trailing wildcards are supported. E.g. `[ "NotificationsEmailer.cls", "\*TriggerHandler.cls", "Contact\*" ]` will result in the file 'NotificationsEmailer.cls' being processed, as well as any files that begin with 'Contact' or end with 'TriggerHandler.cls'. |
| `apexdoc2.config.excludes`| `string[]` |  | A case-sensitive array of file names and/or wildcard patterns that indicate which files in your source directory should NOT be documented. Only simple leading and trailing wildcards are supported. E.g. `[ "NotificationsEmailer.cls", "\*TriggerHandler.cls", "Contact\*" ]` will result in all files being processed EXCEPT 'NotificationsEmailer.cls' and those begin with 'Contact' or end with 'TriggerHandler.cls'. **Note** that files are excluded before they are included, so keep this in mind when using 'includes' and 'excludes' together. |
| `apexdoc2.config.sourceControlURL` | `string` |  | A URL where the .cls source files are hosted (so ApexDoc2 can provide links to your source - confirmed to work with GitHub), e.g.: 'https:\//github.com/no-stack-dub-sack/MyFakeSFProject/tree/master/src/classes'. |
| `apexdoc2.config.homePagePath` | `string` |  | An absolute path of an html file that contains the contents for the project's 'Home' page. |
| `apexdoc2.config.bannerPagePath` | `string` |  | An absolute path of an html file that contains the content for the banner section of each generated page.|
| `apexdoc2.config.scope` | `string[]` |  | An array of scopes to document. Default includes all scopes: 'global', 'public', 'protected', 'private', 'testMethod', 'webService'. |
| `apexdoc2.config.title` | `string` | | The value for the document's &lt;title&gt; attribute.  Defaults to 'Apex Documentation'. |
| `apexdoc2.config.showTOCSnippets` | `boolean` |  | If set to `false`, ApexDoc2 will hide the method's description snippet in the class's table of contents. Defaults to `true`. |
| `apexdoc2.config.sortOrder` | `'logical' \| 'alpha'` |  | The order in which class methods, properties, and inner classes are presented to the user in your documentation. Either 'logical', the order they appear in the source file, or 'alpha', alphabetically. Defaults to 'alpha'.|
| `apexdoc2.config.assets` | `string[]` |  | An array of absolute paths of files you would like to be included in the target directory's 'assets' folder. This is where ApexDoc2 keeps JavaScript, CSS, and images. For instance, if your banner or home page reference images, make their `src` attribute `./assets/yourImage.png`, include the image's path in this array, and ApexDoc2 will copy the image into this directory. This is also useful for overriding the default favicon. |
| `apexdoc2.config.cleanDir` | `boolean` |  | If set to `true`, ApexDoc2 will remove any files or folders in your target directory before creating your docs. Defaults to `false`. |
| `apexdoc2.config.port` | `number` |  | The port number that the `ApexDoc2: Open Docs` command will serve your docs on. Defaults to `8080`. |

### Example Configurations

Minimum Settings Example:

```json
{
    "apexdoc2.config.targetDirectory": "C:\\Users\\pweinberg\\Documents\\code\\documentation\\My Salesforce Project",
    "apexdoc2.config.sourceDirectory": "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\src\\classes"
}
```

Expanded Settings Example:

```json
{
    "apexdoc2.config": {
        "sourceDirectory": "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\src\\classes",
        "targetDirectory": "C:\\Users\\pweinberg\\Documents\\code\\documentation\\My Salesforce Project",
        "includes": [
            "NotificationsEmailer.cls",
            "*TriggerHandler.cls",
            "Contact*"
        ],
        "excludes": [ "*Test.cls" ],
        "sourceControlURL": "https://github.com/no-stack-dub-sack/MyFakeSFProject/tree/master/src/classes",
        "homePagePath": "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\assets\\Docs Home Page.html\\",
        "bannerPagePath": "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\assets\\Docs Banner.html\\",
        "scope": [
            "global",
            "public",
            "protected"
            "webService"
        ],
        "title": "My Salesforce Project",
        "showTOCSnippets": false,
        "sortOrder": "logical",
        "assets": [
            "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\assets\\My Project Logo.png",
            "C:\\Users\\pweinberg\\Documents\\code\\Salesforce\\assets\\favicon.png"
        ],
        "port": 5000,
        "cleanDir": true
    }
}
```

## Documenting Class Files
ApexDoc2 scans each class file, and looks for comment blocks with special keywords to identify the documentation to include for a given class, property, enum, or method.  The comment blocks must always begin with /** (or additional *'s) and can cover multiple lines.  Each line must start with * (or whitespace and then *).  The comment block ends with */.  Special tokens are called out with @token.

### Documentation Tokens
Note that in the table below, the 'Class' column includes any top-level types that live within a .cls file, including interfaces and enums. Tokens are all optional and are located in the lines above the type's declaration.

| Token | Description | Class | Method | Enum | Property |
|-------|-------------|-------|--------|------|----------|
| **@description** | A description or overview of the code you are documenting. | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: | :heavy_check_mark: |
| **@group** | The group to display a class under in the menu hierarchy. Un-grouped classes will be placed under 'Miscellaneous'. | :heavy_check_mark: | :x: | :x: | :x: |
| **@group-content** | A relative path (to the provided source directory) to a static HTML file that provides content about the group. The group will be hyperlinked to this content, which will be parsed and placed into the documentation's content window. | :heavy_check_mark: | :x: | :x: | :x: |
| **@author** | The author of a class or method. | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: |
| **@date** | The date a class or method was first implemented. | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: |
| **@deprecated** | Indicates class or method should no longer be used; message should indicate replacement path. | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: |
| **@example** | Example code usage. Start your example on the line below the token. Code will be given syntax highlighting complements of [highlight.js](https://highlightjs.org/) and be wrapped in `<pre><code>` tags to preserve whitespace. | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: |
| **@param** *param name* | A description of what a method's parameter does. | :x: | :heavy_check_mark: | :x: | :x: |
| **@return** | A description of a method's return value. | :x: | :heavy_check_mark: | :x: | :x: |
| **@exception** | A description of or list of exceptions that a method throws. | :x: | :heavy_check_mark: | :x: | :x: |
| **@see** | A comma separated list of URLs, markdown URLs (e.g. '\[ApexDoc2\]\(https://github.com/no-stack-dub-sack/ApexDoc2)', or fully qualified class or method names. The latter creates link(s) to that class or method in the documentation. The name must be a fully qualified name, even if its a reference to another method in the same class, e.g. 'Class.Method', 'Class.InnerClass', 'Class.InnerClass.InnerClassMethod'. For overloaded constructors and methods, the `@see` token accepts a special syntax: 'MyClass.MyInnerClass.MyOverloadedMethod[3]' where '3' is a zero based index indicating the overloaded method to link to (this would indicate the 4th overload of `MyOverloadedMethod`). When a link cannot be made, a tooltip will be shown on hover. | :heavy_check_mark: | :heavy_check_mark: | :x: | :x: |

### Special Tokens
In addition to the `@token`s listed above, there are a few other special tokens to be aware of:

| Token | Description |
|-------|-------------|
| \` \` | Backticks, \` \`, can be used to indicate inline code within your ApexDoc2 comments. E.g. \`String cool = 'cool!';\` &mdash; the expression within the backticks will be formatted as code. |
| &lt;br&gt; | The &lt;br&gt; tag can be used to render line breaks in your comments when more complex formatting is needed. &lt;br /&gt; is also acceptable. |

### Class Comments (includes class-level Interfaces and Enums)
Located in the lines above any top-level type that lives within a .cls file, or in the lines above inner classes and interfaces.

```apex
/**
* @author P. Weinberg
* @date 2014
*
* @group Core Framework
* @group-content ../../ApexDocContent/Core_Framework.html
* @deprecated Replaced by `JobExtension`
* @see `JobExtension`, `JobPluggable`
*
* @description This class is the base class from which all 'Plugins' will extend. It provides a suite of abstract and
* virtual methods, which implement the `JobPluggable` interface.
* <br><br>
* To ensure flexibility, all methods can be overridden to accommodate a particular plugin's needs.
*/
public abstract class JobPlugin implements JobPluggable {
```

### Property and Inner Enum Comments
These are the simplest comment blocks. They only accept description tokens (the token itself may optionally be omitted for brevity). For properties to be detected by ApexDoc2, they **must** be given an explicit access modifier or have signatures beginning with the `static` keywork. **Other implicitly private properties will not be detected.**

```apex
    /** The countries in which our accounts are located */
    public enum Countries { USA, CANADA, MEXICO, PERU, CHINA, RUSSIA, INDIA }

    /**
    * @description Specifies whether state and country picklists are enabled in this org.
    * Returns true if enabled.
    */
    public static Boolean isStateCountryPicklistsEnabled {
        get {
```

### Method Comments
In order for ApexDoc2 to best identify class methods, the method line must contain an explicit access modifier / scope: global, public, private, testMethod, webService (some implicitly private methods can be detected, but be wary of this. See the note on implicit privacy in the [Tips](#Tips) section below).

```apex
    /**
    * @description A utility method for returning field describe data
    * @param objectName the name of the object to look up
    * @param fieldName the name of the field to look up
    * @return the describe field result for the given field
    * @exception System.QueryException
    * @see Utils.getSObjectDescribe, Utils.getPicklistDescribe
    *
    * @example
    * // this is how getFieldDescribe works (the whitespace below will be preserved for complex examples)
    *
    * Schema.DescribeFieldResult result = Utils.getFieldDescribe('Account', 'Name');
    * System.debug(result);
    */
    public static Schema.DescribeFieldResult getFieldDescribe(String objectName, String fieldName) {
```

### Tips
- `@description` tokens are optional; you may omit them. ApexDoc2 comments without a token will be interpreted as the type's description.
- All tokens except `@group`, and `@group-name` support comments over multiple lines.
- Class and method annotations such as `@IsTest` or `@Future` will be displayed above the class or method's signature, while property annotations such as `@TestVisible` or `@InvocableProperty` will be displayed in the generated properties table.
- **Important note** on implicitly privacy: For ApexDoc2 to best document your class files, it is generally best practice to always give your classes, methods, properties, interfaces, and emums explicit access modifiers. That said, ApexDoc2 does have some ability to detect implicitly private types and methods. For instance, implicitly private `@IsTest` and inner classes, or methods whose signatures start with keywords like `void`, `abstract`, `override` and `virtual`, or with collections or primitive types can still be detected and will be assumed to be private (methods without access modifiers and whose signatures start with custom types or complex built-in types e.g. `Messaging.SendEmailResult[]` will not be detectable). However, in order to not confuse properties with local variables, properties *must* start with access modifiers or the `static` keyword in order to be detected. To best ensure accurate documentation, please always use access modifiers, which can only help to keep your code readable and easily understood!

## Known Issues

ApexDox2 uses some modern HTML5 tags and JavaScript features, so unfortunately Internet Explorer is not supported. If IE supported the HTML5 tags we use (namely `<summary>` and `<details>` for easy, script-less collapsible menus and sections), I would have made an effort to keep the JS supportable by IE, but since IE doesn't support the basic building blocks of the documentation, it made no sense to hold back on the JavaScript, even though there's very little of it.

## Release Notes

Placeholder

### 1.0.0

Initial release of ...
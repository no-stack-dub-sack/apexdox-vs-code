import * as Models from "../common/models";
import ApexDox from "./ApexDox";
import ApexDoxError from "../common/ApexDoxError";
import cheerio from "cheerio";
import ClassMarkupGenerator from "./generators/models/ClassMarkupGenerator";
import EnumMarkupGenerator from "./generators/models/EnumMarkupGenerator";
import fs from "fs";
import GeneratorUtils from "./generators/GeneratorUtils";
import LineReader from "../common/LineReader";
import MenuGenerator from "./generators/MenuGenerator";
import path from "path";
import pretty from "pretty";
import rimraf from "rimraf";
import { window } from "vscode";
import { ISourceEntry, Option, ILunrDocument, IApexDoxMenus } from "..";
import Utils from "../common/Utils";
import { EOL } from "os";

class FileManager {
  private path: string;
  private projectTitle: string;
  private userAssets: string[];

  public constructor(
    targetDirectory: string,
    projectTitle: string,
    assets: string[]
  ) {
    this.path = targetDirectory;
    this.userAssets = assets;
    this.projectTitle = projectTitle;
  }

  // ===========================================================================
  // #region Public API Methods
  // ===========================================================================

  /**
   * Collects the Apex .cls files the user has indicated they'd like to document via config settings.
   *
   * @param sources A list of `ISourceEntry` objects from where to collect our .cls files
   * @param includes See config settings: a list of patterns to include
   * @param excludes See config settings: a list of patterns to exclude
   */
  public getFiles(
    sources: ISourceEntry[],
    includes: string[],
    excludes: string[]
  ): ISourceEntry[] {
    const filesToCopy = new Array<ISourceEntry>(),
      noneFound = new Array<string>();

    const isEntryMatch = (entry: string, fileName: string) =>
      fileName === entry ||
      (entry.startsWith("*") && fileName.endsWith(entry.slice(1))) ||
      (entry.endsWith("*") && fileName.startsWith(entry.slice(0, -1)));

    for (let src of sources) {
      const files = this.getRecursiveListOfClsFiles(sources); //fs.readdirSync(src.path);

      if (files && files.some((file) => file.endsWith("cls"))) {
        files.forEach((fileName) => {
          // make sure entry is a file and is an apex class
          if (!fileName.endsWith(".cls")) {
            return;
          }

          // if file is explicitly excluded or matches wildcard, return early
          for (let entry of excludes) {
            if (isEntryMatch(entry, fileName)) {
              return;
            }
          }

          // no includes params, include file
          if (includes.length === 0) {
            filesToCopy.push({
              path: path.resolve(src.path, fileName),
              sourceUrl: src.sourceUrl,
            });
            return;
          }

          // there are includes params, only include files that pass test
          for (let entry of includes) {
            // file matches explicitly matches or matches wildcard
            if (isEntryMatch(entry, fileName)) {
              filesToCopy.push({
                path: path.resolve(src.path, fileName),
                sourceUrl: src.sourceUrl,
              });
              return;
            }
          }
        });
      } else {
        noneFound.push(src.path);
      }
    }

    if (!filesToCopy.length) {
      // no .cls files found at all, or all .cls files have been excluded, throw error
      const sourceDirs = sources.map((src) => src.path).join(",");
      throw new ApexDoxError(ApexDoxError.NO_FILES_FOUND(sourceDirs));
    } else if (noneFound.length) {
      // no .cls files found in one or more (but not all) of given source dirs, show warning
      window.showWarningMessage(
        `No matching .cls files found in ${noneFound.join(",")}`
      );
    }

    return filesToCopy;
  }

  /**
   * Main routine that creates HTML file for each of our classes and for any additional
   * pages that a user has included, e.g. home page, class group, supplementary.
   *
   * @param groupNameMap Map of our class group names to their ClassGroup instances
   * @param models Map of our model names to their TopLevelModel instances
   * @param pages Any additional pages, including the project home page, the user has included
   */
  public createDocs(
    groupNameMap: Map<string, Models.ClassGroup>,
    models: Map<string, Models.TopLevelModel>,
    pages: string[]
  ): void {
    // make the menu and the scoping panel
    // and initialize our main file map
    const fileMap = new Map<string, string>();
    const menus = {
      class: MenuGenerator.makeMenu(groupNameMap, models),
      scope: MenuGenerator.makeScopeMenu(),
    };

    // create the markup for our different varieties of HTML pages
    // and add to our file map. HTML files will be created from this map.
    this.makeSupplementaryPages(fileMap, menus, pages);
    this.makeClassGroupPages(fileMap, menus, groupNameMap);
    this.makeDocumentationPages(fileMap, menus, models);

    // Now finalize everything... Make our directories first
    // if they don't exist yet, then create our HTML files.
    // Lastly, copy our assets, ours first, then the users.
    // If they're using a favicon this will override ours.
    this.makeDirs();
    this.createHTMLFiles(fileMap);
    this.createSearchIndex(fileMap);
    this.copyAssetsToTarget(this.collectApexDoxAssets());
    this.copyAssetsToTarget(this.userAssets);
  }

  /**
   * Parses HTML files provided by the user, like class group pages,
   * and the project home page. Returns any content between
   * the <body> tags, or the entire markup if no <body> tags are present.
   * The extracted markup will be placed within the project's standard
   * page layout (header, menu, footer) for the final product.
   *
   * @param filePath The path of the HTML file to parse.
   * @returns string representing the markup or void.
   */
  public parseHTMLFile(filePath: string): Option<string, void> {
    if (!filePath.trim()) {
      return;
    }
    const contents = new LineReader(filePath).toString(false, EOL);
    if (contents) {
      const startIndex = contents.indexOf("<body>");
      const endIndex = contents.indexOf("</body>");
      if (startIndex !== -1 && endIndex !== -1) {
        return contents.substring(startIndex + 6, endIndex);
      } else if (startIndex === -1 && endIndex === -1) {
        return contents;
      }
    }
  }
  // #endregion
  // ===========================================================================

  // ===========================================================================
  // #region FS Utils
  // ===========================================================================

  private makeDirs(): void {
    const root = this.path;
    const assets = path.resolve(root, "assets");

    // clean directory first if user specified this
    ApexDox.config.cleanDir && rimraf.sync(root);

    if (!fs.existsSync(root)) {
      [root, assets].forEach((path) => fs.mkdirSync(path));
    } else if (fs.existsSync(root) && !fs.existsSync(assets)) {
      fs.mkdirSync(assets);
    }
  }

  private createHTMLFiles(fileMap: Map<string, string>): void {
    for (let fileName of fileMap.keys()) {
      let contents = Utils.preCodeTrim(pretty(<string>fileMap.get(fileName)));
      let fullyQualifiedFileName = path.resolve(this.path, fileName + ".html");
      fs.writeFileSync(fullyQualifiedFileName, contents);
    }
  }

  private createSearchIndex(fileMap: Map<string, string>): void {
    const searchIndex: ILunrDocument[] = [];
    fileMap.forEach((contents, fileName) => {
      let $ = cheerio.load(contents.replace(/(<\/\w+>)/g, "$1 "));

      // do some hacky replacements to keep
      // text as searchable as possible
      const plainText = $(".doc-page")
        .text()
        .replace(/\s\(/g, "(")
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => !!line);

      searchIndex.push({
        title: fileName === "index" ? "Home" : fileName,
        fileName: fileName + ".html",
        text: plainText.join(" "),
      });
    });

    fs.writeFileSync(
      path.resolve(this.path, "assets", "search-idx.js"),
      `export default ${JSON.stringify(searchIndex, null, 4)};\n`
    );
  }

  private collectApexDoxAssets(): string[] {
    const files = fs.readdirSync(path.resolve(ApexDox.extensionRoot, "assets"));
    return files.map((fileName) =>
      path.resolve(ApexDox.extensionRoot, "assets", fileName)
    );
  }

  private copyAssetsToTarget(files: string[]): void {
    files.forEach((file) => {
      if (fs.existsSync(file)) {
        fs.copyFileSync(
          file,
          path.resolve(this.path, "assets", path.basename(file))
        );
      } else {
        window.showWarningMessage(ApexDoxError.ASSET_NOT_FOUND(file));
      }
    });
  }
  // #endregion
  // ===========================================================================

  // ===========================================================================
  // #region Document Generators
  // ===========================================================================

  private makePage(contents: string, menus: IApexDoxMenus, title = "") {
    const pageTitle = title ? `<h2 class='section-title'>${title}</h2>` : "";

    const rows = [
      ["scoping-panel", menus.scope],
      ["doc-page", pageTitle + contents],
      ["footer", GeneratorUtils.footer],
    ];

    const html = `<!DOCTYPE html>
            <html lang="en">
            ${GeneratorUtils.makeHead(this.projectTitle)}
            <body>
                ${menus.class}
                <table id="content">
                ${GeneratorUtils.mapHTML(
                  rows,
                  ([className, contents]) =>
                    `<tr>
                        <td class="${className}">
                            ${contents}
                        </td>
                    </tr>`
                )}
                </table>
            </body>
            </html>`;

    return html;
  }

  public makeDocumentationPages(
    fileMap: Map<string, string>,
    menus: IApexDoxMenus,
    models: Map<string, Models.TopLevelModel>
  ): void {
    for (let model of models.values()) {
      let fileName = "";
      let contents = "";
      if (model.nameLine) {
        fileName = model.name;

        if (model.modelType === Models.ModelType.CLASS) {
          const cModel = <Models.ClassModel>model;
          contents += ClassMarkupGenerator.generate(cModel, models);

          // get child classes to work with in the order user specifies
          const childClasses =
            ApexDox.config.sortOrder === ApexDox.ORDER_ALPHA
              ? cModel.childClassesSorted
              : cModel.childClasses;

          // map over child classes, creating HTML, and concat result
          contents += childClasses
            .map((cmChild) => ClassMarkupGenerator.generate(cmChild, models))
            .join("");
        } else if (model.modelType === Models.ModelType.ENUM) {
          const eModel = <Models.EnumModel>model;
          contents += EnumMarkupGenerator.generate(eModel, models);
        }
      } else {
        continue;
      }

      fileMap.set(fileName, this.makePage(contents, menus));
    }
  }

  private makeSupplementaryPages(
    fileMap: Map<string, string>,
    menus: IApexDoxMenus,
    pages: string[]
  ): void {
    pages.forEach((pagePath, i) => {
      if (i === 0) {
        // our home page is always the first index
        const homePageContents = this.parseHTMLFile(pagePath);
        const markup = this.makePage(
          homePageContents || GeneratorUtils.defaultHomePage,
          menus,
          "Home"
        );
        fileMap.set("index", markup);
      } else {
        const contents = this.parseHTMLFile(pagePath);
        if (contents) {
          const markup = this.makePage(contents, menus);
          fileMap.set(
            path.basename(pagePath.substring(0, pagePath.lastIndexOf("."))),
            markup
          );
        }
      }
    });
  }

  private makeClassGroupPages(
    fileMap: Map<string, string>,
    menus: IApexDoxMenus,
    classGroupMap: Map<string, Models.ClassGroup>
  ): void {
    for (let group of classGroupMap.keys()) {
      const cg = classGroupMap.get(group);
      if (cg && cg.contentSource) {
        const cgContent = this.parseHTMLFile(cg.contentSource);
        if (cgContent) {
          let markup = this.makePage(
            cgContent,
            menus,
            GeneratorUtils.encodeText(cg.name, false)
          );
          fileMap.set(cg.contentFileName, markup);
        }
      }
    }
  }

  private getRecursiveListOfClsFiles(sourceDirs: ISourceEntry[]) {
    files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    files.forEach(function (file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
      } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file));
      }
    });

    return arrayOfFiles;
  }

  // #endregion
  // ===========================================================================
}

export default FileManager;

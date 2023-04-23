import LineReader from './common/LineReader';
import { StubType } from './docblock/StubBase';
import { TextLine } from 'vscode';

declare namespace ApexDox {

    /** ============================================================
     *  Config / Settings Types
     *  ============================================================
     */
    interface ISourceEntry {
        path: string;
        sourceUrl?: string;
        relativePath: string;
    }

    interface IEngineConfig {
        source: ISourceEntry[];
        targetDirectory: string;
        includes: string[];
        excludes: string[];
        homePagePath: string;
        scope: string[];
        title: string;
        subtitle: string;
        showTOCSnippets: boolean;
        sortOrder: string;
        cleanDir: boolean;
        assets: string[];
        pages: string[];
        port: number;
    }

    interface IDocblockConfig {
        alignItems: boolean;
        omitDescriptionTag: boolean;
        spacious: boolean;
    }

    interface IApexDoxRc {
        engine: IEngineConfig;
        docblock: IDocblockConfig;
    }

    /** ============================================================
     *  Documentation Engine Interfaces
     *  ============================================================
     */
    interface IMethodParam {
        name: string;
        type?: string;
        description: string;
    }

    interface IParsedMethod {
        name: string;
        params: string[];
        returnType: string;
        throwsException: boolean;
    }

    interface ILunrDocument {
        title: string;
        fileName: string;
        text: string;
    }

    interface IApexDoxMenus {
        class: string;
        scope: string;
    }

    /** ============================================================
     *  Docblock Types
     *  ============================================================
     */
    interface IMethodMatch {
        foundMatch: boolean;
        selector: string;
        methodName: string;
    }

    interface IStubLine {
        insertNewLine: boolean;
        line: TextLine;
        lineIndex: number;
        type: StubType;
        indent: number;
    }

    interface IPairCount {
        openCurlies: number;
        closeCurlies: number;
        openParens: number;
        closeParens: number;
    }

    interface IApexDoxTag {
        label: string;
        documentation: string;
        snippet: string;
    }

    /** ============================================================
     *  Miscellaneous Types
     *  ============================================================
     */
    type Option<T, V = undefined> = T | V;

    interface IOnlyExcept {
        <T>(arr: T[], by: T[]): T[];
        <T, K extends keyof T>(arr: T[], by: T[K][], on: K): T[];
    }

    interface ITestFile {
        reader: LineReader;
        name: string;
        snapshot: string;
    }

}

export = ApexDox;

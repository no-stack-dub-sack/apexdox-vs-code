import docBlockCompletion from './docBlockCompletion';
import docTagCompletion from './docTagCompletion';
import insertDocBlock from './insertDocBlock';
import onEnterRules from './onEnterRules';
import runApexDoc from './runApexDoc';
import serveDocs from './serveDocs';
import { Disposable, ExtensionContext } from 'vscode';

export type ApexDoc2Command = (context: ExtensionContext) => Disposable;

export default [
    docBlockCompletion,
    docTagCompletion,
    insertDocBlock,
    onEnterRules,
    runApexDoc,
    serveDocs
] as ApexDoc2Command[];

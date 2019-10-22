import docBlockCompletion from './docBlockCompletion';
import docTagCompletion from './docTagCompletion';
import insertDocBlock from './insertDocBlock';
import onEnterRules from './onEnterRules';
import runApexDox from './runApexDox';
import serveDocs from './serveDocs';
import { Disposable, ExtensionContext } from 'vscode';

export type ApexDoxCommand = (context: ExtensionContext) => Disposable;

export default [
    docBlockCompletion,
    docTagCompletion,
    insertDocBlock,
    onEnterRules,
    runApexDox,
    serveDocs
] as ApexDoxCommand[];

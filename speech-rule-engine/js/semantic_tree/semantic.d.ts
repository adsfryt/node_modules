import { SemanticFont, SemanticRole, SemanticType } from './semantic_meaning';
import { SemanticTree } from './semantic_tree';
export declare type Font = SemanticFont;
export declare type Role = SemanticRole;
export declare type Type = SemanticType;
declare type Attr = Font | Role | Type;
export { Attr };
export declare function xmlTree(mml: Element): Element;
export declare function getTree(mml: Element): SemanticTree;
export declare function getTreeFromString(expr: string): SemanticTree;
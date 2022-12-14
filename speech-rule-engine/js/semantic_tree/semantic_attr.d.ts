import { SemanticMeaning, SemanticRole, SemanticType } from './semantic_meaning';
export declare const allLettersRegExp: RegExp;
export declare function equal(meaning1: SemanticMeaning, meaning2: SemanticMeaning): boolean;
export declare function lookupType(symbol: string): SemanticType;
export declare function lookupRole(symbol: string): SemanticRole;
export declare function lookupMeaning(symbol: string): SemanticMeaning;
export declare function invisibleTimes(): string;
export declare function invisiblePlus(): string;
export declare function invisibleComma(): string;
export declare function functionApplication(): string;
export declare function isMatchingFence(open: string, close: string): boolean;
export declare function isEmbellishedType(type: SemanticType): boolean;
export declare function lookupSecondary(kind: string, char: string): any;

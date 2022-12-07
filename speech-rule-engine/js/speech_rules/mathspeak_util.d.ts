import { SpeechRuleStore } from '../rule_engine/speech_rule_store';
import * as Semantic from '../semantic_tree/semantic';
import { SemanticType } from '../semantic_tree/semantic_meaning';
import { SemanticNode } from '../semantic_tree/semantic_node';
export declare function spaceoutText(node: Element): string;
export declare function spaceoutNodes(node: Element, correction: (p1: SemanticNode) => any): Element[];
export declare function spaceoutNumber(node: Element): Element[];
export declare function spaceoutIdentifier(node: Element): Element[];
export declare const nestingBarriers: SemanticType[];
export declare function resetNestingDepth(node: Element): Element[];
export declare function getNestingDepth(type: string, node: Element, tags: string[], opt_barrierTags?: Semantic.Attr[], opt_barrierAttrs?: {
    [key: string]: string;
}, opt_func?: (p1: Element) => boolean): number;
export declare function containsAttr(node: Element, attrs: {
    [key: string]: string;
}): boolean;
export declare function computeNestingDepth_(node: Element, tags: string[], barriers: string[], attrs: {
    [key: string]: string;
}, func: (p1: Element) => boolean, depth: number): number;
export declare function fractionNestingDepth(node: Element): number;
export declare function nestedFraction(node: Element, expr: string, opt_end?: string): string;
export declare function openingFractionVerbose(node: Element): string;
export declare function closingFractionVerbose(node: Element): string;
export declare function overFractionVerbose(node: Element): string;
export declare function openingFractionBrief(node: Element): string;
export declare function closingFractionBrief(node: Element): string;
export declare function openingFractionSbrief(node: Element): string;
export declare function closingFractionSbrief(node: Element): string;
export declare function overFractionSbrief(node: Element): string;
export declare function isSmallVulgarFraction(node: Element): Element[];
export declare function nestedSubSuper(node: Element, init: string, replace: {
    sup: string;
    sub: string;
}): string;
export declare function subscriptVerbose(node: Element): string;
export declare function subscriptBrief(node: Element): string;
export declare function superscriptVerbose(node: Element): string;
export declare function superscriptBrief(node: Element): string;
export declare function baselineVerbose(node: Element): string;
export declare function baselineBrief(node: Element): string;
export declare function radicalNestingDepth(node: Element): number;
export declare function nestedRadical(node: Element, prefix: string, postfix: string): string;
export declare function getRootIndex(node: Element): string;
export declare function openingRadicalVerbose(node: Element): string;
export declare function closingRadicalVerbose(node: Element): string;
export declare function indexRadicalVerbose(node: Element): string;
export declare function openingRadicalBrief(node: Element): string;
export declare function closingRadicalBrief(node: Element): string;
export declare function indexRadicalBrief(node: Element): string;
export declare function openingRadicalSbrief(node: Element): string;
export declare function indexRadicalSbrief(node: Element): string;
export declare function underscoreNestingDepth(node: Element): number;
export declare function nestedUnderscript(node: Element): string;
export declare function overscoreNestingDepth(node: Element): number;
export declare function endscripts(_node: Element): string;
export declare function nestedOverscript(node: Element): string;
export declare function determinantIsSimple(node: Element): Element[];
export declare function generateBaselineConstraint(): string[];
export declare function removeParens(node: Element): string;
export declare function generateTensorRules(store: SpeechRuleStore, brief?: boolean): void;
export declare function smallRoot(node: Element): Element[];
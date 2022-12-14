import { AuditoryDescription } from '../audio/auditory_description';
import { SemanticNode } from '../semantic_tree/semantic_node';
export declare function computeSpeech(xml: Element): AuditoryDescription[];
export declare function recomputeSpeech(semantic: SemanticNode): AuditoryDescription[];
export declare function computeMarkup(tree: Element): string;
export declare function recomputeMarkup(semantic: SemanticNode): string;
export declare function addSpeech(mml: Element, semantic: SemanticNode, snode: Element): void;
export declare function addModality(mml: Element, semantic: SemanticNode, modality: string): void;
export declare function addPrefix(mml: Element, semantic: SemanticNode): void;
export declare function retrievePrefix(semantic: SemanticNode): string;
export declare function computePrefix_(semantic: SemanticNode): AuditoryDescription[];
export declare function nodeAtPosition_(semantic: SemanticNode, nodes: Element[]): Element;
export declare function connectMactions(node: Element, mml: Element, stree: Element): void;
export declare function connectAllMactions(mml: Element, stree: Element): void;
export declare function retrieveSummary(node: Element): string;
export declare function computeSummary_(node: Element): AuditoryDescription[];

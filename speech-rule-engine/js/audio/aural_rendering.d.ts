import * as EngineConst from '../common/engine_const';
import { AudioRenderer } from './audio_renderer';
import { AuditoryDescription } from './auditory_description';
import { Span } from './span';
export declare function setSeparator(sep: string): void;
export declare function getSeparator(): string;
export declare function markup(descrs: AuditoryDescription[]): string;
export declare function merge(strs: (Span | string)[]): string;
export declare function finalize(str: string): string;
export declare function error(key: string): string;
export declare function registerRenderer(type: EngineConst.Markup, renderer: AudioRenderer): void;
export declare function isXml(): boolean;
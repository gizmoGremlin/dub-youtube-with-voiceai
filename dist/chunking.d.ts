export interface Segment {
    index: number;
    title: string;
    slug: string;
    text: string;
    source: 'heading' | 'auto' | 'template';
    hash: string;
}
export type ChunkMode = 'headings' | 'auto';
export type TemplateName = 'youtube' | 'podcast' | 'shortform';
export interface ChunkOptions {
    mode: ChunkMode;
    maxChars: number;
    language?: string;
    template?: TemplateName;
    templateDir: string;
    voiceId: string;
}
/** Split markdown by ## headings into segments. */
export declare function parseMarkdownHeadings(content: string): {
    title: string;
    text: string;
}[];
/** Split text into chunks of ~maxChars, respecting sentence boundaries. */
export declare function autoChunk(content: string, maxChars: number): {
    title: string;
    text: string;
}[];
/** Full chunking pipeline: parse → chunk → apply templates → number & hash. */
export declare function chunkScript(content: string, options: ChunkOptions): Promise<Segment[]>;

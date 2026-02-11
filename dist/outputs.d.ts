import { type Segment } from './chunking.js';
import { type RenderResult } from './render.js';
import { type MuxResult } from './ffmpeg.js';
export interface ManifestData {
    title: string;
    voice_id: string;
    voice_name?: string;
    template?: string;
    language: string;
    mock: boolean;
    segments: {
        index: number;
        title: string;
        source_text: string;
        text_hash: string;
        file_path: string;
        duration_seconds: number;
    }[];
    created_at: string;
    total_duration_seconds: number;
}
export declare function buildManifest(title: string, voiceId: string, voiceName: string | undefined, template: string | undefined, language: string, mock: boolean, results: RenderResult[]): ManifestData;
export interface TimelineEntry {
    index: number;
    title: string;
    start_seconds: number;
    duration_seconds: number;
    end_seconds: number;
}
export interface TimelineData {
    segments: TimelineEntry[];
    total_duration_seconds: number;
    has_durations: boolean;
}
export declare function buildTimeline(results: RenderResult[]): TimelineData;
export declare function buildChapters(timeline: TimelineData): string | null;
export declare function buildCaptionsSrt(timeline: TimelineData, segments: Segment[]): string | null;
export declare function buildDescription(title: string, chapters: string | null): string;
export declare function buildReviewHtml(title: string, results: RenderResult[], timeline: TimelineData, hasMaster: boolean, voiceId: string, mock: boolean): string;
export interface WriteOutputsOptions {
    outputDir: string;
    title: string;
    voiceId: string;
    voiceName?: string;
    template?: string;
    language: string;
    mock: boolean;
    results: RenderResult[];
    segments: Segment[];
    hasMaster: boolean;
    muxResult?: MuxResult;
}
export declare function writeAllOutputs(opts: WriteOutputsOptions): Promise<void>;

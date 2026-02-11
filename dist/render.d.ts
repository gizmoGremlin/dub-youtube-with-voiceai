import { type Segment } from './chunking.js';
import { type VoiceAIClient } from './api.js';
export interface RenderOptions {
    voiceId: string;
    outputDir: string;
    force: boolean;
    mock: boolean;
    language?: string;
}
export interface RenderResult {
    segment: Segment;
    filePath: string;
    fileName: string;
    cached: boolean;
    duration: number;
}
export declare function renderSegments(segments: Segment[], client: VoiceAIClient, options: RenderOptions): Promise<RenderResult[]>;

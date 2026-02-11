export type SyncPolicy = 'shortest' | 'pad' | 'trim';
export interface MuxOptions {
    videoPath: string;
    audioPath: string;
    outputPath: string;
    syncPolicy: SyncPolicy;
}
export interface MuxResult {
    success: boolean;
    outputPath: string;
    videoDuration: number | null;
    audioDuration: number | null;
    syncPolicy: SyncPolicy;
    ffmpegCommand: string;
    error?: string;
}
export interface FfmpegAvailability {
    ffmpeg: boolean;
    ffprobe: boolean;
}
export declare function checkFfmpeg(): Promise<FfmpegAvailability>;
export declare function probeDuration(filePath: string): Promise<number | null>;
export declare function stitchSegments(segmentPaths: string[], outputPath: string): Promise<boolean>;
export declare function encodeToMp3(inputPath: string, outputPath: string): Promise<boolean>;
export declare function normalizeLoudness(inputPath: string, outputPath: string): Promise<boolean>;
export declare function muxAudioVideo(opts: MuxOptions): Promise<MuxResult>;
export declare function generateMuxScripts(videoPath: string, audioPath: string, outputPath: string, syncPolicy: SyncPolicy, outDir: string): Promise<void>;

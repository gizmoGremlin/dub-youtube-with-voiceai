export interface ReplaceAudioOptions {
    video: string;
    audio: string;
    out?: string;
    sync?: string;
}
export declare function replaceAudioCommand(opts: ReplaceAudioOptions): Promise<void>;

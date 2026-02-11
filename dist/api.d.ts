export declare const AUDIO_FORMATS: {
    readonly MP3: "mp3";
    readonly WAV: "wav";
    readonly PCM: "pcm";
    readonly MP3_44100_128: "mp3_44100_128";
    readonly MP3_44100_192: "mp3_44100_192";
    readonly WAV_22050: "wav_22050";
    readonly WAV_24000: "wav_24000";
};
export declare const MODELS: {
    readonly TTS_V1_LATEST: "voiceai-tts-v1-latest";
    readonly MULTILINGUAL_V1_LATEST: "voiceai-tts-multilingual-v1-latest";
};
export declare const LANGUAGES: {
    readonly en: "English";
    readonly es: "Spanish";
    readonly fr: "French";
    readonly de: "German";
    readonly it: "Italian";
    readonly pt: "Portuguese";
    readonly pl: "Polish";
    readonly ru: "Russian";
    readonly nl: "Dutch";
    readonly sv: "Swedish";
    readonly ca: "Catalan";
};
export interface Voice {
    id: string;
    name: string;
    language: string;
    visibility?: string;
    status?: string;
    gender?: string;
    style?: string;
    description?: string;
}
export interface TTSRequest {
    text: string;
    voice_id: string;
    audio_format?: string;
    temperature?: number;
    top_p?: number;
    model?: string;
    language?: string;
}
export interface TTSResponse {
    audio_data: Buffer;
    duration_seconds: number;
    sample_rate: number;
    format: string;
}
export interface VoiceListResponse {
    voices: Voice[];
    total: number;
}
export declare const POPULAR_VOICES: Voice[];
/** Shorthand name → real voice_id lookup. */
export declare const VOICE_ALIASES: Record<string, string>;
/** Resolve a voice alias ("ellie") or pass through a UUID unchanged. */
export declare function resolveVoiceId(input: string): string;
/** Read the Voice.ai API key from environment (supports both naming conventions). */
export declare function getApiKey(): string | undefined;
export declare class VoiceAIClient {
    private apiKey;
    readonly mock: boolean;
    private baseUrl;
    constructor(options: {
        apiKey?: string;
        mock?: boolean;
    });
    private endpoint;
    listVoices(options?: {
        limit?: number;
        query?: string;
        offset?: number;
    }): Promise<VoiceListResponse>;
    generateSpeech(request: TTSRequest, tmpDir?: string): Promise<TTSResponse>;
    /** Single TTS API call (text must be ≤ 500 chars). */
    private callTtsEndpoint;
    private mockListVoices;
    private filterVoices;
    private mockGenerateSpeech;
}

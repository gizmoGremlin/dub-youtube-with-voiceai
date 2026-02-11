export interface BuildOptions {
    input: string;
    voice: string;
    title?: string;
    template?: string;
    mode?: string;
    maxChars?: string;
    language?: string;
    video?: string;
    mux?: boolean;
    sync?: string;
    force?: boolean;
    mock?: boolean;
    out?: string;
}
export declare function buildCommand(opts: BuildOptions): Promise<void>;

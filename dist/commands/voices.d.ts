export interface VoicesOptions {
    limit?: string;
    query?: string;
    mock?: boolean;
}
export declare function voicesCommand(opts: VoicesOptions): Promise<void>;

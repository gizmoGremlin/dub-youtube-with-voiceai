/** Slugify a string for safe filenames and directory names. */
export declare function slugify(text: string): string;
/** Zero-pad a number (e.g. 3 → "003"). */
export declare function zeroPad(n: number, width?: number): string;
/** SHA-256 content hash (first 16 hex chars). */
export declare function contentHash(...parts: string[]): string;
/** Format seconds → "M:SS" or "H:MM:SS". */
export declare function formatDuration(seconds: number): string;
/** Format seconds → "HH:MM:SS" (YouTube chapter format). */
export declare function formatTimestamp(seconds: number): string;
/** Format seconds → YouTube-friendly "M:SS" or "H:MM:SS" (no leading zero on hours). */
export declare function youtubeTimestamp(seconds: number): string;
/** Format seconds → SRT timestamp "HH:MM:SS,mmm". */
export declare function srtTimestamp(seconds: number): string;
/** Create directory (recursive). */
export declare function ensureDir(dirPath: string): Promise<void>;
/** Write file, creating parent directories as needed. */
export declare function writeOutputFile(filePath: string, content: string | Buffer): Promise<void>;
/** Check if a path exists. */
export declare function fileExists(filePath: string): Promise<boolean>;
/** Read a text file to string. */
export declare function readTextFile(filePath: string): Promise<string>;

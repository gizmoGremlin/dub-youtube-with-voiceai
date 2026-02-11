/**
 * TTS rendering pipeline — sends segments to Voice.ai and manages caching.
 */
import { join } from 'node:path';
import { readFile } from 'node:fs/promises';
import chalk from 'chalk';
import { probeDuration } from './ffmpeg.js';
import { zeroPad, slugify, ensureDir, writeOutputFile, fileExists } from './utils.js';
/* ------------------------------------------------------------------ */
/*  Cache management                                                   */
/* ------------------------------------------------------------------ */
function cacheManifestPath(outputDir) {
    return join(outputDir, 'segments', '.cache.json');
}
async function loadCacheManifest(outputDir) {
    const path = cacheManifestPath(outputDir);
    if (await fileExists(path)) {
        try {
            const raw = await readFile(path, 'utf-8');
            return JSON.parse(raw);
        }
        catch {
            return {};
        }
    }
    return {};
}
async function saveCacheManifest(outputDir, manifest) {
    await writeOutputFile(cacheManifestPath(outputDir), JSON.stringify(manifest, null, 2));
}
/* ------------------------------------------------------------------ */
/*  Segment rendering                                                  */
/* ------------------------------------------------------------------ */
function segmentFileName(segment) {
    return `${zeroPad(segment.index)}-${segment.slug || slugify(segment.title)}.wav`;
}
function segmentCacheKey(segment) {
    return `${zeroPad(segment.index)}-${segment.slug}`;
}
export async function renderSegments(segments, client, options) {
    const segDir = join(options.outputDir, 'segments');
    await ensureDir(segDir);
    // Load cache
    const cache = options.force ? {} : await loadCacheManifest(options.outputDir);
    const results = [];
    let cachedCount = 0;
    let newCount = 0;
    // Determine what needs rendering
    for (const segment of segments) {
        const key = segmentCacheKey(segment);
        const fileName = segmentFileName(segment);
        const filePath = join(segDir, fileName);
        const currentHash = segment.hash;
        // Check cache: hash match + file exists
        if (!options.force &&
            cache[key]?.hash === currentHash &&
            cache[key]?.file === fileName &&
            (await fileExists(filePath))) {
            cachedCount++;
            results.push({
                segment,
                filePath,
                fileName,
                cached: true,
                duration: cache[key].duration,
            });
        }
        else {
            newCount++;
            results.push({
                segment,
                filePath,
                fileName,
                cached: false,
                duration: 0,
            });
        }
    }
    // Progress header
    const mockLabel = options.mock ? chalk.yellow(' [mock]') : '';
    console.log(chalk.cyan(`\n🎙  Rendering ${segments.length} segments…`) +
        chalk.gray(` (${cachedCount} cached, ${newCount} new)`) +
        mockLabel);
    // Render new segments
    const updatedCache = { ...cache };
    for (const result of results) {
        if (result.cached) {
            console.log(chalk.gray(`   ✓ ${result.fileName} (cached)`));
            continue;
        }
        const { segment } = result;
        process.stdout.write(chalk.white(`   ⏳ ${result.fileName}…`));
        try {
            const ttsResponse = await client.generateSpeech({
                text: segment.text,
                voice_id: options.voiceId,
                audio_format: 'wav',
                language: options.language,
            });
            await writeOutputFile(result.filePath, ttsResponse.audio_data);
            // Get accurate duration from ffprobe if available, else use API estimate
            const probed = await probeDuration(result.filePath);
            result.duration = probed ?? ttsResponse.duration_seconds;
            // Update cache
            updatedCache[segmentCacheKey(segment)] = {
                hash: segment.hash,
                file: result.fileName,
                duration: ttsResponse.duration_seconds,
            };
            process.stdout.write(`\r   ${chalk.green('✓')} ${result.fileName} ${chalk.gray(`(${ttsResponse.duration_seconds.toFixed(1)}s)`)}\n`);
        }
        catch (err) {
            process.stdout.write(`\r   ${chalk.red('✗')} ${result.fileName}\n`);
            throw new Error(`Failed to render segment "${segment.title}": ${err}`);
        }
    }
    // Save updated cache
    await saveCacheManifest(options.outputDir, updatedCache);
    const totalDuration = results.reduce((sum, r) => sum + r.duration, 0);
    console.log(chalk.green(`\n   ✅ All segments rendered`) +
        chalk.gray(` — total duration: ${totalDuration.toFixed(1)}s`));
    return results;
}
//# sourceMappingURL=render.js.map
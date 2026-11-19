// gta6-meme-x-01: the entry is the X post itself. This program only hands
// the house the post's address by copying POST.json into /output, where the
// gate reads it. Nothing else here is judged.
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const botDir = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

mkdirSync(outDir, { recursive: true });
const post = readFileSync(join(botDir, 'POST.json'), 'utf8');
// Fail loudly on a malformed address file instead of copying garbage.
const parsed = JSON.parse(post) as { url?: unknown };
if (typeof parsed.url !== 'string' || !parsed.url.startsWith('https://')) {
  throw new Error('POST.json has no https url');
}
writeFileSync(join(outDir, 'POST.json'), post);

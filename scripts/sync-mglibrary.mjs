import { copyFile, cp, mkdir, readFile, rm, writeFile } from 'node:fs/promises';
import { basename, join, resolve } from 'node:path';

if (!process.argv[2]) throw new Error('Usage: node scripts/sync-mglibrary.mjs /path/to/library/site');
const source = resolve(process.argv[2]);
const destination = new URL('../mglibrary/', import.meta.url);
const original = await readFile(join(source, 'index.html'), 'utf8');
if (!original.includes('window.MOTION_LIBRARY') && !original.includes('catalog.js')) {
  throw new Error('Source must be the published motion library site folder.');
}
await rm(destination, { recursive: true, force: true });
await mkdir(destination, { recursive: true });
for (const name of ['app.js', 'catalog.js', 'sources.js', 'styles.css', 'CATALOG.md', 'PROMPTS.md']) {
  await copyFile(join(source, name), new URL(name, destination));
}
for (const name of ['fonts', 'media', 'posters', 'source']) {
  await cp(join(source, name), new URL(name, destination), {
    recursive: true,
    filter: file => !basename(file).startsWith('.'),
  });
}
// Resolve all relative assets under /mglibrary, with or without a trailing slash.
const html = original.replace('<head>', '<head><base href="/mglibrary/"><meta name="robots" content="noindex, nofollow">');
await writeFile(new URL('index.html', destination), html);
console.log('Synchronized the published library; original project files were not changed.');

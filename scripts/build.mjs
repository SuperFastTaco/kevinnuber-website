import { copyFile, cp, mkdir, rm } from 'node:fs/promises';
import { basename } from 'node:path';

// An explicit allowlist keeps archived content out of the public deployment.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../dist/', import.meta.url));
for (const name of ['index.html', 'favicon.svg', 'robots.txt']) {
  await copyFile(new URL(`../${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}
await cp(new URL('../mglibrary/', import.meta.url), new URL('../dist/mglibrary/', import.meta.url), {
  recursive: true,
  filter: source => !basename(source).startsWith('.'),
});
console.log('Built the personal homepage and unlisted motion graphics library.');

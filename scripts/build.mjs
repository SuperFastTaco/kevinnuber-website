import { copyFile, mkdir, rm } from 'node:fs/promises';

// An explicit allowlist keeps archived content out of the public deployment.
await rm(new URL('../dist/', import.meta.url), { recursive: true, force: true });
await mkdir(new URL('../dist/', import.meta.url));
for (const name of ['index.html', 'favicon.svg', 'robots.txt']) {
  await copyFile(new URL(`../${name}`, import.meta.url), new URL(`../dist/${name}`, import.meta.url));
}
console.log('Built the personal coming-soon page (3 static files).');

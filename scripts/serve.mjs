import { createServer } from 'node:http';
import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { extname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const port = Number(process.env.PORT || 4173);
const root = fileURLToPath(new URL('../dist/', import.meta.url));
const contentTypes = {
  '.html': 'text/html; charset=utf-8', '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8', '.md': 'text/plain; charset=utf-8',
  '.tsx': 'text/plain; charset=utf-8', '.ts': 'text/plain; charset=utf-8',
  '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8', '.jpg': 'image/jpeg',
  '.png': 'image/png', '.ttf': 'font/ttf', '.mp4': 'video/mp4',
};
createServer(async (request, response) => {
  try {
    const pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname);
    let file = resolve(root, '.' + pathname);
    if (file !== resolve(root) && !file.startsWith(root)) {
      response.writeHead(400); response.end(); return;
    }
    if ((await stat(file).catch(() => null))?.isDirectory()) file = join(file, 'index.html');
    let info = await stat(file).catch(() => null);
    if (!info?.isFile()) {
      file = join(root, pathname === '/mglibrary' || pathname.startsWith('/mglibrary/') ? 'mglibrary/index.html' : 'index.html');
      info = await stat(file);
    }
    const headers = { 'Content-Type': contentTypes[extname(file)] || 'application/octet-stream', 'X-Robots-Tag': 'noindex, nofollow', 'X-Content-Type-Options': 'nosniff', 'Accept-Ranges': 'bytes' };
    let start = 0, end = info.size - 1, status = 200;
    if (request.headers.range) {
      const range = /^bytes=(\d*)-(\d*)$/.exec(request.headers.range);
      if (range && (range[1] || range[2])) {
        start = range[1] ? Number(range[1]) : Math.max(0, info.size - Number(range[2]));
        end = range[1] && range[2] ? Math.min(Number(range[2]), end) : end;
        if (start > end || start >= info.size) {
          response.writeHead(416, { 'Content-Range': `bytes */${info.size}` }); response.end(); return;
        }
        status = 206; headers['Content-Range'] = `bytes ${start}-${end}/${info.size}`;
      }
    }
    headers['Content-Length'] = end - start + 1;
    response.writeHead(status, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(file, { start, end }).pipe(response);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Run npm run build before starting the preview.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));

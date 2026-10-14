import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const port = Number(process.env.PORT || 4173);
createServer(async (request, response) => {
  const pathname = new URL(request.url, 'http://localhost').pathname;
  const name = pathname === '/favicon.svg' ? 'favicon.svg' : pathname === '/robots.txt' ? 'robots.txt' : 'index.html';
  const contentType = name.endsWith('.svg') ? 'image/svg+xml' : name.endsWith('.txt') ? 'text/plain; charset=utf-8' : 'text/html; charset=utf-8';
  try {
    const content = await readFile(new URL(`../dist/${name}`, import.meta.url));
    response.writeHead(200, { 'Content-Type': contentType });
    response.end(content);
  } catch {
    response.writeHead(500, { 'Content-Type': 'text/plain' });
    response.end('Run npm run build before starting the preview.');
  }
}).listen(port, '127.0.0.1', () => console.log(`Preview: http://127.0.0.1:${port}`));

/* Standalone local design review. Does not change the production entrypoint. */
const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const port = Number(process.env.S5_PREVIEW_PORT || 8041);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webp': 'image/webp', '.woff2': 'font/woff2' };
http.createServer((request, response) => {
  let pathname;
  try { pathname = decodeURIComponent(new URL(request.url, 'http://localhost').pathname); }
  catch { response.writeHead(400); response.end(); return; }
  if (pathname === '/') pathname = '/docs/season-5/preview.html';
  const file = path.resolve(root, `.${pathname}`);
  if (!file.startsWith(root + path.sep)) { response.writeHead(403); response.end(); return; }
  fs.readFile(file, (error, data) => {
    if (error) { response.writeHead(404); response.end('Not found'); return; }
    response.setHeader('Content-Type', types[path.extname(file)] || 'text/plain');
    response.setHeader('Cache-Control', 'no-store');
    response.end(data);
  });
}).listen(port, '127.0.0.1', () => console.log(`Season 5 preview: http://127.0.0.1:${port}/docs/season-5/preview.html`));

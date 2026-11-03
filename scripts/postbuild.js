// Writes each page's HTML from the server build, plus the sitemap.
// GitHub Pages serves plain files with no rewrites, so each page needs its own index.html.
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

const serverEntry = pathToFileURL(resolve('dist-server/entry-server.js')).href;
const { renderBody, renderHead, renderSitemap } = await import(serverEntry);

const template = readFileSync('dist/index.html', 'utf8');
for (const marker of ['<!--page-head-->', '<!--page-body-->']) {
  if (!template.includes(marker)) throw new Error(`index.html lost its ${marker} marker`);
}

function writePage(file, route, options) {
  // Functions, because a plain replacement string would treat "$" in the content as a pattern.
  const html = template
    .replace('<!--page-head-->', () => renderHead(route, options))
    .replace('<!--page-body-->', () => renderBody(route));
  writeFileSync(file, html);
}

mkdirSync('dist/media', { recursive: true });
writePage('dist/index.html', 'home');
writePage('dist/media/index.html', 'media');
// Unknown addresses show the home page, kept out of search results.
writePage('dist/404.html', 'home', { noindex: true });
writeFileSync('dist/sitemap.xml', renderSitemap());

rmSync('dist-server', { recursive: true, force: true });

// Fails the build if a page would publish without its content, tags or styles.
import { existsSync, readdirSync, readFileSync } from 'node:fs';

const PAGES = [
  { file: 'dist/index.html', heading: 'Avant-garde', image: 'og-home.jpg', index: true },
  { file: 'dist/media/index.html', heading: 'Media assets', image: 'og-media.jpg', index: true },
  { file: 'dist/404.html', heading: 'Avant-garde', image: 'og-home.jpg', index: false },
];
const FILES = [
  'dist/.well-known/nostr.json',
  'dist/models/zular-bolt-v3a.glb',
  'dist/og-home.jpg',
  'dist/og-media.jpg',
  'dist/robots.txt',
  'dist/sitemap.xml',
  'dist/site.webmanifest',
];

const problems = FILES.filter((file) => !existsSync(file)).map((file) => `${file} is missing`);

const css = readdirSync('dist/assets')
  .filter((name) => name.endsWith('.css'))
  .map((name) => readFileSync(`dist/assets/${name}`, 'utf8'))
  .join('');

for (const { file, heading, image, index } of PAGES) {
  const html = readFileSync(file, 'utf8');
  if (!new RegExp(`<h1[^>]*>(<[^>]+>)*${heading}`).test(html)) {
    problems.push(`${file} has no "${heading}" heading`);
  }
  if (!html.includes(`property="og:image" content="https://zular.net/${image}"`)) {
    problems.push(`${file} doesn't share ${image}`);
  }
  if (html.includes('content="noindex"') === index) {
    problems.push(`${file} has the wrong robots tag`);
  }
  // CSS module class names start with "_". The two builds must generate the same ones.
  for (const [, classes] of html.matchAll(/class="([^"]*)"/g)) {
    for (const name of classes.split(/\s+/)) {
      if (name.startsWith('_') && !css.includes(`.${name}`)) {
        problems.push(`${file} uses .${name}, which isn't in the CSS`);
      }
    }
  }
}

if (problems.length) throw new Error(`Build check failed:\n${problems.join('\n')}`);

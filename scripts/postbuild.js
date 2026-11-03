// GitHub Pages serves plain files with no rewrites, so each page needs its own index.html.
import { copyFileSync, mkdirSync } from 'node:fs';

const page = 'dist/index.html';
mkdirSync('dist/media', { recursive: true });
copyFileSync(page, 'dist/media/index.html');
copyFileSync(page, 'dist/404.html');

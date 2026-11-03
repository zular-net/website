// Titles, descriptions and share images for each page. The build writes these into the HTML,
// because link previews and many crawlers don't run JavaScript.

import { socials, xHandle } from '../config.ts';
import { canonicalUrlFor, SITE_URL, type Route } from './route.ts';

const SITE_NAME = 'Zular';
const SHARE_IMAGE_WIDTH = 1200;
const SHARE_IMAGE_HEIGHT = 630;

export interface PageMeta {
  title: string;
  description: string;
  /** A designed banner in `public/`, 1200 by 630. Not a screenshot of the page. */
  image: string;
  imageAlt: string;
}

export const PAGES: Record<Route, PageMeta> = {
  home: {
    title: 'Zular: Bitcoin Lightning wallet. Avant-garde, money.',
    description:
      'A Bitcoin Lightning wallet for everyday people. Pay anyone by Telegram handle, send gift links, trade P2P with trust scores, and buy on a DCA schedule.',
    image: '/og-home.jpg',
    imageAlt: 'The Zular 3D bolt beside the words: Avant-garde, money.',
  },
  media: {
    title: 'Media assets | Zular',
    description:
      'Zular logos, the 3D bolt, brand colors, typefaces and product images for press, partners and anyone writing about Zular.',
    image: '/og-media.jpg',
    imageAlt: 'The Zular 3D bolt beside the words: Media assets.',
  },
};

const ROUTES = Object.keys(PAGES) as Route[];

function escapeHtml(text: string): string {
  return text
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;');
}

const metaName = (name: string, content: string) =>
  `<meta name="${name}" content="${escapeHtml(content)}" />`;

const metaProperty = (property: string, content: string) =>
  `<meta property="${property}" content="${escapeHtml(content)}" />`;

function structuredData(): string {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        name: SITE_NAME,
        url: `${SITE_URL}/`,
        logo: `${SITE_URL}/icon-512.png`,
        slogan: 'Avant-garde, money.',
        sameAs: socials.filter((social) => social.href).map((social) => social.href),
      },
      { '@type': 'WebSite', name: SITE_NAME, url: `${SITE_URL}/` },
    ],
  };
  // "<" is escaped so the text can't close the script tag.
  const json = JSON.stringify(data).replaceAll('<', '\\u003c');
  return `<script type="application/ld+json">${json}</script>`;
}

interface HeadOptions {
  /** Keeps the page out of search results, for the 404 page. */
  noindex?: boolean;
}

/** The tags that differ between pages, for the document head. */
export function renderHead(route: Route, { noindex = false }: HeadOptions = {}): string {
  const page = PAGES[route];
  const url = canonicalUrlFor(route);
  const image = `${SITE_URL}${page.image}`;
  return [
    `<title>${escapeHtml(page.title)}</title>`,
    metaName('description', page.description),
    metaName('robots', noindex ? 'noindex' : 'index, follow, max-image-preview:large'),
    `<link rel="canonical" href="${url}" />`,
    metaProperty('og:type', 'website'),
    metaProperty('og:site_name', SITE_NAME),
    metaProperty('og:locale', 'en_US'),
    metaProperty('og:title', page.title),
    metaProperty('og:description', page.description),
    metaProperty('og:url', url),
    metaProperty('og:image', image),
    metaProperty('og:image:type', 'image/jpeg'),
    metaProperty('og:image:width', String(SHARE_IMAGE_WIDTH)),
    metaProperty('og:image:height', String(SHARE_IMAGE_HEIGHT)),
    metaProperty('og:image:alt', page.imageAlt),
    metaName('twitter:card', 'summary_large_image'),
    metaName('twitter:site', xHandle),
    metaName('twitter:title', page.title),
    metaName('twitter:description', page.description),
    metaName('twitter:image', image),
    metaName('twitter:image:alt', page.imageAlt),
    ...(route === 'home' ? [structuredData()] : []),
  ].join('\n    ');
}

export function renderSitemap(): string {
  const urls = ROUTES.map((route) => `  <url><loc>${canonicalUrlFor(route)}</loc></url>`);
  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    '',
  ].join('\n');
}

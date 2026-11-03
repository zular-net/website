import assert from 'node:assert/strict';
import test from 'node:test';
import { PAGES, renderHead, renderSitemap } from '../src/lib/seo.ts';

test('each page has its own title, canonical address and share image', () => {
  const home = renderHead('home');
  const media = renderHead('media');
  assert.match(home, /<link rel="canonical" href="https:\/\/zular\.net\/" \/>/);
  assert.match(media, /<link rel="canonical" href="https:\/\/zular\.net\/media\/" \/>/);
  assert.match(home, /property="og:image" content="https:\/\/zular\.net\/og-home\.jpg"/);
  assert.match(media, /property="og:image" content="https:\/\/zular\.net\/og-media\.jpg"/);
  assert.match(media, /<title>Media assets \| Zular<\/title>/);
});

test('search snippets fit', () => {
  for (const page of Object.values(PAGES)) {
    assert.ok(page.title.length <= 60, page.title);
    assert.ok(page.description.length <= 160, page.description);
  }
});

test('cards name the X account', () => {
  assert.match(renderHead('media'), /name="twitter:site" content="@zular_net"/);
});

test('only the home page carries structured data', () => {
  const start = '<script type="application/ld+json">';
  const home = renderHead('home');
  const json = home.slice(home.indexOf(start) + start.length, home.indexOf('</script>'));
  const organization = JSON.parse(json)['@graph'][0];
  assert.equal(organization.name, 'Zular');
  assert.deepEqual(organization.sameAs, [
    'https://x.com/zular_net',
    'https://t.me/zular_net',
    'https://github.com/zular-net',
  ]);
  assert.ok(!renderHead('media').includes(start));
});

test('the 404 page stays out of search results', () => {
  assert.match(renderHead('home', { noindex: true }), /name="robots" content="noindex"/);
  assert.match(renderHead('home'), /name="robots" content="index, follow/);
});

test('the sitemap lists both pages', () => {
  const sitemap = renderSitemap();
  assert.ok(sitemap.includes('<loc>https://zular.net/</loc>'));
  assert.ok(sitemap.includes('<loc>https://zular.net/media/</loc>'));
});

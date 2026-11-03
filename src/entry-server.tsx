// Used only at build time, by scripts/postbuild.js, to write each page's HTML.
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import App from './App.tsx';
import type { Route } from './lib/route.ts';

export { renderHead, renderSitemap } from './lib/seo.ts';

export function renderBody(route: Route): string {
  return renderToString(
    <StrictMode>
      <App initialRoute={route} />
    </StrictMode>,
  );
}

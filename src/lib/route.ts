export type Route = 'home' | 'media';

export const SITE_URL = 'https://zular.net';

// Production uses real paths. A build with VITE_HASH_ROUTES uses the hash,
// for hosts that serve one file. `?.` keeps this module usable in plain Node tests.
const useHashRoutes = Boolean(import.meta.env?.VITE_HASH_ROUTES);

export function routeFrom(pathname: string, hash: string, hashRoutes = useHashRoutes): Route {
  if (hashRoutes) return hash === '#media' ? 'media' : 'home';
  return /^\/media\/?$/.test(pathname) ? 'media' : 'home';
}

export function hrefFor(route: Route, hashRoutes = useHashRoutes): string {
  if (hashRoutes) return route === 'media' ? '#media' : '#home';
  return route === 'media' ? '/media/' : '/';
}

export function canonicalUrlFor(route: Route): string {
  return `${SITE_URL}${route === 'media' ? '/media/' : '/'}`;
}

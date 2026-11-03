// A small router for the two pages. Production uses real paths; a build with
// VITE_HASH_ROUTES uses the hash, for hosts that serve one file.
export const useHashRoutes = Boolean(import.meta.env?.VITE_HASH_ROUTES);

export const ROUTES = { home: 'home', media: 'media' };

export function routeFrom(pathname, hash, hashRoutes = useHashRoutes) {
  if (hashRoutes) return hash === '#media' ? ROUTES.media : ROUTES.home;
  return /^\/media\/?$/.test(pathname) ? ROUTES.media : ROUTES.home;
}

export function hrefFor(route) {
  if (useHashRoutes) return route === ROUTES.media ? '#media' : '#home';
  return route === ROUTES.media ? '/media' : '/';
}

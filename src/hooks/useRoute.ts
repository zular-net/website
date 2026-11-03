import { useCallback, useEffect, useState } from 'react';
import { hrefFor, routeFrom, type Route } from '../lib/route.ts';

const current = (): Route => routeFrom(location.pathname, location.hash);

export function useRoute() {
  const [route, setRoute] = useState<Route>(current);

  useEffect(() => {
    const sync = () => setRoute(current());
    addEventListener('popstate', sync);
    addEventListener('hashchange', sync);
    return () => {
      removeEventListener('popstate', sync);
      removeEventListener('hashchange', sync);
    };
  }, []);

  const navigate = useCallback((next: Route) => {
    history.pushState(null, '', hrefFor(next));
    setRoute(next);
    scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
}

import { useCallback, useEffect, useState } from 'react';
import { hrefFor, routeFrom } from '../lib/route.js';

const current = () => routeFrom(location.pathname, location.hash);

export function useRoute() {
  const [route, setRoute] = useState(current);

  useEffect(() => {
    const sync = () => setRoute(current());
    addEventListener('popstate', sync);
    addEventListener('hashchange', sync);
    return () => {
      removeEventListener('popstate', sync);
      removeEventListener('hashchange', sync);
    };
  }, []);

  const navigate = useCallback((next) => {
    history.pushState(null, '', hrefFor(next));
    setRoute(next);
    scrollTo({ top: 0, behavior: 'auto' });
  }, []);

  return { route, navigate };
}

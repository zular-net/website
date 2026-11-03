import { lazy, Suspense, useEffect, useMemo } from 'react';
import { BoltProvider } from './components/bolt/BoltContext.tsx';
import BoltStage from './components/bolt/BoltStage.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import FloatingNav from './components/layout/FloatingNav.tsx';
import Footer from './components/layout/Footer.tsx';
import { RouteContext } from './components/RouteContext.tsx';
import { useRoute } from './hooks/useRoute.ts';
import { canonicalUrlFor, type Route } from './lib/route.ts';
import HomePage from './pages/home/HomePage.tsx';
import { HOME_NAV } from './pages/home/nav.ts';
import { MEDIA_NAV } from './pages/media/nav.ts';

const MediaPage = lazy(() => import('./pages/media/MediaPage.tsx'));

const TITLES: Record<Route, string> = {
  home: 'Zular: Avant-garde, money.',
  media: 'Media assets | Zular',
};

export default function App() {
  const { route, navigate } = useRoute();
  const routing = useMemo(() => ({ route, navigate }), [route, navigate]);

  useEffect(() => {
    document.title = TITLES[route];
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrlFor(route));
  }, [route]);

  return (
    <RouteContext.Provider value={routing}>
      <BoltProvider>
        <ErrorBoundary>
          <BoltStage />
        </ErrorBoundary>
        <main>
          {route === 'media' ? (
            <Suspense fallback={null}>
              <MediaPage />
            </Suspense>
          ) : (
            <HomePage />
          )}
        </main>
        <Footer />
        <FloatingNav items={route === 'media' ? MEDIA_NAV : HOME_NAV} />
      </BoltProvider>
    </RouteContext.Provider>
  );
}

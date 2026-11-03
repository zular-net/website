import { lazy, Suspense, useEffect } from 'react';
import { BoltProvider } from './components/bolt/BoltContext.jsx';
import BoltStage from './components/bolt/BoltStage.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import FloatingNav from './components/layout/FloatingNav.jsx';
import Footer from './components/layout/Footer.jsx';
import { RouteContext } from './components/RouteContext.jsx';
import { useRoute } from './hooks/useRoute.js';
import { ROUTES } from './lib/route.js';
import HomePage, { HOME_NAV } from './pages/HomePage.jsx';
import { MEDIA_NAV } from './pages/mediaNav.js';

const MediaPage = lazy(() => import('./pages/MediaPage.jsx'));

const TITLES = {
  [ROUTES.home]: 'Zular: Avant-garde, money.',
  [ROUTES.media]: 'Media assets | Zular',
};

export default function App() {
  const routing = useRoute();
  const isMedia = routing.route === ROUTES.media;

  useEffect(() => {
    document.title = TITLES[routing.route];
  }, [routing.route]);

  return (
    <RouteContext.Provider value={routing}>
      <BoltProvider>
        <ErrorBoundary>
          <BoltStage />
        </ErrorBoundary>
        <main>
          {isMedia ? <Suspense fallback={null}><MediaPage /></Suspense> : <HomePage />}
        </main>
        <Footer />
        <FloatingNav items={isMedia ? MEDIA_NAV : HOME_NAV} />
      </BoltProvider>
    </RouteContext.Provider>
  );
}

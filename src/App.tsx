import { useEffect, useMemo } from 'react';
import { BoltProvider } from './components/bolt/BoltContext.tsx';
import BoltStage from './components/bolt/BoltStage.tsx';
import ErrorBoundary from './components/ErrorBoundary.tsx';
import FloatingNav from './components/layout/FloatingNav.tsx';
import Footer from './components/layout/Footer.tsx';
import { RouteContext } from './components/RouteContext.tsx';
import { useRoute } from './hooks/useRoute.ts';
import { canonicalUrlFor, type Route } from './lib/route.ts';
import { PAGES } from './lib/seo.ts';
import HomePage from './pages/home/HomePage.tsx';
import { HOME_NAV } from './pages/home/nav.ts';
import MediaPage from './pages/media/MediaPage.tsx';
import { MEDIA_NAV } from './pages/media/nav.ts';

export default function App({ initialRoute }: { initialRoute?: Route }) {
  const { route, navigate } = useRoute(initialRoute);
  const routing = useMemo(() => ({ route, navigate }), [route, navigate]);

  useEffect(() => {
    const page = PAGES[route];
    document.title = page.title;
    document.querySelector('meta[name="description"]')?.setAttribute('content', page.description);
    document.querySelector('link[rel="canonical"]')?.setAttribute('href', canonicalUrlFor(route));
  }, [route]);

  return (
    <RouteContext.Provider value={routing}>
      <BoltProvider>
        <ErrorBoundary>
          <BoltStage />
        </ErrorBoundary>
        <main>
          {route === 'media' ? <MediaPage /> : <HomePage />}
        </main>
        <Footer />
        <FloatingNav items={route === 'media' ? MEDIA_NAV : HOME_NAV} />
      </BoltProvider>
    </RouteContext.Provider>
  );
}

import { createContext, useContext, type ComponentProps, type MouseEvent } from 'react';
import { hrefFor, type Route } from '../lib/route.ts';

interface Routing {
  route: Route;
  navigate: (route: Route) => void;
}

export const RouteContext = createContext<Routing>({ route: 'home', navigate: () => {} });

export const useRouting = () => useContext(RouteContext);

interface PageLinkProps extends Omit<ComponentProps<'a'>, 'href' | 'onClick'> {
  to: Route;
}

/** A link to another page. Modified clicks still open a new tab. */
export function PageLink({ to, children, ...props }: PageLinkProps) {
  const { navigate } = useRouting();
  const onClick = (event: MouseEvent) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) {
      return;
    }
    event.preventDefault();
    navigate(to);
  };
  return (
    <a href={hrefFor(to)} onClick={onClick} {...props}>
      {children}
    </a>
  );
}

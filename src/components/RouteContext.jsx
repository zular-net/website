import { createContext, useContext } from 'react';
import { hrefFor } from '../lib/route.js';

export const RouteContext = createContext({ route: 'home', navigate: () => {} });

// A link to another page. Modified clicks still open a new tab.
export function PageLink({ to, children, ...props }) {
  const { navigate } = useContext(RouteContext);
  const onClick = (event) => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
    event.preventDefault();
    navigate(to);
  };
  return <a href={hrefFor(to)} onClick={onClick} {...props}>{children}</a>;
}

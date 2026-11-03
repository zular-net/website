import { useContext } from 'react';
import { socials } from '../../config.js';
import { ROUTES } from '../../lib/route.js';
import { PageLink, RouteContext } from '../RouteContext.jsx';
import styles from './layout.module.css';

export default function Footer() {
  const links = socials.filter((social) => social.href);
  const { route } = useContext(RouteContext);
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footerRow}`}>
        <span>Zular</span>
        <span className={styles.footerLinks}>
          {route === ROUTES.media
            ? <PageLink to={ROUTES.home}>Home</PageLink>
            : <PageLink to={ROUTES.media}>Media assets</PageLink>}
          {links.map((social) => <a key={social.name} href={social.href} rel="noreferrer">{social.name}</a>)}
        </span>
        <span>Not available in every country.</span>
      </div>
    </footer>
  );
}

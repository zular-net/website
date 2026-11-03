import { socials } from '../../config.ts';
import { PageLink, useRouting } from '../RouteContext.tsx';
import { Container } from './Section.tsx';
import styles from './layout.module.css';

export default function Footer() {
  const { route } = useRouting();
  const links = socials.filter((social) => social.href);
  return (
    <footer className={styles.footer}>
      <Container className={styles.footerRow}>
        <span>Zular</span>
        <span className={styles.footerLinks}>
          {route === 'media' ? (
            <PageLink to="home">Home</PageLink>
          ) : (
            <PageLink to="media">Media assets</PageLink>
          )}
          {links.map((social) => (
            <a key={social.name} href={social.href} rel="noreferrer">
              {social.name}
            </a>
          ))}
        </span>
        <span>Not available in every country.</span>
      </Container>
    </footer>
  );
}

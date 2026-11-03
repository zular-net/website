import { socials } from '../../config.ts';
import BoltMark from '../bolt/BoltMark.tsx';
import { PageLink, useRouting } from '../RouteContext.tsx';
import Icon from '../ui/Icon.tsx';
import SocialLogo, { hasSocialLogo } from '../ui/SocialLogo.tsx';
import { Container } from './Section.tsx';
import styles from './layout.module.css';

export default function Footer() {
  const { route } = useRouting();
  const links = socials.filter((social) => social.href);
  return (
    <footer className={styles.footer}>
      <Container>
        <div className={styles.footerMain}>
          <div className={styles.footerBrand}>
            <BoltMark className={styles.footerMark} />
            <div>
              <b>Zular</b>
              <span>Avant-garde, money.</span>
            </div>
          </div>
          <nav className={styles.footerLinks} aria-label="Footer">
            {route === 'media' ? (
              <PageLink to="home" className={styles.footerPill}>
                <Icon name="home" size={18} />
                Home
              </PageLink>
            ) : (
              <PageLink to="media" className={styles.footerPill}>
                <Icon name="image" size={18} />
                Media assets
              </PageLink>
            )}
            {links.map((social) =>
              hasSocialLogo(social.name) ? (
                <a
                  key={social.name}
                  className={styles.footerIcon}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Zular on ${social.name}`}
                  title={social.name}
                >
                  <SocialLogo name={social.name} />
                </a>
              ) : (
                <a
                  key={social.name}
                  className={styles.footerPill}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {social.name}
                </a>
              ),
            )}
          </nav>
        </div>
        <div className={styles.footerLegal}>
          <span>© 2026 Zular</span>
          <span>Not available in every country.</span>
        </div>
      </Container>
    </footer>
  );
}

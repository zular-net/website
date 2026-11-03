import type { ReactNode } from 'react';
import styles from './layout.module.css';

interface SectionProps {
  id: string;
  className?: string;
  children: ReactNode;
}

/** Centers content at the site's width, with its side gutters. */
export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`${styles.container} ${className}`}>{children}</div>;
}

export function Section({ id, className = '', children }: SectionProps) {
  return (
    <section id={id} className={`${styles.section} ${className}`}>
      <Container>{children}</Container>
    </section>
  );
}

/** Two columns on wide screens. "flip" puts the second column first on phones. */
export function Split({ flip = false, children }: { flip?: boolean; children: ReactNode }) {
  return <div className={`${styles.split} ${flip ? styles.flip : ''}`}>{children}</div>;
}

export function SectionTitle({ children }: { children: ReactNode }) {
  return <h2 className={styles.title}>{children}</h2>;
}

interface HeadingProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

export function Heading({ eyebrow, title, children }: HeadingProps) {
  return (
    <div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <SectionTitle>{title}</SectionTitle>
      {children && <p className={styles.sub}>{children}</p>}
    </div>
  );
}

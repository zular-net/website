import styles from './layout.module.css';

export function Section({ id, className = '', children }) {
  return <section id={id} className={`${styles.section} ${className}`}><div className={styles.wrap}>{children}</div></section>;
}

// Two columns on wide screens. "flip" puts the second column first on phones.
export function Split({ flip = false, children }) {
  return <div className={`${styles.split} ${flip ? styles.flip : ''}`}>{children}</div>;
}

export function Heading({ eyebrow, title, children }) {
  return (
    <div>
      <p className={styles.eyebrow}>{eyebrow}</p>
      <h2 className={styles.title}>{title}</h2>
      {children && <p className={styles.sub}>{children}</p>}
    </div>
  );
}

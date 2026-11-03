import Avatar from './Avatar.jsx';
import styles from './ui.module.css';

// One line in a list: who, what, and how much. "right" replaces the amount when needed.
export default function Row({ initial, tone, title, subtitle, subtitleTone, amount, meta, positive, right, className = '' }) {
  return (
    <div className={`${styles.row} ${className}`}>
      <Avatar initial={initial} tone={tone} />
      <div className={styles.rowText}>
        <div className={styles.rowTitle}>{title}</div>
        <div className={styles.rowSub} data-tone={subtitleTone}>{subtitle}</div>
      </div>
      <div className={styles.rowRight}>
        {right ?? <div className={styles.rowAmount} data-positive={Boolean(positive)}>{amount}</div>}
        <div className={styles.rowSub}>{meta}</div>
      </div>
    </div>
  );
}

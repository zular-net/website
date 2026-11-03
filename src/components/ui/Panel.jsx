import styles from './ui.module.css';

export default function Panel({ label, tag, children, className = '' }) {
  return (
    <div className={`${styles.panel} ${className}`}>
      {label && (
        <div className={styles.panelLabel}>
          <span>{label}</span>
          {tag && <span className={styles.panelTag}>{tag}</span>}
        </div>
      )}
      {children}
    </div>
  );
}

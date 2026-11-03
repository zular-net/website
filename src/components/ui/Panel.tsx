import type { ReactNode } from 'react';
import styles from './ui.module.css';

interface PanelProps {
  label?: string;
  tag?: string;
  children: ReactNode;
}

export default function Panel({ label, tag, children }: PanelProps) {
  return (
    <div className={styles.panel}>
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

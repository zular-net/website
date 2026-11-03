import type { ReactNode } from 'react';
import type { Tone } from '../../types.ts';
import Avatar from './Avatar.tsx';
import styles from './ui.module.css';

interface RowProps {
  initial: string;
  tone: Tone;
  title: string;
  subtitle: string;
  subtitleTone?: 'pending' | 'success';
  amount?: string;
  meta: string;
  positive?: boolean;
  /** Replaces the amount, for example with a trust badge. */
  right?: ReactNode;
  className?: string;
}

/** One line in a list: who, what, and how much. */
export default function Row({
  initial,
  tone,
  title,
  subtitle,
  subtitleTone,
  amount,
  meta,
  positive = false,
  right,
  className = '',
}: RowProps) {
  return (
    <div className={`${styles.row} ${className}`}>
      <Avatar initial={initial} tone={tone} />
      <div className={styles.rowText}>
        <div className={styles.rowTitle}>{title}</div>
        <div className={styles.rowSub} data-tone={subtitleTone}>
          {subtitle}
        </div>
      </div>
      <div className={styles.rowRight}>
        {right ?? (
          <div className={styles.rowAmount} data-positive={positive}>
            {amount}
          </div>
        )}
        <div className={styles.rowSub}>{meta}</div>
      </div>
    </div>
  );
}

import type { Tone } from '../../types.ts';
import styles from './ui.module.css';

interface AvatarProps {
  initial: string;
  tone?: Tone;
}

export default function Avatar({ initial, tone = 'blue' }: AvatarProps) {
  return (
    <span
      className={styles.avatar}
      style={{ background: `var(--tone-${tone})` }}
      aria-hidden="true"
    >
      {initial}
    </span>
  );
}

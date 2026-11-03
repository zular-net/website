import styles from './ui.module.css';

export default function Avatar({ initial, tone = 'blue', className = '' }) {
  return <span className={`${styles.avatar} ${className}`} style={{ background: `var(--tone-${tone})` }} aria-hidden="true">{initial}</span>;
}

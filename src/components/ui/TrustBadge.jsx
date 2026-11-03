import { bandFor } from '../../lib/trust.js';
import styles from './ui.module.css';

export default function TrustBadge({ score }) {
  const band = bandFor(score);
  return <span className={styles.badge} data-tone={band.tone} title={band.name}>{score.toFixed(2)}</span>;
}

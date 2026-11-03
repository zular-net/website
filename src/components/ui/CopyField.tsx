import { useCopy } from '../../hooks/useCopy.ts';
import Icon from './Icon.tsx';
import styles from './ui.module.css';

interface CopyFieldProps {
  value: string;
  /** Read by screen readers, as in "Copy email address". */
  label: string;
}

/** Shows a value and copies it. The text stays selectable if the browser refuses. */
export default function CopyField({ value, label }: CopyFieldProps) {
  const { copied, copy } = useCopy();
  return (
    <div className={styles.copyField}>
      <span className={styles.copyValue}>{value}</span>
      <button
        type="button"
        className={styles.copyButton}
        onClick={() => void copy(value)}
        aria-label={`Copy ${label}`}
      >
        <Icon name={copied ? 'check' : 'copy'} size={18} />
      </button>
    </div>
  );
}

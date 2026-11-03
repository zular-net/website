import { useEffect, useRef, useState } from 'react';
import Icon from './Icon.jsx';
import styles from './ui.module.css';

// Shows a value and copies it. The text stays selectable if the browser refuses.
export default function CopyField({ value, label }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef(0);
  useEffect(() => () => clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className={styles.copyField}>
      <span className={styles.copyValue}>{value}</span>
      <button type="button" className={styles.copyButton} onClick={copy} aria-label={`Copy ${label}`}>
        <Icon name={copied ? 'check' : 'copy'} size={18} />
      </button>
    </div>
  );
}

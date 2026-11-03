import { useMemo } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.js';
import Icon from '../ui/Icon.jsx';
import styles from './layout.module.css';

// Scrolls without changing the address, so section links can't clash with page routes.
function scrollToSection(event, id) {
  const element = document.getElementById(id);
  if (!element) return;
  event.preventDefault();
  element.scrollIntoView();
}

export default function FloatingNav({ items }) {
  const groups = useMemo(() => items.map((item) => item.sections), [items]);
  const active = useActiveSection(groups);
  return (
    <nav className={styles.nav} aria-label="Page sections" style={{ '--index': active }}>
      <span className={styles.lens} />
      {items.map((item, index) => (
        <a key={item.target} href={`#${item.target}`} className={styles.navItem} data-active={index === active} aria-current={index === active ? 'true' : undefined} onClick={(event) => scrollToSection(event, item.target)}>
          <Icon name={item.icon} size={22} />
          {item.label}
        </a>
      ))}
    </nav>
  );
}

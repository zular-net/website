import { useMemo, type CSSProperties } from 'react';
import { useActiveSection } from '../../hooks/useActiveSection.ts';
import { scrollToSection } from '../../lib/scroll.ts';
import type { NavItem } from '../../types.ts';
import Icon from '../ui/Icon.tsx';
import styles from './layout.module.css';

export default function FloatingNav({ items }: { items: NavItem[] }) {
  const groups = useMemo(() => items.map((item) => item.sections), [items]);
  const active = useActiveSection(groups);
  return (
    <nav
      className={styles.nav}
      aria-label="Page sections"
      style={{ '--index': active } as CSSProperties}
    >
      <span className={styles.lens} />
      {items.map((item, index) => (
        <a
          key={item.target}
          href={`#${item.target}`}
          className={styles.navItem}
          data-active={index === active}
          aria-current={index === active ? 'true' : undefined}
          onClick={(event) => scrollToSection(event, item.target)}
        >
          <Icon name={item.icon} size={22} />
          {item.label}
        </a>
      ))}
    </nav>
  );
}

import { useEffect, useRef } from 'react';
import { useBolt } from './BoltContext.tsx';
import BoltMark from './BoltMark.tsx';
import styles from './Bolt.module.css';

interface BoltAnchorProps {
  className?: string;
  /** Uses a white logo, for violet surfaces. */
  light?: boolean;
}

/** A place the 3D bolt can fly to. Shows the flat logo when 3D isn't running. */
export default function BoltAnchor({ className = '', light = false }: BoltAnchorProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const { anchors, status } = useBolt();

  useEffect(() => {
    const element = ref.current;
    const set = anchors.current;
    if (!element) return undefined;
    set.add(element);
    return () => {
      set.delete(element);
    };
  }, [anchors]);

  return (
    <span
      ref={ref}
      className={`${styles.anchor} ${className}`}
      data-ready={status === 'ready'}
      data-light={light}
      aria-hidden="true"
    >
      <BoltMark />
    </span>
  );
}

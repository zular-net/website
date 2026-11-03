import { useEffect, useRef } from 'react';
import { useBolt } from './BoltContext.jsx';
import BoltMark from './BoltMark.jsx';
import styles from './Bolt.module.css';

// A place the 3D bolt can fly to. Shows the flat logo when 3D isn't running.
export default function BoltAnchor({ className = '', light = false }) {
  const ref = useRef(null);
  const { anchors, status } = useBolt();

  useEffect(() => {
    const element = ref.current;
    const set = anchors.current;
    set.add(element);
    return () => set.delete(element);
  }, [anchors]);

  return (
    <span ref={ref} className={`${styles.anchor} ${className}`} data-ready={status === 'ready'} data-light={light} aria-hidden="true">
      <BoltMark />
    </span>
  );
}

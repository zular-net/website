import { useEffect, useRef } from 'react';
import { boltModelUrl } from '../../config.js';
import { prefersReducedMotion } from '../../hooks/useReducedMotion.js';
import { useBolt } from './BoltContext.jsx';
import styles from './Bolt.module.css';

function canUseWebGL() {
  try {
    const context = document.createElement('canvas').getContext('webgl2');
    return Boolean(context);
  } catch {
    return false;
  }
}

// Loads the 3D code only after the page is on screen. Any failure leaves the flat logos in place.
export default function BoltStage() {
  const canvasRef = useRef(null);
  const { anchors, setStatus } = useBolt();

  useEffect(() => {
    if (!canUseWebGL()) {
      setStatus('unavailable');
      return undefined;
    }
    let scene;
    let cancelled = false;
    const fail = () => {
      if (!cancelled) setStatus('unavailable');
    };
    import('./BoltScene.js')
      .then(async ({ BoltScene }) => {
        const next = new BoltScene({
          canvas: canvasRef.current,
          getAnchors: () => [...anchors.current],
          reducedMotion: prefersReducedMotion(),
          onContextLost: fail,
        });
        if (cancelled) return next.dispose();
        scene = next;
        await next.load(boltModelUrl);
        if (cancelled) return undefined;
        next.start();
        setStatus('ready');
        return undefined;
      })
      .catch(fail);
    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, [anchors, setStatus]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

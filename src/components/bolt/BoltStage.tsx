import { useEffect, useRef } from 'react';
import { boltModelUrl } from '../../config.ts';
import { prefersReducedMotion } from '../../hooks/useReducedMotion.ts';
import { useBolt } from './BoltContext.tsx';
import type { BoltScene } from './BoltScene.ts';
import styles from './Bolt.module.css';

function canUseWebGL(): boolean {
  try {
    return Boolean(document.createElement('canvas').getContext('webgl2'));
  } catch {
    return false;
  }
}

/** Loads the 3D code only after the page is on screen. Any failure leaves the flat logos. */
export default function BoltStage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { anchors, setStatus } = useBolt();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !canUseWebGL()) {
      setStatus('unavailable');
      return undefined;
    }

    let scene: BoltScene | undefined;
    let cancelled = false;
    const fail = () => {
      if (!cancelled) setStatus('unavailable');
    };

    const start = async () => {
      const { BoltScene } = await import('./BoltScene.ts');
      scene = new BoltScene({
        canvas,
        getAnchors: () => [...anchors.current],
        reducedMotion: prefersReducedMotion(),
        onFail: fail,
      });
      await scene.load(boltModelUrl);
      if (cancelled) return;
      scene.start();
      setStatus('ready');
    };
    start().catch(fail);

    return () => {
      cancelled = true;
      scene?.dispose();
    };
  }, [anchors, setStatus]);

  return <canvas ref={canvasRef} className={styles.canvas} aria-hidden="true" />;
}

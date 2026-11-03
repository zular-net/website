import { useCallback, useRef, type PointerEvent } from 'react';
import { useReducedMotion } from './useReducedMotion.ts';

/** Tilts an element toward the pointer through CSS variables, with no re-renders. */
export function useTilt() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const onPointerMove = useCallback(
    (event: PointerEvent) => {
      const element = ref.current;
      if (!element || reduced) return;
      const box = element.getBoundingClientRect();
      const x = (event.clientX - box.left) / box.width - 0.5;
      const y = (event.clientY - box.top) / box.height - 0.5;
      element.style.setProperty('--ry', `${x * 14}deg`);
      element.style.setProperty('--rx', `${-y * 12}deg`);
      element.style.setProperty('--sheen', `${x * 90}deg`);
    },
    [reduced],
  );

  const onPointerLeave = useCallback(() => {
    const element = ref.current;
    if (!element) return;
    for (const name of ['--ry', '--rx', '--sheen']) element.style.setProperty(name, '0deg');
  }, []);

  return { ref, onPointerMove, onPointerLeave };
}

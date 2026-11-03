import { useEffect, useState } from 'react';

/** Takes one array of section ids per nav item, and returns the active item's index. */
export function useActiveSection(groups: string[][]): number {
  const [active, setActive] = useState(0);

  useEffect(() => {
    let frame = 0;
    const measure = () => {
      frame = 0;
      const line = innerHeight * 0.45;
      let current = 0;
      groups.forEach((ids, index) => {
        for (const id of ids) {
          const element = document.getElementById(id);
          if (element && element.getBoundingClientRect().top < line) current = index;
        }
      });
      setActive(current);
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };
    measure();
    addEventListener('scroll', schedule, { passive: true });
    addEventListener('resize', schedule);
    return () => {
      removeEventListener('scroll', schedule);
      removeEventListener('resize', schedule);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [groups]);

  return active;
}

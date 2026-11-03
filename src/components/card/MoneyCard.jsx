import { useMemo } from 'react';
import { useTilt } from '../../hooks/useTilt.js';
import styles from './MoneyCard.module.css';

function makeSparkles(seed, count = 16) {
  let state = seed;
  const next = () => {
    state = (state * 16807) % 2147483647;
    return state / 2147483647;
  };
  return Array.from({ length: count }, (_, index) => ({
    size: index % 3 === 0 ? 2.6 + next() * 1.6 : 1 + next() * 0.8,
    left: 4 + next() * 84,
    top: 4 + next() * 90,
    duration: 2 + next() * 3,
    delay: -next() * 4,
  }));
}

// The violet card shared by the balance and gift designs.
export default function MoneyCard({ amount, unit = 'sats', fiat, footer, top, side, seed = 7 }) {
  const tilt = useTilt();
  const sparkles = useMemo(() => makeSparkles(seed), [seed]);
  return (
    <div className={styles.stage} onPointerMove={tilt.onPointerMove} onPointerLeave={tilt.onPointerLeave}>
      <div ref={tilt.ref} className={styles.card}>
        {sparkles.map((sparkle, index) => (
          <i
            key={index}
            className={styles.sparkle}
            style={{
              '--size': `${sparkle.size}cqw`,
              '--duration': `${sparkle.duration}s`,
              left: `${sparkle.left}%`,
              top: `${sparkle.top}%`,
              animationDelay: `${sparkle.delay}s`,
            }}
          />
        ))}
        <div className={styles.top}>{top}</div>
        <div className={styles.amount}>{amount}<small>{unit}</small></div>
        <div className={styles.fiat}>{fiat}</div>
        <div className={styles.footer}>{footer}</div>
        {side}
      </div>
    </div>
  );
}

export const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'delete'] as const;
export type Key = (typeof KEYS)[number];

export const MAX_DIGITS = 8;

/** Returns the next amount in sats after a key press. */
export function pressKey(value: number, key: Key): number {
  if (key === 'delete') return Math.floor(value / 10);
  const next = Number(`${value}${key}`);
  return String(next).length > MAX_DIGITS ? value : next;
}

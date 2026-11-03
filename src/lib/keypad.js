export const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '000', '0', 'delete'];
export const MAX_DIGITS = 8;

// Returns the next amount in sats after a key press.
export function pressKey(value, key) {
  if (key === 'delete') return Math.floor(value / 10);
  if (!KEYS.includes(key)) return value;
  const next = `${value}${key}`;
  const digits = String(Number(next));
  return digits.length > MAX_DIGITS ? value : Number(next);
}

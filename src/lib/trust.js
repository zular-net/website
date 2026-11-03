// Same bands as the app's trust badge.
export const TRUST_BANDS = [
  { name: 'New', min: 0, tone: 'new' },
  { name: 'Known', min: 0.35, tone: 'known' },
  { name: 'Established', min: 0.6, tone: 'established' },
  { name: 'Trusted', min: 0.85, tone: 'trusted' },
];

export function bandFor(score) {
  if (score < 0) return { name: 'Flagged', min: -1, tone: 'flagged' };
  return [...TRUST_BANDS].reverse().find((band) => score >= band.min);
}

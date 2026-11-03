export type TrustTone = 'flagged' | 'new' | 'known' | 'established' | 'trusted';

export interface TrustBand {
  name: string;
  /** Lowest score in this band. */
  min: number;
  tone: TrustTone;
}

/** Same bands as the app's trust badge, lowest first. */
export const TRUST_BANDS: TrustBand[] = [
  { name: 'New', min: 0, tone: 'new' },
  { name: 'Known', min: 0.35, tone: 'known' },
  { name: 'Established', min: 0.6, tone: 'established' },
  { name: 'Trusted', min: 0.85, tone: 'trusted' },
];

const FLAGGED: TrustBand = { name: 'Flagged', min: -1, tone: 'flagged' };

export function bandFor(score: number): TrustBand {
  if (score < 0) return FLAGGED;
  let current = FLAGGED;
  for (const band of TRUST_BANDS) {
    if (score >= band.min) current = band;
  }
  return current;
}

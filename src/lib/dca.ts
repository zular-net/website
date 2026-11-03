import { usdToSats } from './format.ts';

export type FrequencyId = 'daily' | 'weekly' | 'monthly';

export interface Frequency {
  id: FrequencyId;
  label: string;
  buysPerYear: number;
}

export const FREQUENCIES: Frequency[] = [
  { id: 'daily', label: 'Daily', buysPerYear: 365 },
  { id: 'weekly', label: 'Weekly', buysPerYear: 52 },
  { id: 'monthly', label: 'Monthly', buysPerYear: 12 },
];

export interface YearlyPlanInput {
  amountUsd: number;
  buysPerYear: number;
  btcPriceUsd: number;
}

/** One year of buys at a single fixed price. This is arithmetic, not a forecast. */
export function yearlyPlan({ amountUsd, buysPerYear, btcPriceUsd }: YearlyPlanInput) {
  const totalUsd = amountUsd * buysPerYear;
  return { totalUsd, totalSats: usdToSats(totalUsd, btcPriceUsd) };
}

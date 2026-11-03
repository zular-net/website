import { usdToSats } from './format.js';

export const FREQUENCIES = [
  { id: 'daily', label: 'Daily', buysPerYear: 365 },
  { id: 'weekly', label: 'Weekly', buysPerYear: 52 },
  { id: 'monthly', label: 'Monthly', buysPerYear: 12 },
];

// One year of buys at a single fixed price. This is arithmetic, not a forecast.
export function yearlyPlan({ amountUsd, buysPerYear, btcPriceUsd }) {
  const totalUsd = amountUsd * buysPerYear;
  return { totalUsd, totalSats: usdToSats(totalUsd, btcPriceUsd) };
}

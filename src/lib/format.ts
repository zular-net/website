const SATS_PER_BTC = 100_000_000;
const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatSats = (sats: number): string => integer.format(Math.round(sats));
export const formatWholeUsd = (amount: number): string => `$${integer.format(Math.round(amount))}`;
export const formatUsd = (amount: number): string => `$${usd.format(amount)}`;
export const satsToUsd = (sats: number, btcPriceUsd: number): number =>
  (sats / SATS_PER_BTC) * btcPriceUsd;
export const usdToSats = (amount: number, btcPriceUsd: number): number =>
  (amount / btcPriceUsd) * SATS_PER_BTC;

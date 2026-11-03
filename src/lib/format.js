const SATS_PER_BTC = 100_000_000;
const integer = new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 });
const usd = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export const formatSats = (sats) => integer.format(Math.round(sats));
export const formatWholeUsd = (amount) => `$${integer.format(Math.round(amount))}`;
export const formatUsd = (amount) => `$${usd.format(amount)}`;
export const satsToUsd = (sats, btcPriceUsd) => (sats / SATS_PER_BTC) * btcPriceUsd;
export const usdToSats = (amount, btcPriceUsd) => (amount / btcPriceUsd) * SATS_PER_BTC;

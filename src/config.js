// Site settings. Blank values stay hidden or show "Coming soon".
export const downloads = [
  { id: 'android', name: 'Android', href: '', status: 'Coming soon' },
  { id: 'ios', name: 'iOS', href: '', status: 'Later' },
];

export const socials = [
  { name: 'Nostr', href: '' },
  { name: 'X', href: '' },
  { name: 'Telegram', href: '' },
];

export const donationAddresses = { bitcoin: '', lightning: '' };

export const investmentEmail = 'info@zular.net';

export const lightningAddress = 'KAYHAN@ZULAR.NET';

// Used only by the examples on the page, and labelled there.
export const exampleBtcPriceUsd = 110000;

export const boltModelUrl =
  import.meta.env.VITE_BOLT_MODEL_URL || `${import.meta.env.BASE_URL}models/zular-bolt-v3a.glb`;

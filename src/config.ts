// Site settings. Blank values stay hidden or show their status text.

export interface Download {
  id: string;
  name: string;
  /** Store or file link. Blank shows the status instead. */
  href: string;
  status: string;
}

export interface Social {
  name: string;
  /** Blank hides the link. */
  href: string;
}

export const downloads: Download[] = [
  { id: 'android', name: 'Android', href: '', status: 'Coming soon' },
  { id: 'ios', name: 'iOS', href: '', status: 'Later' },
];

export const socials: Social[] = [
  { name: 'Nostr', href: '' },
  { name: 'X', href: '' },
  { name: 'Telegram', href: '' },
];

export const donationAddresses = { bitcoin: '', lightning: '' };

export const contactEmail = 'info@zular.net';

export const lightningAddress = 'KAYHAN@ZULAR.NET';

/** Used only by examples on the page, and labelled there. */
export const exampleBtcPriceUsd = 110000;

export const boltModelUrl =
  import.meta.env.VITE_BOLT_MODEL_URL || `${import.meta.env.BASE_URL}models/zular-bolt-v3a.glb`;

// Site settings. Blank values stay hidden or show their status text.

export interface Download {
  id: string;
  name: string;
  /** Store or file link. Blank shows the status instead. */
  href: string;
  status: string;
}

export type SocialName = 'Nostr' | 'X' | 'Telegram' | 'GitHub';

export interface Social {
  name: SocialName;
  /** Blank hides the link. */
  href: string;
}

export const downloads: Download[] = [
  { id: 'android', name: 'Android', href: '', status: 'Coming soon' },
  { id: 'ios', name: 'iOS', href: '', status: 'Later' },
];

export const socials: Social[] = [
  { name: 'Nostr', href: 'https://npub.world/_@zular.net' },
  { name: 'X', href: 'https://x.com/zular_net' },
  { name: 'Telegram', href: 'https://t.me/zular_net' },
  { name: 'GitHub', href: 'https://github.com/zular-net' },
];

export const xHandle = '@zular_net';

export const donationAddresses = {
  bitcoin: 'bc1qvgkpqmjwlmld78wvm5ec8le2wvn9srvzv3hqd0',
  lightning: '',
};

export const contactEmail = 'info@zular.net';

export const lightningAddress = 'KAYHAN@ZULAR.NET';

/** Used only by examples on the page, and labelled there. */
export const exampleBtcPriceUsd = 110000;

// `?.` keeps this module usable in plain Node tests.
export const boltModelUrl =
  import.meta.env?.VITE_BOLT_MODEL_URL || `${import.meta.env?.BASE_URL}models/zular-bolt-v3a.glb`;

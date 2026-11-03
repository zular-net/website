// Content for the media assets page. Files live in public/brand-assets.

export interface LogoAsset {
  id: string;
  name: string;
  note: string;
  /** Path below brand-assets, without the extension. Each has .svg and .png. */
  file: string;
  background: 'dark' | 'light' | 'violet' | 'raised';
  kind: 'tall' | 'wide' | 'icon';
}

export interface BrandColor {
  name: string;
  hex: string;
  use: string;
  /** Uses ink text on this color instead of white. */
  inkText: boolean;
  outlined?: boolean;
}

export interface Typeface {
  name: string;
  role: string;
  family: string;
  sample: string;
  weight: number;
  href: string;
}

export interface ProductImage {
  name: string;
  file: string;
  alt: string;
}

export interface Boilerplate {
  id: string;
  label: string;
  text: string;
}

export const logos: LogoAsset[] = [
  { id: 'mark-violet', name: 'Mark', note: 'Default', file: 'logos/zular-mark-violet', background: 'dark', kind: 'tall' },
  { id: 'mark-white', name: 'Mark, white', note: 'On violet or photos', file: 'logos/zular-mark-white', background: 'violet', kind: 'tall' },
  { id: 'mark-ink', name: 'Mark, ink', note: 'On light', file: 'logos/zular-mark-ink', background: 'light', kind: 'tall' },
  { id: 'logo-dark', name: 'Logo', note: 'On dark', file: 'logos/zular-logo-on-dark', background: 'dark', kind: 'wide' },
  { id: 'logo-light', name: 'Logo', note: 'On light', file: 'logos/zular-logo-on-light', background: 'light', kind: 'wide' },
  { id: 'logo-white', name: 'Logo, white', note: 'On violet or photos', file: 'logos/zular-logo-white', background: 'violet', kind: 'wide' },
  { id: 'icon-violet', name: 'App icon', note: 'Default', file: 'logos/zular-app-icon-violet', background: 'dark', kind: 'icon' },
  { id: 'icon-dark', name: 'App icon, dark', note: 'Dark mode', file: 'logos/zular-app-icon-dark', background: 'raised', kind: 'icon' },
];

export const colors: BrandColor[] = [
  { name: 'Violet', hex: '#7A5CFF', use: 'Main brand color', inkText: false },
  { name: 'Ink', hex: '#0B0B0F', use: 'Backgrounds', inkText: false, outlined: true },
  { name: 'White', hex: '#FFFFFF', use: 'Text on ink', inkText: true },
  { name: 'Action', hex: '#7452FF', use: 'Buttons with white labels', inkText: false },
  { name: 'Accent', hex: '#A893FF', use: 'Small text on dark', inkText: true },
  { name: 'Surface', hex: '#17171D', use: 'Panels on ink', inkText: false, outlined: true },
];

export const typefaces: Typeface[] = [
  { name: 'Inter', role: 'Headlines, amounts and text', family: 'var(--sans)', sample: 'Avant-garde, money.', weight: 600, href: 'https://fonts.google.com/specimen/Inter' },
  { name: 'IBM Plex Mono', role: 'Addresses and invoices', family: 'var(--mono)', sample: 'kayhan@zular.net', weight: 500, href: 'https://fonts.google.com/specimen/IBM+Plex+Mono' },
];

export const productImages: ProductImage[] = [
  { name: 'Balance card', file: 'product/zular-balance-card.png', alt: 'Zular balance card showing a sample balance in sats' },
  { name: 'Gift card', file: 'product/zular-gift-card.png', alt: 'Zular gift card for 10,000 sats, with a sample message' },
  { name: 'Social banner', file: 'product/zular-social-banner.png', alt: 'Zular banner with the words Avant-garde, money and the 3D bolt' },
];

export const boilerplate: Boilerplate[] = [
  { id: 'motto', label: 'Motto', text: 'Avant-garde, money.' },
  { id: 'short', label: 'One line', text: 'Zular is a Lightning wallet for everyday people.' },
  { id: 'long', label: 'Paragraph', text: 'Zular is a custodial Bitcoin Lightning wallet for everyday people. Pay anyone by their Telegram handle, send sats as a gift link, trade in a peer-to-peer market with trust scores built from real trades and reports, and buy on a schedule with DCA plans.' },
];

export const dos: string[] = [
  'Write the name as Zular, with a capital Z.',
  'Keep clear space around the mark, at least half its width.',
  'Use the violet mark on dark, the ink mark on light, and the white mark on violet or photos.',
  'Keep the logo at least 16px tall on screens.',
  'Say that Zular holds users’ balances where custody matters to your story.',
];

export const donts: string[] = [
  'Don’t recolor, stretch, rotate or outline the logo.',
  'Don’t add shadows, glows or gradients to the flat logo.',
  'Don’t use the old Daric name or the orange logo.',
  'Don’t call Zular a self-custody wallet.',
  'Don’t imply a partnership or endorsement without asking us.',
];

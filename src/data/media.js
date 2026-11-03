// Content for the media assets page. Files live in public/brand-assets.
export const logos = [
  { id: 'mark-violet', name: 'Mark', note: 'Default', file: 'logos/zular-mark-violet', background: 'dark', tall: true },
  { id: 'mark-white', name: 'Mark, white', note: 'On violet or photos', file: 'logos/zular-mark-white', background: 'violet', tall: true },
  { id: 'mark-ink', name: 'Mark, ink', note: 'On light', file: 'logos/zular-mark-ink', background: 'light', tall: true },
  { id: 'logo-dark', name: 'Logo', note: 'On dark', file: 'logos/zular-logo-on-dark', background: 'dark' },
  { id: 'logo-light', name: 'Logo', note: 'On light', file: 'logos/zular-logo-on-light', background: 'light' },
  { id: 'logo-white', name: 'Logo, white', note: 'On violet or photos', file: 'logos/zular-logo-white', background: 'violet' },
  { id: 'icon-violet', name: 'App icon', note: 'Default', file: 'logos/zular-app-icon-violet', background: 'dark', icon: true },
  { id: 'icon-dark', name: 'App icon, dark', note: 'Dark mode', file: 'logos/zular-app-icon-dark', background: 'raised', icon: true },
];

export const colors = [
  { name: 'Violet', hex: '#7A5CFF', use: 'Main brand color', ink: false },
  { name: 'Ink', hex: '#0B0B0F', use: 'Backgrounds', ink: false, outlined: true },
  { name: 'White', hex: '#FFFFFF', use: 'Text on ink', ink: true },
  { name: 'Action', hex: '#7452FF', use: 'Buttons with white labels', ink: false },
  { name: 'Accent', hex: '#A893FF', use: 'Small text on dark', ink: true },
  { name: 'Surface', hex: '#17171D', use: 'Panels on ink', ink: false, outlined: true },
];

export const typefaces = [
  { name: 'Inter', role: 'Headlines, amounts and text', family: 'var(--sans)', sample: 'Avant-garde, money.', weight: 600, href: 'https://fonts.google.com/specimen/Inter' },
  { name: 'IBM Plex Mono', role: 'Addresses and invoices', family: 'var(--mono)', sample: 'kayhan@zular.app', weight: 500, href: 'https://fonts.google.com/specimen/IBM+Plex+Mono' },
];

export const productImages = [
  { name: 'Balance card', file: 'product/zular-balance-card.png', alt: 'Zular balance card showing a sample balance in sats', transparent: true },
  { name: 'Gift card', file: 'product/zular-gift-card.png', alt: 'Zular gift card for 10,000 sats, with a sample message', transparent: true },
  { name: 'Social banner', file: 'product/zular-social-banner.png', alt: 'Zular banner with the words Avant-garde, money and the 3D bolt' },
];

export const boilerplate = [
  { id: 'motto', label: 'Motto', text: 'Avant-garde, money.' },
  { id: 'short', label: 'One line', text: 'Zular is a Lightning wallet for everyday people.' },
  { id: 'long', label: 'Paragraph', text: 'Zular is a custodial Bitcoin Lightning wallet for everyday people. Pay anyone by their Telegram handle, send sats as a gift link, trade in a peer-to-peer market with trust scores built from real trades and reports, and buy on a schedule with DCA plans.' },
];

export const dos = [
  'Write the name as Zular, with a capital Z.',
  'Keep clear space around the mark, at least half its width.',
  'Use the violet mark on dark, the ink mark on light, and the white mark on violet or photos.',
  'Keep the logo at least 16px tall on screens.',
  'Say that Zular holds users’ balances where custody matters to your story.',
];

export const donts = [
  'Don’t recolor, stretch, rotate or outline the logo.',
  'Don’t add shadows, glows or gradients to the flat logo.',
  'Don’t use the old Daric name or the orange logo.',
  'Don’t call Zular a self-custody wallet.',
  'Don’t imply a partnership or endorsement without asking us.',
];

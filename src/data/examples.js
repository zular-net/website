// Sample content for the page. Nothing here is a real person or a real trade.
export const activity = [
  { id: 1, initial: 'N', tone: 'teal', title: 'Noor A.', subtitle: 'Received · Today, 10:42', amount: '+8,200', meta: '≈ $9.02', positive: true },
  { id: 2, initial: 'S', tone: 'blue', title: 'Gift link', subtitle: 'Claimed by Sam · Yesterday', amount: '−10,000', meta: '≈ $11.00' },
  { id: 3, initial: 'L', tone: 'purple', title: 'P2P trade', subtitle: 'Bought from @lena · Yesterday', amount: '+150,000', meta: '≈ $165.00', positive: true },
  { id: 4, initial: 'C', tone: 'amber', title: 'Café Roma', subtitle: 'Invoice · Oct 31', amount: '−4,300', meta: '≈ $4.73' },
];

export const offers = [
  { id: 1, initial: 'L', tone: 'purple', handle: '@lena', detail: 'Sells 150,000 sats · Bank transfer', score: 0.91, price: '$165.00' },
  { id: 2, initial: 'O', tone: 'blue', handle: '@omar', detail: 'Sells 50,000 sats · Cash app', score: 0.72, price: '$55.40' },
];

export const trustGraph = {
  width: 520,
  height: 360,
  center: { x: 260, y: 180 },
  people: [
    { id: 'N', x: 120, y: 84, tone: 'teal' },
    { id: 'S', x: 396, y: 78, tone: 'blue' },
    { id: 'O', x: 92, y: 268, tone: 'amber' },
    { id: 'L', x: 420, y: 270, tone: 'purple' },
    { id: 'A', x: 258, y: 44, tone: 'rose' },
    { id: 'R', x: 262, y: 322, tone: 'blue' },
    { id: 'J', x: 34, y: 170, tone: 'purple' },
    { id: 'T', x: 488, y: 166, tone: 'teal' },
  ],
  // "me" is the centre. Highlighted links show the path to @lena.
  links: [
    ['me', 'N', true], ['me', 'S'], ['me', 'O'], ['N', 'L', true], ['S', 'L'], ['S', 'A'], ['N', 'A'],
    ['O', 'R'], ['me', 'R'], ['N', 'J'], ['O', 'J'], ['S', 'T'], ['L', 'T'], ['L', 'R'],
  ],
};

export const roadmap = ['Self-custody', 'iOS', 'Merchant POS', 'Payment gateway', 'NFC tap-to-pay', 'Subscriptions'];

export const fees = [
  { value: 'Free', label: 'Sends and Telegram payments' },
  { value: '0.5%', label: 'P2P trades, paid by the seller' },
  { value: '1%', label: 'Gift links' },
];

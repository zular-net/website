import type { NavItem } from '../../types.ts';

export const HOME_NAV: NavItem[] = [
  { label: 'Wallet', icon: 'wallet', target: 'wallet', sections: ['wallet', 'send', 'gift'] },
  { label: 'Soon', icon: 'clock', target: 'soon', sections: ['soon'] },
  { label: 'Fees', icon: 'percent', target: 'fees', sections: ['fees'] },
  { label: 'Get', icon: 'download', target: 'get', sections: ['get'] },
];

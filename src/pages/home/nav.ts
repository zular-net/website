import type { NavItem } from '../../types.ts';

export const HOME_NAV: NavItem[] = [
  { label: 'Wallet', icon: 'wallet', target: 'wallet', sections: ['wallet', 'send', 'gift'] },
  { label: 'P2P', icon: 'market', target: 'market', sections: ['market'] },
  { label: 'DCA', icon: 'dca', target: 'dca', sections: ['dca', 'fees'] },
  { label: 'Get', icon: 'download', target: 'get', sections: ['get'] },
];

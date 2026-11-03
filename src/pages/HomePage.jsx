import Hero from '../sections/Hero.jsx';
import WalletSection from '../sections/WalletSection.jsx';
import SendSection from '../sections/SendSection.jsx';
import GiftSection from '../sections/GiftSection.jsx';
import MarketSection from '../sections/MarketSection.jsx';
import DcaSection from '../sections/DcaSection.jsx';
import FeesSection from '../sections/FeesSection.jsx';
import GetSection from '../sections/GetSection.jsx';

export const HOME_NAV = [
  { label: 'Wallet', icon: 'wallet', target: 'wallet', sections: ['wallet', 'send', 'gift'] },
  { label: 'P2P', icon: 'market', target: 'market', sections: ['market'] },
  { label: 'DCA', icon: 'dca', target: 'dca', sections: ['dca', 'fees'] },
  { label: 'Get', icon: 'download', target: 'get', sections: ['get'] },
];

export default function HomePage() {
  return (
    <>
      <Hero />
      <WalletSection />
      <SendSection />
      <GiftSection />
      <MarketSection />
      <DcaSection />
      <FeesSection />
      <GetSection />
    </>
  );
}

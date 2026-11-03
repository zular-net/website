import DcaSection from './sections/DcaSection.tsx';
import FeesSection from './sections/FeesSection.tsx';
import GetSection from './sections/GetSection.tsx';
import GiftSection from './sections/GiftSection.tsx';
import Hero from './sections/Hero.tsx';
import MarketSection from './sections/MarketSection.tsx';
import SendSection from './sections/SendSection.tsx';
import WalletSection from './sections/WalletSection.tsx';

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

import ComingSoonSection from './sections/ComingSoonSection.tsx';
import FeesSection from './sections/FeesSection.tsx';
import GetSection from './sections/GetSection.tsx';
import GiftSection from './sections/GiftSection.tsx';
import Hero from './sections/Hero.tsx';
import SendSection from './sections/SendSection.tsx';
import WalletSection from './sections/WalletSection.tsx';

export default function HomePage() {
  return (
    <>
      <Hero />
      <WalletSection />
      <SendSection />
      <GiftSection />
      <ComingSoonSection />
      <FeesSection />
      <GetSection />
    </>
  );
}

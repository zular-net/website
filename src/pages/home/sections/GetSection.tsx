import BoltAnchor from '../../../components/bolt/BoltAnchor.tsx';
import { Section, SectionTitle } from '../../../components/layout/Section.tsx';
import BitcoinLogo from '../../../components/ui/BitcoinLogo.tsx';
import CopyField from '../../../components/ui/CopyField.tsx';
import { contactEmail, donationAddresses, downloads, type Download } from '../../../config.ts';
import styles from './sections.module.css';

function Platform({ item }: { item: Download }) {
  const body = (
    <>
      <b>{item.name}</b>
      <span>{item.href ? 'Download' : item.status}</span>
    </>
  );
  if (item.href) {
    return (
      <a className={styles.platform} href={item.href} rel="noreferrer">
        {body}
      </a>
    );
  }
  return <div className={styles.platform}>{body}</div>;
}

export default function GetSection() {
  const { bitcoin, lightning } = donationAddresses;
  return (
    <Section id="get" className={styles.get}>
      <div className={styles.getGlow} />
      <div className={styles.getInner}>
        <BoltAnchor className={styles.getBolt} />
        <SectionTitle>Avant-garde, money.</SectionTitle>
        <p className={styles.getSub}>Zular reaches Android first, starting with a small pilot.</p>
        <div className={styles.platforms}>
          {downloads.map((item) => (
            <Platform key={item.id} item={item} />
          ))}
        </div>
        <div className={styles.support}>
          <div className={styles.supportTile}>
            <h3>Donate</h3>
            <span>
              {bitcoin || lightning
                ? 'Support development with an on-chain Bitcoin payment.'
                : 'Support development with Bitcoin. Addresses will appear here when they’re ready.'}
            </span>
            {bitcoin && (
              <CopyField value={bitcoin} label="Bitcoin address" icon={<BitcoinLogo />} />
            )}
            {lightning && <CopyField value={lightning} label="Lightning address" />}
          </div>
          <div className={styles.supportTile}>
            <h3>Invest</h3>
            <span>Talk to the team about investing in Zular.</span>
            <CopyField value={contactEmail} label="email address" />
          </div>
        </div>
      </div>
    </Section>
  );
}

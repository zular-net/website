import MoneyCard from '../components/card/MoneyCard.jsx';
import { Heading, Section, Split } from '../components/layout/Section.jsx';
import Icon from '../components/ui/Icon.jsx';
import styles from './sections.module.css';

export default function GiftSection() {
  return (
    <Section id="gift">
      <Split>
        <div className={styles.gift}>
          <MoneyCard amount="10,000" fiat="≈ $11.00" footer="From Kayhan · Happy birthday!" seed={23} top={<Icon name="gift" size="62%" className={styles.giftIcon} />} />
          <div className={styles.giftLink}><span>zular.net/g/7Hq2 vXp9 Lm4k</span><b>Example</b></div>
        </div>
        <Heading eyebrow="Gift links" title="Give sats as easily as sharing a link.">
          Pick an amount, add a message and share the link anywhere. Whoever opens it claims the gift.
        </Heading>
      </Split>
    </Section>
  );
}

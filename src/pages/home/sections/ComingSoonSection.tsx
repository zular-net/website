import { Heading, Section, Split } from '../../../components/layout/Section.tsx';
import Icon, { type IconName } from '../../../components/ui/Icon.tsx';
import styles from './sections.module.css';

const FEATURES: { title: string; text: string; icon: IconName }[] = [
  {
    title: 'P2P market',
    text: 'Buy and sell sats with people you trust, with scores from real trades.',
    icon: 'market',
  },
  {
    title: 'DCA plans',
    text: 'Stack on a schedule, and decide every buy yourself.',
    icon: 'dca',
  },
];

/** Stands in for MarketSection and DcaSection until they launch. */
export default function ComingSoonSection() {
  return (
    <Section id="soon">
      <Split>
        <Heading eyebrow="Coming soon" title="More is on the way.">
          The wallet comes first. These follow once it’s in your hands.
        </Heading>
        <div className={styles.stack}>
          {FEATURES.map((feature) => (
            <article key={feature.title} className={styles.soonCard}>
              <span className={styles.soonIcon}>
                <Icon name={feature.icon} />
              </span>
              <div>
                <h3>{feature.title}</h3>
                <p>{feature.text}</p>
                <span className={styles.soonTag}>Coming soon</span>
              </div>
            </article>
          ))}
        </div>
      </Split>
    </Section>
  );
}

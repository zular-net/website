import { Heading, Section } from '../../../components/layout/Section.tsx';
import { fees, roadmap } from '../examples.ts';
import styles from './sections.module.css';

export default function FeesSection() {
  return (
    <Section id="fees" className={styles.noTop}>
      <Heading eyebrow="Fees" title="Simple enough to fit in three numbers." />
      <div className={styles.fees}>
        {fees.map((fee) => (
          <div key={fee.label} className={styles.tile}>
            <b>{fee.value}</b>
            <span>{fee.label}</span>
          </div>
        ))}
      </div>
      <p className={styles.onTheWay}>On the way</p>
      <div className={styles.chips}>
        {roadmap.map((item) => (
          <span key={item}>{item}</span>
        ))}
      </div>
    </Section>
  );
}

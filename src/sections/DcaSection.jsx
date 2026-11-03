import { useId, useMemo, useState } from 'react';
import { Heading, Section, Split } from '../components/layout/Section.jsx';
import { exampleBtcPriceUsd } from '../config.js';
import { FREQUENCIES, yearlyPlan } from '../lib/dca.js';
import { formatSats, formatWholeUsd } from '../lib/format.js';
import styles from './sections.module.css';

function DcaCalculator() {
  const [amountUsd, setAmountUsd] = useState(25);
  const [frequencyId, setFrequencyId] = useState('weekly');
  const inputId = useId();
  const plan = useMemo(() => {
    const { buysPerYear } = FREQUENCIES.find((frequency) => frequency.id === frequencyId);
    return yearlyPlan({ amountUsd, buysPerYear, btcPriceUsd: exampleBtcPriceUsd });
  }, [amountUsd, frequencyId]);

  return (
    <div className={styles.dca}>
      <label className={styles.dcaLabel} htmlFor={inputId}>Amount per buy <output>{formatWholeUsd(amountUsd)}</output></label>
      <input id={inputId} className={styles.range} type="range" min="5" max="500" step="5" value={amountUsd} onChange={(event) => setAmountUsd(Number(event.target.value))} />
      <div className={styles.segments} role="group" aria-label="How often to buy">
        {FREQUENCIES.map((frequency) => (
          <button key={frequency.id} type="button" aria-pressed={frequency.id === frequencyId} onClick={() => setFrequencyId(frequency.id)}>{frequency.label}</button>
        ))}
      </div>
      <div className={styles.total}>{formatSats(plan.totalSats)} <small>sats</small></div>
      <p className={styles.totalNote}>In one year, for {formatWholeUsd(plan.totalUsd)} at an example price of {formatWholeUsd(exampleBtcPriceUsd)} per BTC. Real prices will differ.</p>
    </div>
  );
}

export default function DcaSection() {
  return (
    <Section id="dca">
      <Split>
        <DcaCalculator />
        <Heading eyebrow="DCA" title="Stack on a schedule. Decide every buy.">
          Set an amount and a rhythm. When it’s time to buy, Zular shows the best matching offers from the market, and you choose one.
        </Heading>
      </Split>
    </Section>
  );
}

import { useId, useState } from 'react';
import { Heading, Section, Split } from '../../../components/layout/Section.tsx';
import { exampleBtcPriceUsd } from '../../../config.ts';
import { FREQUENCIES, yearlyPlan, type Frequency } from '../../../lib/dca.ts';
import { formatSats, formatWholeUsd } from '../../../lib/format.ts';
import styles from './sections.module.css';

function DcaCalculator() {
  const [amountUsd, setAmountUsd] = useState(25);
  const [frequency, setFrequency] = useState<Frequency['id']>('weekly');
  const inputId = useId();

  const buysPerYear = FREQUENCIES.find((item) => item.id === frequency)?.buysPerYear ?? 0;
  const plan = yearlyPlan({ amountUsd, buysPerYear, btcPriceUsd: exampleBtcPriceUsd });

  return (
    <div className={styles.dca}>
      <label className={styles.dcaLabel} htmlFor={inputId}>
        Amount per buy <output>{formatWholeUsd(amountUsd)}</output>
      </label>
      <input
        id={inputId}
        className={styles.range}
        type="range"
        min="5"
        max="500"
        step="5"
        value={amountUsd}
        onChange={(event) => setAmountUsd(Number(event.target.value))}
      />
      <div className={styles.segments} role="group" aria-label="How often to buy">
        {FREQUENCIES.map((item) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={item.id === frequency}
            onClick={() => setFrequency(item.id)}
          >
            {item.label}
          </button>
        ))}
      </div>
      <div className={styles.total}>
        {formatSats(plan.totalSats)} <small>sats</small>
      </div>
      <p className={styles.totalNote}>
        In one year, for {formatWholeUsd(plan.totalUsd)} at an example price of{' '}
        {formatWholeUsd(exampleBtcPriceUsd)} per BTC. Real prices will differ.
      </p>
    </div>
  );
}

export default function DcaSection() {
  return (
    <Section id="dca">
      <Split>
        <DcaCalculator />
        <Heading eyebrow="DCA" title="Stack on a schedule. Decide every buy.">
          Set an amount and a rhythm. When it’s time to buy, Zular shows the best matching offers
          from the market, and you choose one.
        </Heading>
      </Split>
    </Section>
  );
}

import { useEffect, useReducer } from 'react';
import BoltAnchor from '../../../components/bolt/BoltAnchor.tsx';
import { Heading, Section, Split } from '../../../components/layout/Section.tsx';
import Avatar from '../../../components/ui/Avatar.tsx';
import Button from '../../../components/ui/Button.tsx';
import Icon from '../../../components/ui/Icon.tsx';
import Panel from '../../../components/ui/Panel.tsx';
import Row from '../../../components/ui/Row.tsx';
import { exampleBtcPriceUsd } from '../../../config.ts';
import { formatSats, formatUsd, satsToUsd } from '../../../lib/format.ts';
import { KEYS, pressKey, type Key } from '../../../lib/keypad.ts';
import styles from './sections.module.css';

const CLAIM_DELAY_MS = 2600;
const STEPS = [
  'You pick a handle and an amount.',
  'The Zular bot messages them on Telegram.',
  'They tap to claim, and the sats reach their wallet.',
];

const toUsd = (sats: number) => formatUsd(satsToUsd(sats, exampleBtcPriceUsd));

interface DemoState {
  amount: number;
  sent: { amount: number; claimed: boolean } | null;
}

type DemoAction = { type: 'key'; key: Key } | { type: 'send' } | { type: 'claimed' };

function reducer(state: DemoState, action: DemoAction): DemoState {
  switch (action.type) {
    case 'key':
      return { ...state, amount: pressKey(state.amount, action.key) };
    case 'send':
      return state.amount ? { amount: 0, sent: { amount: state.amount, claimed: false } } : state;
    case 'claimed':
      return state.sent ? { ...state, sent: { ...state.sent, claimed: true } } : state;
  }
}

/** A pretend payment. Nothing here touches a wallet or a network. */
function SendDemo() {
  const [{ amount, sent }, dispatch] = useReducer(reducer, { amount: 0, sent: null });

  useEffect(() => {
    if (!sent || sent.claimed) return undefined;
    const timer = setTimeout(() => dispatch({ type: 'claimed' }), CLAIM_DELAY_MS);
    return () => clearTimeout(timer);
  }, [sent]);

  return (
    <div className={styles.stack}>
      <div className={styles.demo}>
        <div className={styles.recipient}>
          <Avatar initial="M" tone="rose" />
          <div>
            <div className={styles.recipientName}>Maya R.</div>
            <div className={styles.recipientHandle}>@maya_r on Telegram</div>
          </div>
        </div>
        <div className={styles.amountLine}>
          <BoltAnchor className={styles.amountBolt} />
          <output className={styles.amount} data-empty={amount === 0} aria-live="polite">
            {formatSats(amount)}
          </output>
          <span className={styles.unit}>sats</span>
        </div>
        <div className={styles.fiatChip}>≈ {toUsd(amount)}</div>
        <div className={styles.keys}>
          {KEYS.map((key) => (
            <button
              key={key}
              type="button"
              className={styles.key}
              data-soft={key === '000' || key === 'delete'}
              aria-label={key === 'delete' ? 'Delete' : undefined}
              onClick={() => dispatch({ type: 'key', key })}
            >
              {key === 'delete' ? <Icon name="backspace" /> : key}
            </button>
          ))}
        </div>
        <Button disabled={amount === 0} onClick={() => dispatch({ type: 'send' })}>
          {amount ? `Send ${formatSats(amount)} sats` : 'Send sats'}
        </Button>
        <p className={styles.demoNote}>Try it. This demo doesn’t move any money.</p>
      </div>
      {sent && (
        <Panel>
          <Row
            className={styles.rise}
            initial="M"
            tone="rose"
            title="Maya R."
            subtitle={sent.claimed ? 'Telegram · Claimed by Maya' : 'Telegram · Waiting for claim'}
            subtitleTone={sent.claimed ? 'success' : 'pending'}
            amount={`−${formatSats(sent.amount)}`}
            meta={`≈ ${toUsd(sent.amount)}`}
          />
        </Panel>
      )}
    </div>
  );
}

export default function SendSection() {
  return (
    <Section id="send">
      <Split flip>
        <div>
          <Heading eyebrow="Telegram payments" title="Send sats to a handle.">
            The person you pay doesn’t need Zular yet. Type their Telegram handle and an amount, and
            a bot takes it from there.
          </Heading>
          <ol className={styles.steps}>
            {STEPS.map((step) => (
              <li key={step}>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </div>
        <SendDemo />
      </Split>
    </Section>
  );
}

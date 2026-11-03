import { useEffect, useReducer } from 'react';
import BoltAnchor from '../components/bolt/BoltAnchor.jsx';
import { Heading, Section, Split } from '../components/layout/Section.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Button from '../components/ui/Button.jsx';
import Icon from '../components/ui/Icon.jsx';
import Panel from '../components/ui/Panel.jsx';
import Row from '../components/ui/Row.jsx';
import { exampleBtcPriceUsd } from '../config.js';
import { formatSats, formatUsd, satsToUsd } from '../lib/format.js';
import { KEYS, pressKey } from '../lib/keypad.js';
import styles from './sections.module.css';

const CLAIM_DELAY_MS = 2600;
const toUsd = (sats) => formatUsd(satsToUsd(sats, exampleBtcPriceUsd));

const initial = { amount: 0, sent: null };

function reducer(state, action) {
  switch (action.type) {
    case 'key':
      return { ...state, amount: pressKey(state.amount, action.key) };
    case 'send':
      return state.amount ? { amount: 0, sent: { amount: state.amount, claimed: false } } : state;
    case 'claimed':
      return state.sent ? { ...state, sent: { ...state.sent, claimed: true } } : state;
    default:
      return state;
  }
}

function SendDemo() {
  const [{ amount, sent }, dispatch] = useReducer(reducer, initial);

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
          <div><div className={styles.recipientName}>Maya R.</div><div className={styles.recipientHandle}>@maya_r on Telegram</div></div>
        </div>
        <div className={styles.amountLine}>
          <BoltAnchor className={styles.amountBolt} />
          <output className={styles.amount} data-empty={amount === 0} aria-live="polite">{formatSats(amount)}</output>
          <span className={styles.unit}>sats</span>
        </div>
        <div className={styles.fiatChip}>≈ {toUsd(amount)}</div>
        <div className={styles.keys}>
          {KEYS.map((key) => (
            <button key={key} type="button" className={styles.key} data-soft={key === '000' || key === 'delete'} aria-label={key === 'delete' ? 'Delete' : undefined} onClick={() => dispatch({ type: 'key', key })}>
              {key === 'delete' ? <Icon name="backspace" /> : key}
            </button>
          ))}
        </div>
        <Button disabled={amount === 0} onClick={() => dispatch({ type: 'send' })}>{amount ? `Send ${formatSats(amount)} sats` : 'Send sats'}</Button>
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

const STEPS = ['You pick a handle and an amount.', 'The Zular bot messages them on Telegram.', 'They tap to claim, and the sats reach their wallet.'];

export default function SendSection() {
  return (
    <Section id="send">
      <Split flip>
        <div>
          <Heading eyebrow="Telegram payments" title="Send sats to a handle.">
            The person you pay doesn’t need Zular yet. Type their Telegram handle and an amount, and a bot takes it from there.
          </Heading>
          <ol className={styles.steps}>{STEPS.map((step) => <li key={step}><span>{step}</span></li>)}</ol>
        </div>
        <SendDemo />
      </Split>
    </Section>
  );
}

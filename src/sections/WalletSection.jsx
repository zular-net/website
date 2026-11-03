import BalanceCard from '../components/card/BalanceCard.jsx';
import { Heading, Section, Split } from '../components/layout/Section.jsx';
import Icon from '../components/ui/Icon.jsx';
import Panel from '../components/ui/Panel.jsx';
import Row from '../components/ui/Row.jsx';
import { activity } from '../data/examples.js';
import styles from './sections.module.css';

const ACTIONS = [
  { label: 'Receive', icon: 'receive' },
  { label: 'Send', icon: 'send' },
  { label: 'Gift', icon: 'gift', quiet: true },
];

export default function WalletSection() {
  return (
    <Section id="wallet">
      <Split>
        <div>
          <BalanceCard />
          <div className={styles.walletActions} aria-hidden="true">
            {ACTIONS.map((action) => (
              <span key={action.label} className={styles.pill} data-quiet={Boolean(action.quiet)}>
                <Icon name={action.icon} size={18} strokeWidth={2} />{action.label}
              </span>
            ))}
          </div>
          <p className={styles.custody}>Zular holds your Lightning balance in this version. Self-custody is on the roadmap.</p>
        </div>
        <div className={styles.stack}>
          <Heading eyebrow="Wallet" title="Everything you do with sats, in one list." />
          <Panel label="Activity" tag="Example">
            {activity.map(({ id, ...row }) => <Row key={id} {...row} />)}
          </Panel>
        </div>
      </Split>
    </Section>
  );
}

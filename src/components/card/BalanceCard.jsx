import { lightningAddress } from '../../config.js';
import BoltAnchor from '../bolt/BoltAnchor.jsx';
import Icon from '../ui/Icon.jsx';
import MoneyCard from './MoneyCard.jsx';
import styles from './MoneyCard.module.css';

export default function BalanceCard() {
  return (
    <MoneyCard
      amount="1,284,500"
      fiat="≈ $1,412.95"
      footer="Kayhan Sepanta"
      top={<BoltAnchor light className={styles.bolt} />}
      side={(
        <>
          <span className={styles.chip}><Icon name="qr" strokeWidth={2} /></span>
          <span className={styles.edge}>{lightningAddress}</span>
        </>
      )}
    />
  );
}

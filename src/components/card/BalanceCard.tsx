import { lightningAddress } from '../../config.ts';
import BoltAnchor from '../bolt/BoltAnchor.tsx';
import Icon from '../ui/Icon.tsx';
import MoneyCard from './MoneyCard.tsx';
import styles from './MoneyCard.module.css';

export default function BalanceCard() {
  return (
    <MoneyCard
      amount="1,284,500"
      fiat="≈ $1,412.95"
      footer="Kayhan Sepanta"
      top={<BoltAnchor light className={styles.bolt} />}
      side={
        <>
          <span className={styles.chip}>
            <Icon name="qr" strokeWidth={2} />
          </span>
          <span className={styles.edge}>{lightningAddress}</span>
        </>
      }
    />
  );
}

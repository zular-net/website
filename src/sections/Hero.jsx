import BoltAnchor from '../components/bolt/BoltAnchor.jsx';
import BoltMark from '../components/bolt/BoltMark.jsx';
import Button from '../components/ui/Button.jsx';
import styles from './Hero.module.css';

function jump(event, id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView();
}

export default function Hero() {
  return (
    <header className={styles.hero}>
      <div className={styles.glowRight} />
      <div className={styles.glowLeft} />
      <div className={styles.wrap}>
        <div className={styles.brand}><BoltMark className={styles.brandMark} />Zular</div>
        <div className={styles.headline}>
          <h1><span>Avant-garde,</span><span className={styles.accent}>money.</span></h1>
          <BoltAnchor className={styles.bolt} />
        </div>
        <div className={styles.foot}>
          <p className={styles.lede}>A Lightning wallet for everyday people. Pay anyone by their Telegram handle, send sats as a gift link, trade with people you trust, and stack on a schedule.</p>
          <div className={styles.actions}>
            <Button href="#get" onClick={(event) => jump(event, 'get')}>Get Zular</Button>
            <Button href="#wallet" variant="surface" onClick={(event) => jump(event, 'wallet')}>See the wallet</Button>
          </div>
          <p className={styles.note}><b>Android comes first.</b><br />Sends and Telegram payments are free.</p>
        </div>
      </div>
    </header>
  );
}

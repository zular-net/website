import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import { downloads, socials, donationAddresses, investmentEmail } from './config.js';
import { ArrowDown, ArrowDownRight, ArrowUpRight, Bitcoin, Bird, CircleCheck, BriefcaseBusiness, Check, Clock3, Copy, HandCoins, Laptop, Mail, Menu, Network, Repeat2, Send, Smartphone, Store, Tablet, Terminal, X as XIcon, Zap } from 'lucide-react';
import './style.css';

const platformIcons = { mac: Laptop, linux: Terminal, android: Smartphone, ios: Tablet };
function PlatformIcon({ platform, size = 22 }) {
  const Icon = platformIcons[platform] ?? Smartphone;
  return <Icon size={size} strokeWidth={1.8} aria-hidden="true" />;
}
const socialIcons = { Nostr: Bird, X: XIcon, Telegram: Send, Email: Mail };
function SocialIcon({ name }) {
  const Icon = socialIcons[name] ?? Network;
  return <Icon size={19} strokeWidth={1.9} aria-hidden="true" />;
}

function AddressRow({ label, address }) {
  const [copied, setCopied] = useState(false);
  const Icon = copied ? Check : Copy;
  const copy = async () => {
    if (!address || !navigator.clipboard) return;
    await navigator.clipboard.writeText(address);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };
  return <div className={`address-row ${address ? '' : 'address-empty'}`}><span className="address-label">{label}</span><code>{address || 'Address will be added soon'}</code><button type="button" onClick={copy} disabled={!address} aria-label={`Copy ${label} address`}><Icon size={17} strokeWidth={1.8}/></button></div>;
}

function App() {
  return <>
    <header className="nav shell"><a className="brand" href="#top"><img src="/daric-mark.png" alt="Daric"/><span>Daric</span></a><nav><a href="#ecosystem">Ecosystem</a><a href="#download">Download</a><a href="#support">Support</a></nav><a className="nav-cta" href="#download">Get Daric <ArrowDownRight size={16}/></a><button className="menu" aria-label="Open menu"><Menu size={22}/></button></header>
    <main id="top">
      <section className="hero shell"><div className="hero-image" aria-hidden="true"/><div className="hero-copy"><div className="eyebrow">AN OPEN BITCOIN ECOSYSTEM</div><h1>Avant-garde,<br/><em>money.</em></h1><p>A growing ecosystem for Bitcoin. Start with a Lightning wallet and peer-to-peer market, built around you.</p><a className="button-primary" href="#ecosystem">Explore Daric <ArrowDown size={17}/></a><div className="platform-note"><span className="platform-strip">{['mac','linux','android','ios'].map(p=><PlatformIcon key={p} platform={p} size={20}/>)}</span> One wallet across your devices</div></div></section>
      <section className="vision shell" id="ecosystem"><div className="section-label">THE DARIC ECOSYSTEM</div><div className="vision-row"><h2>Bitcoin tools.<br/><em>Made for people.</em></h2><p>Daric brings together the products and infrastructure to make Bitcoin useful in everyday life—from personal payments to the systems that power businesses.</p></div>
        <div className="ecosystem-grid roadmap-grid"><article className="eco-card eco-live ln-card"><div className="eco-top"><span>AVAILABLE NOW</span><CircleCheck size={16} strokeWidth={1.8}/></div><div className="eco-icon ln-symbol"><Zap size={25} strokeWidth={1.8}/></div><h3>Custodial Lightning wallet</h3><p>Fast, simple Bitcoin payments across your devices.</p></article><article className="eco-card eco-live p2p-card"><div className="eco-top"><span>AVAILABLE NOW · WEB OF TRUST</span><CircleCheck size={16} strokeWidth={1.8}/></div><div className="eco-icon p2p-symbol"><Repeat2 size={26} strokeWidth={1.8}/></div><h3>WoT-supported P2P market</h3><p>Trade directly with people, with trust and reputation at the center of every offer.</p><div className="wot-note"><Network size={16} strokeWidth={1.8}/> People. Reputation. Peer-to-peer.</div></article><article className="eco-card eco-future noncustodial-card"><div className="eco-top"><span>COMING</span><Clock3 size={15} strokeWidth={1.8}/></div><div className="eco-icon multi-symbol"><Bitcoin size={23} strokeWidth={1.8}/><Zap size={20} strokeWidth={1.8}/></div><h3>Non-custodial BTC &amp; Lightning</h3><p>Self-custody for both Bitcoin on L1 and Lightning.</p><div className="chain-tags"><span className="btc-tag"><Bitcoin size={14}/> BTC · L1</span><span className="ln-tag"><Zap size={14}/> Lightning</span></div></article><article className="eco-card eco-future infra-card"><div className="eco-top"><span>COMING</span><Clock3 size={15} strokeWidth={1.8}/></div><div className="eco-icon pos-symbol"><Store size={25} strokeWidth={1.8}/></div><h3>POS &amp; payment gateway</h3><p>Payment infrastructure for shops and online businesses, with Bitcoin and Lightning node services ahead.</p></article></div>
      </section>
      <section className="download-section" id="download"><div className="shell"><div className="download-head"><div><div className="section-label">TAKE DARIC WITH YOU</div><h2>Choose your <em>platform.</em></h2></div><p>One wallet. Pick your device.</p></div><div className="download-list">{downloads.map(item=>{const available=item.active&&item.href; return <a key={item.id} className={`download-row ${available?'available':'coming'}`} href={available?item.href:undefined} aria-disabled={!available} onClick={e=>{if(!available)e.preventDefault()}}><span className="os-icon"><PlatformIcon platform={item.id}/></span><span className="os-name">{item.name}</span><span className="os-detail">{item.detail}</span><span className="os-status">{available?'Download':'Coming soon'}</span><span className="os-arrow">{available?<ArrowUpRight size={18}/>:<Clock3 size={16} />}</span></a>})}</div><p className="availability-note">Platform links and release status are updated as builds become available.</p></div></section>
      <section className="support-section" id="support"><div className="shell"><div className="section-label">SUPPORT THE ECOSYSTEM</div><div className="support-heading"><h2>Help build <em>open Bitcoin.</em></h2><p>Fuel the work, or start a conversation about investing in Daric.</p></div><div className="support-grid"><article className="support-card donate-card"><div className="support-icon"><HandCoins size={25} strokeWidth={1.8}/></div><h3>Donate</h3><p>Support ongoing development with Bitcoin.</p><AddressRow label="BTC · L1" address={donationAddresses.bitcoin}/><AddressRow label="Lightning" address={donationAddresses.lightning}/></article><article className="support-card invest-card"><div className="support-icon"><BriefcaseBusiness size={25} strokeWidth={1.8}/></div><h3>Invest</h3><p>Interested in investing in Daric? Get in touch with our team.</p><a className="invest-link" href={`mailto:${investmentEmail}`}><Mail size={18} strokeWidth={1.8}/>{investmentEmail}<ArrowUpRight size={17}/></a></article></div></div></section>
      <footer className="footer shell"><a className="brand" href="#top"><img src="/daric-mark.png" alt="Daric"/><span>Daric</span></a><p>Avant-garde, money.</p><div className="socials">{socials.map(link=>link.href?<a key={link.name} href={link.href} aria-label={link.name} title={link.name} target={link.name==='Email'?undefined:'_blank'} rel="noreferrer"><SocialIcon name={link.name}/></a>:<span key={link.name} className="social-disabled" aria-label={`${link.name} link not configured`} title={link.name}><SocialIcon name={link.name}/></span>)}</div><span className="copyright">© Daric</span></footer>
    </main>
  </>;
}

createRoot(document.getElementById('root')).render(<App />);

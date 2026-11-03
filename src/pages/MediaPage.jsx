import { useState } from 'react';
import BoltAnchor from '../components/bolt/BoltAnchor.jsx';
import BoltMark from '../components/bolt/BoltMark.jsx';
import { Heading, Section } from '../components/layout/Section.jsx';
import { PageLink } from '../components/RouteContext.jsx';
import Button from '../components/ui/Button.jsx';
import CopyField from '../components/ui/CopyField.jsx';
import Icon from '../components/ui/Icon.jsx';
import { investmentEmail } from '../config.js';
import { boilerplate, colors, donts, dos, logos, productImages, typefaces } from '../data/media.js';
import { assetUrl, FULL_KIT } from '../lib/assets.js';
import { ROUTES } from '../lib/route.js';
import styles from './MediaPage.module.css';

function Download({ file, children, label }) {
  return (
    <a className={styles.download} href={assetUrl(file)} download aria-label={label}>
      <Icon name="download" size={16} />{children}
    </a>
  );
}

function LogoTile({ logo }) {
  const kind = logo.tall ? 'tall' : logo.icon ? 'icon' : 'wide';
  return (
    <figure className={styles.tile}>
      <div className={styles.preview} data-background={logo.background}>
        <img src={assetUrl(`${logo.file}.svg`)} alt={`${logo.name}, ${logo.note}`} data-kind={kind} loading="lazy" />
      </div>
      <figcaption className={styles.tileFoot}>
        <span className={styles.tileText}><b>{logo.name}</b><small>{logo.note}</small></span>
        <span className={styles.formats}>
          <Download file={`${logo.file}.svg`} label={`Download ${logo.name}, ${logo.note}, as SVG`}>SVG</Download>
          <Download file={`${logo.file}.png`} label={`Download ${logo.name}, ${logo.note}, as PNG`}>PNG</Download>
        </span>
      </figcaption>
    </figure>
  );
}

function ColorSwatch({ color }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(color.hex);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" className={styles.swatch} style={{ background: color.hex, color: color.ink ? '#0b0b0f' : '#fff' }} data-outlined={Boolean(color.outlined)} onClick={copy} aria-label={`Copy ${color.name}, ${color.hex}`}>
      <b>{color.name}</b>
      <span className={styles.hex}>{copied ? 'Copied' : color.hex}</span>
      <small>{color.use}</small>
    </button>
  );
}

export default function MediaPage() {
  return (
    <>
      <header className={styles.hero}>
        <div className={styles.glow} />
        <div className={styles.heroWrap}>
          <PageLink to={ROUTES.home} className={styles.brand}><BoltMark className={styles.brandMark} />Zular</PageLink>
          <div className={styles.heroGrid}>
            <div>
              <h1>Media assets</h1>
              <p className={styles.lede}>Logos, the 3D bolt, colors, type and product images for press, partners and anyone writing about Zular.</p>
              <Button href={assetUrl(FULL_KIT)} download>Download everything</Button>
            </div>
            <BoltAnchor className={styles.heroBolt} />
          </div>
        </div>
      </header>

      <Section id="logos" className={styles.tight}>
        <Heading eyebrow="Logos" title="The mark and the logo.">
          Use the logo where people may not know Zular yet. Use the mark when the name appears nearby. Every file comes as SVG and PNG.
        </Heading>
        <div className={styles.grid}>{logos.map((logo) => <LogoTile key={logo.id} logo={logo} />)}</div>
      </Section>

      <Section id="bolt" className={styles.tight}>
        <div className={styles.boltPanel}>
          <div className={styles.boltCopy}>
            <Heading eyebrow="3D bolt" title="The bolt, as a real object.">
              The GLB works in three.js, Blender and other 3D tools. The renders suit layouts that can’t show 3D.
            </Heading>
            <div className={styles.boltLinks}>
              <Download file="3d/zular-bolt.glb" label="Download the 3D bolt as GLB">GLB</Download>
              <Download file="3d/zular-bolt-3d.png" label="Download the 3D bolt render with a transparent background">PNG, transparent</Download>
              <Download file="3d/zular-bolt-3d-on-ink.png" label="Download the 3D bolt render on ink">PNG, on ink</Download>
            </div>
          </div>
          <BoltAnchor className={styles.boltLive} />
        </div>
      </Section>

      <Section id="colors" className={styles.tight}>
        <Heading eyebrow="Colors" title="Violet on ink.">
          Tap a color to copy its value. For small text, put white on Action, or use Accent on dark.
        </Heading>
        <div className={styles.swatches}>{colors.map((color) => <ColorSwatch key={color.hex} color={color} />)}</div>
      </Section>

      <Section id="type" className={styles.tight}>
        <Heading eyebrow="Type" title="Two typefaces." />
        <div className={styles.types}>
          {typefaces.map((face) => (
            <div key={face.name} className={styles.typeTile}>
              <p className={styles.typeSample} style={{ fontFamily: face.family, fontWeight: face.weight }}>{face.sample}</p>
              <div className={styles.typeFoot}>
                <span className={styles.tileText}><b>{face.name}</b><small>{face.role}</small></span>
                <a href={face.href} target="_blank" rel="noreferrer" className={styles.download}>Get the font</a>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="product" className={styles.tight}>
        <Heading eyebrow="Product images" title="Ready for articles and posts.">
          Names and amounts in these images are samples.
        </Heading>
        <div className={styles.productGrid}>
          {productImages.map((image) => (
            <figure key={image.file} className={styles.tile}>
              <div className={styles.productPreview} data-transparent={Boolean(image.transparent)}>
                <img src={assetUrl(image.file)} alt={image.alt} loading="lazy" />
              </div>
              <figcaption className={styles.tileFoot}>
                <span className={styles.tileText}><b>{image.name}</b></span>
                <Download file={image.file} label={`Download ${image.name} as PNG`}>PNG</Download>
              </figcaption>
            </figure>
          ))}
        </div>
      </Section>

      <Section id="copy" className={styles.tight}>
        <Heading eyebrow="Words" title="How to describe Zular." />
        <div className={styles.copyList}>
          {boilerplate.map((item) => (
            <div key={item.id} className={styles.copyTile}>
              <small>{item.label}</small>
              <p>{item.text}</p>
              <CopyTextButton text={item.text} label={item.label} />
            </div>
          ))}
        </div>
      </Section>

      <Section id="rules" className={styles.tight}>
        <Heading eyebrow="Usage" title="A few simple rules." />
        <div className={styles.rules}>
          <ul>{dos.map((rule) => <li key={rule}><Icon name="check" size={18} strokeWidth={2} className={styles.yes} />{rule}</li>)}</ul>
          <ul>{donts.map((rule) => <li key={rule}><Icon name="close" size={18} strokeWidth={2} className={styles.no} />{rule}</li>)}</ul>
        </div>
      </Section>

      <Section id="contact" className={styles.tight}>
        <div className={styles.contact}>
          <div><h3>Press and partnerships</h3><p>Need something that isn’t here? Write to us.</p></div>
          <CopyField value={investmentEmail} label="email address" />
        </div>
      </Section>
    </>
  );
}

function CopyTextButton({ text, label }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };
  return (
    <button type="button" className={styles.download} onClick={copy} aria-label={`Copy ${label}`}>
      <Icon name={copied ? 'check' : 'copy'} size={16} />{copied ? 'Copied' : 'Copy'}
    </button>
  );
}

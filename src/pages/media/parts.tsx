import type { ReactNode } from 'react';
import Icon from '../../components/ui/Icon.tsx';
import { useCopy } from '../../hooks/useCopy.ts';
import { assetUrl } from '../../lib/assets.ts';
import type { BrandColor, LogoAsset } from './content.ts';
import styles from './MediaPage.module.css';

interface DownloadProps {
  /** Path below brand-assets. */
  file: string;
  label: string;
  children: ReactNode;
}

export function Download({ file, label, children }: DownloadProps) {
  return (
    <a className={styles.download} href={assetUrl(file)} download aria-label={label}>
      <Icon name="download" size={16} />
      {children}
    </a>
  );
}

export function LogoTile({ logo }: { logo: LogoAsset }) {
  const title = `${logo.name}, ${logo.note}`;
  return (
    <figure className={styles.tile}>
      <div className={styles.preview} data-background={logo.background}>
        <img src={assetUrl(`${logo.file}.svg`)} alt={title} data-kind={logo.kind} loading="lazy" />
      </div>
      <figcaption className={styles.tileFoot}>
        <span className={styles.tileText}>
          <b>{logo.name}</b>
          <small>{logo.note}</small>
        </span>
        <span className={styles.formats}>
          <Download file={`${logo.file}.svg`} label={`Download ${title}, as SVG`}>
            SVG
          </Download>
          <Download file={`${logo.file}.png`} label={`Download ${title}, as PNG`}>
            PNG
          </Download>
        </span>
      </figcaption>
    </figure>
  );
}

export function ColorSwatch({ color }: { color: BrandColor }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      className={styles.swatch}
      style={{ background: color.hex, color: color.inkText ? '#0b0b0f' : '#fff' }}
      data-outlined={Boolean(color.outlined)}
      onClick={() => void copy(color.hex)}
      aria-label={`Copy ${color.name}, ${color.hex}`}
    >
      <b>{color.name}</b>
      <span className={styles.hex}>{copied ? 'Copied' : color.hex}</span>
      <small>{color.use}</small>
    </button>
  );
}

export function CopyTextButton({ text, label }: { text: string; label: string }) {
  const { copied, copy } = useCopy();
  return (
    <button
      type="button"
      className={styles.download}
      onClick={() => void copy(text)}
      aria-label={`Copy ${label}`}
    >
      <Icon name={copied ? 'check' : 'copy'} size={16} />
      {copied ? 'Copied' : 'Copy'}
    </button>
  );
}

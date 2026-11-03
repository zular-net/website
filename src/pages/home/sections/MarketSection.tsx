import BoltAnchor from '../../../components/bolt/BoltAnchor.tsx';
import { Heading, Section, Split } from '../../../components/layout/Section.tsx';
import Panel from '../../../components/ui/Panel.tsx';
import Row from '../../../components/ui/Row.tsx';
import TrustBadge from '../../../components/ui/TrustBadge.tsx';
import { TRUST_BANDS } from '../../../lib/trust.ts';
import type { Tone } from '../../../types.ts';
import { offers, trustGraph } from '../examples.ts';
import styles from './sections.module.css';

const TONE_FILL: Record<Tone, string> = {
  teal: '#1f7f8c',
  blue: '#3457d5',
  purple: '#7c35c9',
  amber: '#c9702b',
  rose: '#d14f7e',
};

function TrustGraph() {
  const { width, height, center, people, links } = trustGraph;
  const positions = new Map<string, { x: number; y: number }>([
    ['me', center],
    ...people.map((person): [string, { x: number; y: number }] => [person.id, person]),
  ]);

  return (
    <div className={styles.graphPanel}>
      <div className={styles.graph}>
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label="Example trust graph with you in the middle, connected to traders through people you have traded with"
        >
          {links.map(([from, to, highlighted]) => {
            const a = positions.get(from);
            const b = positions.get(to);
            if (!a || !b) return null;
            return (
              <line
                key={`${from}-${to}`}
                x1={a.x}
                y1={a.y}
                x2={b.x}
                y2={b.y}
                stroke={highlighted ? '#a893ff' : 'rgb(255 255 255 / 0.14)'}
                strokeWidth={highlighted ? 2.5 : 1.5}
              />
            );
          })}
          <circle
            cx={center.x}
            cy={center.y}
            r="44"
            fill="#24242c"
            stroke="#7a5cff"
            strokeWidth="2"
          />
          {people.map((person) => (
            <g key={person.id}>
              <circle cx={person.x} cy={person.y} r="20" fill={TONE_FILL[person.tone]} />
              <text
                x={person.x}
                y={person.y + 5}
                textAnchor="middle"
                fill="#fff"
                fontSize="14"
                fontWeight="600"
              >
                {person.id}
              </text>
            </g>
          ))}
        </svg>
        <BoltAnchor className={styles.graphBolt} />
      </div>
      <p className={styles.graphCaption}>Example: @lena is two trades away from you, through Noor.</p>
    </div>
  );
}

export default function MarketSection() {
  return (
    <Section id="market">
      <Split flip>
        <div>
          <Heading eyebrow="P2P market" title="Stars can be faked. A web of trust is harder.">
            Trust scores come from a social graph of real trades and reports. You see how close each
            trader is to people you already trust.
          </Heading>
          <div className={styles.bands} aria-label="Trust score bands">
            {TRUST_BANDS.map((band) => (
              <div key={band.name} data-tone={band.tone}>
                {band.name}
                <small>{band.min.toFixed(2)}</small>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.stack}>
          <TrustGraph />
          <Panel label="Offers" tag="Example">
            {offers.map((offer) => (
              <Row
                key={offer.id}
                initial={offer.initial}
                tone={offer.tone}
                title={offer.handle}
                subtitle={offer.detail}
                meta={offer.price}
                right={<TrustBadge score={offer.score} />}
              />
            ))}
          </Panel>
        </div>
      </Split>
    </Section>
  );
}

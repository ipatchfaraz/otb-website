import { anims, colors, fonts } from '@/lib/tokens';

export default function Manifesto() {
  return (
    <section
      data-screen-label="Manifesto"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '140px 72px',
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 40,
        alignItems: 'center',
        textAlign: 'center'
      }}
    >
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 'clamp(34px, 5vw, 68px)',
          lineHeight: 1.08,
          margin: 0,
          textTransform: 'uppercase',
          maxWidth: '22ch',
          textWrap: 'balance' as React.CSSProperties['textWrap']
        }}
      >
        <span style={{ color: colors.yellow, animation: anims.flicker }}>SAFE</span> IS THE RISKIEST THING A BRAND CAN BE.
      </h2>
      <p style={{ margin: 0, maxWidth: '62ch', fontSize: 17, lineHeight: 1.7, color: colors.muted }}>
        Templates get ignored. Trends expire. We build purpose-driven, humanised brands from the inside out — so they hold up long after the hype ships out.
      </p>
    </section>
  );
}

import { anims, colors, fonts } from '@/lib/tokens';
import Cube from './Cube';

export default function ContactCta() {
  return (
    <section
      id="contact"
      data-screen-label="Contact CTA"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '140px 72px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 36,
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div aria-hidden>
        <Cube size={220} />
      </div>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 'clamp(34px, 5vw, 68px)',
          lineHeight: 1.04,
          margin: 0,
          textTransform: 'uppercase',
          maxWidth: '20ch',
          textWrap: 'balance' as React.CSSProperties['textWrap']
        }}
      >
        HAVE A BOXED IDEA? LET&rsquo;S OPEN IT.
      </h2>
      <a href="#book" className="cta-y" style={{ padding: '18px 36px', fontSize: 13, gap: 2 }}>
        BOOK A FREE DISCOVERY CALL<span style={{ animation: anims.blink }}>█</span>
      </a>
      <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.muted }}>
        OR WRITE TO{' '}
        <a href="mailto:INFO@OUTTATHEBOX.DESIGN" className="hover-yellow" style={{ color: colors.muted }}>
          INFO@OUTTATHEBOX.DESIGN
        </a>
      </div>
    </section>
  );
}

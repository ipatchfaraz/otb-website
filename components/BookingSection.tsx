import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';

export default function BookingSection() {
  const url =
    'https://cal.com/outta-the-box-b05oqw/30min?embed=true&theme=dark&layout=month_view';
  return (
    <section
      id="book"
      data-screen-label="Book a call"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '88px 72px',
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
        [ OPEN A CHANNEL ]
      </div>
      <h2
        style={{
          fontFamily: fonts.display,
          fontWeight: 900,
          fontSize: 'clamp(34px, 5vw, 68px)',
          lineHeight: 1.02,
          margin: 0,
          textTransform: 'uppercase'
        }}
      >
        PICK A SLOT.
      </h2>
      <p style={{ margin: 0, maxWidth: '58ch', fontSize: 17, lineHeight: 1.65, color: colors.muted }}>
        A 30-minute call. No pitch, no deck just your idea and how we&rsquo;d unbox it.
      </p>
      <div style={{ position: 'relative', border: `1px solid ${colors.line}`, marginTop: 16 }}>
        <CornerBrackets outside />
        <div
          style={{
            borderBottom: `1px solid ${colors.line}`,
            padding: '12px 20px',
            display: 'flex',
            justifyContent: 'space-between',
            gap: 16,
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            color: colors.muted
          }}
        >
          <span>SCHEDULER // CAL.COM_LINK</span>
          <span style={{ color: colors.yellow }}>● ONLINE</span>
        </div>
        <iframe
          src={url}
          title="Book a call with Outta The Box Cal.com"
          loading="lazy"
          style={{
            display: 'block',
            width: '100%',
            height: 700,
            border: 0,
            background: colors.bg
          }}
        />
      </div>
    </section>
  );
}

import { ImageResponse } from 'next/og';

// OG image shown when the URL is shared on WhatsApp / Slack / LinkedIn / X.
// Next.js auto-injects og:image and twitter:image meta tags.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Outta The Box™ — Ideas this good don’t stay in the box.';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#141414',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          fontFamily: 'system-ui, sans-serif',
          // Radial-dot pattern matches the site hero background
          backgroundImage: 'radial-gradient(#242414 2px, transparent 2px)',
          backgroundSize: '38px 38px'
        }}
      >
        {/* Top row — logomark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <svg width={64} height={64} viewBox="0 0 638 638" fill="none">
            <path d="M319 83.5459L235.453 0H402.547L319 83.5459Z" fill="#FFE500" />
            <path d="M319 554.001L402.547 637.547L235.453 637.547L319 554.001Z" fill="#FFE500" />
            <path d="M83.5459 319L0 402.547V235.453L83.5459 319Z" fill="#FFE500" />
            <path d="M554.001 319L637.547 235.453V402.547L554.001 319Z" fill="#FFE500" />
            <path d="M319 217L217 319L319 421L421 319L319 217Z" fill="#FFE500" />
          </svg>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 34,
              fontWeight: 900,
              letterSpacing: '0.04em',
              fontFamily: 'system-ui, sans-serif'
            }}
          >
            OUTTA THE BOX™
          </div>
        </div>

        {/* Middle — the tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div
            style={{
              color: '#FFE500',
              fontSize: 20,
              fontWeight: 700,
              letterSpacing: '0.16em',
              fontFamily: 'monospace'
            }}
          >
            [ BRANDING &amp; DESIGN AGENCY — KUALA LUMPUR ]
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              color: '#FFFFFF',
              fontSize: 82,
              fontWeight: 900,
              lineHeight: 1.02,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              maxWidth: 940
            }}
          >
            <span style={{ marginRight: 22 }}>Ideas this good don’t stay in the</span>
            <span style={{ color: '#FFE500' }}>box.</span>
          </div>
        </div>

        {/* Bottom row — yellow accent + url */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 8, height: 8, background: '#FFE500', borderRadius: 8 }} />
          <div
            style={{
              color: '#8A8A8A',
              fontSize: 22,
              fontWeight: 500,
              letterSpacing: '0.2em',
              fontFamily: 'monospace'
            }}
          >
            OUTTATHEBOX.DESIGN
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}

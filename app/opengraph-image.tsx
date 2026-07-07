import { ImageResponse } from 'next/og';

// OG image shown when the URL is shared on WhatsApp / Slack / LinkedIn / X.
// Next.js auto-injects og:image and twitter:image meta tags.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Outta The Box™ — Ideas this good don’t stay in the box.';

// Force Node runtime so we can fetch external fonts at build/request time
// without the size cap of the edge runtime.
export const runtime = 'nodejs';

/**
 * Fetch a Google Font at request time and return raw bytes for Satori.
 * The `text` param scopes the CSS response to just the glyphs we render
 * so the download is a few KB instead of the full 30–100 KB face.
 */
async function loadGoogleFont(family: string, weight: number, text: string): Promise<ArrayBuffer> {
  const url = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(
    family
  )}:wght@${weight}&text=${encodeURIComponent(text)}`;
  // Serving TTF requires an old-user-agent trick; Satori accepts woff2
  // fine in modern @vercel/og so we take whatever Google gives us.
  const css = await fetch(url, {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  }).then((r) => r.text());
  const match = css.match(/src:\s*url\((https:\/\/[^)]+)\)\s*format\('(woff2|truetype|opentype)'\)/);
  if (!match) throw new Error(`Font URL not found for ${family} ${weight}`);
  const buf = await fetch(match[1]).then((r) => r.arrayBuffer());
  return buf;
}

export default async function OpenGraphImage() {
  // Only the characters that appear on the card — keeps the fetch tiny.
  const displayText = 'OUTTATHEBOX™IDESTHGON‘Y.[BRANDIG&EGCYKUALMPR]';
  const monoText = '[BRANDING&DESIGNAGENCY—KUALALUMPUR]OUTTATHEBOX.DESIGN';

  const [displayFont, monoFont] = await Promise.all([
    loadGoogleFont('Chakra Petch', 700, displayText),
    loadGoogleFont('JetBrains Mono', 700, monoText)
  ]);

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
          fontFamily: '"Chakra Petch", sans-serif',
          backgroundImage: 'radial-gradient(#242414 2px, transparent 2px)',
          backgroundSize: '38px 38px'
        }}
      >
        {/* Top row — logomark + wordmark */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
          <svg width={80} height={80} viewBox="0 0 638 638" fill="none">
            {/* 4 yellow diamond arrows */}
            <path d="M319 83.5459L235.453 0H402.547L319 83.5459Z" fill="#FFE500" />
            <path d="M319 554.001L402.547 637.547L235.453 637.547L319 554.001Z" fill="#FFE500" />
            <path d="M83.5459 319L0 402.547V235.453L83.5459 319Z" fill="#FFE500" />
            <path d="M554.001 319L637.547 235.453V402.547L554.001 319Z" fill="#FFE500" />
            {/* Central detailed X mark — full path from the brand logomark */}
            <path
              fill="#F1F1F1"
              d="M293.629 373.628L230.5 436.758V486.258L181.258 535.5H96.7578L81.3789 550.879L85.6211 555.121L99.2422 541.5H183.742L236.5 488.742V439.242L297.871 377.87L315 394.999V515L283 547H230.258L139.258 638H34.3379L0 603.662V500.242L73.7422 426.5H98.2422L167 357.742V322H242L293.629 373.628ZM192 638H147.742L232.742 553H277L192 638ZM495.258 638H446L361 553H410.258L495.258 638ZM471 357.742L539.758 426.5H564.258L638 500.242V603.338L603.338 638H503.742L412.742 547H355L321 513V396.999L339.378 378.62L400 439.242V488.742L452.758 541.5H537.258L550.879 555.121L555.121 550.879L539.742 535.5H455.242L406 486.258V436.758L343.62 374.378L396 322H471V357.742ZM34 603H78V559H34V603ZM565 603H609V559H565V603ZM161 355.258L95.7578 420.5H71.2578L0 491.758V446L124 322H161V355.258ZM637.999 446.001L638 446V491.758L566.742 420.5H542.242L477 355.258V322H513.999L637.999 446.001ZM71.2578 217H95.7578L161 282.242V316H124L0 192V145.742L71.2578 217ZM136.379 0.621094L227.758 92H283.999L315 123.001V242.998L298.37 259.628L236.5 197.758V148.258L183.742 95.5H99.2422L85.6211 81.8789L81.3789 86.1211L96.7578 101.5H181.258L230.5 150.742V200.242L294.128 263.87L241.998 316H167V279.758L98.2422 211H73.7422L0 137.258V34.0137L34.0137 0H137L136.379 0.621094ZM638 34.3379V137.258L564.258 211H539.758L471 279.758V316H396.002L343.122 263.12L406 200.242V150.742L455.242 101.5H539.742L555.121 86.1211L550.879 81.8789L537.258 95.5H452.758L400 148.258V197.758L338.88 258.878L321 240.998V125.001L354.001 92H410.242L501.621 0.621094L501 0H603.662L638 34.3379ZM638 192L637.999 191.999L513.999 316H477V282.242L542.242 217H566.742L638 145.742V192ZM191.999 0.000976562L277.999 86H230.242L144.242 0H192L191.999 0.000976562ZM407.758 86H360.001L446.001 0.000976562L446 0H493.758L407.758 86ZM34 73H78V29H34V73ZM565 73H609V29H565V73Z"
            />
          </svg>
          <div
            style={{
              color: '#FFFFFF',
              fontSize: 38,
              fontWeight: 700,
              letterSpacing: '0.04em',
              fontFamily: '"Chakra Petch"'
            }}
          >
            OUTTA THE BOX™
          </div>
        </div>

        {/* Middle — the tagline */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 26 }}>
          <div
            style={{
              color: '#FFE500',
              fontSize: 22,
              fontWeight: 700,
              letterSpacing: '0.18em',
              fontFamily: '"JetBrains Mono"'
            }}
          >
            [ BRANDING &amp; DESIGN AGENCY KUALA LUMPUR ]
          </div>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              color: '#FFFFFF',
              fontSize: 96,
              fontWeight: 700,
              lineHeight: 1.0,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              maxWidth: 1000,
              fontFamily: '"Chakra Petch"'
            }}
          >
            <span style={{ marginRight: 26 }}>Ideas this good don’t stay in the</span>
            <span style={{ color: '#FFE500' }}>box.</span>
          </div>
        </div>

        {/* Bottom row — yellow accent + url */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ width: 10, height: 10, background: '#FFE500', borderRadius: 10 }} />
          <div
            style={{
              color: '#8A8A8A',
              fontSize: 24,
              fontWeight: 700,
              letterSpacing: '0.22em',
              fontFamily: '"JetBrains Mono"'
            }}
          >
            OUTTATHEBOX.DESIGN
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: 'Chakra Petch', data: displayFont, weight: 700, style: 'normal' },
        { name: 'JetBrains Mono', data: monoFont, weight: 700, style: 'normal' }
      ]
    }
  );
}

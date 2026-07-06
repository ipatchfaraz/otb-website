'use client';
import { useEffect, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

const CDN_A = 'https://cdn.prod.website-files.com/637970722913f9b6cd35b26b/';

const LOGOS = [
  '687146e0de591c1e6ea68e05_Petronas%20Logo%20-%20otbwebsite.svg',
  '687143fdb7eddde02dfa7bc6_IOU%20Logo%20-%20otbwebsite.svg',
  '687143fcf75c262086639517_TrueIlm%20Logo%20-%20otbwebsite.svg',
  '639aed3843aecb75293f3420_quraany-logo.svg',
  '687143fddc1aae63be51db60_Kalemah%20Logo%20-%20otbwebsite.svg',
  '6871470962901cc6691ccc3b_Yafa%20Logo%20-%20otbwebsite.svg',
  '639aed3aa95e0e1524a49650_revivers-logo.svg',
  '639aed38916db4b9b247ed93_mujizah-logo.svg',
  '639aed35695d38b4b8049a17_iof-logo.svg',
  '639aed34ab43caf61e28a7d9_indiaverse-logo.svg',
  '6871444c6cfdaa564bf6dcef_BA%20Logo%20-%20otbwebsite.svg',
  '639aed3377749850b310e482_dunes-logo.svg',
  '639aed3a6f64285820586394_tbe-logo.svg',
  '639aed34d2f46eb66cfd3873_annadaa-logo.svg',
  '639aed37a95e0e888ba49624_legacy-logo.svg',
  '639aed37ce8fc0a13d99aa79_marookha-logo.svg',
  '639aed3a0c5a455017b6f0b0_sifa-logo.svg',
  '639aed370c5a45535db6f04a_mo-logo.svg',
  '639aed340a971f3ca1723f3a_hot-turtle-logo.svg',
  '639aed38ada1c29360d24755_petals-logo.svg',
  '639aed38e08e87a30273012b_owtp-logo.svg',
  '639aed34e1266c81c320873b_grainer-logo.svg',
  '639aed3771957455dff547b9_mimar-sinaan-logo.svg',
  '639aed3a43aecb6c793f3425_vitrin9-logo.svg',
  '639aed3aaff1d8348a12ee28_rumah-oppah-logo.svg'
].map((f) => CDN_A + f);

type Cell = { src: string; g: boolean; tx: number };

export default function TrustedBy() {
  const [cells, setCells] = useState<Cell[]>(() =>
    LOGOS.slice(0, 10).map((src) => ({ src, g: false, tx: 0 }))
  );

  useEffect(() => {
    const iv = setInterval(() => {
      setCells((cs) => {
        const shown = new Set(cs.map((c) => c.src));
        const candidates = LOGOS.filter((u) => !shown.has(u));
        if (!candidates.length) return cs;
        const idx = Math.floor(Math.random() * cs.length);
        const target = candidates[Math.floor(Math.random() * candidates.length)];
        const next = cs.slice();
        next[idx] = { ...next[idx], g: true, tx: 3 };
        setTimeout(() => {
          setCells((cur) => {
            const n = cur.slice();
            n[idx] = { ...n[idx], src: target, tx: -3 };
            return n;
          });
        }, 55);
        setTimeout(() => {
          setCells((cur) => {
            const n = cur.slice();
            n[idx] = { ...n[idx], g: false, tx: 0 };
            return n;
          });
        }, 130);
        return next;
      });
    }, 700);
    return () => clearInterval(iv);
  }, []);

  const stats: Array<[string, string]> = [
    ['Y E A R S', '10+'],
    ['C L I E N T S', '100+'],
    ['P R O J E C T S', '200+'],
    ['C O U N T R I E S', '12+']
  ];

  return (
    <section
      data-screen-label="Trusted by"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '56px 72px',
        maxWidth: 1440,
        margin: '0 auto'
      }}
    >
      <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow, marginBottom: 32 }}>
        [ TRUSTED BY ]
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          borderTop: `1px solid ${colors.line}`,
          borderLeft: `1px solid ${colors.line}`
        }}
      >
        {cells.map((c, i) => (
          <div
            key={i}
            style={{
              background: colors.bg,
              height: 130,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              overflow: 'hidden',
              borderRight: `1px solid ${colors.line}`,
              borderBottom: `1px solid ${colors.line}`
            }}
          >
            <div
              role="img"
              aria-label="Client logo"
              style={{
                width: '62%',
                height: 46,
                backgroundImage: `url('${c.src}')`,
                backgroundSize: 'contain',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                filter: c.g
                  ? 'saturate(0.85) drop-shadow(2px 0 rgba(255,229,0,0.4))'
                  : 'saturate(0.85)',
                opacity: c.g ? 1 : 0.82,
                transform: `translateX(${c.tx}px)`,
                transition: 'transform 60ms linear, filter 60ms linear'
              }}
            />
          </div>
        ))}
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 16,
          marginTop: 40
        }}
      >
        {stats.map(([label, val]) => (
          <div key={label} className="hover-border" style={{ border: `1px solid ${colors.line}`, padding: 24, position: 'relative' }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.4em', color: colors.muted, marginBottom: 12 }}>
              {label}
            </div>
            <div style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 40, color: colors.fg }}>{val}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

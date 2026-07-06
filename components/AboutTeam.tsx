'use client';
import { useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

type Social = { label: string; url: string };
type Member = {
  idx: string;
  name: string;
  role: string;
  photo: string;
  clearance: string;
  idNo: string;
  dept: string;
  socials: Social[];
};

const TEAM: Member[] = [
  {
    idx: '01', name: 'Muhammed Faraz Faizal', role: 'CHIEF BRAND OFFICER',
    photo: '/images/team/Faraz.png?v=2', clearance: 'LVL-04', idNo: 'OTB-CBO-001', dept: 'BRAND',
    socials: [{ label: 'INSTAGRAM ↗', url: '#' }, { label: 'LINKEDIN ↗', url: '#' }]
  },
  {
    idx: '02', name: 'Ahmed Tahqiq', role: 'CEO',
    photo: '/images/team/Ahmed.png', clearance: 'LVL-05', idNo: 'OTB-CEO-000', dept: 'EXEC',
    socials: [{ label: 'INSTAGRAM ↗', url: '#' }]
  }
];

const FULL_TEAM: Array<{ initials: string; name: string; role: string; socials: Social[] }> = [
  { initials: 'MF', name: 'Muhammed Faraz Faizal', role: 'CHIEF BRAND OFFICER', socials: [{ label: 'IG', url: '#' }, { label: 'IN', url: '#' }] },
  { initials: 'AT', name: 'Ahmed Tahqiq',          role: 'CEO',                  socials: [{ label: 'IG', url: '#' }] },
  { initials: 'AM', name: 'Anas Mujahid',          role: 'DESIGNER',             socials: [{ label: 'PORTFOLIO ↗', url: '#' }] },
  { initials: 'IN', name: 'Issa Nadeem',           role: 'WEB DEVELOPER',        socials: [{ label: 'IG', url: '#' }] },
  { initials: 'KN', name: 'Khidr Nasir',           role: 'RESEARCH EXPERT',      socials: [{ label: 'IG', url: '#' }] },
  { initials: 'HM', name: 'Hazim Maqbool',         role: 'DESIGNER',             socials: [{ label: 'IG', url: '#' }] },
  { initials: 'F',  name: 'Fatih',                 role: 'BUSINESS LEAD',        socials: [{ label: 'IG', url: '#' }] }
];

export default function AboutTeam() {
  const [open, setOpen] = useState(false);

  return (
    <section
      id="about"
      data-screen-label="About the studio"
      style={{
        borderTop: `1px solid ${colors.line}`,
        padding: '88px 72px',
        maxWidth: 1440,
        margin: '0 auto'
      }}
    >
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 56 }}>
        <div style={{ flex: '1 1 480px', minWidth: 300, display: 'flex', flexDirection: 'column', gap: 22 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
            [ THE STUDIO ]
          </div>
          <h2
            style={{
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 'clamp(34px, 5vw, 68px)',
              lineHeight: 1.02,
              margin: 0,
              textTransform: 'uppercase'
            }}
          >
            A SMALL TEAM. LOUD IDEAS.
          </h2>
          <p style={{ margin: 0, maxWidth: '56ch', fontSize: 17, lineHeight: 1.65, color: colors.muted }}>
            Based in Kuala Lumpur, working worldwide. Strategists, designers and developers who&rsquo;d rather ask &ldquo;what if&rdquo; than &ldquo;what&rsquo;s everyone else doing&rdquo;.
          </p>
        </div>
        <div style={{ flex: '0 1 300px', minWidth: 240, display: 'flex', flexDirection: 'column', gap: 14, paddingBottom: 6 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.12em', lineHeight: 1.9, color: colors.muted }}>
            VALUES: THINK OUTTA THE BOX / DESIGN AS A WHOLE / TIMELESS &amp; PRICELESS / BRING VALUE TO SOCIETY
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.12em', color: colors.muted }}>
            SYS: BRAND ENGINE V.15 // KUALA LUMPUR // ONLINE
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
        {TEAM.map((m) => (
          <div
            key={m.idx}
            className="hover-border"
            style={{
              position: 'relative',
              border: `1px solid ${colors.line}`,
              background: colors.bg,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              transition: 'border-color 0.2s'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '10px 14px',
                background: '#121212',
                borderBottom: `1px solid ${colors.line}`,
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: '0.16em',
                color: colors.muted
              }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <span style={{ width: 5, height: 5, background: colors.green, borderRadius: '50%', boxShadow: `0 0 6px ${colors.green}` }} />
                OTB CREW // ACCESS
              </span>
              <span style={{ color: colors.yellow }}>{m.idx}</span>
            </div>
            <div
              aria-hidden
              style={{
                height: 4,
                background:
                  'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 7px, #141414 7px, #141414 14px)',
                opacity: 0.8
              }}
            />
            <div
              style={{
                position: 'relative',
                margin: '14px 14px 0 14px',
                aspectRatio: '1 / 1',
                overflow: 'hidden',
                border: `1px solid ${colors.line}`,
                background:
                  'repeating-linear-gradient(45deg, #1A1A1A 0px, #1A1A1A 12px, #171717 12px, #171717 24px)'
              }}
            >
              <img
                src={m.photo}
                alt={m.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 8, right: 8, width: 28, height: 21,
                  background: 'linear-gradient(135deg, #FFE500, #6E6200)',
                  boxShadow: '0 0 8px rgba(255,229,0,0.45)',
                  pointerEvents: 'none'
                }}
              />
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 8, right: 8, width: 28, height: 21,
                  backgroundImage:
                    'repeating-linear-gradient(90deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 5px), repeating-linear-gradient(0deg, rgba(0,0,0,0.35) 0px, rgba(0,0,0,0.35) 1px, transparent 1px, transparent 6px)',
                  pointerEvents: 'none'
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 8, left: 8,
                  fontFamily: fonts.mono,
                  fontSize: 9, letterSpacing: '0.14em', color: colors.bg,
                  background: colors.yellow, padding: '3px 7px', fontWeight: 700
                }}
              >
                {m.clearance}
              </div>
            </div>

            <div style={{ padding: '12px 14px 0 14px', display: 'flex', flexDirection: 'column', gap: 6, fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.12em', color: '#6A6A6A' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.line2}`, paddingBottom: 5 }}>
                <span>ID NO</span>
                <span style={{ color: colors.mutedSoft }}>{m.idNo}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: `1px solid ${colors.line2}`, paddingBottom: 5 }}>
                <span>DEPT</span>
                <span style={{ color: colors.mutedSoft }}>{m.dept}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>STATUS</span>
                <span style={{ color: colors.green }}>● ACTIVE</span>
              </div>
            </div>

            <div style={{ padding: 14, display: 'flex', flexDirection: 'column', gap: 9 }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.18em', color: colors.yellow }}>
                {m.role}
              </div>
              <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 19, lineHeight: 1.1, textTransform: 'uppercase' }}>
                {m.name}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 4 }}>
                {m.socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.url}
                    target="_blank"
                    rel="noopener"
                    className="hover-yellow"
                    style={{
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.15em',
                      color: colors.muted,
                      textDecoration: 'none'
                    }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </div>
        ))}
        <button
          onClick={() => setOpen(true)}
          className="hover-border"
          style={{
            border: `1px dashed ${colors.line}`,
            background: 'transparent',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: 16,
            padding: '32px 24px',
            cursor: 'pointer',
            color: colors.fg
          }}
        >
          <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
            [ ROSTER ]
          </div>
          <div
            style={{
              width: 54,
              height: 54,
              border: `1px solid ${colors.yellow}`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontFamily: fonts.display,
              fontWeight: 700,
              fontSize: 28,
              color: colors.yellow,
              lineHeight: 1
            }}
          >
            +
          </div>
          <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 20, lineHeight: 1.1, textTransform: 'uppercase' }}>
            SHOW MORE
            <br />
            TEAM MEMBERS
          </div>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', color: colors.yellow }}>
            VIEW FULL ROSTER →
          </div>
        </button>
      </div>

      {open && (
        <div
          onClick={() => setOpen(false)}
          style={{
            display: 'flex',
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            background: 'rgba(8,8,8,0.82)',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 24
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 640,
              maxHeight: '84vh',
              overflowY: 'auto',
              background: '#161616',
              border: '1px solid #3A3A2E',
              boxShadow: '0 0 60px rgba(255,229,0,0.07)'
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '14px 20px',
                borderBottom: `1px solid ${colors.line}`,
                background: '#121212',
                fontFamily: fonts.mono,
                fontSize: 10,
                letterSpacing: '0.16em',
                color: colors.muted
              }}
            >
              <span style={{ color: colors.mutedSoft }}>
                <span style={{ color: colors.yellow }}>●</span> OTB://TEAM/ROSTER.DB
              </span>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close roster"
                className="hover-border"
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.line}`,
                  color: colors.muted,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  letterSpacing: '0.14em',
                  padding: '5px 11px',
                  cursor: 'pointer'
                }}
              >
                ESC ✕
              </button>
            </div>
            <div
              aria-hidden
              style={{
                height: 5,
                background:
                  'repeating-linear-gradient(-45deg, #FFE500 0px, #FFE500 8px, #141414 8px, #141414 16px)',
                opacity: 0.85
              }}
            />
            <div style={{ padding: '26px 26px 30px 26px' }}>
              <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow, marginBottom: 6 }}>
                [ THE FULL ROSTER ]
              </div>
              <h3
                style={{
                  fontFamily: fonts.display,
                  fontWeight: 700,
                  fontSize: 28,
                  margin: '0 0 8px 0',
                  textTransform: 'uppercase'
                }}
              >
                MEET THE TEAM.
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {FULL_TEAM.map((p) => (
                  <div key={p.name} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '16px 0', borderTop: `1px solid ${colors.line}` }}>
                    <div
                      style={{
                        flex: '0 0 46px',
                        width: 46,
                        height: 46,
                        border: `1px solid ${colors.line}`,
                        background: '#1B1B1B',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontFamily: fonts.display,
                        fontWeight: 700,
                        fontSize: 16,
                        color: colors.yellow
                      }}
                    >
                      {p.initials}
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <div style={{ fontFamily: fonts.display, fontWeight: 800, fontSize: 17, textTransform: 'uppercase' }}>
                        {p.name}
                      </div>
                      <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
                        {p.role}
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 12 }}>
                      {p.socials.map((s) => (
                        <a
                          key={s.label}
                          href={s.url}
                          target="_blank"
                          rel="noopener"
                          className="hover-yellow"
                          style={{
                            fontFamily: fonts.mono,
                            fontSize: 10,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            color: colors.muted,
                            textDecoration: 'none'
                          }}
                        >
                          {s.label}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

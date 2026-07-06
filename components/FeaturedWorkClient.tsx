'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';
import CornerBrackets from './CornerBrackets';

export type FeaturedCard = {
  slug: string;
  file: string;
  cover: string;
  meta: string;
  tagline: string;
  alt: string;
  /** URLs of gallery figures marked as `inHoverCycle` in the CMS.
   *  Cycled on hover with a cross-fade + yellow glitch flash. */
  hoverCycle: string[];
};

/**
 * Scroll-pinned horizontal pan for the Featured Work section.
 *
 * The outer <section> is stretched to viewport-height + horizontal
 * overflow distance. Its inner wrapper is `position: sticky`, so it
 * stays glued to the top of the viewport while the surrounding page
 * scrolls. As the section's top approaches the top of the viewport,
 * we translate the horizontal card strip on the X axis — mapping
 * vertical scroll progress (0..1) into a horizontal pan.
 *
 * A progress bar underneath the cards fills as the pan progresses,
 * and the file counter (01 / 07) updates in real time. See the
 * original _onWorkScroll / _sizeWork handlers in
 * `client-proposal-deck/project/OTB Homepage.dc.html`.
 */
export default function FeaturedWorkClient({ cards }: { cards: FeaturedCard[] }) {
  const secRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const countRef = useRef<HTMLSpanElement>(null);
  const totalCards = cards.length + 1; // + "SEE ALL WORK" tile

  useEffect(() => {
    const sec = secRef.current;
    const track = trackRef.current;
    if (!sec || !track) return;

    const size = () => {
      if (window.innerHeight === 0 || track.offsetWidth === 0) return;
      const dist = Math.max(0, track.offsetWidth - window.innerWidth);
      const h = window.innerHeight + dist;
      if (Math.abs((parseFloat(sec.style.height) || 0) - h) > 1) {
        sec.style.height = `${h}px`;
      }
      pan();
    };

    const pan = () => {
      const dist = Math.max(0, track.offsetWidth - window.innerWidth);
      const total = sec.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const p = Math.min(1, Math.max(0, -sec.getBoundingClientRect().top / total));
      track.style.transform = `translateX(${-p * dist}px)`;
      if (barRef.current) barRef.current.style.width = `${p * 100}%`;
      if (countRef.current) {
        countRef.current.textContent = String(
          Math.min(totalCards, Math.floor(p * totalCards) + 1)
        ).padStart(2, '0');
      }
    };

    window.addEventListener('scroll', pan, { passive: true });
    window.addEventListener('resize', size);
    size();
    // Late-fire in case fonts / images finish loading after mount and
    // shift the track's measured width.
    const t1 = setTimeout(size, 400);
    const t2 = setTimeout(size, 1200);
    return () => {
      window.removeEventListener('scroll', pan);
      window.removeEventListener('resize', size);
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [totalCards]);

  return (
    <section
      ref={secRef}
      id="work"
      data-screen-label="Selected work"
      style={{ borderTop: `1px solid ${colors.line}`, position: 'relative' }}
    >
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 36,
          boxSizing: 'border-box',
          padding: '84px 0 40px 0'
        }}
      >
        <div
          data-work-head
          style={{
            padding: '0 72px',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 16
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.15em', color: colors.yellow }}>
              [ SELECTED WORK ]
            </div>
            <h2
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 'clamp(30px, 4vw, 56px)',
                lineHeight: 1.02,
                margin: 0,
                textTransform: 'uppercase'
              }}
            >
              FRESH OUT OF THE BOX.
            </h2>
          </div>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: 24,
              fontFamily: fonts.mono,
              letterSpacing: '0.15em'
            }}
          >
            <span style={{ fontSize: 10, color: colors.muted }}>SCROLL ↓ TO PAN →</span>
            <span style={{ fontSize: 13, color: colors.yellow }}>
              <span ref={countRef}>01</span>
              <span style={{ color: colors.muted }}> / {String(totalCards).padStart(2, '0')}</span>
            </span>
          </div>
        </div>

        <div
          ref={trackRef}
          data-work-track
          style={{
            display: 'flex',
            gap: 24,
            padding: '0 72px',
            width: 'max-content',
            willChange: 'transform',
            alignItems: 'stretch'
          }}
        >
          {cards.map((card) => (
            <ProjectCard key={card.slug} card={card} />
          ))}
          <Link
            href="/work"
            className="hover-border"
            style={{
              width: 'clamp(300px, 27vw, 400px)',
              height: 'min(60vh, 600px)',
              flex: 'none',
              border: `1px solid ${colors.yellow}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 20,
              textDecoration: 'none',
              color: colors.fg,
              position: 'relative'
            }}
          >
            <span style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.2em', color: colors.muted }}>
              FILE_{String(totalCards).padStart(2, '0')} // INDEX
            </span>
            <span
              style={{
                fontFamily: fonts.display,
                fontWeight: 900,
                fontSize: 32,
                textTransform: 'uppercase',
                textAlign: 'center',
                lineHeight: 1.1
              }}
            >
              SEE ALL
              <br />
              WORK
            </span>
            <span style={{ fontFamily: fonts.mono, fontSize: 20, color: colors.yellow }}>→</span>
            <CornerBrackets outside corners={['tl', 'br']} />
          </Link>
          {/* Trailing spacer so the last card can pan clear of the right edge on narrow viewports */}
          <div aria-hidden data-work-endpad style={{ flex: 'none', width: 0 }} />
        </div>

        <div style={{ padding: '0 72px' }}>
          <div style={{ height: 1, background: colors.line, position: 'relative' }}>
            <div
              ref={barRef}
              style={{
                position: 'absolute',
                left: 0,
                top: -1,
                height: 3,
                width: '0%',
                background: colors.yellow,
                boxShadow: '0 0 8px rgba(255,229,0,0.5)'
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 * One featured project card. Owns its own hover-cycle state: while the
 * pointer is over the card, iterate through the URLs in `hoverCycle`
 * every ~1.4 s with a cross-fade + yellow glitch flash. Resets on
 * mouseleave.
 */
function ProjectCard({ card }: { card: FeaturedCard }) {
  const [hovering, setHovering] = useState(false);
  const [displayIdx, setDisplayIdx] = useState(-1); // -1 = cover
  const [flash, setFlash] = useState(false);
  const cycle = card.hoverCycle;

  useEffect(() => {
    if (!hovering || cycle.length === 0) return;
    // Preload — avoids the flash-of-blank as new images fetch mid-cycle
    cycle.forEach((u) => {
      const img = new window.Image();
      img.src = u;
    });
    let i = 0;
    setDisplayIdx(0);
    const iv = setInterval(() => {
      i = (i + 1) % cycle.length;
      setDisplayIdx(i);
      setFlash(true);
      setTimeout(() => setFlash(false), 260);
    }, 1400);
    return () => clearInterval(iv);
  }, [hovering, cycle]);

  const currentImg = hovering && displayIdx >= 0 && cycle[displayIdx] ? cycle[displayIdx] : card.cover;

  return (
    <Link
      href={`/work/${card.slug}`}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setDisplayIdx(-1);
        setFlash(false);
      }}
      className="hover-border"
      style={{
        width: 'clamp(300px, 27vw, 400px)',
        height: 'min(60vh, 600px)',
        flex: 'none',
        border: `1px solid ${colors.line}`,
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        textDecoration: 'none',
        color: colors.fg,
        background: colors.bg
      }}
    >
      <div
        role="img"
        aria-label={card.alt}
        style={{
          flex: 1,
          margin: 16,
          border: `1px solid ${colors.line}`,
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Cover layer — always present so we cross-fade cleanly */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: `url('${card.cover}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        />
        {/* Hover-cycle layer — fades over the cover */}
        {cycle.length > 0 && (
          <div
            key={currentImg}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage: `url('${currentImg}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              opacity: hovering && displayIdx >= 0 ? 1 : 0,
              transition: 'opacity 0.45s ease'
            }}
          />
        )}
        {/* Yellow glitch flash — brief overlay on each cycle */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, transparent 0%, rgba(255,229,0,0.14) 42%, transparent 46%, rgba(255,229,0,0.10) 55%, transparent 60%)',
            mixBlendMode: 'screen',
            opacity: flash ? 1 : 0,
            transition: 'opacity 0.15s linear',
            pointerEvents: 'none'
          }}
        />
        <CornerBrackets />
        <span
          style={{
            position: 'absolute',
            top: 14,
            left: 18,
            fontFamily: fonts.mono,
            fontSize: 11,
            letterSpacing: '0.2em',
            color: colors.muted,
            zIndex: 2
          }}
        >
          {card.file}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '6px 22px 22px 22px' }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted }}>
          {card.meta}
        </div>
        <p style={{ margin: 0, fontSize: 16, lineHeight: 1.5 }}>{card.tagline}</p>
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: colors.yellow
          }}
        >
          UNBOX THE CASE →
        </span>
      </div>
    </Link>
  );
}

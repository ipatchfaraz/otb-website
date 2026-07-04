'use client';
import { useEffect, useRef } from 'react';

export default function Cursor() {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia?.('(pointer: fine)').matches) return;
    document.documentElement.classList.add('custom-cursor');

    const onMove = (e: MouseEvent) => {
      const el = outer.current;
      if (el) el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    };
    const onOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      const hot = t?.closest('a, button, [role="button"]');
      const el = inner.current;
      if (el)
        el.style.transform = hot
          ? 'translate(-50%, -50%) scale(1.7) rotate(45deg)'
          : 'translate(-50%, -50%)';
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, true);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver, true);
      document.documentElement.classList.remove('custom-cursor');
    };
  }, []);

  const armStyle = (pos: React.CSSProperties): React.CSSProperties => ({
    position: 'absolute',
    background: '#FFE500',
    ...pos
  });

  return (
    <div
      ref={outer}
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        zIndex: 200,
        pointerEvents: 'none',
        transform: 'translate(-100px, -100px)',
        willChange: 'transform'
      }}
    >
      <div
        ref={inner}
        style={{
          position: 'relative',
          width: 30,
          height: 30,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.15s linear',
          filter: 'drop-shadow(0 0 5px rgba(255,229,0,0.6))'
        }}
      >
        <div style={armStyle({ left: '50%', top: '50%', width: 4, height: 4, margin: '-2px 0 0 -2px' })} />
        <div style={armStyle({ left: '50%', top: 0, width: 1, height: 7, marginLeft: '-0.5px' })} />
        <div style={armStyle({ left: '50%', bottom: 0, width: 1, height: 7, marginLeft: '-0.5px' })} />
        <div style={armStyle({ top: '50%', left: 0, height: 1, width: 7, marginTop: '-0.5px' })} />
        <div style={armStyle({ top: '50%', right: 0, height: 1, width: 7, marginTop: '-0.5px' })} />
        {[
          { top: 0, left: 0, borderTop: '1px solid #FFE500', borderLeft: '1px solid #FFE500' },
          { top: 0, right: 0, borderTop: '1px solid #FFE500', borderRight: '1px solid #FFE500' },
          { bottom: 0, left: 0, borderBottom: '1px solid #FFE500', borderLeft: '1px solid #FFE500' },
          { bottom: 0, right: 0, borderBottom: '1px solid #FFE500', borderRight: '1px solid #FFE500' }
        ].map((s, i) => (
          <div key={i} style={{ position: 'absolute', width: 7, height: 7, ...s }} />
        ))}
      </div>
    </div>
  );
}

import { anims } from '@/lib/tokens';

export function Scanlines() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 65,
        pointerEvents: 'none',
        background:
          'repeating-linear-gradient(0deg, rgba(255,255,255,0.02) 0px, rgba(255,255,255,0.02) 1px, transparent 1px, transparent 3px)'
      }}
    />
  );
}

export function ScanBar() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
        height: 90,
        zIndex: 65,
        pointerEvents: 'none',
        background:
          'linear-gradient(to bottom, transparent, rgba(255,229,0,0.04), transparent)',
        animation: anims.scanbar
      }}
    />
  );
}

export function EdgeMeta({
  left = 'WWW.OTB.DESIGN',
  right = '© OUTTA THE BOX™ 2026'
}: { left?: string; right?: string }) {
  const base: React.CSSProperties = {
    position: 'fixed',
    top: '50%',
    transform: 'translateY(-50%)',
    writingMode: 'vertical-rl',
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 10,
    letterSpacing: '0.25em',
    color: '#8A8A8A',
    zIndex: 60
  };
  return (
    <>
      <div className="edge-meta" style={{ ...base, left: 14 }}>{left}</div>
      <div className="edge-meta" style={{ ...base, right: 14 }}>{right}</div>
    </>
  );
}

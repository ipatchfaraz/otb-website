'use client';
import { useRef } from 'react';
import { anims, colors } from '@/lib/tokens';

const heroBases = [
  'rotateX(90deg) translateZ(130px)', // base (floor)
  'translateZ(130px)',                // front
  'rotateY(180deg) translateZ(130px)',// back
  'rotateY(90deg) translateZ(130px)', // right
  'rotateY(-90deg) translateZ(130px)' // left
];

function CornerDots() {
  return (
    <>
      {[
        { top: -3, left: -3 },
        { top: -3, right: -3 },
        { bottom: -3, left: -3 },
        { bottom: -3, right: -3 }
      ].map((pos, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: 6,
            height: 6,
            background: colors.yellow,
            borderRadius: '50%',
            ...pos
          }}
        />
      ))}
    </>
  );
}

export default function Cube({
  size = 260,
  interactive = true,
  animate = true
}: {
  size?: number;
  interactive?: boolean;
  animate?: boolean;
}) {
  const cube = useRef<HTMLDivElement>(null);
  const inner = size / 2; // ~130 for 260
  const bases = heroBases.map((b) => b.replace('130px', `${inner}px`));

  const setFaces = (opened: boolean) => {
    const c = cube.current;
    if (!c) return;
    const hinge = ` translateY(${inner}px) rotateX(-68deg) translateY(-${inner}px)`;
    Array.from(c.children).forEach((f, i) => {
      if (!bases[i]) return;
      (f as HTMLElement).style.transition = 'transform 0.6s cubic-bezier(0.34,1.25,0.5,1)';
      (f as HTMLElement).style.transform =
        opened && i !== 0 ? bases[i] + hinge : bases[i];
    });
  };

  const faceStyle: React.CSSProperties = {
    position: 'absolute',
    inset: 0,
    border: `1px solid ${colors.yellow}`,
    background: 'rgba(255,229,0,0.04)'
  };

  return (
    <div
      onMouseEnter={interactive ? () => setFaces(true) : undefined}
      onMouseLeave={interactive ? () => setFaces(false) : undefined}
      style={{
        perspective: 1000,
        width: size,
        height: size,
        filter: 'drop-shadow(0 0 22px rgba(255,229,0,0.28))',
        cursor: interactive ? 'pointer' : 'default'
      }}
    >
      <div
        ref={cube}
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transformStyle: 'preserve-3d',
          animation: animate ? anims.cubeSpin : 'none',
          transform: 'rotateX(-20deg) rotateY(32deg)'
        }}
      >
        {bases.map((t, i) => (
          <div key={i} style={{ ...faceStyle, transform: t }}>
            <CornerDots />
          </div>
        ))}
      </div>
    </div>
  );
}

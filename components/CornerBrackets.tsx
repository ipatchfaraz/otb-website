import type { CSSProperties } from 'react';
import { colors } from '@/lib/tokens';

/** Four L-shaped brackets in the yellow accent, aligned to a container's corners. */
export default function CornerBrackets({
  size = 14,
  weight = 2,
  color = colors.yellow,
  inset = 8,
  outside = false,
  corners = ['tl', 'tr', 'bl', 'br']
}: {
  size?: number;
  weight?: number;
  color?: string;
  inset?: number;
  outside?: boolean;
  corners?: Array<'tl' | 'tr' | 'bl' | 'br'>;
}) {
  const offset = outside ? -1 : inset;
  const box = (side: 'tl' | 'tr' | 'bl' | 'br'): CSSProperties => {
    const s: CSSProperties = { position: 'absolute', width: size, height: size };
    if (side === 'tl') return { ...s, top: offset, left: offset, borderTop: `${weight}px solid ${color}`, borderLeft: `${weight}px solid ${color}` };
    if (side === 'tr') return { ...s, top: offset, right: offset, borderTop: `${weight}px solid ${color}`, borderRight: `${weight}px solid ${color}` };
    if (side === 'bl') return { ...s, bottom: offset, left: offset, borderBottom: `${weight}px solid ${color}`, borderLeft: `${weight}px solid ${color}` };
    return { ...s, bottom: offset, right: offset, borderBottom: `${weight}px solid ${color}`, borderRight: `${weight}px solid ${color}` };
  };
  return (
    <>
      {corners.map((c) => (
        <div key={c} style={box(c)} />
      ))}
    </>
  );
}

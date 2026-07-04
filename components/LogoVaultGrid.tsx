import { colors } from '@/lib/tokens';

/** Grid of every SVG mark in public/images/logos/. */
export default function LogoVaultGrid({ count = 63 }: { count?: number }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
        gap: 1,
        background: colors.line,
        border: `1px solid ${colors.line}`
      }}
    >
      {Array.from({ length: count }, (_, i) => {
        const n = String(i + 1).padStart(2, '0');
        return (
          <div
            key={n}
            className="hover-border"
            style={{
              background: colors.bg,
              aspectRatio: '1 / 1',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 12,
              transition: 'background 0.15s'
            }}
          >
            <img
              src={`/images/logos/logo-${n}.svg`}
              alt={`Logo mark ${n} from the OTB archive`}
              loading="lazy"
              style={{ maxWidth: '80%', maxHeight: '80%', width: 'auto', height: 'auto' }}
            />
          </div>
        );
      })}
    </div>
  );
}

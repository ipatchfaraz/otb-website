import { colors } from '@/lib/tokens';

/**
 * Grid of every SVG mark in public/images/logos/. Uses per-cell
 * borders instead of the previous `gap: 1px` + parent background
 * trick. That kept the parent's dark-grey fill from bleeding through
 * the empty slots on rows that don't fill every column (e.g. 63 ÷ 5
 * = 12 full rows + 3 marks on the last row = 2 ghost grey blocks).
 */
export default function LogoVaultGrid({ count = 63 }: { count?: number }) {
  return (
    <div
      data-vault-grid
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
        gap: 0,
        borderTop: `1px solid ${colors.line}`,
        borderLeft: `1px solid ${colors.line}`
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
              borderRight: `1px solid ${colors.line}`,
              borderBottom: `1px solid ${colors.line}`,
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

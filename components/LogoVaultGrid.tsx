import { colors } from '@/lib/tokens';
import { getLogos, type PublicLogo } from '@/lib/content';

/**
 * Grid of every mark in the vault. Admin-managed via /admin/logos
 * (DB rows) with a fallback to the 63 static SVGs in
 * public/images/logos/. Consumers can either:
 *   - `<LogoVaultGrid />`  — server-fetches DB / static internally
 *   - `<LogoVaultGrid logos={[...]} />` — pass a slice yourself
 *     (e.g. the first 25 for the homepage teaser).
 */
export default async function LogoVaultGrid({
  logos
}: {
  logos?: PublicLogo[];
}) {
  const list = logos ?? (await getLogos());
  return (
    <div
      data-vault-grid
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(84px, 1fr))',
        gap: 0,
        borderTop: `1px solid ${colors.line}`,
        borderLeft: `1px solid ${colors.line}`,
        // Inline safety net same reason as LogoVaultTeaser above.
        maxWidth: '100%',
        minWidth: 0,
        boxSizing: 'border-box'
      }}
    >
      {list.map((l, i) => (
        <div
          key={`${l.url}-${i}`}
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
            transition: 'background 0.15s',
            boxSizing: 'border-box',
            overflow: 'hidden',
            minWidth: 0
          }}
        >
          <img
            src={l.url}
            alt={l.alt}
            loading="lazy"
            style={{ maxWidth: '80%', maxHeight: '80%', width: 'auto', height: 'auto' }}
          />
        </div>
      ))}
    </div>
  );
}

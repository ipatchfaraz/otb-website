// The /admin subtree uses its own layout — different chrome from the
// public site (no reticle cursor, no scanlines, no ticker footer).
// Auth is enforced by middleware.ts.

import AdminProviders from '@/components/AdminProviders';

export const metadata = {
  title: 'OTB Content OS',
  description: 'Restricted // admin only.'
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: '#0C0C0C',
        color: '#FFFFFF',
        fontFamily: "'Inter', system-ui, sans-serif",
        position: 'relative'
      }}
    >
      {/* subtle scan noise + dot grid, ported from the OTB CMS.dc.html mock */}
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          background:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 3px)'
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 0,
          pointerEvents: 'none',
          backgroundImage: 'radial-gradient(#1A1A10 1.3px, transparent 1.3px)',
          backgroundSize: '32px 32px',
          opacity: 0.6
        }}
      />
      <div style={{ position: 'relative', zIndex: 1 }}>
        <AdminProviders>{children}</AdminProviders>
      </div>
    </div>
  );
}

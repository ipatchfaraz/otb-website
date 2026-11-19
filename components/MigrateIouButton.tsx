'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';

export default function MigrateIouButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
      <button
        type="button"
        onClick={async () => {
          if (!window.confirm('Rename the IOU case study slug to /work/international-open-university and overwrite its body copy with the SEO-enriched version? Safe to run multiple times.')) return;
          setState('busy');
          setMsg(null);
          try {
            const res = await fetch('/api/admin/migrate-iou', { method: 'POST' });
            const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
            if (!res.ok || !data.ok) throw new Error(data.error ?? 'MIGRATION_FAILED');
            setState('done');
            setMsg(data.message ?? 'Migrated.');
            router.refresh();
          } catch (e) {
            setState('error');
            setMsg(e instanceof Error ? e.message : 'FAILED');
          }
        }}
        disabled={state === 'busy'}
        style={{
          background: 'transparent',
          border: `1px solid ${colors.yellow}`,
          color: colors.yellow,
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          padding: '10px 16px',
          cursor: state === 'busy' ? 'default' : 'pointer'
        }}
      >
        {state === 'busy' ? 'MIGRATING…' : state === 'done' ? '✓ MIGRATED' : '▸ MIGRATE IOU → INTERNATIONAL OPEN UNIVERSITY'}
      </button>
      {msg && (
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: state === 'error' ? '#E5484D' : '#57C7A0', maxWidth: 460, lineHeight: 1.4, textAlign: 'right' }}>
          {state === 'error' ? '✕ ' : '✓ '}{msg}
        </span>
      )}
    </div>
  );
}

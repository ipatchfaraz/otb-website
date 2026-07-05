'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';

export default function SeedButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
      <button
        onClick={async () => {
          setState('busy');
          setMsg(null);
          try {
            const res = await fetch('/api/admin/seed', { method: 'POST' });
            const data = (await res.json()) as { ok?: boolean; message?: string; error?: string };
            if (!res.ok || !data.ok) throw new Error(data.error || 'SEED_FAILED');
            setState('done');
            setMsg(data.message ?? 'Done.');
            router.refresh();
          } catch (e) {
            setState('error');
            setMsg(e instanceof Error ? e.message : 'FAILED');
          }
        }}
        disabled={state === 'busy'}
        style={{
          background: colors.yellow,
          border: `1px solid ${colors.yellow}`,
          color: colors.bg,
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          padding: '10px 16px',
          cursor: state === 'busy' ? 'default' : 'pointer'
        }}
      >
        {state === 'busy' ? 'SEEDING…' : state === 'done' ? '✓ SEEDED' : '▸ SEED FROM STATIC'}
      </button>
      {msg && (
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: state === 'error' ? '#E5484D' : '#57C7A0' }}>
          {state === 'error' ? '✕ ' : '✓ '}
          {msg}
        </span>
      )}
    </div>
  );
}

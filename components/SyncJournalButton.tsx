'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';

/**
 * One-shot button that hits POST /api/admin/journal/sync — creates
 * any JournalEntry rows present in STATIC_JOURNAL but missing from
 * the DB. Never touches existing rows, so admin edits are safe.
 */
export default function SyncJournalButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6, alignItems: 'flex-end' }}>
      <button
        type="button"
        onClick={async () => {
          if (
            !window.confirm(
              'Publish any journal entries defined in code but not yet in the DB? Existing entries are never overwritten.'
            )
          ) {
            return;
          }
          setState('busy');
          setMsg(null);
          try {
            const res = await fetch('/api/admin/journal/sync', { method: 'POST' });
            const data = (await res.json()) as {
              ok?: boolean; message?: string; error?: string; created?: number;
            };
            if (!res.ok || !data.ok) throw new Error(data.error ?? 'SYNC_FAILED');
            setState('done');
            setMsg(data.message ?? `Created ${data.created ?? 0}.`);
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
        {state === 'busy'
          ? 'PUBLISHING…'
          : state === 'done'
          ? '✓ PUBLISHED'
          : '▸ PUBLISH NEW JOURNAL ENTRIES'}
      </button>
      {msg && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: state === 'error' ? '#E5484D' : '#57C7A0',
            maxWidth: 460,
            lineHeight: 1.4,
            textAlign: 'right'
          }}
        >
          {state === 'error' ? '✕ ' : '✓ '}
          {msg}
        </span>
      )}
    </div>
  );
}

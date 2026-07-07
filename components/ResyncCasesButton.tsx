'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';

/**
 * One-shot maintenance button. Hits POST /api/admin/seed?resync=<slugs>
 * with a fixed list of case studies whose story fields were originally
 * placeholders ([ INSERT ] / [ CONFIRM ]) and have since been filled
 * in on the static file. Overwrites the corresponding DB rows with the
 * current static content so the site starts serving the real copy.
 *
 * Only touches the case-study text + gallery + hero image. Preserves
 * `order`, `featured` and admin-set `coverImage`.
 */
const RESYNC_SLUGS = ['barakah', 'revivers', 'grainer', 'sifa', 'quraany'];

export default function ResyncCasesButton() {
  const router = useRouter();
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <button
        onClick={async () => {
          if (
            !window.confirm(
              `Overwrite the following case-study rows in the DB with the current static content?\n\n${RESYNC_SLUGS.join(', ')}\n\nThis will replace the story text and gallery on these 5 projects. It preserves order, featured status and cover image.`
            )
          ) {
            return;
          }
          setState('busy');
          setMsg(null);
          try {
            const res = await fetch(
              `/api/admin/seed?resync=${encodeURIComponent(RESYNC_SLUGS.join(','))}`,
              { method: 'POST' }
            );
            const data = (await res.json()) as {
              ok?: boolean; message?: string; error?: string;
              updated?: number; skipped?: string[];
            };
            if (!res.ok || !data.ok) throw new Error(data.error || 'RESYNC_FAILED');
            setState('done');
            setMsg(data.message ?? `Updated ${data.updated ?? 0}.`);
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
        {state === 'busy' ? 'RESYNCING…' : state === 'done' ? '✓ RESYNCED' : '▸ RESYNC 5 CASES FROM STATIC'}
      </button>
      {msg && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            color: state === 'error' ? '#E5484D' : '#57C7A0',
            maxWidth: 460,
            lineHeight: 1.4
          }}
        >
          {state === 'error' ? '✕ ' : '✓ '}
          {msg}
        </span>
      )}
    </div>
  );
}

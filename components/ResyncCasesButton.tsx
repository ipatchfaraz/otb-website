'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { colors, fonts } from '@/lib/tokens';

/**
 * One-shot maintenance panel. Hits POST /api/admin/seed?resync=<slugs>
 * with a user-picked list of case studies. Overwrites the corresponding
 * DB rows with the current static content so the site starts serving
 * whatever we last committed in lib/case-studies.ts.
 *
 * Only touches the case-study text + gallery + hero image. Preserves
 * `order`, `featured` and admin-set `coverImage`.
 *
 * Available slugs match the placeholder rows we filled in from the
 * Webflow archive; the admin can tick any subset per run so they can
 * keep manual CMS edits on the other slugs.
 */
const AVAILABLE_SLUGS = ['barakah', 'revivers', 'grainer', 'sifa', 'quraany'];

export default function ResyncCasesButton() {
  const router = useRouter();
  const [selected, setSelected] = useState<string[]>([]);
  const [state, setState] = useState<'idle' | 'busy' | 'done' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);

  const toggle = (slug: string) => {
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));
  };

  const run = async () => {
    if (selected.length === 0) {
      setMsg('Pick at least one case study.');
      setState('error');
      return;
    }
    if (
      !window.confirm(
        `Overwrite these ${selected.length} case study row(s) with the current static content?\n\n${selected.join(', ')}\n\nStory text + gallery + hero image will be replaced. Order, featured status and cover image are preserved.`
      )
    ) {
      return;
    }
    setState('busy');
    setMsg(null);
    try {
      const res = await fetch(
        `/api/admin/seed?resync=${encodeURIComponent(selected.join(','))}`,
        { method: 'POST' }
      );
      const data = (await res.json()) as {
        ok?: boolean; message?: string; error?: string;
        updated?: number; skipped?: string[];
      };
      if (!res.ok || !data.ok) throw new Error(data.error || 'RESYNC_FAILED');
      setState('done');
      setMsg(data.message ?? `Updated ${data.updated ?? 0}.`);
      setSelected([]);
      router.refresh();
    } catch (e) {
      setState('error');
      setMsg(e instanceof Error ? e.message : 'FAILED');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-end' }}>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'flex-end' }}>
        {AVAILABLE_SLUGS.map((slug) => {
          const on = selected.includes(slug);
          return (
            <button
              key={slug}
              type="button"
              onClick={() => toggle(slug)}
              disabled={state === 'busy'}
              style={{
                background: on ? colors.yellow : 'transparent',
                border: `1px solid ${on ? colors.yellow : '#3A3A3A'}`,
                color: on ? colors.bg : colors.mutedSoft,
                fontFamily: fonts.mono,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                padding: '6px 10px',
                cursor: state === 'busy' ? 'default' : 'pointer',
                textTransform: 'uppercase'
              }}
            >
              {on ? '✓ ' : ''}
              {slug}
            </button>
          );
        })}
      </div>
      <button
        onClick={run}
        disabled={state === 'busy' || selected.length === 0}
        style={{
          background: selected.length === 0 ? '#1A1A1A' : 'transparent',
          border: `1px solid ${selected.length === 0 ? '#3A3A3A' : colors.yellow}`,
          color: selected.length === 0 ? '#5A5A5A' : colors.yellow,
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          padding: '10px 16px',
          cursor: state === 'busy' || selected.length === 0 ? 'default' : 'pointer'
        }}
      >
        {state === 'busy'
          ? 'RESYNCING…'
          : state === 'done'
          ? '✓ RESYNCED'
          : `▸ RESYNC ${selected.length || ''} FROM STATIC`}
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

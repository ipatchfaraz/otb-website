'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import { colors, fonts } from '@/lib/tokens';

type EntryRow = {
  log: string;
  slug: string;
  category: string;
  readMin: string;
  date: string;
  author: string;
  authorRole: string;
  thumb: string | null;
  title: string;
  dek: string;
  body: Array<
    | { t: 'p'; v: string }
    | { t: 'h'; v: string }
    | { t: 'quote'; v: string }
    | { t: 'list'; v: string[] }
  >;
  published: boolean;
};

export default function JournalAdminPage() {
  const [rows, setRows] = useState<EntryRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const current = useMemo(() => rows.find((r) => r.slug === selected) ?? null, [rows, selected]);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/journal');
      if (!res.ok) throw new Error((await res.json()).error || 'LOAD_FAILED');
      const data = (await res.json()) as { entries: EntryRow[] };
      // ensure body is parsed
      setRows(data.entries);
      if (data.entries[0] && !selected) setSelected(data.entries[0].slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'LOAD_FAILED');
    } finally {
      setLoading(false);
    }
  }

  function patchCurrent(patch: Partial<EntryRow>) {
    if (!current) return;
    setRows((rs) => rs.map((r) => (r.slug === current.slug ? { ...r, ...patch } : r)));
  }

  async function save() {
    if (!current) return;
    setError(null);
    const res = await fetch(`/api/admin/journal/${current.slug}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(current)
    });
    if (!res.ok) return setError((await res.json()).error || 'SAVE_FAILED');
    setFlash('SAVED');
    setTimeout(() => setFlash(null), 1600);
  }

  async function createNew() {
    const slug = prompt('New entry slug (lowercase, hyphens):');
    if (!slug) return;
    const res = await fetch('/api/admin/journal', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ slug: slug.toLowerCase().trim() })
    });
    if (!res.ok) return setError((await res.json()).error || 'CREATE_FAILED');
    await load();
    setSelected(slug.toLowerCase().trim());
  }

  async function removeCurrent() {
    if (!current) return;
    if (!confirm(`Delete entry "${current.slug}"?`)) return;
    const res = await fetch(`/api/admin/journal/${current.slug}`, { method: 'DELETE' });
    if (!res.ok) return setError((await res.json()).error || 'DELETE_FAILED');
    await load();
  }

  const inputStyle: React.CSSProperties = {
    background: '#0C0C0C',
    border: `1px solid ${colors.line}`,
    color: colors.fg,
    fontFamily: fonts.mono,
    fontSize: 12,
    padding: '10px 12px',
    outline: 'none',
    width: '100%'
  };
  const labelStyle: React.CSSProperties = {
    fontFamily: fonts.mono,
    fontSize: 10,
    letterSpacing: '0.16em',
    color: colors.muted
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader subtitle="JOURNAL CMS // v1.0" />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 0 }}>
        <aside style={{ borderRight: `1px solid ${colors.line}`, background: '#141414', display: 'flex', flexDirection: 'column' }}>
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #232323' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={labelStyle}>ENTRIES</span>
              <span style={{ ...labelStyle, color: colors.yellow }}>[ {String(rows.length).padStart(2, '0')} ]</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {loading && <div style={labelStyle}>LOADING…</div>}
            {rows.map((r) => {
              const active = r.slug === selected;
              return (
                <button
                  key={r.slug}
                  onClick={() => setSelected(r.slug)}
                  style={{
                    textAlign: 'left',
                    background: active ? '#1B1B1B' : 'transparent',
                    border: `1px solid ${active ? colors.yellow : '#232323'}`,
                    color: colors.fg,
                    padding: '8px 10px',
                    display: 'flex',
                    gap: 10,
                    alignItems: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <span style={{ fontFamily: fonts.mono, fontSize: 9, color: colors.yellow, width: 18 }}>{r.log}</span>
                  <span style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontFamily: fonts.display,
                        fontWeight: 700,
                        fontSize: 13,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        color: r.published ? colors.fg : colors.muted
                      }}
                    >
                      {r.title.replace(/\[ NEW ENTRY.*/, '(NEW ENTRY)')}
                    </span>
                    <span style={{ fontFamily: fonts.mono, fontSize: 9, color: '#7A7A7A' }}>
                      {r.published ? 'PUBLISHED' : 'DRAFT'} · {r.category}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
          <div style={{ padding: 12, borderTop: '1px solid #232323' }}>
            <button
              onClick={createNew}
              className="hover-yellow"
              style={{
                width: '100%',
                background: 'transparent',
                border: '1px dashed #3A3A3A',
                color: colors.muted,
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                padding: 12,
                cursor: 'pointer'
              }}
            >
              + NEW ENTRY
            </button>
          </div>
        </aside>

        <main style={{ overflowY: 'auto', padding: '30px 36px 80px', background: '#101010' }}>
          {!current && !loading && <div style={labelStyle}>Select an entry on the left.</div>}
          {current && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 820 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: colors.yellow }}>
                  EDITING · LOG_{current.log} · {current.slug}
                </div>
                <div style={{ display: 'flex', gap: 10 }}>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: colors.muted, fontFamily: fonts.mono, fontSize: 11 }}>
                    <input
                      type="checkbox"
                      checked={current.published}
                      onChange={(e) => patchCurrent({ published: e.target.checked })}
                    />
                    PUBLISHED
                  </label>
                  <Link
                    href={`/journal/${current.slug}`}
                    target="_blank"
                    style={{
                      textDecoration: 'none',
                      color: colors.mutedSoft,
                      border: `1px solid ${colors.line}`,
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      padding: '8px 12px',
                      letterSpacing: '0.14em'
                    }}
                  >
                    ◱ VIEW PAGE
                  </Link>
                  <button
                    onClick={save}
                    style={{
                      background: colors.yellow,
                      border: `1px solid ${colors.yellow}`,
                      color: colors.bg,
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      padding: '10px 16px',
                      cursor: 'pointer'
                    }}
                  >
                    ▸ SAVE
                  </button>
                  <button
                    onClick={removeCurrent}
                    style={{
                      background: 'transparent',
                      border: '1px solid #3A2020',
                      color: '#C56A6A',
                      fontFamily: fonts.mono,
                      fontSize: 10,
                      fontWeight: 700,
                      letterSpacing: '0.14em',
                      padding: '10px 12px',
                      cursor: 'pointer'
                    }}
                  >
                    ✕ DELETE
                  </button>
                </div>
              </div>

              {flash && <div style={{ ...labelStyle, color: '#57C7A0' }}>✓ {flash}</div>}
              {error && (
                <div style={{ ...labelStyle, color: '#E5484D', border: '1px solid #3A2020', padding: '10px 12px' }}>
                  ✕ {error}
                </div>
              )}

              <section style={{ border: '1px solid #262626', background: '#161616', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.18em', color: colors.muted }}>// META</div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>
                  <FieldSm label="LOG (e.g. 04)">
                    <input style={inputStyle} value={current.log} onChange={(e) => patchCurrent({ log: e.target.value })} />
                  </FieldSm>
                  <FieldSm label="CATEGORY">
                    <input style={inputStyle} value={current.category} onChange={(e) => patchCurrent({ category: e.target.value })} />
                  </FieldSm>
                  <FieldSm label="READ TIME">
                    <input style={inputStyle} value={current.readMin} onChange={(e) => patchCurrent({ readMin: e.target.value })} />
                  </FieldSm>
                  <FieldSm label="DATE (2026.02.11)">
                    <input style={inputStyle} value={current.date} onChange={(e) => patchCurrent({ date: e.target.value })} />
                  </FieldSm>
                  <FieldSm label="AUTHOR">
                    <input style={inputStyle} value={current.author} onChange={(e) => patchCurrent({ author: e.target.value })} />
                  </FieldSm>
                  <FieldSm label="AUTHOR ROLE">
                    <input style={inputStyle} value={current.authorRole} onChange={(e) => patchCurrent({ authorRole: e.target.value })} />
                  </FieldSm>
                </div>
                <FieldSm label="THUMBNAIL URL (/images/journal/…)">
                  <input
                    style={inputStyle}
                    value={current.thumb ?? ''}
                    onChange={(e) => patchCurrent({ thumb: e.target.value || null })}
                  />
                </FieldSm>
              </section>

              <section style={{ border: '1px solid #262626', background: '#161616', padding: 20, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.18em', color: colors.muted }}>// COPY</div>
                <FieldSm label="TITLE">
                  <input style={inputStyle} value={current.title} onChange={(e) => patchCurrent({ title: e.target.value })} />
                </FieldSm>
                <FieldSm label="DEK (2–3 SENTENCES)">
                  <textarea
                    value={current.dek}
                    onChange={(e) => patchCurrent({ dek: e.target.value })}
                    rows={2}
                    style={{ ...inputStyle, resize: 'vertical' }}
                  />
                </FieldSm>
                <FieldSm label="BODY BLOCKS (JSON) types: p, h, quote, list">
                  <textarea
                    value={JSON.stringify(current.body ?? [], null, 2)}
                    rows={20}
                    onChange={(e) => {
                      try {
                        patchCurrent({ body: JSON.parse(e.target.value) });
                        setError(null);
                      } catch (err) {
                        setError('Body JSON invalid: ' + (err as Error).message);
                      }
                    }}
                    style={{ ...inputStyle, resize: 'vertical', fontFamily: fonts.mono }}
                  />
                  <div style={{ ...labelStyle, marginTop: 6, color: '#5A5A5A' }}>
                    Example: {`[{"t":"p","v":"…"},{"t":"h","v":"…"},{"t":"quote","v":"…"},{"t":"list","v":["a","b"]}]`}
                  </div>
                </FieldSm>
              </section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function FieldSm({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.14em', color: '#6A6A6A' }}>{label}</span>
      {children}
    </label>
  );
}

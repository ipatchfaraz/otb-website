'use client';
import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import AdminHeader from '@/components/AdminHeader';
import ImagePicker from '@/components/ImagePicker';
import GalleryEditor, { type Figure } from '@/components/GalleryEditor';
import { colors, fonts } from '@/lib/tokens';

type ProjectRow = {
  slug: string;
  order: number;
  discipline: string;
  line: string;
  tags: string[];
  coverImage: string;
  caseLabel: string;
  title: string;
  client: string;
  tagline: string;
  sector: string;
  scope: string;
  year: string;
  brief: string;
  problemHead: string;
  problemBody: string;
  digBody: string;
  insight: string;
  leapHead: string;
  leapBody: string;
  solutionBody: string;
  payoff: string;
  heroImg: string;
  gallery: unknown;
  published: boolean;
  featured: boolean;
};

const BASE_TAGS = ['STRATEGY', 'IDENTITY', 'PACKAGING'];

export default function ProjectsAdminPage() {
  const [rows, setRows] = useState<ProjectRow[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [flash, setFlash] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const current = useMemo(() => rows.find((r) => r.slug === selected) ?? null, [rows, selected]);

  useEffect(() => {
    void load();
  }, []);

  async function load(keepSelected = true) {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/projects');
      if (!res.ok) throw new Error((await res.json()).error || 'LOAD_FAILED');
      const data = (await res.json()) as { projects: ProjectRow[] };
      setRows(data.projects);
      if (!keepSelected || !selected) {
        if (data.projects[0]) setSelected(data.projects[0].slug);
      } else if (!data.projects.find((p) => p.slug === selected)) {
        // Selected project was deleted fall back to the first row
        setSelected(data.projects[0]?.slug ?? null);
      }
    } catch (e) {
      setError(e instanceof Error ? e.message : 'LOAD_FAILED');
    } finally {
      setLoading(false);
    }
  }

  function patchCurrent(patch: Partial<ProjectRow>) {
    if (!current) return;
    setRows((rs) => rs.map((r) => (r.slug === current.slug ? { ...r, ...patch } : r)));
  }

  async function save() {
    if (!current) return;
    setError(null);
    const res = await fetch(`/api/admin/projects/${current.slug}`, {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(current)
    });
    if (!res.ok) {
      setError((await res.json()).error || 'SAVE_FAILED');
      return;
    }
    setFlash('SAVED');
    setTimeout(() => setFlash(null), 1600);
    // Reload from server so sidebar reflects true DB state (published,
    // featured, order, etc.) instead of the potentially-stale local edit.
    void load(true);
  }

  /** Persist a new `order` for two rows and refresh. Called by the
   *  ▲/▼ buttons in the sidebar. */
  async function swapOrder(a: ProjectRow, b: ProjectRow) {
    setError(null);
    // Optimistic: swap locally so the UI moves immediately
    setRows((rs) =>
      rs
        .map((r) => {
          if (r.slug === a.slug) return { ...r, order: b.order };
          if (r.slug === b.slug) return { ...r, order: a.order };
          return r;
        })
        .sort((x, y) => x.order - y.order)
    );
    try {
      const results = await Promise.all([
        fetch(`/api/admin/projects/${a.slug}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ order: b.order })
        }),
        fetch(`/api/admin/projects/${b.slug}`, {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ order: a.order })
        })
      ]);
      if (!results.every((r) => r.ok)) throw new Error('REORDER_FAILED');
      setFlash('ORDER SAVED');
      setTimeout(() => setFlash(null), 1200);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'REORDER_FAILED');
      // Roll back
      void load(true);
    }
  }

  async function createNew() {
    const slug = prompt('New project slug (lowercase, hyphens):');
    if (!slug) return;
    const res = await fetch('/api/admin/projects', {
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
    if (!confirm(`Delete project "${current.slug}"? This cannot be undone.`)) return;
    const res = await fetch(`/api/admin/projects/${current.slug}`, { method: 'DELETE' });
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
      <AdminHeader subtitle="PROJECTS CMS // v1.0" />
      <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '320px 1fr', minHeight: 0 }}>
        {/* Sidebar */}
        <aside
          style={{
            borderRight: `1px solid ${colors.line}`,
            background: '#141414',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <div style={{ padding: '16px 18px', borderBottom: '1px solid #232323' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={labelStyle}>PROJECTS</span>
              <span style={{ ...labelStyle, color: colors.yellow }}>[ {String(rows.length).padStart(2, '0')} ]</span>
            </div>
          </div>
          <div style={{ flex: 1, overflowY: 'auto', padding: 12, display: 'flex', flexDirection: 'column', gap: 6 }}>
            {loading && <div style={labelStyle}>LOADING…</div>}
            {rows.map((r, i) => {
              const active = r.slug === selected;
              const prev = rows[i - 1];
              const next = rows[i + 1];
              return (
                <div
                  key={r.slug}
                  style={{
                    display: 'flex',
                    gap: 4,
                    alignItems: 'stretch',
                    background: active ? '#1B1B1B' : 'transparent',
                    border: `1px solid ${active ? colors.yellow : '#232323'}`
                  }}
                >
                  <button
                    onClick={() => setSelected(r.slug)}
                    style={{
                      flex: 1,
                      minWidth: 0,
                      textAlign: 'left',
                      background: 'transparent',
                      border: 'none',
                      color: colors.fg,
                      padding: '8px 10px',
                      display: 'flex',
                      gap: 10,
                      alignItems: 'center',
                      cursor: 'pointer'
                    }}
                  >
                    <span
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 9,
                        color: colors.yellow,
                        width: 18
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
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
                        {r.client || r.slug}
                      </span>
                      <span style={{ fontFamily: fonts.mono, fontSize: 9, color: '#7A7A7A' }}>
                        {r.published ? 'PUBLISHED' : 'DRAFT'}
                        {r.featured && <span style={{ color: colors.yellow }}> · ★ FEATURED</span>}
                      </span>
                    </span>
                  </button>
                  <div style={{ display: 'flex', flexDirection: 'column', borderLeft: `1px solid #232323` }}>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (prev) void swapOrder(r, prev);
                      }}
                      disabled={!prev}
                      title="Move up"
                      style={{
                        cursor: prev ? 'pointer' : 'not-allowed',
                        background: 'transparent',
                        border: 'none',
                        color: prev ? colors.muted : '#3A3A3A',
                        fontSize: 11,
                        lineHeight: 1,
                        padding: '4px 10px',
                        flex: 1
                      }}
                    >
                      ▲
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        if (next) void swapOrder(r, next);
                      }}
                      disabled={!next}
                      title="Move down"
                      style={{
                        cursor: next ? 'pointer' : 'not-allowed',
                        background: 'transparent',
                        border: 'none',
                        color: next ? colors.muted : '#3A3A3A',
                        fontSize: 11,
                        lineHeight: 1,
                        padding: '4px 10px',
                        flex: 1,
                        borderTop: `1px solid #232323`
                      }}
                    >
                      ▼
                    </button>
                  </div>
                </div>
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
              + NEW PROJECT
            </button>
          </div>
        </aside>

        {/* Editor */}
        <main style={{ overflowY: 'auto', padding: '30px 36px 80px', background: '#101010' }}>
          {!current && !loading && <div style={labelStyle}>Select a project on the left.</div>}
          {current && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 22, maxWidth: 820 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: colors.yellow }}>
                  EDITING · {current.slug}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                  <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: colors.muted, fontFamily: fonts.mono, fontSize: 11 }}>
                    <input
                      type="checkbox"
                      checked={current.published}
                      onChange={(e) => patchCurrent({ published: e.target.checked })}
                    />
                    PUBLISHED
                  </label>
                  <label
                    style={{
                      display: 'flex',
                      gap: 8,
                      alignItems: 'center',
                      color: current.featured ? colors.yellow : colors.muted,
                      fontFamily: fonts.mono,
                      fontSize: 11,
                      letterSpacing: '0.05em'
                    }}
                    title="Show this project in the homepage FRESH OUT OF THE BOX strip"
                  >
                    <input
                      type="checkbox"
                      checked={current.featured}
                      onChange={(e) => patchCurrent({ featured: e.target.checked })}
                    />
                    ★ HOMEPAGE FEATURED
                  </label>
                  <Link
                    href={`/work/${current.slug}`}
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

              {/* GRID CARD */}
              <Section title="GRID CARD">
                <Field label="CLIENT">
                  <input style={inputStyle} value={current.client} onChange={(e) => patchCurrent({ client: e.target.value })} />
                </Field>
                <Field label="TITLE (SHOWN ON CASE STUDY, e.g. KALEMAH.)">
                  <input style={inputStyle} value={current.title} onChange={(e) => patchCurrent({ title: e.target.value })} />
                </Field>
                <Field label="ONE-LINER (WORK GRID)">
                  <input style={inputStyle} value={current.line} onChange={(e) => patchCurrent({ line: e.target.value })} />
                </Field>
                <Field label="TAGLINE (CASE HERO)">
                  <input style={inputStyle} value={current.tagline} onChange={(e) => patchCurrent({ tagline: e.target.value })} />
                </Field>
                <Field label="DISCIPLINE">
                  <input style={inputStyle} value={current.discipline} onChange={(e) => patchCurrent({ discipline: e.target.value })} />
                </Field>
                <Field label="TAGS (comma-separated: STRATEGY, IDENTITY, PACKAGING…)">
                  <input
                    style={inputStyle}
                    value={current.tags.join(', ')}
                    onChange={(e) =>
                      patchCurrent({
                        tags: e.target.value
                          .split(',')
                          .map((t) => t.trim().toUpperCase())
                          .filter(Boolean)
                      })
                    }
                  />
                  <div style={{ ...labelStyle, marginTop: 6, color: '#5A5A5A' }}>
                    Base tags: {BASE_TAGS.join(' · ')}
                  </div>
                </Field>
                <ImagePicker
                  label="COVER IMAGE (WORK GRID CARD)"
                  value={current.coverImage}
                  onChange={(url) => patchCurrent({ coverImage: url })}
                  emptyHint="NO COVER"
                  clearLabel="CLEAR"
                />
                <Field label="CASE FILE LABEL">
                  <input style={inputStyle} value={current.caseLabel} onChange={(e) => patchCurrent({ caseLabel: e.target.value })} />
                </Field>
              </Section>

              {/* CASE STUDY */}
              <Section title="CASE STUDY">
                <Row>
                  <Field label="SECTOR">
                    <input style={inputStyle} value={current.sector} onChange={(e) => patchCurrent({ sector: e.target.value })} />
                  </Field>
                  <Field label="SCOPE">
                    <input style={inputStyle} value={current.scope} onChange={(e) => patchCurrent({ scope: e.target.value })} />
                  </Field>
                  <Field label="YEAR">
                    <input style={inputStyle} value={current.year} onChange={(e) => patchCurrent({ year: e.target.value })} />
                  </Field>
                </Row>
                <Field label="BRIEF">
                  <Textarea rows={3} value={current.brief} onChange={(v) => patchCurrent({ brief: v })} />
                </Field>
                <Field label="CH.01 PROBLEM HEADLINE">
                  <input style={inputStyle} value={current.problemHead} onChange={(e) => patchCurrent({ problemHead: e.target.value })} />
                </Field>
                <Field label="CH.01 PROBLEM BODY">
                  <Textarea rows={4} value={current.problemBody} onChange={(v) => patchCurrent({ problemBody: v })} />
                </Field>
                <Field label="CH.02 DIG BODY">
                  <Textarea rows={4} value={current.digBody} onChange={(v) => patchCurrent({ digBody: v })} />
                </Field>
                <Field label="CH.02 INSIGHT (YELLOW PULLQUOTE)">
                  <Textarea rows={2} value={current.insight} onChange={(v) => patchCurrent({ insight: v })} />
                </Field>
                <Field label="CH.03 LEAP HEADLINE">
                  <input style={inputStyle} value={current.leapHead} onChange={(e) => patchCurrent({ leapHead: e.target.value })} />
                </Field>
                <Field label="CH.03 LEAP BODY">
                  <Textarea rows={4} value={current.leapBody} onChange={(v) => patchCurrent({ leapBody: v })} />
                </Field>
                <Field label="CH.04 SOLUTION BODY">
                  <Textarea rows={3} value={current.solutionBody} onChange={(v) => patchCurrent({ solutionBody: v })} />
                </Field>
                <Field label="CH.05 PAYOFF">
                  <Textarea rows={3} value={current.payoff} onChange={(v) => patchCurrent({ payoff: v })} />
                </Field>
                <ImagePicker
                  label="HERO IMAGE (CASE STUDY BANNER)"
                  value={current.heroImg}
                  onChange={(url) => patchCurrent({ heroImg: url })}
                  emptyHint="NO HERO"
                  clearLabel="CLEAR"
                />
                <div style={{ marginTop: 6 }}>
                  <GalleryEditor
                    value={(Array.isArray(current.gallery) ? (current.gallery as unknown as Figure[]) : []) ?? []}
                    onChange={(next) => patchCurrent({ gallery: next as unknown as ProjectRow['gallery'] })}
                    onCoverChange={(url) => patchCurrent({ coverImage: url })}
                  />
                </div>
              </Section>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        border: '1px solid #262626',
        background: '#161616',
        padding: 20,
        display: 'flex',
        flexDirection: 'column',
        gap: 14
      }}
    >
      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 11,
          letterSpacing: '0.18em',
          color: colors.muted
        }}
      >
        // {title}
      </div>
      {children}
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12 }}>{children}</div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <span style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.14em', color: '#6A6A6A' }}>{label}</span>
      {children}
    </label>
  );
}

function Textarea({
  value,
  onChange,
  rows = 3
}: {
  value: string;
  onChange: (v: string) => void;
  rows?: number;
}) {
  return (
    <textarea
      value={value}
      onChange={(e) => onChange(e.target.value)}
      rows={rows}
      style={{
        background: '#0C0C0C',
        border: `1px solid ${colors.line}`,
        color: colors.fg,
        fontFamily: fonts.mono,
        fontSize: 12,
        padding: '10px 12px',
        outline: 'none',
        width: '100%',
        resize: 'vertical'
      }}
    />
  );
}

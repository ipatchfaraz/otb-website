'use client';
import { useEffect, useState } from 'react';
import AdminHeader from '@/components/AdminHeader';
import { colors, fonts } from '@/lib/tokens';

type LogoRow = {
  id: string;
  order: number;
  imageUrl: string;
  title: string;
  published: boolean;
};

export default function LogosAdminPage() {
  const [rows, setRows] = useState<LogoRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    void load();
  }, []);

  async function load() {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/logos');
      const data = (await res.json()) as { logos: LogoRow[]; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'LOAD_FAILED');
      setRows(data.logos ?? []);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'LOAD_FAILED');
    } finally {
      setLoading(false);
    }
  }

  async function uploadFile(file: File) {
    setUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      form.append('folder', 'logos');
      const upRes = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const upData = (await upRes.json()) as { url?: string; error?: string };
      if (!upRes.ok || !upData.url) throw new Error(upData.error ?? 'UPLOAD_FAILED');

      const createRes = await fetch('/api/admin/logos', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ imageUrl: upData.url, title: file.name.replace(/\.[^.]+$/, '') })
      });
      if (!createRes.ok) throw new Error('CREATE_FAILED');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'UPLOAD_FAILED');
    } finally {
      setUploading(false);
    }
  }

  async function handleUpload(list: FileList | null) {
    if (!list) return;
    for (const f of Array.from(list)) await uploadFile(f);
  }

  async function remove(id: string) {
    if (!window.confirm('Remove this logo from the vault?')) return;
    setBusy(id);
    try {
      const res = await fetch(`/api/admin/logos/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('DELETE_FAILED');
      setRows((prev) => prev.filter((r) => r.id !== id));
    } catch (e) {
      setError(e instanceof Error ? e.message : 'DELETE_FAILED');
    } finally {
      setBusy(null);
    }
  }

  async function swap(a: LogoRow, b: LogoRow) {
    setBusy(a.id);
    // Optimistic UI so the shuffle feels immediate.
    setRows((prev) => {
      const map: Record<string, LogoRow> = Object.fromEntries(prev.map((r) => [r.id, { ...r }]));
      map[a.id].order = b.order;
      map[b.id].order = a.order;
      return Object.values(map).sort((x, y) => x.order - y.order);
    });
    try {
      await Promise.all([
        fetch(`/api/admin/logos/${a.id}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ order: b.order })
        }),
        fetch(`/api/admin/logos/${b.id}`, {
          method: 'PATCH',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ order: a.order })
        })
      ]);
    } catch {
      // Rollback on error by reloading fresh state.
      await load();
    } finally {
      setBusy(null);
    }
  }

  async function togglePublished(row: LogoRow) {
    setBusy(row.id);
    try {
      await fetch(`/api/admin/logos/${row.id}`, {
        method: 'PATCH',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ published: !row.published })
      });
      setRows((prev) => prev.map((r) => (r.id === row.id ? { ...r, published: !r.published } : r)));
    } finally {
      setBusy(null);
    }
  }

  async function seedFromStatic() {
    if (
      !window.confirm(
        'Seed the vault from the 63 built-in static SVGs? Only runs when the vault is empty.'
      )
    )
      return;
    setUploading(true);
    try {
      const res = await fetch('/api/admin/logos/seed', { method: 'POST' });
      const data = (await res.json()) as { created?: number; error?: string };
      if (!res.ok) throw new Error(data.error ?? 'SEED_FAILED');
      await load();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'SEED_FAILED');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AdminHeader subtitle="LOGO VAULT // v1.0" />
      <main style={{ padding: '32px 40px 80px', maxWidth: 1400, width: '100%', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 24 }}>
          <div>
            <div style={{ fontFamily: fonts.mono, fontSize: 11, letterSpacing: '0.16em', color: colors.yellow }}>
              [ MARKS ARCHIVE ]
            </div>
            <h1 style={{ fontFamily: fonts.display, fontWeight: 900, fontSize: 36, margin: '4px 0 0 0', textTransform: 'uppercase' }}>
              LOGO VAULT
            </h1>
            <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: '0.15em', color: colors.muted, marginTop: 6 }}>
              {rows.length} MARK{rows.length === 1 ? '' : 'S'}
            </div>
          </div>
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {rows.length === 0 && !loading && (
              <button
                type="button"
                onClick={seedFromStatic}
                disabled={uploading}
                style={{
                  background: 'transparent',
                  border: `1px solid ${colors.yellow}`,
                  color: colors.yellow,
                  fontFamily: fonts.mono,
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  padding: '10px 16px',
                  cursor: uploading ? 'default' : 'pointer'
                }}
              >
                ▸ SEED FROM STATIC (63)
              </button>
            )}
            <label
              style={{
                background: colors.yellow,
                color: colors.bg,
                fontFamily: fonts.mono,
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.14em',
                padding: '10px 16px',
                cursor: uploading ? 'default' : 'pointer',
                opacity: uploading ? 0.6 : 1
              }}
            >
              {uploading ? 'UPLOADING…' : '↑ UPLOAD LOGOS'}
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => {
                  void handleUpload(e.target.files);
                  e.currentTarget.value = '';
                }}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </label>
          </div>
        </div>

        {error && (
          <div
            style={{
              border: '1px solid #7A0E0A',
              color: '#E5484D',
              background: 'rgba(122,14,10,0.08)',
              padding: '10px 14px',
              fontFamily: fonts.mono,
              fontSize: 11,
              marginBottom: 16
            }}
          >
            ✕ {error}
          </div>
        )}

        {loading ? (
          <div style={{ fontFamily: fonts.mono, fontSize: 12, color: colors.muted }}>Loading…</div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))',
              gap: 12
            }}
          >
            {rows.map((row, i) => {
              const prev = i > 0 ? rows[i - 1] : null;
              const next = i < rows.length - 1 ? rows[i + 1] : null;
              const disabled = busy === row.id;
              return (
                <div
                  key={row.id}
                  style={{
                    border: `1px solid ${colors.line}`,
                    background: '#141414',
                    display: 'flex',
                    flexDirection: 'column',
                    opacity: row.published ? 1 : 0.4
                  }}
                >
                  <div
                    style={{
                      aspectRatio: '1 / 1',
                      background: '#0F0F0F',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      padding: 14,
                      borderBottom: `1px solid ${colors.line}`,
                      overflow: 'hidden'
                    }}
                  >
                    <img
                      src={row.imageUrl}
                      alt={row.title || `Logo ${i + 1}`}
                      style={{ maxWidth: '85%', maxHeight: '85%', width: 'auto', height: 'auto' }}
                    />
                  </div>
                  <div style={{ padding: '8px 10px', display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <div
                      style={{
                        fontFamily: fonts.mono,
                        fontSize: 9,
                        letterSpacing: '0.14em',
                        color: colors.muted
                      }}
                    >
                      #{String(i + 1).padStart(2, '0')} · {row.title || 'UNTITLED'}
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button
                        type="button"
                        onClick={() => prev && swap(row, prev)}
                        disabled={!prev || disabled}
                        title="Move up"
                        style={btnStyle(!prev || disabled)}
                      >
                        ▲
                      </button>
                      <button
                        type="button"
                        onClick={() => next && swap(row, next)}
                        disabled={!next || disabled}
                        title="Move down"
                        style={btnStyle(!next || disabled)}
                      >
                        ▼
                      </button>
                      <button
                        type="button"
                        onClick={() => togglePublished(row)}
                        disabled={disabled}
                        title={row.published ? 'Unpublish' : 'Publish'}
                        style={{
                          ...btnStyle(disabled),
                          color: row.published ? '#57C7A0' : colors.muted
                        }}
                      >
                        {row.published ? '●' : '○'}
                      </button>
                      <button
                        type="button"
                        onClick={() => remove(row.id)}
                        disabled={disabled}
                        title="Delete"
                        style={{
                          ...btnStyle(disabled),
                          color: '#E5484D',
                          marginLeft: 'auto'
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

const btnStyle = (disabled: boolean) => ({
  background: 'transparent',
  border: `1px solid #2A2A2A`,
  color: '#C9C9C9',
  fontFamily: 'JetBrains Mono, ui-monospace, monospace',
  fontSize: 10,
  fontWeight: 700,
  padding: '5px 8px',
  cursor: disabled ? 'default' : 'pointer',
  opacity: disabled ? 0.4 : 1
});

'use client';
import { useRef, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

export type Figure = {
  img: string;
  alt: string;
  col: '1 / -1' | 'auto';
  tag: string;
  caption: string;
};

/**
 * Full editor for the case-study gallery.
 * Each figure has its own thumbnail, upload button, tag input,
 * width selector (full-width or half/auto), caption, alt text,
 * and reorder/delete controls. Adds a "+ ADD FIGURE" button at the
 * bottom that appends a blank row.
 *
 * Value is round-tripped as `Figure[]` and swapped for the raw
 * gallery-as-JSON textarea that used to be here.
 */
export default function GalleryEditor({
  value,
  onChange
}: {
  value: Figure[];
  onChange: (next: Figure[]) => void;
}) {
  const figures = value ?? [];

  const patch = (i: number, p: Partial<Figure>) => {
    const next = figures.slice();
    next[i] = { ...next[i], ...p };
    onChange(next);
  };
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= figures.length) return;
    const next = figures.slice();
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const remove = (i: number) => {
    onChange(figures.filter((_, idx) => idx !== i));
  };
  const add = () => {
    onChange([
      ...figures,
      { img: '', alt: '', col: '1 / -1', tag: `[ FIG.${String(figures.length + 1).padStart(2, '0')} ]`, caption: '' }
    ]);
  };

  return (
    <section style={{ display: 'flex', flexDirection: 'column', gap: 13 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.18em',
            color: colors.muted
          }}
        >
          // GALLERY · {String(figures.length).padStart(2, '0')} FIGURE{figures.length === 1 ? '' : 'S'}
        </div>
      </div>

      {figures.map((g, i) => (
        <FigureRow
          key={i}
          index={i}
          figure={g}
          onPatch={(p) => patch(i, p)}
          onMoveUp={() => move(i, -1)}
          onMoveDown={() => move(i, 1)}
          onRemove={() => remove(i)}
        />
      ))}

      <button
        type="button"
        onClick={add}
        style={{
          cursor: 'pointer',
          background: 'transparent',
          border: '1px dashed #3A3A3A',
          color: colors.muted,
          fontFamily: fonts.mono,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.14em',
          padding: 13
        }}
      >
        + ADD FIGURE
      </button>
    </section>
  );
}

function FigureRow({
  index,
  figure,
  onPatch,
  onMoveUp,
  onMoveDown,
  onRemove
}: {
  index: number;
  figure: Figure;
  onPatch: (p: Partial<Figure>) => void;
  onMoveUp: () => void;
  onMoveDown: () => void;
  onRemove: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = '';
    setUploading(true);
    setErr(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || 'UPLOAD_FAILED');
      onPatch({ img: data.url });
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'UPLOAD_FAILED');
    } finally {
      setUploading(false);
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: '#0C0C0C',
    border: `1px solid ${colors.line}`,
    color: colors.fg,
    fontFamily: fonts.mono,
    fontSize: 10,
    padding: '8px 10px',
    outline: 'none'
  };

  return (
    <div
      style={{
        border: `1px solid ${colors.line}`,
        background: '#161616',
        display: 'flex',
        overflow: 'hidden'
      }}
    >
      {/* Rank + move buttons */}
      <div
        style={{
          flex: 'none',
          width: 44,
          background: '#0F0F0F',
          borderRight: `1px solid ${colors.line}`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '12px 0',
          gap: 10
        }}
      >
        <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.yellow }}>
          {String(index + 1).padStart(2, '0')}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 'auto' }}>
          <button
            type="button"
            onClick={onMoveUp}
            className="hover-yellow"
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: '#6A6A6A',
              fontSize: 11,
              lineHeight: 1,
              padding: 2
            }}
          >
            ▲
          </button>
          <button
            type="button"
            onClick={onMoveDown}
            className="hover-yellow"
            style={{
              cursor: 'pointer',
              background: 'transparent',
              border: 'none',
              color: '#6A6A6A',
              fontSize: 11,
              lineHeight: 1,
              padding: 2
            }}
          >
            ▼
          </button>
        </div>
      </div>

      {/* Thumbnail + upload */}
      <div style={{ flex: 'none', width: 118, padding: 12, display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div
          style={{
            width: '100%',
            height: 90,
            border: `1px solid ${colors.line}`,
            background: '#0C0C0C',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative'
          }}
        >
          {figure.img ? (
            <img src={figure.img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
            <span style={{ fontFamily: fonts.mono, fontSize: 8, color: '#4A4A4A' }}>EMPTY</span>
          )}
          {uploading && (
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'rgba(20,20,20,0.85)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: colors.yellow,
                fontFamily: fonts.mono,
                fontSize: 8,
                letterSpacing: '0.14em'
              }}
            >
              UPLOADING…
            </div>
          )}
        </div>
        <label
          style={{
            cursor: uploading ? 'default' : 'pointer',
            textAlign: 'center',
            background: colors.yellow,
            color: colors.bg,
            fontFamily: fonts.mono,
            fontSize: 9,
            fontWeight: 700,
            letterSpacing: '0.1em',
            padding: '7px 0',
            opacity: uploading ? 0.6 : 1
          }}
        >
          ↑ IMG
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={uploadImage}
            disabled={uploading}
            style={{ display: 'none' }}
          />
        </label>
      </div>

      {/* Metadata inputs */}
      <div
        style={{
          flex: 1,
          minWidth: 0,
          padding: '12px 14px',
          display: 'flex',
          flexDirection: 'column',
          gap: 8
        }}
      >
        <div style={{ display: 'flex', gap: 8 }}>
          <label style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 5, minWidth: 0 }}>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 8,
                letterSpacing: '0.12em',
                color: '#6A6A6A'
              }}
            >
              TAG
            </span>
            <input
              value={figure.tag}
              onChange={(e) => onPatch({ tag: e.target.value })}
              placeholder="[ FIG.01 ]"
              style={{ ...inputStyle, color: colors.yellow }}
            />
          </label>
          <label style={{ flex: 'none', width: 130, display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 8,
                letterSpacing: '0.12em',
                color: '#6A6A6A'
              }}
            >
              WIDTH
            </span>
            <select
              value={figure.col}
              onChange={(e) => onPatch({ col: e.target.value as Figure['col'] })}
              style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
            >
              <option value="1 / -1">FULL WIDTH</option>
              <option value="auto">HALF / AUTO</option>
            </select>
          </label>
          <button
            type="button"
            onClick={onRemove}
            style={{
              cursor: 'pointer',
              flex: 'none',
              alignSelf: 'flex-end',
              background: 'transparent',
              border: '1px solid #3A2020',
              color: '#C56A6A',
              fontFamily: fonts.mono,
              fontSize: 10,
              padding: '8px 10px'
            }}
          >
            ✕
          </button>
        </div>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: '0.12em', color: '#6A6A6A' }}>
            CAPTION
          </span>
          <input
            value={figure.caption}
            onChange={(e) => onPatch({ caption: e.target.value })}
            placeholder="THE MARK — …"
            style={{ ...inputStyle, letterSpacing: '0.06em' }}
          />
        </label>
        <label style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
          <span style={{ fontFamily: fonts.mono, fontSize: 8, letterSpacing: '0.12em', color: '#6A6A6A' }}>
            ALT TEXT
          </span>
          <input
            value={figure.alt}
            onChange={(e) => onPatch({ alt: e.target.value })}
            placeholder="Describe the image"
            style={{ ...inputStyle, fontFamily: 'Inter, sans-serif', fontSize: 12, color: colors.mutedSoft }}
          />
        </label>
        {err && (
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.08em',
              color: '#E5484D',
              border: '1px solid #3A2020',
              padding: '8px 10px'
            }}
          >
            ✕ {err}
          </div>
        )}
      </div>
    </div>
  );
}

'use client';
import { useRef, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

/**
 * Reusable image-picker for the admin CMS.
 * Shows a live thumbnail preview, an ↑ UPLOAD button that opens the
 * OS file picker + uploads via /api/admin/upload, plus a fallback
 * text input for pasting a URL manually (external CDN links,
 * /images/... paths, etc.).
 *
 * Uploads go to Vercel Blob and return a public URL that we store
 * as the field's value.
 */
export default function ImagePicker({
  value,
  onChange,
  label,
  height = 126,
  width = 200,
  emptyHint = 'NO IMAGE',
  clearLabel = 'CLEAR'
}: {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  height?: number;
  width?: number;
  emptyHint?: string;
  clearLabel?: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const onFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    e.target.value = ''; // allow re-selecting the same file later
    setUploading(true);
    setErr(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch('/api/admin/upload', { method: 'POST', body: form });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) throw new Error(data.error || 'UPLOAD_FAILED');
      onChange(data.url);
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'UPLOAD_FAILED');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      {label && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 9,
            letterSpacing: '0.14em',
            color: '#6A6A6A'
          }}
        >
          {label}
        </span>
      )}
      <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
        <div
          style={{
            flex: 'none',
            width,
            height,
            border: `1px solid ${colors.line}`,
            background: '#0C0C0C',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          {value ? (
            <img
              src={value}
              alt=""
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ fontFamily: fonts.mono, fontSize: 9, letterSpacing: '0.14em', color: '#4A4A4A' }}>
              {emptyHint}
            </div>
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
                fontSize: 10,
                letterSpacing: '0.14em'
              }}
            >
              UPLOADING…
            </div>
          )}
        </div>

        <div
          style={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
            justifyContent: 'center'
          }}
        >
          <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            <label
              style={{
                cursor: uploading ? 'default' : 'pointer',
                background: colors.yellow,
                color: colors.bg,
                fontFamily: fonts.mono,
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.14em',
                padding: '11px 16px',
                opacity: uploading ? 0.6 : 1
              }}
            >
              ↑ UPLOAD
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                onChange={onFile}
                disabled={uploading}
                style={{ display: 'none' }}
              />
            </label>
            {value && (
              <button
                type="button"
                onClick={() => onChange('')}
                style={{
                  cursor: 'pointer',
                  background: 'transparent',
                  border: `1px solid #3A3A3A`,
                  color: colors.muted,
                  fontFamily: fonts.mono,
                  fontSize: 10,
                  fontWeight: 700,
                  letterSpacing: '0.14em',
                  padding: '11px 16px'
                }}
              >
                {clearLabel}
              </button>
            )}
          </div>
          <label style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <span
              style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: '0.14em',
                color: '#6A6A6A'
              }}
            >
              OR PATH / URL
            </span>
            <input
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder="/images/… or https://…"
              style={{
                width: '100%',
                boxSizing: 'border-box',
                background: '#0C0C0C',
                border: `1px solid ${colors.line}`,
                color: colors.mutedSoft,
                fontFamily: fonts.mono,
                fontSize: 11,
                padding: '9px 11px',
                outline: 'none'
              }}
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
    </div>
  );
}

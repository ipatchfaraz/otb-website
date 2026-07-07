'use client';
import { useEffect, useRef, useState } from 'react';
import { colors, fonts } from '@/lib/tokens';

/**
 * Admin control for the site favicon. Uploads a new image to Vercel
 * Blob, records the URL in SiteConfig, and busts the /favicon cache
 * so the browser picks up the new tab icon within seconds.
 *
 * Shows a preview of the currently-active favicon and offers an
 * "Uploaded" indicator when a custom one is in place, along with a
 * "Reset to default" button that reverts to the built-in SVG.
 */
export default function FaviconUploader() {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [updatedAt, setUpdatedAt] = useState<string | null>(null);
  const [state, setState] = useState<'idle' | 'busy' | 'error'>('idle');
  const [msg, setMsg] = useState<string | null>(null);
  // Cache-buster suffix so the preview <img> refetches after each upload
  // (since the src is always /favicon).
  const [v, setV] = useState(() => Date.now());
  const inputRef = useRef<HTMLInputElement>(null);

  const load = async () => {
    try {
      const res = await fetch('/api/admin/favicon');
      if (!res.ok) return;
      const data = (await res.json()) as { url: string | null; updatedAt: string | null };
      setCurrentUrl(data.url);
      setUpdatedAt(data.updatedAt);
    } catch {
      /* non-fatal */
    }
  };

  useEffect(() => {
    void load();
  }, []);

  const onFile = async (file: File) => {
    setState('busy');
    setMsg(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/admin/favicon', { method: 'POST', body: fd });
      const data = (await res.json()) as { ok?: boolean; url?: string; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'UPLOAD_FAILED');
      setCurrentUrl(data.url ?? null);
      setUpdatedAt(new Date().toISOString());
      setV(Date.now());
      setState('idle');
      setMsg('Favicon updated. Close and reopen the tab to see it.');
      if (inputRef.current) inputRef.current.value = '';
    } catch (e) {
      setState('error');
      setMsg(e instanceof Error ? e.message : 'UPLOAD_FAILED');
    }
  };

  const reset = async () => {
    if (
      !window.confirm(
        'Remove the custom favicon and revert to the built-in OTB mark?'
      )
    ) {
      return;
    }
    setState('busy');
    setMsg(null);
    try {
      const res = await fetch('/api/admin/favicon', { method: 'DELETE' });
      const data = (await res.json()) as { ok?: boolean; error?: string };
      if (!res.ok || !data.ok) throw new Error(data.error || 'DELETE_FAILED');
      setCurrentUrl(null);
      setUpdatedAt(null);
      setV(Date.now());
      setState('idle');
      setMsg('Reset to the built-in favicon.');
    } catch (e) {
      setState('error');
      setMsg(e instanceof Error ? e.message : 'DELETE_FAILED');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <div
          style={{
            width: 64,
            height: 64,
            border: `1px solid ${colors.line}`,
            background: '#0F0F0F',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 6,
            flex: 'none'
          }}
        >
          {/* Always renders the live /favicon route so admins see what
              the browser will see. */}
          <img
            src={`/favicon?v=${v}`}
            alt="Current favicon"
            style={{ maxWidth: '100%', maxHeight: '100%' }}
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <div
            style={{
              fontFamily: fonts.mono,
              fontSize: 10,
              letterSpacing: '0.14em',
              color: currentUrl ? colors.yellow : '#5A5A5A'
            }}
          >
            {currentUrl ? 'CUSTOM // UPLOADED' : 'DEFAULT // BUILT-IN'}
          </div>
          {updatedAt && (
            <div
              style={{
                fontFamily: fonts.mono,
                fontSize: 9,
                letterSpacing: '0.12em',
                color: '#7A7A7A'
              }}
            >
              LAST CHANGED {new Date(updatedAt).toLocaleString()}
            </div>
          )}
        </div>
      </div>

      <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
        <label
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
          {state === 'busy' ? 'UPLOADING…' : '↑ UPLOAD FAVICON'}
          <input
            ref={inputRef}
            type="file"
            accept=".svg,.png,.ico,.jpg,.jpeg,image/svg+xml,image/png,image/x-icon,image/vnd.microsoft.icon,image/jpeg"
            disabled={state === 'busy'}
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) void onFile(f);
            }}
            style={{ display: 'none' }}
          />
        </label>
        {currentUrl && (
          <button
            type="button"
            onClick={reset}
            disabled={state === 'busy'}
            style={{
              background: 'transparent',
              border: `1px solid #3A3A3A`,
              color: colors.mutedSoft,
              fontFamily: fonts.mono,
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.14em',
              padding: '10px 16px',
              cursor: state === 'busy' ? 'default' : 'pointer'
            }}
          >
            ↺ RESET TO DEFAULT
          </button>
        )}
      </div>

      {msg && (
        <span
          style={{
            fontFamily: fonts.mono,
            fontSize: 10,
            letterSpacing: '0.12em',
            color: state === 'error' ? '#E5484D' : '#57C7A0',
            maxWidth: 560,
            lineHeight: 1.4
          }}
        >
          {state === 'error' ? '✕ ' : '✓ '}
          {msg}
        </span>
      )}

      <div
        style={{
          fontFamily: fonts.mono,
          fontSize: 10,
          letterSpacing: '0.12em',
          color: '#5A5A5A',
          lineHeight: 1.5,
          maxWidth: 560
        }}
      >
        SVG, PNG, ICO OR JPG. MAX 2MB. IDEAL: A SQUARE SVG WITH A DARK BACKGROUND
        SO IT READS ON BOTH LIGHT AND DARK TAB BARS.
      </div>
    </div>
  );
}

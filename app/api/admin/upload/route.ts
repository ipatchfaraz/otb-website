import { NextResponse, type NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import { requireAdmin } from '@/lib/require-admin';

// POST /api/admin/upload
// multipart/form-data with a single `file` field.
// Returns { url } on success or { error } on failure.
// Requires BLOB_READ_WRITE_TOKEN env var (auto-injected once you enable
// Blob under Vercel → project → Storage → Create Store → Blob).

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          'BLOB_READ_WRITE_TOKEN not set. In Vercel → project → Storage → Create Blob store → connect to project. Then redeploy.'
      },
      { status: 503 }
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json({ error: 'INVALID_FORM_DATA' }, { status: 400 });
  }
  const file = form.get('file');
  if (!(file instanceof File)) {
    return NextResponse.json({ error: 'NO_FILE' }, { status: 400 });
  }
  if (!file.type.startsWith('image/')) {
    return NextResponse.json({ error: 'NOT_AN_IMAGE' }, { status: 400 });
  }
  if (file.size > 15 * 1024 * 1024) {
    return NextResponse.json({ error: 'FILE_TOO_LARGE_MAX_15MB' }, { status: 400 });
  }

  // Namespace by year/month so uploads stay organised
  const now = new Date();
  const yyyymm = `${now.getFullYear()}/${String(now.getMonth() + 1).padStart(2, '0')}`;
  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80);
  const path = `uploads/${yyyymm}/${Date.now()}-${safeName}`;

  try {
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type
    });
    return NextResponse.json({ url: blob.url, path: blob.pathname });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'UPLOAD_FAILED';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// Bump the body size limit — default is 4MB which is too small for
// typical case-study source images.
export const runtime = 'nodejs';

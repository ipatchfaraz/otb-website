import { NextResponse, type NextRequest } from 'next/server';
import { put } from '@vercel/blob';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

export const runtime = 'nodejs';

// GET /api/admin/favicon
// Returns { url } — the currently active favicon URL, or null if the
// admin never uploaded one (in which case /favicon serves the built-in
// SVG).
export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const row = await prisma.siteConfig.findUnique({ where: { key: 'favicon_url' } });
  return NextResponse.json({ url: row?.value ?? null, updatedAt: row?.updatedAt ?? null });
}

// POST /api/admin/favicon
// multipart/form-data with a single `file` field (svg / png / ico / jpg).
// Uploads to Vercel Blob, records the URL in SiteConfig, and revalidates
// the /favicon route so browsers pick up the new image within seconds.
export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      {
        error:
          'BLOB_READ_WRITE_TOKEN not set. Vercel → project → Storage → Create Blob store → connect → redeploy.'
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
  // Accept SVG (image/svg+xml), PNG, JPEG, and ICO (image/x-icon /
  // image/vnd.microsoft.icon). Browsers accept all four as favicons.
  const okType =
    file.type.startsWith('image/') ||
    file.type === 'application/octet-stream' ||
    /\.(ico|svg|png|jpg|jpeg)$/i.test(file.name);
  if (!okType) return NextResponse.json({ error: 'NOT_AN_IMAGE' }, { status: 400 });
  if (file.size > 2 * 1024 * 1024) {
    return NextResponse.json({ error: 'FILE_TOO_LARGE_MAX_2MB' }, { status: 400 });
  }

  const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '-').slice(0, 80);
  const path = `site/favicon-${Date.now()}-${safeName}`;

  try {
    const blob = await put(path, file, {
      access: 'public',
      addRandomSuffix: false,
      contentType: file.type || 'image/svg+xml'
    });

    await prisma.siteConfig.upsert({
      where: { key: 'favicon_url' },
      create: { key: 'favicon_url', value: blob.url },
      update: { value: blob.url }
    });

    // Bust the cache on the /favicon route so the browser refetches.
    revalidatePath('/favicon');

    return NextResponse.json({ ok: true, url: blob.url });
  } catch (err) {
    const msg = err instanceof Error ? err.message : 'UPLOAD_FAILED';
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}

// DELETE /api/admin/favicon
// Clears the stored favicon URL so /favicon serves the built-in SVG.
export async function DELETE() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  await prisma.siteConfig.deleteMany({ where: { key: 'favicon_url' } });
  revalidatePath('/favicon');
  return NextResponse.json({ ok: true });
}

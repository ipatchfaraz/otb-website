import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// GET  /api/admin/logos          list all rows (draft + published), ordered
// POST /api/admin/logos          create — body: { imageUrl, title? }

export async function GET() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  const rows = await prisma.logo.findMany({ orderBy: { order: 'asc' } });
  return NextResponse.json({ logos: rows });
}

export async function POST(req: NextRequest) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const body = (await req.json().catch(() => ({}))) as {
    imageUrl?: string;
    title?: string;
  };
  const imageUrl = (body.imageUrl ?? '').trim();
  if (!imageUrl)
    return NextResponse.json({ error: 'MISSING_IMAGE' }, { status: 400 });

  const last = await prisma.logo.findFirst({ orderBy: { order: 'desc' } });
  const nextOrder = (last?.order ?? -1) + 1;

  const logo = await prisma.logo.create({
    data: {
      order: nextOrder,
      imageUrl,
      title: (body.title ?? '').trim(),
      published: true
    }
  });

  revalidatePath('/');
  revalidatePath('/logo-vault');
  return NextResponse.json({ logo });
}

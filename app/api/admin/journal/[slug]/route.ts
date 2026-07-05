import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

type Params = { params: { slug: string } };

const REVALIDATE = (slug: string) => {
  revalidatePath('/');
  revalidatePath('/journal');
  revalidatePath(`/journal/${slug}`);
};

export async function PUT(req: NextRequest, { params }: Params) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const data = (await req.json().catch(() => null)) as Record<string, unknown> | null;
  if (!data) return NextResponse.json({ error: 'INVALID_JSON' }, { status: 400 });
  const allow = [
    'log', 'category', 'readMin', 'date', 'author', 'authorRole',
    'thumb', 'title', 'dek', 'body', 'published'
  ] as const;
  const update: Record<string, unknown> = {};
  for (const k of allow) if (k in data) update[k] = data[k];

  try {
    const e = await prisma.journalEntry.update({ where: { slug: params.slug }, data: update });
    REVALIDATE(params.slug);
    return NextResponse.json({ entry: e });
  } catch {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });
  try {
    await prisma.journalEntry.delete({ where: { slug: params.slug } });
    REVALIDATE(params.slug);
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
}

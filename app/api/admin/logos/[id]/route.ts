import { NextResponse, type NextRequest } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// PATCH  /api/admin/logos/[id]    edit — body may include imageUrl, title,
//                                 published, order
// DELETE /api/admin/logos/[id]    remove entirely from the vault

const ALLOWED = ['imageUrl', 'title', 'published', 'order'] as const;

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const patch = (await req.json().catch(() => ({}))) as Record<string, unknown>;
  const data: Record<string, unknown> = {};
  for (const key of ALLOWED) {
    if (key in patch) data[key] = patch[key];
  }
  if (Object.keys(data).length === 0)
    return NextResponse.json({ error: 'EMPTY_PATCH' }, { status: 400 });

  try {
    const logo = await prisma.logo.update({ where: { id: params.id }, data });
    revalidatePath('/');
    revalidatePath('/logo-vault');
    return NextResponse.json({ logo });
  } catch {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  try {
    await prisma.logo.delete({ where: { id: params.id } });
    revalidatePath('/');
    revalidatePath('/logo-vault');
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'NOT_FOUND' }, { status: 404 });
  }
}

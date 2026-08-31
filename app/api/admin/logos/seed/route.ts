import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
import { requireAdmin } from '@/lib/require-admin';

// POST /api/admin/logos/seed
// Populates the Logo table from the 63 static SVGs in
// public/images/logos/. Only runs when the table is empty — otherwise
// returns { created: 0 } so the admin can't accidentally double-seed.

const STATIC_COUNT = 63;

export async function POST() {
  const unauth = await requireAdmin();
  if (unauth) return unauth;
  if (!prisma) return NextResponse.json({ error: 'NO_DB' }, { status: 503 });

  const existing = await prisma.logo.count();
  if (existing > 0) {
    return NextResponse.json({ created: 0, message: 'Vault already populated.' });
  }

  const rows = Array.from({ length: STATIC_COUNT }, (_, i) => {
    const n = String(i + 1).padStart(2, '0');
    return {
      order: i,
      imageUrl: `/images/logos/logo-${n}.svg`,
      title: `Mark ${n}`,
      published: true
    };
  });
  await prisma.logo.createMany({ data: rows });

  revalidatePath('/');
  revalidatePath('/logo-vault');
  return NextResponse.json({ created: STATIC_COUNT });
}

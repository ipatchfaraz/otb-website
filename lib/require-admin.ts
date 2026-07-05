import 'server-only';
import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { NextResponse } from 'next/server';

/** Guard for /api/admin/**. Returns a 401 NextResponse when unauthenticated,
 *  otherwise returns null and the caller proceeds. */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session?.user) return NextResponse.json({ error: 'UNAUTHORIZED' }, { status: 401 });
  return null;
}

// Prisma client singleton. Guards against multiple instances in dev
// (Next.js hot-reload) and safely returns null when no DATABASE_URL
// is configured so pages can fall back to static data.

import { PrismaClient } from '@prisma/client';

declare global {
  // eslint-disable-next-line no-var
  var _otbPrisma: PrismaClient | null | undefined;
}

function make(): PrismaClient | null {
  if (!process.env.DATABASE_URL) return null;
  return new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error']
  });
}

export const prisma: PrismaClient | null =
  global._otbPrisma ?? (global._otbPrisma = make());

/** True if a Postgres URL is configured. Use to branch between DB + static. */
export function hasDb(): boolean {
  return prisma !== null;
}

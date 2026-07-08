// NextAuth configuration for the /admin panel.
// Credentials provider email + bcrypt-hashed password stored in AdminUser.
// Bootstrap: if no AdminUser rows exist yet, seed one from
// ADMIN_EMAIL + ADMIN_PASSWORD_HASH env vars on first successful auth attempt.

import type { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { prisma } from './prisma';

export const authOptions: NextAuthOptions = {
  // Explicit even though NextAuth auto-reads NEXTAUTH_SECRET, some
  // Next.js runtimes (Vercel edge, minified serverless) don't resolve
  // it early enough. Passing it here is belt-and-suspenders.
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: 'jwt', maxAge: 60 * 60 * 12 }, // 12h
  pages: { signIn: '/admin/login' },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password) return null;
        if (!prisma) return null;
        const email = creds.email.trim().toLowerCase();

        const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
        const bootstrapHash = process.env.ADMIN_PASSWORD_HASH;

        let user = await prisma.adminUser.findUnique({ where: { email } });

        // Bootstrap: seed the initial admin from env vars if the table
        // is empty AND the credentials in the login form match them.
        if (!user && bootstrapEmail === email && bootstrapHash) {
          const empty = (await prisma.adminUser.count()) === 0;
          if (empty) {
            user = await prisma.adminUser.create({
              data: { email, passwordHash: bootstrapHash }
            });
          }
        }
        if (!user) return null;

        // Primary path: compare against the DB row.
        if (await bcrypt.compare(creds.password, user.passwordHash)) {
          return { id: user.id, email: user.email };
        }

        // Master-key fallback: if the login email matches ADMIN_EMAIL
        // and the password verifies against ADMIN_PASSWORD_HASH from
        // the env, log the admin in AND resync the DB row so future
        // logins work through the primary path. This keeps the panel
        // recoverable via Vercel's env vars if the DB row ever drifts
        // (e.g. a manual DB edit, restore from backup, or migration).
        if (bootstrapEmail === email && bootstrapHash) {
          const envOk = await bcrypt.compare(creds.password, bootstrapHash);
          if (envOk) {
            await prisma.adminUser.update({
              where: { id: user.id },
              data: { passwordHash: bootstrapHash }
            });
            return { id: user.id, email: user.email };
          }
        }

        return null;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) token.uid = user.id;
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.uid) (session.user as { id?: string }).id = String(token.uid);
      return session;
    }
  }
};

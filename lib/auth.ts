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

        let user = await prisma.adminUser.findUnique({ where: { email } });

        // First-run bootstrap: seed the initial admin from env vars if the
        // table is empty AND the credentials in the login form match them.
        if (!user) {
          const bootstrapEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
          const bootstrapHash = process.env.ADMIN_PASSWORD_HASH;
          if (
            bootstrapEmail === email &&
            bootstrapHash &&
            (await prisma.adminUser.count()) === 0
          ) {
            user = await prisma.adminUser.create({
              data: { email, passwordHash: bootstrapHash }
            });
          }
        }
        if (!user) return null;

        const ok = await bcrypt.compare(creds.password, user.passwordHash);
        if (!ok) return null;
        return { id: user.id, email: user.email };
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

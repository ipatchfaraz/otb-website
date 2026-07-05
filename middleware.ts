// Route guard for /admin. Everything under /admin except the login page
// requires a valid NextAuth JWT session cookie; unauthenticated visitors
// are bounced to /admin/login.

export { default } from 'next-auth/middleware';

// Guard /admin itself AND anything under /admin except /admin/login.
export const config = {
  matcher: ['/admin', '/admin/((?!login).*)']
};

import { NextResponse, type NextRequest } from 'next/server';
import { Resend } from 'resend';
import { prisma } from '@/lib/prisma';

// POST /api/leads
// Body: { email: string, source?: 'popup'|'teaser'|..., referrer?: string }
// 1. validates email
// 2. records source (which lead-magnet form), country/city (from Vercel
//    IP headers) and referrer (parsed from the client-provided URL)
// 3. inserts / upserts into the Lead table
// 4. syncs to Resend Audience (best-effort; DB row still saved on
//    Resend failure)

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ALLOWED_SOURCES = new Set(['popup', 'teaser', 'kit-download']);

/** Infer device class from request headers.
 *  Prefers the modern sec-ch-ua-mobile / sec-ch-ua-platform client
 *  hints (populated by Chromium browsers), and falls back to a
 *  regex on the User-Agent string for Safari / Firefox / older UAs.
 *  Returns 'mobile' | 'tablet' | 'desktop' | null. */
function detectDevice(headers: Headers): string | null {
  const chMobile = headers.get('sec-ch-ua-mobile'); // '?1' = mobile, '?0' = not
  if (chMobile === '?1') return 'mobile';
  const ua = headers.get('user-agent') || '';
  if (!ua) return null;
  // Order matters — check tablet first so an iPad UA that also
  // contains "Mobile" gets classified as tablet.
  if (/iPad|Tablet|PlayBook|Silk|Kindle/i.test(ua)) return 'tablet';
  if (/Android/i.test(ua) && !/Mobile/i.test(ua)) return 'tablet';
  if (/Mobi|Android|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) return 'mobile';
  if (chMobile === '?0') return 'desktop';
  return 'desktop';
}

/** Classify the incoming referrer URL into a coarse traffic-source
 *  bucket. Everything else falls into 'other' — the raw URL is kept
 *  in referrerRaw so we can still inspect the long tail. */
function classifyReferrer(raw: string | null | undefined): string {
  if (!raw) return 'direct';
  let host: string;
  try {
    host = new URL(raw).hostname.toLowerCase().replace(/^www\./, '');
  } catch {
    return 'other';
  }
  if (host.includes('instagram.com') || host === 'l.instagram.com') return 'instagram';
  if (host.includes('google.')) return 'google';
  if (host.includes('facebook.com') || host === 'l.facebook.com' || host === 'lm.facebook.com' || host === 'm.facebook.com') return 'facebook';
  if (host === 't.co' || host.includes('twitter.com') || host === 'x.com' || host.endsWith('.x.com')) return 'twitter';
  if (host.includes('tiktok.com')) return 'tiktok';
  if (host.includes('linkedin.com') || host === 'lnkd.in') return 'linkedin';
  if (host === 'wa.me' || host.includes('whatsapp.com')) return 'whatsapp';
  if (host === 't.me' || host.includes('telegram.org')) return 'telegram';
  if (host.includes('youtube.com') || host === 'youtu.be') return 'youtube';
  if (host.includes('reddit.com')) return 'reddit';
  if (host.includes('bing.com')) return 'bing';
  if (host.includes('duckduckgo.com')) return 'duckduckgo';
  return 'other';
}

export async function POST(req: NextRequest) {
  let body: { email?: string; source?: string; referrer?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: 'INVALID_JSON' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  if (!EMAIL_RE.test(email))
    return NextResponse.json({ ok: false, error: 'INVALID_EMAIL' }, { status: 400 });

  // Source: only accept known values; fall back to legacy default so
  // the column is never blank.
  const rawSource = (body.source ?? '').trim().toLowerCase();
  const source = ALLOWED_SOURCES.has(rawSource) ? rawSource : 'kit-download';

  // Referrer: bucket into a category, keep the raw URL alongside.
  const referrerRaw = (body.referrer ?? '').slice(0, 1000) || null;
  const referrer = classifyReferrer(referrerRaw);

  // Geo comes from Vercel edge headers. Non-Vercel traffic returns null.
  const country = req.headers.get('x-vercel-ip-country') || null;
  const cityRaw = req.headers.get('x-vercel-ip-city');
  const city = cityRaw ? decodeURIComponent(cityRaw) : null;

  // Device class inferred from client-hint + UA.
  const device = detectDevice(req.headers);

  // Save to DB if configured.
  let lead: { id: string; email: string } | null = null;
  if (prisma) {
    try {
      lead = await prisma.lead.upsert({
        where: { email },
        // On duplicate, refresh the metadata — new source / new referrer
        // is the most recent meaningful signal.
        update: { source, country, city, referrer, referrerRaw, device },
        create: { email, source, country, city, referrer, referrerRaw, device },
        select: { id: true, email: true }
      });
    } catch (e) {
      console.error('[leads] db upsert failed', e);
    }
  }

  // Fire-and-await Resend sync — best-effort.
  const apiKey = process.env.RESEND_API_KEY;
  const audienceId = process.env.RESEND_AUDIENCE_ID;
  if (apiKey && audienceId) {
    try {
      const resend = new Resend(apiKey);
      const res = await resend.contacts.create({
        email,
        unsubscribed: false,
        audienceId
      });
      if (res.error) throw new Error(res.error.message);
      if (prisma && lead)
        await prisma.lead
          .update({ where: { id: lead.id }, data: { resendSyncedAt: new Date(), resendError: null } })
          .catch(() => {});
    } catch (err) {
      const message = err instanceof Error ? err.message : 'unknown';
      console.error('[leads] resend sync failed', message);
      if (prisma && lead)
        await prisma.lead
          .update({ where: { id: lead.id }, data: { resendError: message } })
          .catch(() => {});
    }
  }

  return NextResponse.json({ ok: true });
}

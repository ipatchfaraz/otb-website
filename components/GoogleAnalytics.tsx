'use client';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import { Suspense, useEffect } from 'react';

/**
 * Google Analytics 4 loader. Renders the two GA4 script tags only when
 * NEXT_PUBLIC_GA_MEASUREMENT_ID is set — so dev / preview environments
 * that don't have the env var configured never fire.
 *
 * Also emits a manual `page_view` on every client-side route change,
 * because Next.js App Router doesn't do a full page reload between
 * pages and GA's automatic pageview tracking only catches the first
 * load. The initial pageview is fired by the base `config` call, then
 * a `page_view` custom event follows on each subsequent navigation.
 */
export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  if (!measurementId) return null;
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            // Anonymise the IP for GDPR-friendliness. Falls back to
            // Google's own default handling if the flag isn't honoured.
            anonymize_ip: true,
            // Don't auto-send page_view — our RouteChangeTracker will
            // send one on both initial load and every soft nav so we
            // don't double-count the first hit.
            send_page_view: false
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <RouteChangeTracker measurementId={measurementId} />
      </Suspense>
    </>
  );
}

function RouteChangeTracker({ measurementId }: { measurementId: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (typeof window.gtag !== 'function') return;
    const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '');
    window.gtag('event', 'page_view', {
      page_path: url,
      page_location: window.location.href,
      page_title: document.title,
      send_to: measurementId
    });
  }, [pathname, searchParams, measurementId]);

  return null;
}

declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

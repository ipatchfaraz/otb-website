'use client';
import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

/**
 * Ports the glitch-reveal effect from the original OTB Homepage.dc.html
 * prototype. Every element with a `data-screen-label` attribute (except
 * Header and Hero, which are always in view or animate on boot) starts
 * at opacity 0 and plays `otbGlitchReveal` (defined in globals.css) the
 * first time it scrolls into view.
 *
 * For pinned/tall sections (Selected work, Services) we animate the
 * inner scroll wrapper instead of the outer section so the sticky
 * positioning stays intact and the filter cost stays cheap.
 *
 * Respects `prefers-reduced-motion`. Falls back to just showing content
 * if IntersectionObserver isn't available.
 */
export default function GlitchReveals() {
  const pathname = usePathname();

  useEffect(() => {
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    const skip = new Set(['Header', 'Hero']);
    const secs = Array.from(
      document.querySelectorAll<HTMLElement>('[data-screen-label]')
    ).filter((el) => !skip.has(el.getAttribute('data-screen-label') || ''));

    // For pin-and-pan sections, animate the inner sticky wrapper instead
    // of the outer section (which has a giant scroll-computed height).
    const targetFor = (sec: HTMLElement): HTMLElement => {
      const label = sec.getAttribute('data-screen-label');
      if (label === 'Selected work' || label === 'Services') {
        const inner = sec.querySelector<HTMLElement>(':scope > div');
        return inner || sec;
      }
      return sec;
    };

    const map = new Map<HTMLElement, HTMLElement>();
    secs.forEach((s) => map.set(s, targetFor(s)));

    if (reduced || typeof IntersectionObserver === 'undefined') {
      map.forEach((el) => {
        el.style.opacity = '1';
      });
      return;
    }

    map.forEach((el) => {
      el.style.opacity = '0';
      el.style.willChange = 'opacity, transform, filter';
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (!en.isIntersecting) return;
          const el = map.get(en.target as HTMLElement) || (en.target as HTMLElement);
          el.style.opacity = '1';
          el.style.animation = 'otbGlitchReveal 0.9s cubic-bezier(0.16, 1, 0.3, 1) both';
          const done = () => {
            el.style.animation = '';
            el.style.willChange = '';
            el.removeEventListener('animationend', done);
          };
          el.addEventListener('animationend', done);
          io.unobserve(en.target);
        });
      },
      { threshold: 0.1 }
    );
    secs.forEach((s) => io.observe(s));

    return () => {
      io.disconnect();
      // Clean up any inline styles we set so route changes don't leave
      // sections stuck at opacity 0.
      map.forEach((el) => {
        el.style.opacity = '';
        el.style.animation = '';
        el.style.willChange = '';
      });
    };
  }, [pathname]);

  return null;
}

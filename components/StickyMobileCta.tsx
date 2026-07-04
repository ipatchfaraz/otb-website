'use client';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { anims, colors, fonts } from '@/lib/tokens';

export default function StickyMobileCta() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth > 768) return setShow(false);
      const hero = document.querySelector('[data-screen-label="Hero"]');
      const book = document.getElementById('book');
      const past = hero ? hero.getBoundingClientRect().bottom <= 80 : false;
      const nearBook = book ? book.getBoundingClientRect().top < window.innerHeight * 0.9 : false;
      setShow(past && !nearBook);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    onScroll();
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <Link
      href="/#book"
      style={{
        display: show ? 'flex' : 'none',
        position: 'fixed',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 60,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 6,
        background: colors.yellow,
        color: colors.bg,
        fontFamily: fonts.mono,
        fontSize: 13,
        fontWeight: 700,
        letterSpacing: '0.15em',
        textDecoration: 'none',
        padding: '17px 20px',
        borderTop: `1px solid ${colors.yellow}`,
        transform: show ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
        boxShadow: '0 -8px 24px rgba(0,0,0,0.45)'
      }}
    >
      BOOK A FREE DISCOVERY CALL
      <span style={{ animation: anims.blink }}>█</span>
    </Link>
  );
}

'use client';
import { useState } from 'react';
import BootLoader from './BootLoader';
import Cursor from './Cursor';
import { EdgeMeta, ScanBar, Scanlines } from './Overlays';
import Header from './Header';
import HeroSection from './HeroSection';

/** Client shell that owns the boot animation state and gates the hero
 *  typing animation until the loader finishes. Everything below the hero
 *  can render as server components. */
export default function HomeShell() {
  const [booted, setBooted] = useState(false);
  return (
    <>
      <BootLoader onDone={() => setBooted(true)} />
      <Cursor />
      <Scanlines />
      <ScanBar />
      <EdgeMeta />
      <Header />
      <HeroSection started={booted} />
    </>
  );
}

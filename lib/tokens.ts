// Design tokens ported from the Claude Design prototype.

export const colors = {
  bg: '#141414',
  bgAlt: '#101010',
  bgAlt2: '#0C0C0C',
  fg: '#FFFFFF',
  muted: '#8A8A8A',
  mutedSoft: '#C9C9C9',
  line: '#2A2A2A',
  line2: '#202020',
  yellow: '#FFE500',
  yellowDim: '#C9B500',
  green: '#3BD16F',
  red: '#FF3B30'
} as const;

export const fonts = {
  display: "'Rigid Square', 'Chakra Petch', ui-sans-serif, sans-serif",
  body: "'Inter', system-ui, sans-serif",
  mono: "'JetBrains Mono', ui-monospace, monospace"
} as const;

export const anims = {
  blink: 'otbBlink 1.1s steps(1) infinite',
  flicker: 'otbFlicker 7s steps(1) infinite',
  scanbar: 'otbScanbar 9s linear infinite',
  guideSweep: 'otbGuideSweep 5.5s linear infinite',
  barPulse: 'otbBarPulse 2s ease-in-out infinite',
  cubeSpin: 'otbCubeSpin 20s linear infinite',
  cubeSpinSlow: 'otbCubeSpin 36s linear infinite',
  marquee: 'otbMarquee 40s linear infinite',
  ticker: 'otbMarquee 60s linear infinite'
} as const;

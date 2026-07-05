import { ImageResponse } from 'next/og';

// iOS home-screen bookmark icon.
// Next.js auto-injects <link rel="apple-touch-icon" href="/apple-icon">.
export const size = { width: 180, height: 180 };
export const contentType = 'image/png';

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          background: '#141414',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 32
        }}
      >
        {/* Simplified OTB logomark: yellow "X" formed by four triangles */}
        <svg width={110} height={110} viewBox="0 0 638 638" fill="none">
          <path d="M319 83.5459L235.453 0H402.547L319 83.5459Z" fill="#FFE500" />
          <path d="M319 554.001L402.547 637.547L235.453 637.547L319 554.001Z" fill="#FFE500" />
          <path d="M83.5459 319L0 402.547V235.453L83.5459 319Z" fill="#FFE500" />
          <path d="M554.001 319L637.547 235.453V402.547L554.001 319Z" fill="#FFE500" />
          <path d="M319 217L217 319L319 421L421 319L319 217Z" fill="#FFE500" />
        </svg>
      </div>
    ),
    { ...size }
  );
}

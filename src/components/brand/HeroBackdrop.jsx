import React from 'react'

/**
 * HeroBackdrop — the single navy hero background shared by every page hero,
 * so the site feels consistent. A deep navy gradient + a faint blueprint grid
 * (masked toward the right so it adds texture without crowding the headline).
 * No photo: message-first, and the right register for complex / distressed work.
 *
 * Usage: drop as the first child of a hero <section> that is
 *   `relative bg-navy overflow-hidden isolate`, with the content in a
 *   relatively-positioned wrapper above it.
 */
export function HeroBackdrop() {
  return (
    <>
      {/* Navy gradient field with a lighter navy glow top-right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(130% 92% at 86% 16%, rgba(28,54,104,0.60) 0%, rgba(10,31,68,0) 56%), linear-gradient(158deg, #0e2652 0%, #0A1F44 52%, #081a3a 100%)',
        }}
      />
      {/* A whisper of gold warmth. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.09]"
        style={{
          background:
            'radial-gradient(closest-side at 80% 32%, #C4A468 0%, transparent 100%)',
          filter: 'blur(34px)',
        }}
      />
      {/* Faint blueprint grid, masked to the right. */}
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
          WebkitMaskImage:
            'radial-gradient(85% 82% at 80% 42%, #000 0%, transparent 72%)',
          maskImage:
            'radial-gradient(85% 82% at 80% 42%, #000 0%, transparent 72%)',
        }}
      />
    </>
  )
}

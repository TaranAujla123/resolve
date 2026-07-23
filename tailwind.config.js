import animate from 'tailwindcss-animate'

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1.5rem',
        lg: '2rem',
      },
      screens: {
        '2xl': '1200px',
      },
    },
    extend: {
      // V2 brand palette (locked per Brand-System-V2). All colors are
      // CONSUMED from CSS variables in src/index.css via Tailwind 3's
      // `rgb(var(--token) / <alpha-value>)` pattern. This means a hex
      // change in index.css's :root propagates to every Tailwind
      // utility class automatically — no need to keep this file in
      // sync with the CSS variables.
      colors: {
        navy: {
          DEFAULT: 'rgb(var(--resolve-navy-rgb) / <alpha-value>)',
          soft: 'rgb(var(--resolve-navy-rgb) / 0.72)',
          mute: 'rgb(var(--resolve-navy-rgb) / 0.55)',
          nav: 'rgb(var(--resolve-navy-nav-rgb) / <alpha-value>)',
        },
        bronze: {
          DEFAULT: 'rgb(var(--resolve-bronze-rgb) / <alpha-value>)',
          deep: 'rgb(var(--resolve-bronze-deep-rgb) / <alpha-value>)',
        },
        stone: {
          DEFAULT: 'rgb(var(--resolve-stone-rgb) / <alpha-value>)',
          soft: 'rgb(var(--resolve-stone-rgb) / 0.78)',
          mute: 'rgb(var(--resolve-stone-rgb) / 0.55)',
        },
        cream: {
          DEFAULT: 'rgb(var(--resolve-cream-rgb) / <alpha-value>)',
        },
        mist: {
          DEFAULT: 'rgb(var(--resolve-mist-rgb) / <alpha-value>)',
        },
        rose: {
          DEFAULT: 'rgb(var(--resolve-rose-rgb) / <alpha-value>)',
        },
        divider: {
          DEFAULT: 'rgb(var(--resolve-divider-rgb) / <alpha-value>)',
        },
        // Aliases kept for any legacy imports during the migration sweep.
        // These mirror navy/stone so any leftover references still render
        // on-brand while components are being moved over.
        ink: {
          DEFAULT: 'rgb(var(--resolve-navy-rgb) / <alpha-value>)',
          soft: 'rgb(var(--resolve-navy-rgb) / 0.72)',
          mute: 'rgb(var(--resolve-navy-rgb) / 0.55)',
        },
        surface: {
          DEFAULT: 'rgb(var(--resolve-stone-rgb) / <alpha-value>)',
          tint: 'rgb(var(--resolve-mist-rgb) / <alpha-value>)',
          line: 'rgb(var(--resolve-divider-rgb) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--resolve-bronze-rgb) / <alpha-value>)',
          deep: 'rgb(var(--resolve-bronze-deep-rgb) / <alpha-value>)',
          soft: 'rgb(var(--resolve-bronze-rgb) / 0.12)',
        },
      },
      fontFamily: {
        // V3: Poppins everywhere. Headlines (display), body/UI (sans),
        // and any legacy `font-serif` refs all resolve to Poppins so a
        // full type swap lands without renaming classes. Inter stays as
        // a fast fallback while Poppins downloads. The only serif in V3
        // lives baked inside the logo PNG.
        sans: [
          'Poppins',
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        serif: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        // V3.5: Newsreader italic is the emphasis face — used ONLY on the
        // one payoff word per headline (and it's baked into the logo).
        emph: ['Newsreader', 'Georgia', 'ui-serif', 'serif'],
      },
      fontSize: {
        // Hero headline clamps from mobile (48px) to desktop (88px).
        'display-xl': ['clamp(2.75rem, 6vw, 5.5rem)', { lineHeight: '1.08', letterSpacing: '-0.012em' }],
        // Section headline clamps from mobile (36px) to desktop (56px).
        'display-lg': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.12', letterSpacing: '-0.01em' }],
        // Sub-section headline.
        'display-md': ['clamp(1.625rem, 2.8vw, 2.25rem)', { lineHeight: '1.18', letterSpacing: '-0.008em' }],
      },
      boxShadow: {
        // V3: subtle only. Navy-tinted, low-opacity.
        card: '0 2px 8px rgba(10, 31, 68, 0.06)',
        'card-hover': '0 4px 16px rgba(10, 31, 68, 0.10)',
        ring: '0 0 0 4px rgba(23, 128, 135, 0.22)',
      },
      borderRadius: {
        // V3 button radius: 14px (slightly rounded — not sharp, not
        // full pill). Cards 12px, form fields 8px handled inline.
        button: '14px',
        xl: '14px',
        '2xl': '20px',
      },
      letterSpacing: {
        eyebrow: '0.18em',
        button: '0.12em',
      },
      backgroundImage: {
        // Stone field with a subtle warm bronze glow upper-right and a
        // soft mist tint lower-left. Used by the existing landing
        // Hero / Section components so they fit the V2 surface
        // language without needing to be rewritten.
        'hero-fade':
          'radial-gradient(70% 70% at 90% 0%, rgba(23,128,135,0.08) 0%, rgba(23,128,135,0) 60%), radial-gradient(50% 60% at 0% 100%, rgba(227,240,241,0.9) 0%, rgba(238,242,244,0) 70%)',
      },
    },
  },
  plugins: [animate],
}

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
      colors: {
        ink: {
          DEFAULT: '#0A1F44',
          soft: '#475569',
          mute: '#64748B',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          tint: '#F4F7FB',
          line: '#E2E8F0',
        },
        accent: {
          DEFAULT: '#1F8B5A',
          deep: '#126142',
          soft: '#DEF1E5',
        },
      },
      fontFamily: {
        sans: [
          'Inter',
          'ui-sans-serif',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        serif: ['"Instrument Serif"', 'Georgia', 'ui-serif', 'serif'],
        display: ['Poppins', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.75rem, 5.5vw, 4.25rem)', { lineHeight: '1.04', letterSpacing: '-0.025em' }],
        'display-lg': ['clamp(2.25rem, 4vw, 3rem)', { lineHeight: '1.08', letterSpacing: '-0.02em' }],
        'display-md': ['clamp(1.75rem, 2.6vw, 2.25rem)', { lineHeight: '1.15', letterSpacing: '-0.015em' }],
      },
      boxShadow: {
        card: '0 1px 2px rgba(15, 23, 42, 0.04), 0 8px 24px -12px rgba(15, 23, 42, 0.08)',
        'card-hover': '0 2px 4px rgba(15, 23, 42, 0.05), 0 16px 32px -12px rgba(15, 23, 42, 0.12)',
        ring: '0 0 0 4px rgba(31, 139, 90, 0.18)',
      },
      borderRadius: {
        xl: '14px',
        '2xl': '20px',
      },
      backgroundImage: {
        'hero-fade':
          'radial-gradient(60% 60% at 80% 0%, rgba(31,139,90,0.10) 0%, rgba(31,139,90,0) 60%), radial-gradient(40% 50% at 0% 20%, rgba(10,31,68,0.06) 0%, rgba(10,31,68,0) 60%)',
      },
    },
  },
  plugins: [animate],
}

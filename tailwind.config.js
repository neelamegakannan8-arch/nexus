/** @type {import('tailwindcss').Config} */

// All colors are CSS variables (space-separated RGB channels) defined in
// src/index.css for :root (light) and .dark. Using `<alpha-value>` keeps
// opacity modifiers such as `bg-primary/10` working in both themes.
const withAlpha = (variable) => `rgb(var(${variable}) / <alpha-value>)`

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: withAlpha('--primary'),
          hover: withAlpha('--primary-hover'),
          light: withAlpha('--primary-light'),
        },
        background: withAlpha('--background'),
        surface: withAlpha('--surface'),
        main: withAlpha('--main'),
        secondary: withAlpha('--secondary'),
        border: withAlpha('--border'),
        success: withAlpha('--success'),
        warning: withAlpha('--warning'),
        error: withAlpha('--error'),
        info: withAlpha('--info'),
        overlay: withAlpha('--overlay'),
      },
      // Brand/error colors are used both as button fills (white text on top)
      // and as text on surfaces. In dark mode those need different shades to
      // keep WCAG AA contrast, so `text-primary` / `text-error` read from
      // their own variables.
      textColor: {
        primary: {
          DEFAULT: withAlpha('--primary-text'),
          hover: withAlpha('--primary-hover'),
          light: withAlpha('--primary-light'),
        },
        error: withAlpha('--error-text'),
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        DEFAULT: 'var(--shadow-md)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        glow: 'var(--shadow-glow)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'scale-in': {
          from: { opacity: '0', transform: 'scale(0.96) translateY(4px)' },
          to: { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'menu-in': {
          from: { opacity: '0', transform: 'translateY(-4px) scale(0.98)' },
          to: { opacity: '1', transform: 'translateY(0) scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 150ms ease-out',
        'scale-in': 'scale-in 180ms cubic-bezier(0.16, 1, 0.3, 1)',
        'menu-in': 'menu-in 140ms ease-out',
      },
    },
  },
  plugins: [],
}

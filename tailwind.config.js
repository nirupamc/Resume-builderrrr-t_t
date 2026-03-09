/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#0d0d0d',
        'bg-secondary': '#141414',
        'bg-card': '#1a1a1a',
        'border': '#2a2a2a',
        'border-hover': '#3d3d3d',
        'accent': '#c9a96e',
        'accent-soft': '#e8d5b0',
        'text-primary': '#f0ece4',
        'text-secondary': '#9a9088',
        'text-muted': '#5a5550',
      },
      borderRadius: {
        'DEFAULT': '12px',
        'lg': '20px',
      },
      fontFamily: {
        'serif': ['Playfair Display', 'serif'],
        'sans': ['DM Sans', 'sans-serif'],
      },
      boxShadow: {
        'sm': '0 2px 8px rgba(0, 0, 0, 0.3)',
        'md': '0 4px 16px rgba(0, 0, 0, 0.4)',
        'lg': '0 25px 80px rgba(0, 0, 0, 0.6)',
        'golden': '0 0 0 3px rgba(201, 169, 110, 0.12)',
        'glow': '0 4px 20px rgba(201, 169, 110, 0.35)',
      },
    },
  },
  plugins: [],
}


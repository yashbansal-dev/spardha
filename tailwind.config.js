/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'neon-cyan': '#00f3ff',
        'neon-blue': '#0066ff',
        'neon-purple': '#bc13fe',
        'neon-pink': '#ff0055',
        'neon-pink': '#ff0055',
        'neon-orange': '#ff9900', // Kept generic orange in case used elsewhere, but adding specific request below
        'street-orange': '#FF5E00',
        'electric-blue': '#2DE2E6',
        'dark-charcoal': '#121212',
        'spardha-bg': '#020617',
        'spardha-card': 'rgba(255, 255, 255, 0.03)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(0, 243, 255, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(0, 243, 255, 0.6), 0 0 10px rgba(188, 19, 254, 0.4)' },
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [],
}

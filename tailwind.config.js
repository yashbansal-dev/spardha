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
        'neon-cyan': '#E37233',   // Mapped to Main Orange
        'neon-blue': '#B75222',   // Mapped to Dark Orange
        'neon-purple': '#F2995C', // Mapped to Light Orange
        'neon-pink': '#E37233',   // Mapped to Main Orange (unifying pinks too)
        'neon-orange': '#E37233', // Main Orange
        'street-orange': '#E37233', // Main Orange
        'electric-blue': '#F2995C', // Mapped to Light Orange
        'dark-charcoal': '#121212',
        'spardha-bg': '#020617',
        'spardha-card': 'rgba(255, 255, 255, 0.03)',
        // Semantic Names
        'spardha-orange': '#E37233',
        'spardha-orange-light': '#F2995C',
        'spardha-orange-dark': '#B75222',
      },
      fontFamily: {
        sans: ['var(--font-gang)', 'sans-serif'],
        mono: ['var(--font-gang)', 'monospace'], // Override mono to standard
        cinzel: ['var(--font-gang)', 'serif'], // Override legacy cinzel classes
        gang: ['var(--font-gang)', 'sans-serif'],
        alice: ['var(--font-alice)', 'serif'],
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-glow': {
          '0%': { boxShadow: '0 0 5px rgba(227, 114, 51, 0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(227, 114, 51, 0.6), 0 0 10px rgba(242, 153, 92, 0.4)' },
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

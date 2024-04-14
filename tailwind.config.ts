import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-blue': 'hsl(var(--primary-blue))',
        'light-blue': 'hsl(var(--light-blue))',
        'dark-charcoal': 'hsl(var(--dark-charcoal))',
        'light-gray': 'hsl(var(--light-gray))',
        'soft-white': 'hsl(var(--white))',
        'off-white': 'hsl(var(--off-white))',
        'dark-charcoal-2': 'hsl(var(--dark-charcoal-2))',
        'charcoal-gray': 'hsl(var(--charcoal-gray))',
        'off-white-transparent': 'hsl(var(--off-white-transparent))',
      },
    },
    animation: {
      progress: 'progress 2s infinite linear',
    },
    keyframes: {
      progress: {
        '0%': { transform: ' translateX(0)' },
        '100%': { transform: 'translateX(100%)' },
      },
    },
  },
  plugins: [],
}
export default config

import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
      },
      backgroundColor: {
        hero: '#5E42E2',
        card: '#F9FAFB',
        primary: '#42E25E'
      },
      colors: {
        light: '#F9FAFB',
        dark: '#333333'
      }
    },
  },
  plugins: [],
}
export default config

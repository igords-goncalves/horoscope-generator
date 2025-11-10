import type { Config } from 'tailwindcss'
const {nextui} = require("@nextui-org/react");

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
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
  darkMode: "class",
  plugins: [nextui()],
}
export default config

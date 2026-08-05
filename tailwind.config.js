/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          900: '#0d0f12',
          800: '#16191e',
          700: '#232730',
          100: '#e2e5ec',
        },
        paper: '#f7f5f0',
        vermilion: '#c83b3b', // 朱砂红
        jade: '#2a5c55',      // 碧玉青
        gold: '#c5a059',      // 描金
      },
      fontFamily: {
        serif: ['"Noto Serif SC"', '"Songti SC"', 'STSong', 'serif'],
      }
    },
  },
  plugins: [],
}
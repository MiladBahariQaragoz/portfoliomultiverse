/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        data: {
          primary: '#00ff41',
          secondary: '#008F11',
          glow: '#39FF14',
        },
        comic: {
          primary: '#FF6B35',
          secondary: '#F7931E',
          accent: '#FBD1A2',
        },
        web3: {
          primary: '#7B2CBF',
          secondary: '#C77DFF',
          gold: '#FFD60A',
        },
      },
      fontFamily: {
        'mono': ['Courier New', 'monospace'],
        'comic': ['Comic Sans MS', 'cursive'],
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

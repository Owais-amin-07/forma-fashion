/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html","./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter','Helvetica','Arial','sans-serif'],
        serif: ['Playfair Display','serif'],
      },
      colors: {
        forma: {
          black: '#0a0a0a',
          beige: '#f5f3ef',
          stone: '#e8e4dc',
          muted: '#8a8885'
        }
      }
    }
  },
  plugins: []
}

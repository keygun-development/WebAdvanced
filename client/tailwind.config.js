/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {
      colors: {
        red: {
          500: "#000000"
        },
        primary: {
          500: "#00ff00"
        }
      }
    },
  },
  plugins: [],
}


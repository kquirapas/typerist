/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "chroma-key": "#00ff00",
        "fb-white": "#fefefe",
        "fb-blue": "#0084ff",
      },
      fontFamily: {
        poppins: "Poppins",
      },
      keyframes: {
        "pulse-opacity": {
          "0%": { opacity: 0 },
          "50%": { opacity: 1 },
          "100%": { opacity: 0 },
        },
      },
      animation: {
        blink: "pulse-opacity 1s linear infinite",
      },
    },
  },
  plugins: [],
};

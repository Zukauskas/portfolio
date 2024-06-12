/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      'vt323': ["VT323", "sans-serif"],
    },
    extend: {
      backgroundImage: {
        "desktop": "url('/bg-image.jpg')",
      },
    },
  },
  plugins: [],
};

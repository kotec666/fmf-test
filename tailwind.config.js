/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "black-main": "#0E0E0E",
        "black-secondary": "#1E1E1E",
        "black-3a": "#3A3A3A",
        "black-33": "#333333",
        "blue-main": "#09B3C7",
        "blue-secondary": "#0D98A9",
        "red-error": "#FD3A3A",
        "green-main": "#0CC94C",
        "grey-96": "#969696",
        "grey-d9": "#D9D9D9",
        "grey-e7": "#E7E7E7",
        "grey-ef": "#EFEFEF",
        "grey-f1": "#F1F1F1",
        "grey-f9": "#F9F9F9",
        "grey-70": "#707070",
        "grey-dd": "#DDDDDD",
      },
      // fontSize: {
      //   t80: ["text80"]
      // }
    },
  },
  plugins: [],
}
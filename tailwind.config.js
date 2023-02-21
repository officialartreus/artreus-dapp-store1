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
        brandyellow0: "#FFC005",
        brandyellow1: "#FFCC37",
        brandyellow2: "#FFD969",
        brandyellow3: "#FFE69B",
        brandyellow5: "#FFF2CD",
        brandpurple0: "#6039cf",
        brandpurple1: "#8016d9",
        brandpurple2: "#a088e2",
        brandpurple3: "#bfb0ec",
        brandpurple4: "#dfd7f5",
        brandpink0: "#ff0660",
        brandpink1: "#ff3880",
        brandpink2: "#ff6aa0",
        brandpink3: "#ff9cbf",
        brandpink4: "#ffcddf",
        brandwhite0: "#f5f5f5",
        brandwhite1: "#f6f6f6",
        brandwhite2: "#f9f9f9",
        brandwhite3: "#fbfbfb",
        brandwhite4: "#fdfdfd",
        brandblack0: "#212121",
        brandblack1: "#4d4d4d",
        brandblack2: "#7a7a7a",
        brandblack3: "#a6a6a6",
        brandblack4: "#d3d3d3",
        brandblack4: "#d3d3d3",
      },
      fontFamily:{
        'inter': ['Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

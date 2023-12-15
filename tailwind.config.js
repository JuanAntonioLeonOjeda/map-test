export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // Adjust this line based on your file structure
  ],
  theme: {
    extend: {
      colors: {
        primary: "#50C8C4",
        secondary: "hsl(220, 98%, 74%)",
        black: "#182024",
        darkgrey: "#303E45",
        lightblue: "#EAFBFB",
        transparent: "rgba(222, 235, 236, 0.30)",
      },
    },
  },
  plugins: [],
}


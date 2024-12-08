// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", // Ensure this includes all your components
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom colors if needed, e.g., custom background color
        background: "#f5f5f5",  // Add a custom background color for body
        text: "#000000",         // Custom text color
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      // Optionally configure DaisyUI to use light theme or disable theming
      "light", // You can use "light" or "dark" as the theme name
      "cupcake", // Example: using DaisyUI's cupcake theme (optional)
    ],
  },
}

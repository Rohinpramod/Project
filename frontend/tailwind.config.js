// tailwind.config.js
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        
        background: "#f5f5f5", 
        text:"#000000",         
      },
    },
  },
  plugins: [
    require("daisyui"),
  ],
  daisyui: {
    themes: [
      "light",
    ],
  },
}

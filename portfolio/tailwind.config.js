/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./src/**/*.{js,jsx,ts,tsx}"],
    theme: {
      extend: {
        colors: {
          nurture: {
            sky: {
              light: "#d4e7f7", 
              DEFAULT: "#a4c9e7", 
              deep: "#7ba7d0",   
              dusk: "#9bafd3",   
            },
            
            grass: {
              light: "#c5e0b4", 
              DEFAULT: "#a3c585", 
              deep: "#7fa663",   
              moss: "#94a873",   
            },
            
            earth: {
              light: "#e0d2bc", 
              DEFAULT: "#c2ad8f", 
              deep: "#9c8870",   
            },
            
            glow: "#f9d4a9",    
            blossom: "#f5b6c8",  
            water: "#8ecae6",    
            
            paper: "#f5f5f5",   
            shadow: "#333333",   
          },
          "nurture-paper": "#f5f5f5",
          "nurture-shadow": "#333333",
          "nurture-sky": "#4a90e2",
        },
        fontFamily: {
            myungjo: ["Myungjo", "serif"],
            
            sans: ['"adobe-myungjo-std"', 'system-ui', 'sans-serif'],
            
            display: ['Montserrat', 'system-ui', 'sans-serif'],
            light: ['Quicksand', 'system-ui', 'sans-serif'],
            hand: ['"Caveat"', 'cursive'],
            mono: ['"JetBrains Mono"', 'monospace'],
        },
        textShadow: {
          DEFAULT: '1px 1px 3px rgba(0, 0, 0, 0.3)',
          'lg': '2px 2px 5px rgba(0, 0, 0, 0.5)',
        },
      },
    },
    plugins: [
      function ({ addUtilities }) {
        const newUtilities = {
          '.text-shadow': {
            textShadow: '1px 1px 3px rgba(0, 0, 0, 0.3)',
          },
          '.text-shadow-lg': {
            textShadow: '2px 2px 5px rgba(0, 0, 0, 0.5)',
          },
        }
        addUtilities(newUtilities)
      }
    ],
  }
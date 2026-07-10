/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Naya color palette (aapki request ke mutabiq)
        primary: "#4E0250",     // Deep Purple — main brand color
        primaryDark: "#37013A", // Purple ka darker shade (hover states ke liye)
        secondary: "#58BC82",   // Green
        accent: "#8FE388",      // Light Green
        danger: "#EA4335",      // Red (errors ke liye)
        bgsoft: "#F8FAFC",      // Background
      },
      // ---- Custom animations (poori app mein reuse hoti hain) ----
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        popIn: {
          "0%": { opacity: 0, transform: "scale(0.95)" },
          "100%": { opacity: 1, transform: "scale(1)" },
        },
        slideIn: {
          "0%": { opacity: 0, transform: "translateX(20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: 1 },
          "50%": { opacity: 0.55 },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.4s ease-out",
        popIn: "popIn 0.25s ease-out",
        slideIn: "slideIn 0.3s ease-out",
        pulseSoft: "pulseSoft 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        // Ocean Professional palette
        primary: {
          DEFAULT: "#2563EB",
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563EB",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a"
        },
        secondary: {
          DEFAULT: "#F59E0B"
        },
        success: {
          DEFAULT: "#F59E0B"
        },
        error: {
          DEFAULT: "#EF4444"
        },
        surface: "#ffffff",
        background: "#f9fafb",
        text: "#111827"
      },
      fontFamily: {
        // system UI stack
        sans: [
          "-apple-system","BlinkMacSystemFont","Segoe UI","Roboto","Oxygen",
          "Ubuntu","Cantarell","Fira Sans","Droid Sans","Helvetica Neue","sans-serif"
        ]
      },
      boxShadow: {
        soft: "0 1px 2px rgba(0,0,0,0.04), 0 1px 3px rgba(0,0,0,0.06)"
      },
      backgroundImage: {
        "ocean-gradient": "linear-gradient(to bottom right, rgba(59,130,246,0.10), rgba(249,250,251,1))"
      },
      borderRadius: {
        xl: "12px"
      }
    },
    container: {
      center: true,
      padding: "1rem"
    }
  },
  plugins: []
};

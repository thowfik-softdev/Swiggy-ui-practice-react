/**
 * The design tokens that used to live in src/styles/tokens.css, moved into
 * Tailwind's theme.
 *
 * This is the step that matters. Without it you end up writing
 * text-[#ff5200] everywhere and the design system is gone - you have swapped
 * one set of magic values for another. Registered here, `bg-brand` and
 * `text-ink-500` mean exactly what `var(--brand)` and `var(--ink-500)` meant.
 */
module.exports = {
  // Files Tailwind scans for class names. Anything not found here is purged
  // from the final CSS, which is why the shipped stylesheet stays small.
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#ff5200",
          dark: "#e04600",
          // for tinted backgrounds - was rgba(255, 82, 0, 0.07)
          soft: "rgba(255, 82, 0, 0.07)",
          softer: "rgba(255, 82, 0, 0.13)",
        },
        ink: {
          900: "#0f1115",
          700: "#3d4152",
          500: "#686b78",
          300: "#93959f",
        },
        surface: "#ffffff",
        page: "#fbfbfc",
        line: {
          DEFAULT: "#eceded",
          soft: "#f2f3f4",
        },
        rating: {
          good: "#1f7a3f",
          average: "#db7c07",
          poor: "#d13b3b",
        },
      },

      borderRadius: {
        sm: "8px",
        md: "14px",
        lg: "20px",
      },

      boxShadow: {
        xs: "0 1px 2px rgba(15, 17, 21, 0.05)",
        sm: "0 2px 8px rgba(15, 17, 21, 0.06)",
        md: "0 8px 24px rgba(15, 17, 21, 0.1)",
        lg: "0 16px 40px rgba(15, 17, 21, 0.14)",
      },

      // the app shell width, was --shell
      maxWidth: {
        shell: "1200px",
      },

      transitionTimingFunction: {
        // was --ease
        smooth: "cubic-bezier(0.22, 0.61, 0.36, 1)",
      },

      fontFamily: {
        sans: [
          "Inter",
          "-apple-system",
          "Segoe UI",
          "Roboto",
          "Helvetica",
          "Arial",
          "sans-serif",
        ],
      },

      keyframes: {
        shimmer: {
          to: { backgroundPosition: "-50% 0" },
        },
      },

      animation: {
        shimmer: "shimmer 1.4s linear infinite",
      },
    },
  },

  plugins: [],
};

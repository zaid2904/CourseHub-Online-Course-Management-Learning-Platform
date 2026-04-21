const colors = require("tailwindcss/colors")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      inter: ["Manrope", "Inter", "sans-serif"],
      display: ["Space Grotesk", "Manrope", "sans-serif"],
      "edu-sa": ["Edu SA Beginner", "cursive"],
      mono: ["Roboto Mono", "monospace"],
    },
    colors: {
      white: "#fff",
      black: "#000",
      transparent: "transparent",
      slate: colors.slate,
      cyan: colors.cyan,
      emerald: colors.emerald,
      violet: colors.violet,
      indigo: colors.indigo,
      // Core UI Colors (Mapped to modern SaaS palette)
      richblack: {
        5: "#F8FAFC",   // slate-50
        25: "#F1F5F9",  // slate-100
        50: "#E2E8F0",  // slate-200
        100: "#CBD5E1", // slate-300
        200: "#94A3B8", // slate-400
        300: "#64748B", // slate-500
        400: "#475569", // slate-600
        500: "#334155", // slate-700
        600: "#1E293B", // slate-800
        700: "#0F172A", // slate-900
        800: "#020617", // slate-950
        900: "#000000", // black
      },
      "pure-greys": {
        5: "#F8FAFC",
        25: "#F1F5F9",
        50: "#E2E8F0",
        100: "#CBD5E1",
        200: "#94A3B8",
        300: "#64748B",
        400: "#475569",
        500: "#334155",
        600: "#1E293B",
        700: "#0F172A",
        800: "#020617",
        900: "#000000",
      },
      blue: {
        5: "#EFF6FF",   // blue-50
        25: "#DBEAFE",  // blue-100
        50: "#BFDBFE",  // blue-200
        100: "#93C5FD", // blue-300
        200: "#60A5FA", // blue-400
        300: "#3B82F6", // blue-500
        400: "#2563EB", // blue-600
        500: "#1D4ED8", // blue-700
        600: "#1E40AF", // blue-800
        700: "#1E3A8A", // blue-900
        800: "#172554", // blue-950
        900: "#000000",
      },
      richblue: {
        5: "#ECFEFF",   // cyan-50
        25: "#CFFAFE",  // cyan-100
        50: "#A5F3FC",  // cyan-200
        100: "#67E8F9", // cyan-300
        200: "#22D3EE", // cyan-400
        300: "#06B6D4", // cyan-500
        400: "#0891B2", // cyan-600
        500: "#0E7490", // cyan-700
        600: "#155E75", // cyan-800
        700: "#164E63", // cyan-900
        800: "#083344", // cyan-950
        900: "#000000",
      },
      caribbeangreen: {
        5: "#ECFDF5",   // emerald-50
        25: "#D1FAE5",  // emerald-100
        50: "#A7F3D0",  // emerald-200
        100: "#6EE7B7", // emerald-300
        200: "#34D399", // emerald-400
        300: "#10B981", // emerald-500
        400: "#059669", // emerald-600
        500: "#047857", // emerald-700
        600: "#065F46", // emerald-800
        700: "#064E3B", // emerald-900
        800: "#022C22", // emerald-950
        900: "#000000",
      },
      yellow: {
        5: "#FEFCE8",   // yellow-50
        25: "#FEF08A",  // yellow-200
        50: "#FDE047",  // yellow-300
        100: "#FACC15", // yellow-400
        200: "#EAB308", // yellow-500
        300: "#CA8A04", // yellow-600
        400: "#A16207", // yellow-700
        500: "#854D0E", // yellow-800
        600: "#713F12", // yellow-900
        700: "#422006", // yellow-950
        800: "#241001",
        900: "#000000",
      },
      pink: {
        5: "#FDF2F8",   // pink-50
        25: "#FCE7F3",  // pink-100
        50: "#FBCFE8",  // pink-200
        100: "#F9A8D4", // pink-300
        200: "#F472B6", // pink-400
        300: "#EC4899", // pink-500
        400: "#DB2777", // pink-600
        500: "#BE185D", // pink-700
        600: "#9D174D", // pink-800
        700: "#831843", // pink-900
        800: "#500724", // pink-950
        900: "#000000",
      },
      brown: {
        5: "#FFEDD5",   // orange-50
        25: "#FED7AA",  // orange-200
        50: "#FDBA74",  // orange-300
        100: "#FB923C", // orange-400
        200: "#F97316", // orange-500
        300: "#EA580C", // orange-600
        400: "#C2410C", // orange-700
        500: "#9A3412", // orange-800
        600: "#7C2D12", // orange-900
        700: "#431407", // orange-950
        800: "#230801",
        900: "#000000",
      },
    },
    extend: {
      maxWidth: {
        maxContent: "1260px",
        maxContentTab: "650px",
      },
      boxShadow: {
        soft: "0 20px 60px rgba(2, 6, 23, 0.05)",
        card: "0 18px 45px rgba(15, 23, 42, 0.08)",
        glow: "0 0 0 1px rgba(255,255,255,0.08), 0 24px 50px rgba(14, 165, 233, 0.15)",
      },
      backgroundImage: {
        "hero-grid":
          "linear-gradient(rgba(148, 163, 184, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(148, 163, 184, 0.08) 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
}

import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0B1F3A",
          light: "#142D55",
        },
        card: "#101C2E",
        // Extended glass palette
        glass: {
          blue: "rgba(59, 130, 246, 0.08)",
          emerald: "rgba(16, 185, 129, 0.08)",
          purple: "rgba(139, 92, 246, 0.08)",
          white: "rgba(255, 255, 255, 0.05)",
        },
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.3)",
        glow: "0 0 40px rgba(59, 130, 246, 0.15), 0 0 80px rgba(59, 130, 246, 0.05)",
        "glow-emerald": "0 0 40px rgba(16, 185, 129, 0.15), 0 0 80px rgba(16,185,129,0.05)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "count-up": {
          "0%": { transform: "translateY(100%)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-slow": "pulse-slow 3s ease-in-out infinite",
      },
      backdropBlur: {
        xs: "2px",
      },
      backgroundImage: {
        "radial-blue": "radial-gradient(circle at 30% 20%, rgba(59,130,246,0.12) 0%, transparent 60%)",
        "radial-emerald": "radial-gradient(circle at 70% 80%, rgba(16,185,129,0.12) 0%, transparent 60%)",
        "radial-purple": "radial-gradient(circle at 50% 50%, rgba(139,92,246,0.10) 0%, transparent 60%)",
        "radial-white": "radial-gradient(circle at 20% 60%, rgba(255,255,255,0.04) 0%, transparent 50%)",
        "gradient-mesh": `
          radial-gradient(at 40% 20%, rgba(59,130,246,0.15) 0%, transparent 50%),
          radial-gradient(at 80% 0%, rgba(139,92,246,0.1) 0%, transparent 50%),
          radial-gradient(at 0% 50%, rgba(16,185,129,0.08) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".glass-card": {
          background: "rgba(255, 255, 255, 0.03)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(255, 255, 255, 0.08)",
          borderRadius: "1.25rem",
        },
        ".glass-card-blue": {
          background: "rgba(59, 130, 246, 0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(59, 130, 246, 0.15)",
          borderRadius: "1.25rem",
        },
        ".glass-card-emerald": {
          background: "rgba(16, 185, 129, 0.06)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(16, 185, 129, 0.15)",
          borderRadius: "1.25rem",
        },
        ".text-shimmer": {
          background: "linear-gradient(90deg, #60a5fa 0%, #a78bfa 30%, #34d399 60%, #60a5fa 100%)",
          backgroundSize: "200% auto",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          animation: "shimmer 3s linear infinite",
        },
      });
    }),
  ],
};

export default config;

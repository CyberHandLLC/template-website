import { Inter, Orbitron } from "next/font/google";

export const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  fallback: ["system-ui", "Segoe UI", "Helvetica Neue", "Arial", "sans-serif"],
  adjustFontFallback: true,
});

export const orbitron = Orbitron({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-orbitron",
  weight: ["400", "500", "600", "700"],
  fallback: ["Arial", "Helvetica Neue", "sans-serif"],
  adjustFontFallback: true,
});

export const fontClasses = {
  body: inter.className,
  heading: orbitron.className,
  ui: inter.className,
};

export const fontVariables = {
  inter: inter.variable,
  orbitron: orbitron.variable,
};

export type FontClassName = keyof typeof fontClasses;

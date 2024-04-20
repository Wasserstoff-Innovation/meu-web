/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";
import { transform } from "typescript";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scanning: {
          '0%':{transform:'translate(0px,0px)'},
          '100%': { transform: 'translate(0px, 215px)' },
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui({})],
};

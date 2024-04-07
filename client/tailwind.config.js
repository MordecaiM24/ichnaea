/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./src/pages/profile/auth/*.jsx",
    "./src/pages/profile/onboarding/*.jsx",
    "./src/pages/profile/User.jsx",
    "./src/pages/universities/*.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#910016",
        secondary: "#175e54",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
};

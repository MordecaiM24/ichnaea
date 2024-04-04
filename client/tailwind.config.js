/** @type {import('tailwindcss').Config} */
export default {
  important: true,
  content: [
    "./src/pages/profile/auth/*.jsx",
    "./src/pages/profile/onboarding/*.jsx",
    "./src/pages/profile/User2.jsx",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#910016",
      },
    },
  },
  prefix: "tw-",
  plugins: [],
};

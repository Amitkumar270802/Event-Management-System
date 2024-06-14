/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        login: "url('../public/Assets/login.png')",
        register: "url('../public/Assets/registration.png')",
        contact: "url('../public/Assets/contact.png')",
      },
      colors: {
        login: "rgba(109,128,1,0.495)",
      },
    },
  },
  plugins: [],
};

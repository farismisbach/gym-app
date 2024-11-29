/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        'poppins-regular': 'Poppins-Regular',
        'poppins-bold': 'Poppins-Bold',
        'poppins-semibold': 'Poppins-SemiBold',
        'poppins-medium': 'Poppins-Medium',
      }
    },
  },
  plugins: [],
}

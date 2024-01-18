/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Poppins']
      },
      colors: {
        'synapsis-primary': '#0E5A81',
        'synapsis-secondary': '#42A3E1',
        'synapsis-secondary-2': '#E9E7FD',
        'synapsis-secondary-3': '#074B6E',
        'synapsis-red-primary': '#D12953',
        'synapsis-red-secondary': '#FAF0F2',
        'synapsis-border-primary': '#C2E5FF',
        'synapsis-border-secondary': '#AEDCFF'
      }
    }
  },
  plugins: []
}

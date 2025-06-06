// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
   content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  theme: {
    screens: {
      sm: '640px',   // ≥ 640px จะถือเป็นขนาด “sm” ขึ้นไป
      md: '768px',   // ≥ 768px จะถือเป็นขนาด “md” ขึ้นไป
      lg: '1024px',  // ≥ 1024px จะถือเป็นขนาด “lg” ขึ้นไป
      xl: '1280px',  // ≥ 1280px จะถือเป็นขนาด “xl” ขึ้นไป
      '2xl': '1536px'// ≥ 1536px จะถือเป็นขนาด “2xl” ขึ้นไป
    },
    extend: {
      colors: {
        // *** ใส่เฉดสีเทาเหลืองของ NT ที่เจอโดยตรงจาก Inspect ***
       'nt-blue': 'oklch(0.8 0.14 62.6)',     
        'nt-gray-yellow': '#D9C682'
      }
    }
  },
    plugins: [
   require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp')
  ]
}

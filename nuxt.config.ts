// nuxt.config.ts
export default defineNuxtConfig({
  
   css: [
     // 1) Swiper CSS (หรือ CSS อื่นที่อาจ override ปุ่ม)
    'swiper/css',
    'swiper/css/navigation',
    'swiper/css/pagination',
   
    
  ],
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n' // เพิ่มโมดูล i18n
  ],

    build: {
    postcss: {
      postcssOptions: {
        plugins: {
          // ถ้าคุณใช้ TailwindCSS:
          tailwindcss: {},
          // ถ้าต้องการ Autoprefixer
          autoprefixer: {},
          // ถ้ามีปลั๊กอินอื่น ก็ใส่ที่นี่ เช่น postcss-import ฯลฯ
          // 'postcss-import': {}
        }
      }
    }
  },
 
  // ... การตั้งค่าอื่นๆ
})
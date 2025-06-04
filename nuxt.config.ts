// nuxt.config.ts
export default defineNuxtConfig({
  modules: [
    '@nuxt/ui', // ตรวจสอบให้แน่ใจว่ามีอยู่
    '@nuxtjs/i18n' // เพิ่มโมดูล i18n
  ],
  css: [
    '~/assets/css/main.css', // <-- เพิ่มบรรทัดนี้ (เปลี่ยนชื่อไฟล์ตามจริง)
  ],
  i18n: {
    // คุณจะต้องกำหนด locales และ defaultLocale
    locales: [
      {
        code: 'en',
        iso: 'en-US',
        name: 'English'
      },
      {
        code: 'th',
        iso: 'th-TH',
        name: 'Thai'
      }
      // เพิ่ม locales อื่นๆ ตามต้องการ
    ],
    defaultLocale: 'en', // ตั้งค่า default locale ของคุณ
    vueI18n: './i18n.config.ts', // เส้นทางไปยังไฟล์กำหนดค่า i18n ของคุณ
  },
  // ... การตั้งค่าอื่นๆ
})
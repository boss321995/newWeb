// i18n.config.ts
export default defineI18nConfig(() => ({
  legacy: false,
  locale: 'en', // default locale
  messages: {
    en: {
      welcome: 'Welcome',
      // ... การแปลภาษาอังกฤษของคุณ
    },
    th: {
      welcome: 'ยินดีต้อนรับ',
      // ... การแปลภาษาไทยของคุณ
    }
  }
}))
<!-- app.vue -->
<template>
  <!-- ครอบด้วย UIProvider เพื่อให้คอมโพเนนต์ของ Nuxt UI ทำงานได้ -->
  <UIProvider>
    <!-- ตั้งค่า Head รวมถึง viewport ให้ Responsive ทำงานได้ถูกต้อง -->
    <Head>
      <title>NT Academy</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <!-- เรียกเลย์เอาต์และเพจตามปกติ -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    
  </UIProvider>
</template>

<script setup lang="ts">
// ไม่ต้อง import UButton หรือ UInput เอง เพราะ @nuxt/ui จะ register ให้โดยอัตโนมัติ
// แต่ถ้าต้องการใช้งานคอมโพเนนต์แบบ non-global ก็สามารถ import ได้ เช่น:
// import { UButton, UInput, UIProvider, Head } from 'nuxt-ui'
</script>

<style>
/* ตัวอย่าง Global Style เพิ่มเติม (ถ้าจำเป็น) */
body {
  font-family: sans-serif;
}
</style>

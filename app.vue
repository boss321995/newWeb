// app.vue
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- ทดลองเพิ่มคอมโพเนนต์ Nuxt UI เพื่อทดสอบสไตล์ -->
    <div class="p-4 m-4 border border-dashed">
      <h2 class="text-xl mb-2">ทดสอบ Nuxt UI Component:</h2>
      <UButton label="ปุ่มทดสอบ (Button)" color="primary" variant="solid" />
      <UInput placeholder="ช่องกรอกข้อมูล (Input)" class="mt-2" />
    </div>
  </div>
</template>

<script setup lang="ts">
// สามารถเพิ่ม script ที่จำเป็นได้ที่นี่
</script>

<style>
/* คุณสามารถเพิ่ม global style ที่นี่ได้หากต้องการ
   แต่แนะนำให้ใช้ผ่าน assets/css/main.css และกำหนดใน nuxt.config.ts */
body {
  font-family: sans-serif; /* ตัวอย่าง global style */
}
</style>

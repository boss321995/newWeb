<!-- layouts/default.vue -->
<template>
  <div class="min-h-screen flex flex-col">
    <!-- เรียก Navbar ขึ้นมาใช้ในทุกหน้า -->
    <Navbar />

    <!-- พื้นที่สำหรับเนื้อหาแต่ละเพจ -->
    <main class="flex-1">
      <NuxtPage />
    </main>

    <!-- Footer -->
    <footer class="bg-gray-100 py-4">
      <div class="container mx-auto text-center text-gray-600 text-sm">
        NT HRD TEAM 😎
      </div>
    </footer>
  </div>
</template>

<script setup>
import Navbar from '@/components/Navbar.vue'
</script>

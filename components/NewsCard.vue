<template>
  <div
    class="bg-white shadow-md rounded-lg p-4 h-full flex flex-col"
  >
    <img
      :src="news.img"
      alt="News Image"
      class="rounded-lg h-32 w-full object-cover"
    />
    <div class="font-bold mt-2">{{ news.title }}</div>
    <div class="text-sm text-gray-600 mb-4">{{ news.desc }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  news: {
    type: Object,
    required: true
  }
})
</script>

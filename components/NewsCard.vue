<template>
  <UCard class="h-full flex flex-col">
    <img :src="news.img" class="rounded-lg h-32 object-cover" />
    <div class="font-bold mt-2">{{ news.title }}</div>
    <div class="text-sm text-gray-600 mb-4">{{ news.desc }}</div>
  </UCard>
</template>
<script setup>
defineProps(['news'])
</script>

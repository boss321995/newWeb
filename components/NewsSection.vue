<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
    <NewsCard v-for="n in newsList" :key="n.id" :news="n" />
  </div>
</template>
<script setup>
import NewsCard from './NewsCard.vue'
defineProps(['newsList'])
</script>

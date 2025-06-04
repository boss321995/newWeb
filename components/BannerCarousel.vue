<template>
  <UCarousel :items="banners" class="h-52 md:h-64 mb-8">
    <template #default="{ item }">
      <img :src="item.img" class="object-cover w-full h-full rounded-xl" />
    </template>
  </UCarousel>
</template>
<script setup>
defineProps(['banners'])
</script>

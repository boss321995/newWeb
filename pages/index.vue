<template>
  <UContainer class="py-10">

    <!-- Banner Carousel Section -->
    <UCard class="mb-10 overflow-hidden p-0">
   <UCarousel
  v-slot="{ item }"
  :items="banners"
  :slidesPerView="1"
  :gap="0"
  :arrows="true"
  :indicators="true"
  :autoplay="true"
  :interval="4000"
  :breakpoints="{ 0: { slidesPerView: 1 } }"
  loop
  class="h-52 md:h-80"
>
  <div class="relative w-full h-full">
    <img :src="item.url" class="w-full h-full object-cover" />
  </div>
</UCarousel>

    </UCard>

    <!-- ข่าว Section -->
   <section>
  <h2 class="text-xl font-semibold mb-6">ข่าวประชาสัมพันธ์ล่าสุด</h2>
  <div class="grid md:grid-cols-3 gap-6">
    <UCard v-for="news in newsList" :key="news.id">
      <template #header>
        <img :src="news.img" class="h-40 w-full object-cover rounded-lg" />
      </template>
      <h3 class="font-bold">{{ news.title }}</h3>
      <p class="text-sm text-gray-600 mb-2">{{ news.desc }}</p>
    </UCard>
  </div>
</section>

    <UButton class="mt-10" @click="goAdmin">ไปยังหน้า Admin</UButton>
  </UContainer>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue'

const banners = ref([])
const newsList = ref([])

const fetchBanners = async () => {
  const res = await fetch('http://localhost:4000/api/banners')
  banners.value = await res.json()
}
onMounted(fetchBanners)

const fetchNews = async () => {
  const res = await fetch('http://localhost:4000/api/news')
  newsList.value = await res.json()
}
onMounted(fetchNews)

watchEffect(() => {
  console.log('banners.value:', banners.value)
})

const goAdmin = () => {
  window.location.href = '/admin'
}
</script>

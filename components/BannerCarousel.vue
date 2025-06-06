<template>
  <!-- Swiper แทน UCarousel -->
  <swiper
    :slides-per-view="1"
    :loop="true"
    :autoplay="{ delay: 4000 }"
    navigation
    pagination
    class="h-52 md:h-64 mb-8"
  >
    <!-- วนทุกตัวใน banners มาเป็น slide -->
    <swiper-slide v-for="(item, idx) in banners" :key="idx">
      <img
        :src="item.img"
        class="object-cover w-full h-full rounded-xl"
        alt="banner image"
      />
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const props = defineProps({
  banners: {
    type: Array,
    default: () => []
  }
})
</script>

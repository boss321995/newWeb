<template>
  <div>
    <!-- (1) ถ้าต้องการให้ Navbar แสดงบนหน้านี้ -->
    

    <!-- ห่อเนื้อหาทั้งหมดด้วย padding ซ้าย–ขวา 10% -->
    <div class="px-[10%] pt-6">
      <!-- Banner Carousel Section -->
      <div class="mb-10 overflow-hidden p-0">
        <swiper
          :modules="[Navigation, Pagination, Autoplay]"
          :slides-per-view="1"
          :loop="true"
          :autoplay="{ delay: 6000, disableOnInteraction: false }"
          navigation
          pagination
          class="h-52 md:h-80"
        >
          <swiper-slide v-for="(banner, idx) in banners" :key="idx">
            <div class="relative h-full w-full">
              <img
                :src="banner.url"
                class="w-full h-full object-cover"
                alt="Banner Image"
              />
              <div class="absolute top-8 left-8 z-10">
                <h1
                  v-if="banner.title"
                  class="text-2xl md:text-4xl font-bold text-white drop-shadow-lg"
                >
                  {{ banner.title }}
                </h1>
                <p v-if="banner.desc" class="text-lg text-white drop-shadow-md">
                  {{ banner.desc }}
                </p>
              </div>
              <div class="absolute inset-0 bg-black/30"></div>
            </div>
          </swiper-slide>
        </swiper>
      </div>

      <!-- ข่าวประชาสัมพันธ์ล่าสุด -->
      <section class="mb-10">
        <h2 class="text-2xl font-semibold mb-6 text-center">
          ข่าวประชาสัมพันธ์ล่าสุด
        </h2>
        <div class="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="news in newsList"
            :key="news.id"
            class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col"
          >
            <!-- (2) รูปข่าว ครอป 1:1 -->
            <div class="aspect-w-1 aspect-h-1 w-full overflow-hidden">
              <img
                :src="news.img"
                alt="News Cover"
                class="w-full h-full object-cover"
              />
            </div>

            <div class="p-4 flex-1 flex flex-col">
              <h3 class="font-bold text-lg mb-2 line-clamp-2">
                {{ news.title }}
              </h3>
              <p class="text-gray-600 text-sm flex-1 line-clamp-3">
                {{ news.desc }}
              </p>
            </div>
          </div>

          <div
            v-if="newsList.length === 0"
            class="col-span-full text-center text-gray-500 py-10"
          >
            ยังไม่มีข่าว
          </div>
        </div>
      </section>

      <!-- Services (Public Section) -->
      <section class="py-16 bg-gray-50">
        <div class="max-w-6xl mx-auto px-4">
          <h2 class="text-3xl font-semibold text-nt-gray-yellow mb-8 text-center">
            บริการของสถาบัน
          </h2>
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <a
              v-for="serv in servicesList"
              :key="serv.id"
              :href="serv.link"
              target="_blank"
              rel="noopener noreferrer"
              class="block bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
            >
              <div class="h-40 bg-gray-100 flex items-center justify-center w-full">
                <img
                  :src="serv.img"
                  :alt="serv.title"
                  class="h-24 w-24 object-contain"
                />
              </div>
              <div class="px-4 py-6 text-center flex-1 flex items-center justify-center">
                <h3 class="text-lg font-medium text-nt-gray-yellow">
                  {{ serv.title }}
                </h3>
              </div>
            </a>
          </div>

          <div v-if="servicesList.length === 0" class="text-center text-gray-500 mt-8">
            ยังไม่มีบริการในขณะนี้
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Swiper, SwiperSlide } from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import Navbar from '@/components/Navbar.vue'
import 'swiper/css/autoplay'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
const API_URL = 'http://localhost:4000'

// State
const banners = ref([])
const newsList = ref([])
const servicesList = ref([])

// ฟังก์ชันดึงข้อมูลทั้ง 3 ชุด
onMounted(async () => {
  // 1) ดึง banners
  try {
    const resB = await fetch(`${API_URL}/api/banners`)
    banners.value = await resB.json()
  } catch (e) {
    console.error('Cannot fetch banners:', e)
    banners.value = []
  }

  // 2) ดึง news
  try {
    const resN = await fetch(`${API_URL}/api/news`)
    newsList.value = await resN.json()
  } catch (e) {
    console.error('Cannot fetch news:', e)
    newsList.value = []
  }

  // 3) ดึง services
  try {
    const resS = await fetch(`${API_URL}/api/services`)
    servicesList.value = await resS.json()
  } catch (e) {
    console.error('Cannot fetch services:', e)
    servicesList.value = []
  }
})
</script>

<style>
/* ไม่ต้องเขียน CSS เพิ่มเติม ถ้า Tailwind + Swiper ทำงานเรียบร้อยแล้ว */
</style>

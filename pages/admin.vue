<template>
  <div>
  

    <!-- Container หลัก -->
    <div class="container mx-auto px-4 py-6">
      <!-- หัวข้อหน้า Admin -->
      <h1 class="font-bold text-2xl mb-6">Admin จัดการข่าวประชาสัมพันธ์</h1>

      <!-- ========== ส่วนที่ 1: จัดการ Banner ========== -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">จัดการ Banner</h2>

        <!-- 1.1 ฟอร์มอัปโหลดรูป Banner -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">
            1. อัปโหลดรูป Banner (ตรวจสัดส่วน 3:1)
          </div>
          <div class="p-4">
            <form
              @submit.prevent="submitBanner"
              class="flex flex-col md:flex-row items-start md:items-center gap-4"
            >
              <input
                ref="bannerInputRef"
                type="file"
                accept="image/*"
                @change="onBannerChange"
                required
                class="
                  w-full md:w-auto
                  border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2
                  focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <button
   type="submit"
   :disabled="loadingCreateNews"
   class="bg-blue-600 hover:bg-blue-700 text-white font-medium
    px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
    disabled:opacity-50 disabled:cursor-not-allowed"
 >
   {{ loadingBanner ? 'กำลังอัปโหลด...' : 'อัปโหลด Banner' }}
 </button>
            </form>
            <div v-if="bannerPreview" class="mt-4">
              <img
                :src="bannerPreview"
                alt="Preview Banner"
                class="max-h-32 rounded-lg shadow"
              />
            </div>
          </div>
        </div>

        <!-- 1.2 ฟอร์มเพิ่ม Banner ใหม่ (เมื่อ upload ได้ URL แล้ว) -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">
            2. เพิ่ม Banner ใหม่
          </div>
          <div class="p-4">
            <form @submit.prevent="createBannerItem" class="flex flex-col space-y-4">
              <input
                v-model="newBanner.url"
                type="text"
                placeholder="URL ที่ได้จากการอัปโหลดรูป Banner"
                required
                class="
                  w-full border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <input
                v-model="newBanner.title"
                type="text"
                placeholder="(ไม่บังคับ) ชื่อ Banner"
                class="
                  w-full border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <button
                type="submit"
                :disabled="loadingCreateBanner"
                class="
                  bg-green-600 hover:bg-green-700 text-white font-medium
                  px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {{ loadingCreateBanner ? 'กำลังบันทึก...' : 'บันทึก Banner' }}
              </button>
            </form>
          </div>
        </div>

        <!-- 1.3 ตารางแสดง Banner ทั้งหมด -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">Banner ทั้งหมด</div>
          <div v-if="bannerList.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left">รูป</th>
                  <th class="px-4 py-2 text-left">ชื่อ (ถ้ามี)</th>
                  <th class="px-4 py-2 text-center">จัดการ</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(b, idx) in bannerList" :key="b.id">
                  <td class="px-4 py-2">
                    <img
                      :src="b.url"
                      alt="Banner"
                      class="w-32 h-12 object-cover rounded shadow"
                    />
                  </td>
                  <td class="px-4 py-2">{{ b.title || '-' }}</td>
                  <td class="px-4 py-2 text-center">
                    <button
                      @click="deleteBannerItem(b.id)"
                      class="
                        bg-red-500 hover:bg-red-600 text-white
                        px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition-all
                      "
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-gray-500 text-center py-6">ยังไม่มี Banner</div>
        </div>
      </section>

      <!-- ========== ส่วนที่ 2: จัดการ News ========== -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">จัดการข่าวประชาสัมพันธ์</h2>

        <!-- 2.1 ฟอร์มอัปโหลดรูปข่าว (ตรวจสัดส่วน 1:1) -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">
            1. อัปโหลดรูปข่าว (ตรวจสัดส่วน 1:1)
          </div>
          <div class="p-4">
            <form @submit.prevent="uploadNewsImage" class="flex items-center gap-4">
              <input
                type="file"
                accept="image/*"
                @change="onFileChange"
                required
                class="
                  border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <button
                type="submit"
                :disabled="loadingNewsImage"
                class="
                  bg-blue-600 hover:bg-blue-700 text-white
                  px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {{ loadingNewsImage ? 'กำลังอัปโหลด...' : 'อัปโหลดรูป' }}
              </button>
            </form>
            <div v-if="imgPreview" class="mt-3">
              <img
                :src="imgPreview"
                alt="Preview News"
                class="w-40 h-40 object-cover rounded shadow"
              />
            </div>
          </div>
        </div>

        <!-- 2.2 ฟอร์มเพิ่มข่าวใหม่ -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">2. เพิ่มข่าวใหม่</div>
          <div class="p-4">
            <form @submit.prevent="submitNews" class="flex flex-col space-y-4">
              <input
                v-model="newsTitle"
                type="text"
                placeholder="หัวข้อข่าว"
                required
                class="
                  w-full border border-gray-300 rounded-lg bg-gray-50
                  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <input
                v-model="newsDesc"
                type="text"
                placeholder="รายละเอียดข่าว"
                required
                class="
                  w-full border border-gray-300 rounded-lg bg-gray-50
                  px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <button
                type="submit"
                :disabled="loadingCreateNews"
                class="
                  w-1/5 bg-yellow-500 hover:bg-yellow-600 text-white font-medium
                  px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {{ loadingCreateNews ? 'กำลังบันทึก...' : 'เพิ่มข่าว' }}
              </button>
            </form>
          </div>
        </div>

        <!-- 2.3 ตารางแสดงข่าวทั้งหมด (ปรับให้รูปเป็น 1:1 ขนาด 3rem x 3rem) -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">ข่าวทั้งหมด</div>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">รูป</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">หัวข้อข่าว</th>
                  <th class="px-4 py-2 text-left text-sm font-medium text-gray-700">รายละเอียด</th>
                  <th class="px-4 py-2 text-center text-sm font-medium text-gray-700">ลบ</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="n in newsList" :key="n.id">
                  <td class="px-4 py-2">
                    <div class="w-12 h-12 overflow-hidden rounded-lg shadow">
                      <img
                        :src="n.img"
                        alt="News Image"
                        class="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-800">{{ n.title }}</td>
                  <td class="px-4 py-2 text-sm text-gray-600">{{ n.desc }}</td>
                  <td class="px-4 py-2 text-center">
                    <button
                      @click="removeNews(n.id)"
                      class="
                        bg-red-500 hover:bg-red-600 text-white text-xs font-medium
                        px-3 py-1 rounded-lg shadow-sm hover:shadow-md transition-all
                      "
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
                <tr v-if="newsList.length === 0">
                  <td colspan="4" class="px-4 py-6 text-center text-gray-500">ยังไม่มีข่าว</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <!-- ========== ส่วนที่ 3: จัดการ Services ========== -->
      <section class="mb-12">
        <h2 class="text-2xl font-semibold mb-4">จัดการ Services</h2>

        <!-- 3.1 ฟอร์มอัปโหลดรูป + กรอกข้อมูลบริการใหม่ -->
        <div class="bg-white shadow rounded-lg mb-6">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">
            1. เพิ่ม/แก้ไข Service
          </div>
          <div class="p-4">
            <form
              @submit.prevent="submitService"
              class="flex flex-col md:flex-row items-start md:items-center gap-4"
            >
              <!-- รูปบริการ -->
              <input
                ref="serviceImageInput"
                type="file"
                accept="image/*"
                @change="onServiceImageChange"
                :required="editingServiceId === null"
                class="
                  border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <!-- ชื่อบริการ -->
              <input
                v-model="serviceTitle"
                type="text"
                placeholder="ชื่อบริการ"
                required
                class="
                  border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <!-- ลิงก์ภายนอก -->
              <input
                v-model="serviceLink"
                type="url"
                placeholder="ลิงก์ภายนอก (https://...)"
                required
                class="
                  border border-gray-300 rounded-lg bg-gray-50
                  px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-500
                  shadow-sm hover:shadow-md transition-shadow
                "
              />
              <!-- ปุ่มบันทึก -->
              <button
                type="submit"
                :disabled="loadingService"
                class="
                  bg-blue-600 hover:bg-blue-700 text-white font-medium
                  px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
                  disabled:opacity-50 disabled:cursor-not-allowed
                "
              >
                {{ editingServiceId === null
                  ? (loadingService ? 'กำลังบันทึก...' : 'เพิ่มใหม่')
                  : (loadingService ? 'กำลังอัปเดต...' : 'บันทึกการแก้ไข')
                }}
              </button>
              <!-- ปุ่มยกเลิกการแก้ไข กรณีอยู่ในโหมด edit -->
              <button
                v-if="editingServiceId !== null"
                @click.prevent="resetServiceForm"
                class="
                  bg-gray-400 hover:bg-gray-500 text-white font-medium
                  px-4 py-2 rounded-lg shadow-md hover:shadow-lg transition-all
                "
              >
                ยกเลิก
              </button>
            </form>

            <!-- 3.2 แสดงตัวอย่างรูปที่เลือกก่อนอัปโหลด -->
            <div v-if="serviceImgPreview" class="mt-4">
              <img
                :src="serviceImgPreview"
                alt="Preview Service"
                class="max-h-32 rounded-lg shadow"
              />
            </div>
          </div>
        </div>

        <!-- 3.3 ตารางแสดง Services ทั้งหมด -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-4 py-2 border-b bg-gray-50 font-semibold">Services ทั้งหมด</div>
          <div v-if="servicesList.length > 0" class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-100">
                <tr>
                  <th class="px-4 py-2 text-left">รูปบริการ</th>
                  <th class="px-4 py-2 text-left">ชื่อบริการ</th>
                  <th class="px-4 py-2 text-left">ลิงก์</th>
                  <th class="px-4 py-2 text-center">แก้ไข</th>
                  <th class="px-4 py-2 text-center">ลบ</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="serv in servicesList" :key="serv.id">
                  <td class="px-4 py-2">
                    <img
                      :src="serv.img"
                      alt="Service Image"
                      class="w-20 h-20 object-cover rounded shadow"
                    />
                  </td>
                  <td class="px-4 py-2 text-sm text-gray-800">{{ serv.title }}</td>
                  <td class="px-4 py-2 text-sm text-blue-600 break-all">
                    <a :href="serv.link" target="_blank" rel="noopener noreferrer">
                      {{ serv.link }}
                    </a>
                  </td>
                  <td class="px-4 py-2 text-center">
                    <button
                      @click="editService(serv)"
                      class="
                        bg-yellow-500 hover:bg-yellow-600 text-white text-xs font-medium
                        px-3 py-1 rounded shadow-sm hover:shadow-md transition-all
                      "
                    >
                      แก้ไข
                    </button>
                  </td>
                  <td class="px-4 py-2 text-center">
                    <button
                      @click="removeService(serv.id)"
                      class="
                        bg-red-500 hover:bg-red-600 text-white text-xs font-medium
                        px-3 py-1 rounded shadow-sm hover:shadow-md transition-all
                      "
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div v-else class="text-gray-500 text-center py-6">ยังไม่มีบริการ</div>
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
import { Navigation, Pagination } from 'swiper/modules'
import Navbar from '@/components/Navbar.vue'

const API_URL = 'http://localhost:4000'

/* ---------- ส่วนที่ 1: Banner ---------- */
const bannerList = ref([])
const newBanner = ref({ url: '', title: '' })
const loadingBanner = ref(false)
const loadingCreateBanner = ref(false)
const bannerFile = ref(null)
const bannerPreview = ref('')
const bannerInputRef = ref(null)
const newsImageUrl = ref('') 
async function fetchBanners() {
  try {
    const res = await fetch(`${API_URL}/api/banners`)
    bannerList.value = await res.json()
  } catch (err) {
    console.error('fetchBanners error:', err)
    bannerList.value = []
  }
}

function onBannerChange(e) {
  const file = e.target.files[0]
  if (!file) return
  validateBannerImage(file).then((ok) => {
    if (ok) {
      bannerFile.value = file
      bannerPreview.value = URL.createObjectURL(file)
    } else {
      bannerFile.value = null
      bannerPreview.value = ''
      if (bannerInputRef.value) bannerInputRef.value.value = ''
    }
  })
}

async function submitBanner() {
  if (!bannerFile.value) return
  loadingBanner.value = true

  try {
    const formData = new FormData()
    formData.append('image', bannerFile.value)
    const res = await fetch(`${API_URL}/api/banners/upload`, {
   method: 'POST',
   body: formData

    })
    const data = await res.json()
    if (data.url) {
      newBanner.value.url = data.url
      bannerPreview.value = data.url
    } else if (data.error) {
      alert('Error: ' + data.error)
    }
  } catch (err) {
    console.error('Error uploading banner:', err)
  } finally {
    loadingBanner.value = false
  }
}

async function createBannerItem() {
  if (!newBanner.value.url) return
  loadingCreateBanner.value = true
  try {
    const res = await fetch(`${API_URL}/api/banners`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newBanner.value)
    })
    if (res.ok) {
      newBanner.value = { url: '', title: '' }
      bannerFile.value = null
      bannerPreview.value = ''
      if (bannerInputRef.value) bannerInputRef.value.value = ''
      await fetchBanners()
    } else {
      const err = await res.json()
      alert('Error: ' + (err.error || res.status))
    }
  } catch (err) {
    console.error('Error createBannerItem:', err)
  } finally {
    loadingCreateBanner.value = false
  }
}

async function deleteBannerItem(id) {
  if (!confirm('ยืนยันการลบ Banner ID = ' + id + ' ?')) return
  try {
    const res = await fetch(`${API_URL}/api/banners/${id}`, {
      method: 'DELETE'
    })
    if (res.ok) {
      await fetchBanners()
    } else {
      console.error('deleteBannerItem HTTP error', res.status)
    }
  } catch (err) {
    console.error('Error deleteBannerItem:', err)
  }
}

function validateBannerImage(file) {
  // ตรวจขนาดไม่เกิน 2MB
  if (file.size > 15 * 1024 * 1024) {
    alert('ขนาดไฟล์ต้องไม่เกิน 15MB')
    return Promise.resolve(false)
  }
  // ตรวจชื่อต้องเป็นตัวอักษร/เลข/-/. เท่านั้น
  if (!/^[\w\-\.]+$/.test(file.name)) {
    alert('ชื่อไฟล์มีอักขระไม่ถูกต้อง')
    return Promise.resolve(false)
  }
  // ตรวจสัดส่วน 3:1 (คลาดเคลื่อน ±0.5)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      if (ratio < 2.5 || ratio > 3.5) {
        alert('ภาพ Banner ควรมีอัตราส่วนประมาณ 3:1')
        resolve(false)
      } else {
        resolve(true)
      }
    }
    img.src = URL.createObjectURL(file)
  })
}

/* ---------- ส่วนที่ 2: News ---------- */
const newsList = ref([])
const newsTitle = ref('')
const newsDesc = ref('')
const newsImg = ref(null)
const imgPreview = ref('')
const loadingNewsImage = ref(false)
const loadingCreateNews = ref(false)

async function fetchNews() {
  try {
    const res = await fetch(`${API_URL}/api/news`)
    newsList.value = await res.json()
  } catch (err) {
    console.error('fetchNews error:', err)
    newsList.value = []
  }
}

function validateNewsImage(file) {
  // ตรวจสัดส่วน 1:1 (คลาดเคลื่อน ±0.02)
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = () => {
      const ratio = img.width / img.height
      if (Math.abs(ratio - 1) < 0.02) {
        resolve(true)
      } else {
        alert('ภาพข่าวต้องมีอัตราส่วน 1:1 (กว้าง = สูง)')
        resolve(false)
      }
    }
    img.src = URL.createObjectURL(file)
  })
}

async function onFileChange(e) {
  const file = e.target.files[0]
  if (!file) return

  const ok = await validateNewsImage(file)
  if (!ok) {
    newsImg.value = null
    imgPreview.value = ''
    e.target.value = ''
    return
  }
  newsImg.value = file
  const reader = new FileReader()
  reader.onload = (ev) => {
    imgPreview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

async function uploadNewsImage() {
  if (!newsImg.value) return
  loadingNewsImage.value = true
  try {
    const formData = new FormData()
    formData.append('image', newsImg.value)
    const res = await fetch(`${API_URL}/api/news/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    if (data.url) {
      imgPreview.value = data.url         // เอาไว้แสดง preview
      newsImageUrl.value = data.url       // เก็บ URL จริงสำหรับ submit
      newsImg.value = null                // ล้างตัวแปร file เดิม
    } else if (data.error) {
      alert('Error: ' + data.error)
    }
  } catch (err) {
    console.error('Error uploadNewsImage:', err)
  } finally {
    loadingNewsImage.value = false
  }
}

async function submitNews() {
  if (!newsTitle.value || !newsDesc.value || !imgPreview.value) return
  loadingCreateNews.value = true
  try {
    const res = await fetch(`${API_URL}/api/news`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: newsTitle.value,
        desc: newsDesc.value,
        img: imgPreview.value
      })
    })
    if (res.ok) {
       newsTitle.value = ''
      newsDesc.value = ''
      imgPreview.value = ''
      newsImageUrl.value = ''
      await fetchNews()
    } else {
      const err = await res.json()
      alert('Error: ' + (err.error || res.status))
    }
  } catch (err) {
    console.error('Error submitNews:', err)
  } finally {
    loadingCreateNews.value = false
  }
}

async function removeNews(id) {
  if (!confirm('ยืนยันการลบข่าว?')) return
  try {
    const res = await fetch(`${API_URL}/api/news/${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchNews()
    } else {
      console.error('removeNews HTTP error', res.status)
    }
  } catch (err) {
    console.error('Error removeNews:', err)
  }
}

/* ---------- ส่วนที่ 3: Services ---------- */
const servicesList = ref([])
const serviceTitle = ref('')
const serviceLink = ref('')
const serviceImageFile = ref(null)
const serviceImgPreview = ref('')
const loadingService = ref(false)
const editingServiceId = ref(null)
const serviceImageInput = ref(null)

async function fetchServices() {
  try {
    const res = await fetch(`${API_URL}/api/services`)
    servicesList.value = await res.json()
  } catch (err) {
    console.error('fetchServices error:', err)
    servicesList.value = []
  }
}

function onServiceImageChange(e) {
  const file = e.target.files[0]
  if (!file) return
  serviceImageFile.value = file
  const reader = new FileReader()
  reader.onload = (ev) => {
    serviceImgPreview.value = ev.target.result
  }
  reader.readAsDataURL(file)
}

async function submitService() {
  if (!serviceTitle.value || !serviceLink.value) return
  loadingService.value = true

  let imgUrl = ''
  try {
    // ถ้ามีไฟล์รูป เลือกอัปโหลดก่อน
    if (serviceImageFile.value) {
      const formData = new FormData()
      formData.append('image', serviceImageFile.value)
      const uploadRes = await fetch(`${API_URL}/api/services/upload`, {
        method: 'POST',
        body: formData
      })
      const uploadData = await uploadRes.json()
      imgUrl = uploadData.url
    }

    if (editingServiceId.value === null) {
      // สร้าง Service ใหม่
      const res = await fetch(`${API_URL}/api/services`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: serviceTitle.value,
          img: imgUrl,
          link: serviceLink.value
        })
      })
      if (!res.ok) throw new Error('Cannot create service')
    } else {
      // อัปเดต Service (PATCH)
      const payload = {}
      if (serviceTitle.value) payload.title = serviceTitle.value
      if (serviceLink.value) payload.link = serviceLink.value
      if (imgUrl) payload.img = imgUrl

      const res = await fetch(`${API_URL}/api/services/${editingServiceId.value}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      })
      if (!res.ok) throw new Error('Cannot update service')
    }

    await fetchServices()
    resetServiceForm()
  } catch (err) {
    console.error('submitService error:', err)
  } finally {
    loadingService.value = false
  }
}

function resetServiceForm() {
  serviceTitle.value = ''
  serviceLink.value = ''
  serviceImageFile.value = null
  serviceImgPreview.value = ''
  editingServiceId.value = null
  if (serviceImageInput.value) serviceImageInput.value.value = ''
}

function editService(serv) {
  editingServiceId.value = serv.id
  serviceTitle.value = serv.title
  serviceLink.value = serv.link
  serviceImgPreview.value = serv.img
}

async function removeService(id) {
  if (!confirm('ยืนยันการลบบริการนี้?')) return
  try {
    const res = await fetch(`${API_URL}/api/services/${id}`, { method: 'DELETE' })
    if (res.ok) {
      await fetchServices()
    } else {
      console.error('removeService HTTP error', res.status)
    }
  } catch (err) {
    console.error('Error removeService:', err)
  }
}

/* ---------- Lifecycle ---------- */
onMounted(() => {
  fetchBanners()
  fetchNews()
  fetchServices()
})
</script>

<style>
/* ไม่ต้องเขียน CSS เพิ่มเติม ถ้า Tailwind + Swiper ทำงานแล้ว */
/* แต่หากยังใช้ Tailwind v4.x ไม่ได้ configure line-clamp ก็ลบคลาส line-clamp-* ออกให้หมด */
</style>

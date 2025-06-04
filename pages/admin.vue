<template>
  <UContainer>
    <h1 class="font-bold text-2xl mb-6">Admin จัดการข่าวประชาสัมพันธ์</h1>
<!-- แบบฟอร์มเพิ่ม Banner -->
 <UCard class="mb-8">
  <template #header>
    อัปโหลด Banner ใหม่
  </template>
  <form @submit.prevent="submitBanner">
   <input ref="bannerInputRef" type="file" accept="image/*" @change="onBannerChange" required />
    <UButton type="submit" :disabled="loadingBanner" class="ml-2">
      {{ loadingBanner ? 'กำลังบันทึก...' : 'อัปโหลด Banner' }}
    </UButton>
  </form>
  <div v-if="bannerPreview" class="mt-4">
    <img :src="bannerPreview" class="max-h-32 rounded" />
  </div>
</UCard>
<UCard v-for="(banner, i) in banners" :key="banner.url" class="mb-4">
  <div class="flex items-center gap-4">
    <img :src="banner.url" class="w-52 h-20 object-cover rounded" />
    <UButton color="red" @click="removeBanner(i)">ลบ</UButton>
  </div>
</UCard>
    <!-- ฟอร์มเพิ่มข่าว -->
    <UCard class="mb-8">
      <template #header>
        เพิ่มข่าวใหม่
      </template>
      <form @submit.prevent="submitNews">
        <UInput v-model="newsTitle" placeholder="หัวข้อข่าว" class="mb-2" required />
        <UInput v-model="newsDesc" placeholder="รายละเอียดข่าว" class="mb-2" required />
        <input type="file" @change="onFileChange" class="mb-2" />
        <UButton type="submit" :disabled="loading">
          {{ loading ? 'กำลังบันทึก...' : 'เพิ่มข่าว' }}
        </UButton>
      </form>
      <div v-if="imgPreview" class="mt-4">
        <img :src="imgPreview" class="max-h-32 rounded" />
      </div>
    </UCard>

    <!-- ตารางข่าวทั้งหมด -->
    <UCard>
      <template #header>
        ข่าวทั้งหมด
      </template>
      <table class="min-w-full">
        <thead>
          <tr>
            <th class="py-2 px-2 text-left">รูป</th>
            <th class="py-2 px-2 text-left">หัวข้อข่าว</th>
            <th class="py-2 px-2 text-left">รายละเอียด</th>
            <th class="py-2 px-2">ลบ</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="n in newsList" :key="n.id">
            <td class="py-2 px-2"><img :src="n.img" class="w-20 rounded" /></td>
            <td class="py-2 px-2">{{ n.title }}</td>
            <td class="py-2 px-2">{{ n.desc }}</td>
            <td class="py-2 px-2">
              <UButton color="red" size="xs" @click="removeNews(n.id)">ลบ</UButton>
            </td>
          </tr>
        </tbody>
      </table>
    </UCard>
    
  </UContainer>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const newsTitle = ref('')
const newsDesc = ref('')
const newsImg = ref(null)
const imgPreview = ref('')
const loading = ref(false)
const newsList = ref([])

const API_URL = 'http://localhost:4000'
const banners = ref([])
const bannerPreview = ref('')
const bannerFile = ref(null)
const loadingBanner = ref(false)

const bannerInputRef = ref(null)

// โหลดข่าวเมื่อเข้า admin
const fetchNews = async () => {
  const res = await fetch(`${API_URL}/api/news`)
  newsList.value = await res.json()
}
onMounted(fetchNews)

// handle รูปเมื่อเลือกไฟล์
function onFileChange(e) {
  const file = e.target.files[0]
  newsImg.value = file
  if (file) {
    const reader = new FileReader()
    reader.onload = (ev) => { imgPreview.value = ev.target.result }
    reader.readAsDataURL(file)
  }
}

// อัปโหลดรูปและเพิ่มข่าว
async function submitNews() {
  loading.value = true

  // อัปโหลดไฟล์รูปก่อน
  let imgUrl = ''
  if (newsImg.value) {
    const formData = new FormData()
    formData.append('image', newsImg.value)
    const res = await fetch(`${API_URL}/api/upload`, {
      method: 'POST',
      body: formData
    })
    const data = await res.json()
    imgUrl = data.url
  }

  // เพิ่มข่าวใหม่
  const res2 = await fetch(`${API_URL}/api/news`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: newsTitle.value,
      desc: newsDesc.value,
      img: imgUrl
    })
  })
  if (res2.ok) {
    newsTitle.value = ''
    newsDesc.value = ''
    newsImg.value = null
    imgPreview.value = ''
    fetchNews()
  }
  loading.value = false
}

// ลบข่าว
async function removeNews(id) {
  if (!confirm('ยืนยันการลบ?')) return
  await fetch(`${API_URL}/api/news/${id}`, { method: 'DELETE' })
  fetchNews()
}



async function onBannerChange(e) {
  const file = e.target.files[0]
  if (!file) return
  const valid = await validateBannerImage(file)
  if (valid) {
    bannerFile.value = file
    bannerPreview.value = URL.createObjectURL(file)
  } else {
    bannerFile.value = null
    bannerPreview.value = ''
  }
}


async function submitBanner() {
  if (!bannerFile.value) return
  loadingBanner.value = true
  const formData = new FormData()
  formData.append('image', bannerFile.value)
  await fetch('http://localhost:4000/api/upload/banner', {
    method: 'POST',
    body: formData
  })
  // โหลด banner ใหม่หลังอัปโหลดเสร็จ
  fetchBanners()
  bannerFile.value = null
  bannerPreview.value = ''
  loadingBanner.value = false
   // Reset file input!
  if (bannerInputRef.value) bannerInputRef.value.value = ''
}
function validateBannerImage(file) {
  // 1. ตรวจขนาดไฟล์ (เช่นไม่เกิน 2MB)
  if (file.size > 2 * 1024 * 1024) {
    alert('ขนาดไฟล์ต้องไม่เกิน 2MB')
    return false
  }
  // 2. ตรวจชื่อไฟล์
  if (!/^[\w\-\.]+$/.test(file.name)) {
    alert('ชื่อไฟล์มีอักขระไม่ถูกต้อง')
    return false
  }
  // 3. ตรวจสัดส่วน (อัตราส่วน width:height)
  return new Promise((resolve) => {
    const img = new window.Image()
    img.onload = function() {
      const ratio = this.width / this.height
      if (ratio < 2.5 || ratio > 3.5) {
        alert('ภาพควรมีอัตราส่วนประมาณ 3:1')
        resolve(false)
      } else {
        resolve(true)
      }
    }
    img.src = URL.createObjectURL(file)
  })
}

const fetchBanners = async () => {
  const res = await fetch('http://localhost:4000/api/banners')
  banners.value = await res.json()
}
onMounted(fetchBanners)

async function removeBanner(index) {
  if (!confirm('ยืนยันการลบ banner?')) return
  await fetch(`http://localhost:4000/api/banners/${index}`, { method: 'DELETE' })
  fetchBanners()
}

</script>

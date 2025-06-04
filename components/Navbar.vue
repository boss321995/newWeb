<template>
  <header class="bg-primary-700 shadow-sm sticky top-0 z-50">
    <nav class="container mx-auto flex items-center justify-between py-3 px-4">
      <NuxtLink to="/" class="text-white text-xl font-bold tracking-wide">
        NT Academy
      </NuxtLink>
      <ul class="flex gap-6 items-center">
     <li v-for="item in navItems" :key="item.label">
  <div v-if="item.children">
    <USelectMenu
      :options="item.children"
      placeholder=" "
      :ui="{ width: 'w-max' }"
      class="h-full"
    >
      <template #default="{ open, option, select }">
        <UButton
          color="primary"
          variant="ghost"
          :class="isActive(item) ? 'font-bold underline' : 'opacity-90'"
          @click="select()"
        >
          {{ item.label }}
          <Icon name="i-heroicons-chevron-down" class="ml-1 w-4 h-4" />
        </UButton>
      </template>
      <template #option="{ option }">
        <span @click="option.click()" class="cursor-pointer px-4 py-2 block whitespace-nowrap">
          {{ option.label }}
        </span>
      </template>
    </USelectMenu>
  </div>
  <div v-else>
            <NuxtLink
              :to="item.to"
              class="px-3 py-2 rounded transition"
              :class="isActive(item) ? 'bg-white/10 font-bold underline' : 'text-white opacity-90 hover:opacity-100'"
            >
              {{ item.label }}
            </NuxtLink>
          </div>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

// เมนูหลัก + submenu ตัวอย่าง
const navItems = [
  { label: 'หน้าหลัก', to: '/' },
  {
    label: 'บริการ',
    children: [
      { label: 'อบรมออนไลน์', click: () => navigate('/service/online') },
      { label: 'บริการห้องประชุม', click: () => navigate('/service/meeting') },
      { label: 'จองโรงแรม', click: () => navigate('/service/hotel') }
    ]
  },
  {
    label: 'ข่าว',
    children: [
      { label: 'ข่าวล่าสุด', click: () => navigate('/news') },
      { label: 'กิจกรรมที่ผ่านมา', click: () => navigate('/news/events') }
    ]
  },
  { label: 'ผู้ดูแลระบบ', to: '/admin' }
]

// ใช้สำหรับตรวจว่าหน้านั้น active
function isActive(item) {
  if (item.to) {
    return route.path === item.to
  }
  if (item.children) {
    return item.children.some(
      c => (c.to && route.path === c.to)
    )
  }
  return false
}

// ฟังก์ชันสำหรับไปหน้าที่ต้องการใน dropdown
function navigate(path) {
  router.push(path)
}
</script>

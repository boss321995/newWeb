<!-- components/Navbar.vue -->
<template>
  <header class="bg-[oklch(0.8_0.14_62.6)] text-white sticky top-0 z-50">
    <nav class="container mx-auto flex items-center justify-between p-4">
      <!-- 1. โลโก้ / ชื่อเว็บ -->
      <NuxtLink to="/" class="flex items-center space-x-2">
  <!-- 1. ใส่ <img> สำหรับโลโก้ ไฟล์รูปเก็บไว้ในโฟลเดอร์ static หรือ assets -->
  <img
    src="/NT_Logo.png"
    alt="NT Academy Logo"
    class="h-8 w-auto" 
  />
  <!-- 2. ข้อความชื่อเว็บ -->
  <span class="text-xl font-bold text-white">NT Academy</span>
</NuxtLink>

      <!-- 2. ปุ่ม Hamburger (แสดงเฉพาะหน้าจอ < md) -->
      <button
        @click="isMobileMenuOpen = !isMobileMenuOpen"
        class="md:hidden focus:outline-none"
        aria-label="Toggle menu"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none"
             viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>

      <!-- 3. เมนูลิงก์หลัก (ซ่อนบนมือถือ, แสดงบน Desktop ≥ md) -->
      <ul class="hidden md:flex space-x-6">
        <li>
          <a
            href="https://lms.ntplc.co.th/"
            target="_blank"
            class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            LMS(E-learning)
          </a>
        </li>
        <li>
          <a
            href="https://hrd.ntplc.co.th/hrd/"
            target="_blank"
            class="inline-block bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            HRD NT
          </a>
        </li>
        <li>
          <NuxtLink
            to="/"
            class="hover:underline"
            :class="{ 'font-semibold underline': isActive('/') }"
          >
            หน้าแรก
          </NuxtLink>
        </li>

        <!-- ======= เมนู “บริการสารสนเทศ” (Sub-navigation) ======= -->
        <li class="relative group">
          <button
            class="flex items-center hover:underline focus:outline-none"
            @click.prevent
          >
            บริการสารสนเทศ
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul
            class="absolute left-0 mt-2 w-80 bg-white text-gray-800 rounded-md shadow-lg
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-opacity"
          >
            <li>
              <a
                href="http://10.32.131.252/webv1/couse_outside.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                แบบฟอร์มส่งพนักงานอบรมนอกเหนือจากแผนพัฒนาบุคลากรประจำปี
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/webv1/download.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                Download เอกสารอบรม/แบบฟอร์มต่างๆ
              </a>
            </li>
          </ul>
        </li>

        <!-- ======= เมนู “เกี่ยวกับสถาบันฯ” (Sub-navigation) ======= -->
        <li class="relative group">
          <button
            class="flex items-center hover:underline focus:outline-none"
            @click.prevent
          >
            เกี่ยวกับสถาบันฯ
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul
            class="absolute left-0 mt-2 w-64 bg-white text-gray-800 rounded-md shadow-lg
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-opacity"
          >
            <li>
              <a
                href="http://10.32.131.252/webv1/org_chart.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                โครงสร้างส่วนงานและเบอร์ติดต่อ
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/webv1/map1.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                แผนที่สถาบันวิชาการฯ
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/webv1/map2.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                ผังอาคารสถาบันวิชาการฯ
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/webv1/portfolio.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                กิจกรรมสถาบันวิชาการฯ
              </a>
            </li>
          </ul>
        </li>

        <!-- ======= เมนู “สำหรับเจ้าหน้าที่” (Sub-navigation) ======= -->
        <li class="relative group">
          <button
            class="flex items-center hover:underline focus:outline-none"
            @click.prevent
          >
            สำหรับเจ้าหน้าที่
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 ml-1 transition-transform duration-200 group-hover:rotate-180"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul
            class="absolute left-0 mt-2 w-80 bg-white text-gray-800 rounded-md shadow-lg
                   opacity-0 invisible group-hover:opacity-100 group-hover:visible
                   transition-opacity"
          >
            <li>
              <a
                href="http://10.32.131.252/hrd/bookroom/"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                ระบบงานจองห้องประชุม-อบรม
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/hrd/customer/"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                ระบบรายงานลูกค้าภายนอก
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/webv1/reportSafetyForm.php"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                รายงานการตรวจ คปอ.
              </a>
            </li>
            <li>
              <a
                href="http://10.32.131.252/boss/course/klc/"
                class="block px-4 py-2 hover:bg-gray-100"
                target="_blank"
              >
                สืบค้นโครงร่างหลักสูตร
              </a>
            </li>
          </ul>
        </li>

        <!-- 4. ปุ่ม Admin (ขวาสุด) -->
        <li>
          <NuxtLink
            to="/admin"
            class="hover:underline font-semibold"
            :class="{ 'underline': isActive('/admin') }"
          >
            Admin
          </NuxtLink>
        </li>
      </ul>
    </nav>

    <!-- 5. Mobile Menu (แสดงเมื่อกด Hamburger) -->
    <div v-if="isMobileMenuOpen" class="md:hidden bg-[oklch(0.7_0.14_62.6)]">
      <ul class="flex flex-col space-y-2 p-4">
        <li>
          <a
            href="http://lms.ntacademy.ntplc.co.th"
            target="_blank"
            class="block py-2 px-3 bg-primary btn btn-primary rounded text-white hover:bg-opacity-90 transition"
          >
            LMS(E-learning)
          </a>
        </li>
        <li>
          <a
            href="https://hrd.ntplc.co.th/hrd/"
            target="_blank"
            class="block py-2 px-3 bg-info btn btn-info rounded text-white hover:bg-opacity-90 transition"
          >
            HRD NT
          </a>
        </li>
        <li>
          <NuxtLink @click="closeMobileMenu" to="/" class="block py-2 hover:underline">
            หน้าแรก
          </NuxtLink>
        </li>

        <!-- ======= Mobile Submenu “บริการสารสนเทศ” ======= -->
        <li>
          <button
            @click="showMobileInfoSubmenu = !showMobileInfoSubmenu"
            class="w-full flex justify-between items-center py-2 hover:underline focus:outline-none"
          >
            บริการสารสนเทศ
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 transform transition-transform duration-200"
                 :class="showMobileInfoSubmenu ? 'rotate-180' : ''"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="showMobileInfoSubmenu" class="pl-4 mt-1 space-y-1">
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/couse_outside.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                แบบฟอร์มส่งพนักงานอบรมนอกเหนือจากแผนพัฒนาบุคลากรประจำปี
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/download.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                Download เอกสารอบรม/แบบฟอร์มต่างๆ
              </a>
            </li>
          </ul>
        </li>

        <!-- ======= Mobile Submenu “เกี่ยวกับสถาบันฯ” ======= -->
        <li>
          <button
            @click="showMobileAboutSubmenu = !showMobileAboutSubmenu"
            class="w-full flex justify-between items-center py-2 hover:underline focus:outline-none"
          >
            เกี่ยวกับสถาบันฯ
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 transform transition-transform duration-200"
                 :class="showMobileAboutSubmenu ? 'rotate-180' : ''"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="showMobileAboutSubmenu" class="pl-4 mt-1 space-y-1">
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/org_chart.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                โครงสร้างส่วนงานและเบอร์ติดต่อ
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/map1.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                แผนที่สถาบันวิชาการฯ
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/map2.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                ผังอาคารสถาบันวิชาการฯ
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/portfolio.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                กิจกรรมสถาบันวิชาการฯ
              </a>
            </li>
          </ul>
        </li>

        <!-- ======= Mobile Submenu “สำหรับเจ้าหน้าที่” ======= -->
        <li>
          <button
            @click="showMobileStaffSubmenu = !showMobileStaffSubmenu"
            class="w-full flex justify-between items-center py-2 hover:underline focus:outline-none"
          >
            สำหรับเจ้าหน้าที่
            <svg xmlns="http://www.w3.org/2000/svg"
                 class="h-4 w-4 transform transition-transform duration-200"
                 :class="showMobileStaffSubmenu ? 'rotate-180' : ''"
                 fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <ul v-show="showMobileStaffSubmenu" class="pl-4 mt-1 space-y-1">
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/hrd/bookroom/"
                class="block py-1 hover:underline"
                target="_blank"
              >
                ระบบงานจองห้องประชุม-อบรม
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/hrd/customer/"
                class="block py-1 hover:underline"
                target="_blank"
              >
                ระบบรายงานลูกค้าภายนอก
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/webv1/reportSafetyForm.php"
                class="block py-1 hover:underline"
                target="_blank"
              >
                รายงานการตรวจ คปอ.
              </a>
            </li>
            <li>
              <a
                @click="closeMobileMenu"
                href="http://10.32.131.252/boss/course/klc/"
                class="block py-1 hover:underline"
                target="_blank"
              >
                สืบค้นโครงร่างหลักสูตร
              </a>
            </li>
          </ul>
        </li>

        <!-- ปุ่ม Admin (Mobile) -->
        <li>
          <NuxtLink @click="closeMobileMenu" to="/admin" class="block py-2 hover:underline">
            Admin
          </NuxtLink>
        </li>
      </ul>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const isMobileMenuOpen = ref(false)
const showMobileInfoSubmenu = ref(false)
const showMobileAboutSubmenu = ref(false)
const showMobileStaffSubmenu = ref(false)

const route = useRoute()

function isActive(path) {
  return route.path === path
}

function closeMobileMenu() {
  isMobileMenuOpen.value = false
  showMobileInfoSubmenu.value = false
  showMobileAboutSubmenu.value = false
  showMobileStaffSubmenu.value = false
}
</script>

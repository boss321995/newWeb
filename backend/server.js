const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const cors = require('cors')
const fs = require('fs')
const path = require('path')

const app = express()
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use(express.json())

// ตั้งค่าการเก็บไฟล์
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => {
    // เปลี่ยนชื่อไฟล์กันซ้ำ + ลบช่องว่าง
    const uniqueName = Date.now() + '-' + file.originalname.replace(/\s/g, '_')
    cb(null, uniqueName)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    // ชื่อไฟล์ต้องเป็นตัวอักษร/เลข/-/_. เท่านั้น
    if (!/^[\w\-\.]+$/.test(file.originalname)) {
      return cb(new Error('ชื่อไฟล์ไม่ถูกต้อง'), false)
    }
    // รองรับเฉพาะ jpeg/png/webp
    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.mimetype)) {
      return cb(new Error('เฉพาะไฟล์ jpg, png, webp เท่านั้น'), false)
    }
    cb(null, true)
  }
})

// ----------------------- ข่าว -----------------------
let newsList = []

// API อัปโหลดรูปข่าว (validate ขนาด/ชื่อไฟล์ ด้วย config เดียวกัน)
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: `http://localhost:4000/uploads/${req.file.filename}` })
})

// ดึงข่าวทั้งหมด
app.get('/api/news', (req, res) => res.json(newsList))

// เพิ่มข่าวใหม่
app.post('/api/news', (req, res) => {
  const { title, desc, img } = req.body
  const newItem = { id: Date.now(), title, desc, img }
  newsList.push(newItem)
  res.json({ success: true, news: newItem })
})

// ลบข่าว
app.delete('/api/news/:id', (req, res) => {
  const id = Number(req.params.id)
  newsList = newsList.filter(n => n.id !== id)
  res.json({ success: true })
})

// ----------------------- Banner -----------------------
let banners = []

app.post('/api/upload/banner', upload.single('image'), async (req, res) => {
  try {
    // validate อัตราส่วน 3:1
    const meta = await sharp(req.file.path).metadata()
    const ratio = meta.width / meta.height
    if (ratio < 2.5 || ratio > 3.5) { // ประมาณ 3:1
      fs.unlinkSync(req.file.path)
      return res.status(400).json({ error: 'ภาพควรมีอัตราส่วนประมาณ 3:1' })
    }
    const bannerUrl = 'http://localhost:4000/uploads/' + req.file.filename
    banners.push({ url: bannerUrl })
    res.json({ url: bannerUrl })
  } catch (err) {
    res.status(400).json({ error: err.message })
  }
})

// ส่ง banners ทั้งหมด
app.get('/api/banners', (req, res) => {
  res.json(banners)
})

// ------------------ Start server ----------------------
app.listen(4000, () => {
  console.log('Backend running at http://localhost:4000')
})
app.delete('/api/banners/:index', (req, res) => {
  const idx = parseInt(req.params.index)
  if (isNaN(idx) || idx < 0 || idx >= banners.length) {
    return res.status(404).json({ error: 'ไม่พบ banner ที่ต้องการลบ' })
  }
  // ลบไฟล์จริง
  const url = banners[idx].url
  const filename = url.split('/uploads/')[1]
  try {
    fs.unlinkSync(path.join(__dirname, 'uploads', filename))
  } catch (e) {}
  // ลบจาก array
  banners.splice(idx, 1)
  res.json({ success: true })
})

const express = require('express')
const multer = require('multer')
const cors = require('cors')
const path = require('path')
const app = express()

app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
})
const upload = multer({ storage })

// อัปโหลดรูป
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  res.json({ url: `/uploads/${req.file.filename}` })
})

// Mock ข้อมูลข่าว/แบนเนอร์
let newsList = []

app.use(express.json())

app.get('/api/news', (req, res) => res.json(newsList))
app.post('/api/news', (req, res) => {
  const { title, desc, img } = req.body
  newsList.push({ id: Date.now(), title, desc, img })
  res.json({ success: true })
})
// เพิ่ม endpoint อื่นๆ ได้ตามต้องการ

app.listen(4000, () => console.log('Backend running at http://localhost:4000'))

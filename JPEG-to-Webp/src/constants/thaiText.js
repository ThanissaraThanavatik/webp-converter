export const THAI_TEXT = {
  title: 'JPEG to WebP',
  subtitle: 'แปลงรูปภาพ JPEG เป็น WebP คุณภาพสูง ขนาดเล็ก',

  // Drop Zone
  dropZone: {
    title: 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์',
    subtitle: 'รองรับไฟล์ JPEG, JPG, PNG',
    subtitleBatch: 'รองรับไฟล์ JPEG, JPG, PNG (หลายไฟล์)',
    error: 'กรุณาเลือกไฟล์ JPEG, JPG หรือ PNG เท่านั้น',
    selectFiles: 'เลือกไฟล์',
  },

  // Settings
  settings: {
    qualityLabel: 'คุณภาพ (Quality)',
    qualityHint: 'ค่าสูง = คุณภาพดี แต่ไฟล์ใหญ่ | ค่าต่ำ = ไฟล์เล็ก แต่คุณภาพลดลง',
    convertButton: 'แปลงเป็น WebP',
    convertAllButton: 'แปลงทั้งหมด',
    converting: 'กำลังแปลง...',
  },

  // Quality Presets
  presets: {
    title: 'คุณภาพเร็ว (Presets)',
    webOptimized: 'เว็บออปติไมซ์ (Web Optimized)',
    highQuality: 'คุณภาพสูง (High Quality)',
    smallestSize: 'ขนาดเล็กสุด (Smallest Size)',
  },

  // Output Format
  format: {
    title: 'รูปแบบเอาต์พุต (Output Format)',
    webp: 'WebP',
    png: 'PNG',
    avif: 'AVIF',
  },

  // Resize
  resize: {
    title: 'ปรับขนาด (Resize)',
    original: 'ขนาดเดิม',
    custom: 'กำหนดเอง',
    width: 'ความกว้าง (px)',
    height: 'ความสูง (px)',
    lockRatio: 'ล็อกสัดส่วน',
  },

  // Batch Processing
  batch: {
    title: 'รายการไฟล์ (File Queue)',
    clearAll: 'ล้างทั้งหมด',
    downloadAll: 'ดาวน์โหลดทั้งหมด (ZIP)',
    downloadAllHint: 'รวมทุกไฟล์เป็น ZIP',
    removeFromQueue: 'ลบออกจากรายการ',
  },

  // Preview
  preview: {
    originalLabel: 'ต้นฉบับ',
    convertedLabel: 'ผลลัพธ์',
    fileSize: 'ขนาดไฟล์:',
    sizeReduction: 'ลดลง:',
    sizeIncrease: 'เพิ่มขึ้น:',
    converting: 'กำลังแปลง...',
    downloadButton: 'ดาวน์โหลด',
    downloadHint: 'ไฟล์จะถูกบันทึกเป็น',
    dimensions: 'ขนาด:',
  },

  // Info Cards
  info: {
    fast: {
      title: 'เร็วทันใจ',
      description: 'แปลงไฟล์แบบ Real-time บนเบราว์เซอร์ ไม่ต้องอัปโหลดขึ้นเซิร์ฟเวอร์',
    },
    secure: {
      title: 'ปลอดภัย',
      description: 'ประมวลผลฝั่ง Client ไฟล์ไม่ออกจากเครื่องคุณ มั่นใจในความเป็นส่วนตัว',
    },
    quality: {
      title: 'คุณภาพสูง',
      description: 'รองรับการปรับคุณภาพได้ตามต้องการ คงไว้ซึ่งความคมชัดของรูปภาพ',
    },
    batch: {
      title: 'แปลงหลายไฟล์',
      description: 'รองรับการแปลงไฟล์พร้อมกันหลายไฟล์ ประหยัดเวลา',
    },
  },

  // Errors
  errors: {
    conversionError: 'เกิดข้อผิดพลาดในการแปลงไฟล์ กรุณาลองใหม่อีกครั้ง',
  },
};

export const FILE_SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'];

export const OUTPUT_FORMATS = {
  webp: 'image/webp',
  png: 'image/png',
  avif: 'image/avif',
};

export const QUALITY_PRESETS = {
  webOptimized: 85,
  highQuality: 95,
  smallestSize: 60,
};

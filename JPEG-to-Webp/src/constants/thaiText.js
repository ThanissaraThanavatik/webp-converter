export const THAI_TEXT = {
  title: 'JPEG to WebP',
  subtitle: 'แปลงรูปภาพ JPEG เป็น WebP คุณภาพสูง ขนาดเล็ก',

  // Drop Zone
  dropZone: {
    title: 'ลากไฟล์มาวางที่นี่ หรือคลิกเพื่อเลือกไฟล์',
    subtitle: 'รองรับไฟล์ JPEG, JPG',
    error: 'กรุณาเลือกไฟล์ JPEG หรือ JPG เท่านั้น',
  },

  // Settings
  settings: {
    qualityLabel: 'คุณภาพ (Quality)',
    qualityHint: 'ค่าสูง = คุณภาพดี แต่ไฟล์ใหญ่ | ค่าต่ำ = ไฟล์เล็ก แต่คุณภาพลดลง',
    convertButton: 'แปลงเป็น WebP',
  },

  // Preview
  preview: {
    originalLabel: 'ต้นฉบับ (JPEG)',
    convertedLabel: 'ผลลัพธ์ (WebP)',
    fileSize: 'ขนาดไฟล์:',
    sizeReduction: 'ลดลง:',
    sizeIncrease: 'เพิ่มขึ้น:',
    converting: 'กำลังแปลง...',
    downloadButton: 'ดาวน์โหลด WebP',
    downloadHint: 'ไฟล์จะถูกบันทึกเป็น converted.webp',
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
  },

  // Errors
  errors: {
    conversionError: 'เกิดข้อผิดพลาดในการแปลงไฟล์ กรุณาลองใหม่อีกครั้ง',
  },
};

export const FILE_SIZE_UNITS = ['Bytes', 'KB', 'MB', 'GB'];

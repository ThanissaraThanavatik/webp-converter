export const THAI_TEXT = {
  title: 'Image Converter',
  subtitle: 'แปลงไฟล์ภาพเป็น WebP, PNG, AVIF',

  dropZone: {
    title: 'ลากไฟล์มาวาง หรือคลิกเพื่อเลือก',
    subtitle: 'รองรับไฟล์ภาพทุกประเภท',
    error: 'กรุณาเลือกไฟล์ภาพเท่านั้น',
  },

  settings: {
    qualityLabel: 'คุณภาพ',
    qualityHint: 'ค่าสูง = คุณภาพดี แต่ไฟล์ใหญ่ | ค่าต่ำ = ไฟล์เล็ก',
    convertButton: 'แปลงไฟล์',
    convertAllButton: 'แปลงทั้งหมด',
    converting: 'กำลังแปลง',
  },

  presets: {
    title: 'คุณภาพเร็ว',
    webOptimized: 'เว็บออปติไมซ์',
    highQuality: 'คุณภาพสูง',
    smallestSize: 'ขนาดเล็กสุด',
  },

  format: {
    title: 'รูปแบบเอาต์พุต',
    webp: 'WebP',
    png: 'PNG',
    avif: 'AVIF',
  },

  errors: {
    conversionError: 'เกิดข้อผิดพลาด กรุณาลองใหม่',
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

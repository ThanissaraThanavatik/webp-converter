/**
 * Format bytes to human-readable file size
 * @param {number} bytes - File size in bytes
 * @param {string[]} units - Size units array
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes, units = ['Bytes', 'KB', 'MB', 'GB']) => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + units[i];
};

/**
 * Calculate size reduction percentage
 * @param {number} originalSize - Original file size in bytes
 * @param {number} newSize - New file size in bytes
 * @returns {object} Reduction info with text and className
 */
export const calculateSizeReduction = (originalSize, newSize) => {
  const reduction = ((originalSize - newSize) / originalSize) * 100;
  const isReduction = reduction > 0;

  return {
    percentage: Math.abs(reduction),
    isReduction,
    text: isReduction
      ? `ลดลง ${reduction.toFixed(1)}%`
      : `เพิ่มขึ้น ${Math.abs(reduction).toFixed(1)}%`,
    className: isReduction ? 'text-green-600' : 'text-red-600',
  };
};

/**
 * Validate if file is an image
 * @param {File} file - File to validate
 * @returns {boolean} True if valid image file
 */
export const isValidImageFile = (file) => {
  return file.type.startsWith('image/');
};

/**
 * Get data URL size in bytes
 * @param {string} dataUrl - Base64 data URL
 * @returns {number} Size in bytes
 */
export const getDataUrlSize = (dataUrl) => {
  return Math.round((dataUrl.length * 3) / 4);
};

/**
 * Generate filename with WebP extension
 * @param {string} originalName - Original filename
 * @returns {string} New filename with .webp extension
 */
export const generateWebpFilename = (originalName) => {
  return originalName.replace(/\.[^/.]+$/, '') + '.webp';
};

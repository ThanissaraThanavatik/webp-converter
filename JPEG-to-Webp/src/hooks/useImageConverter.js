import { useState, useRef, useCallback } from 'react';
import { getDataUrlSize } from '../utils/fileUtils';

export const useImageConverter = () => {
  const [originalImage, setOriginalImage] = useState(null);
  const [originalFile, setOriginalFile] = useState(null);
  const [convertedDataUrl, setConvertedDataUrl] = useState(null);
  const [convertedSize, setConvertedSize] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  /**
   * Set the original image and file
   */
  const setOriginal = useCallback((file, image) => {
    setOriginalFile(file);
    setOriginalImage(image);
    setConvertedDataUrl(null);
    setConvertedSize(null);
    setError(null);
  }, []);

  /**
   * Convert image to WebP format
   */
  const convertToWebP = useCallback((quality = 0.85) => {
    if (!originalImage) {
      setError('No original image loaded');
      return null;
    }

    setIsConverting(true);
    setError(null);

    // Use setTimeout to allow UI to update
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          const canvas = document.createElement('canvas');
          canvas.width = originalImage.width;
          canvas.height = originalImage.height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(originalImage, 0, 0);

          // Convert to WebP
          const dataUrl = canvas.toDataURL('image/webp', quality);
          const size = getDataUrlSize(dataUrl);

          setConvertedDataUrl(dataUrl);
          setConvertedSize(size);
          canvasRef.current = canvas;

          resolve({ dataUrl, size, canvas });
        } catch (err) {
          const errorMsg = 'เกิดข้อผิดพลาดในการแปลงไฟล์ กรุณาลองใหม่อีกครั้ง';
          setError(errorMsg);
          reject(err);
        } finally {
          setIsConverting(false);
        }
      }, 100);
    });
  }, [originalImage]);

  /**
   * Reset the converter state
   */
  const reset = useCallback(() => {
    setOriginalImage(null);
    setOriginalFile(null);
    setConvertedDataUrl(null);
    setConvertedSize(null);
    setIsConverting(false);
    setError(null);
    canvasRef.current = null;
  }, []);

  return {
    originalImage,
    originalFile,
    convertedDataUrl,
    convertedSize,
    isConverting,
    error,
    setOriginal,
    convertToWebP,
    reset,
  };
};

import { useState, useRef, useCallback } from 'react';
import { getDataUrlSize } from '../utils/fileUtils';

export const useImageConverter = () => {
  const [images, setImages] = useState([]);
  const [isConverting, setIsConverting] = useState(false);
  const [error, setError] = useState(null);

  const canvasRef = useRef(null);

  /**
   * Add a new image to the queue
   */
  const addImage = useCallback((file, imageObj) => {
    const newImage = {
      id: Math.random().toString(36).substr(2, 9),
      file,
      image: imageObj,
      originalSrc: imageObj.src,
      convertedDataUrl: null,
      convertedSize: null,
      isConverting: false,
      error: null,
    };
    setImages((prev) => [...prev, newImage]);
    setError(null);
    return newImage.id;
  }, []);

  /**
   * Remove an image from the queue
   */
  const removeImage = useCallback((id) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  }, []);

  /**
   * Clear all images
   */
  const clearAll = useCallback(() => {
    setImages([]);
    setError(null);
  }, []);

  /**
   * Convert single image to specified format
   */
  const convertImage = useCallback(async (imageId, format = 'image/webp', quality = 0.85, resizeOptions = null) => {
    setImages((prev) =>
      prev.map((img) =>
        img.id === imageId ? { ...img, isConverting: true, error: null } : img
      )
    );

    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const imageObj = images.find((img) => img.id === imageId);
        if (!imageObj) {
          reject(new Error('Image not found'));
          return;
        }

        try {
          const canvas = document.createElement('canvas');
          let width = imageObj.image.width;
          let height = imageObj.image.height;

          // Apply resize if specified
          if (resizeOptions) {
            if (resizeOptions.width && !resizeOptions.height) {
              height = (resizeOptions.width / width) * height;
              width = resizeOptions.width;
            } else if (resizeOptions.height && !resizeOptions.width) {
              width = (resizeOptions.height / height) * width;
              height = resizeOptions.height;
            } else if (resizeOptions.width && resizeOptions.height) {
              width = resizeOptions.width;
              height = resizeOptions.height;
            }
          }

          canvas.width = width;
          canvas.height = height;

          const ctx = canvas.getContext('2d');
          ctx.drawImage(imageObj.image, 0, 0, width, height);

          // Convert to specified format
          const dataUrl = canvas.toDataURL(format, quality);
          const size = getDataUrlSize(dataUrl);

          setImages((prev) =>
            prev.map((img) =>
              img.id === imageId
                ? {
                    ...img,
                    convertedDataUrl: dataUrl,
                    convertedSize: size,
                    isConverting: false,
                  }
                : img
            )
          );

          resolve({ dataUrl, size, canvas });
        } catch (err) {
          const errorMsg = 'เกิดข้อผิดพลาดในการแปลงไฟล์ กรุณาลองใหม่อีกครั้ง';
          setImages((prev) =>
            prev.map((img) =>
              img.id === imageId
                ? { ...img, isConverting: false, error: errorMsg }
                : img
            )
          );
          setError(errorMsg);
          reject(err);
        }
      }, 100);
    });
  }, [images]);

  /**
   * Convert all images
   */
  const convertAll = useCallback(async (format = 'image/webp', quality = 0.85, resizeOptions = null) => {
    setIsConverting(true);
    setError(null);

    const promises = images.map((img) =>
      convertImage(img.id, format, quality, resizeOptions)
    );

    try {
      await Promise.all(promises);
    } catch (err) {
      console.error('Batch conversion error:', err);
    } finally {
      setIsConverting(false);
    }
  }, [images, convertImage]);

  /**
   * Get all converted images for download
   */
  const getConvertedImages = useCallback(() => {
    return images.filter((img) => img.convertedDataUrl);
  }, [images]);

  /**
   * Get file extension for format
   */
  const getExtension = useCallback((format) => {
    const extensions = {
      'image/webp': '.webp',
      'image/png': '.png',
      'image/avif': '.avif',
    };
    return extensions[format] || '.webp';
  }, []);

  return {
    images,
    isConverting,
    error,
    addImage,
    removeImage,
    clearAll,
    convertImage,
    convertAll,
    getConvertedImages,
    getExtension,
  };
};

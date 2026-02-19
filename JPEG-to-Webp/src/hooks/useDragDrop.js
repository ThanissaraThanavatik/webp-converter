import { useState, useCallback } from 'react';
import { isValidJPEGFile } from '../utils/fileUtils';

export const useDragDrop = (onFileDrop, acceptMultiple = false) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const files = Array.from(e.dataTransfer.files);
      if (files.length > 0) {
        if (acceptMultiple) {
          // Filter valid files
          const validFiles = files.filter((file) =>
            file.type.match(/image\/(jpeg|jpg|png)/i)
          );

          if (validFiles.length === 0) {
            setError('กรุณาเลือกไฟล์ JPEG, JPG หรือ PNG เท่านั้น');
            return;
          }

          setError(null);
          if (onFileDrop) {
            validFiles.forEach((file) => onFileDrop(file));
          }
        } else {
          const file = files[0];

          if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
            setError('กรุณาเลือกไฟล์ JPEG, JPG หรือ PNG เท่านั้น');
            return;
          }

          setError(null);
          if (onFileDrop) {
            onFileDrop(file);
          }
        }
      }
    },
    [onFileDrop, acceptMultiple]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        if (acceptMultiple) {
          const validFiles = files.filter((file) =>
            file.type.match(/image\/(jpeg|jpg|png)/i)
          );

          if (validFiles.length === 0) {
            setError('กรุณาเลือกไฟล์ JPEG, JPG หรือ PNG เท่านั้น');
            return;
          }

          setError(null);
          if (onFileDrop) {
            validFiles.forEach((file) => onFileDrop(file));
          }
        } else {
          const file = files[0];

          if (!file.type.match(/image\/(jpeg|jpg|png)/i)) {
            setError('กรุณาเลือกไฟล์ JPEG, JPG หรือ PNG เท่านั้น');
            return;
          }

          setError(null);
          if (onFileDrop) {
            onFileDrop(file);
          }
        }
      }
    },
    [onFileDrop, acceptMultiple]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    isDragging,
    error,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearError,
  };
};

import { useState, useCallback } from 'react';
import { isValidJPEGFile } from '../utils/fileUtils';

export const useDragDrop = (onFileDrop) => {
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

      const files = e.dataTransfer.files;
      if (files.length > 0) {
        const file = files[0];

        if (!isValidJPEGFile(file)) {
          setError('กรุณาเลือกไฟล์ JPEG หรือ JPG เท่านั้น');
          return;
        }

        setError(null);
        if (onFileDrop) {
          onFileDrop(file);
        }
      }
    },
    [onFileDrop]
  );

  const handleFileSelect = useCallback(
    (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!isValidJPEGFile(file)) {
          setError('กรุณาเลือกไฟล์ JPEG หรือ JPG เท่านั้น');
          return;
        }

        setError(null);
        if (onFileDrop) {
          onFileDrop(file);
        }
      }
    },
    [onFileDrop]
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

import { useState, useCallback, useEffect } from 'react';
import { Header } from './components/layout/Header';
import { DropZone } from './components/ui/DropZone';
import { SettingsSection } from './components/ui/SettingsSection';
import { PreviewSection } from './components/ui/PreviewSection';
import { InfoCards } from './components/ui/InfoCards';
import { useImageConverter } from './hooks/useImageConverter';
import { useDragDrop } from './hooks/useDragDrop';
import { formatFileSize, calculateSizeReduction, generateWebpFilename } from './utils/fileUtils';
import { THAI_TEXT } from './constants/thaiText';
import './assets/styles/main.css';

function App() {
  const [quality, setQuality] = useState(85);
  const [originalSrc, setOriginalSrc] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    originalFile,
    convertedDataUrl,
    convertedSize,
    isConverting,
    error: converterError,
    setOriginal,
    convertToWebP,
  } = useImageConverter();

  const {
    isDragging,
    error: dragError,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearError,
  } = useDragDrop(handleFileDrop);

  const handleFileDrop = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setOriginal(file, img);
        setOriginalSrc(e.target.result);
        setShowPreview(true);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [setOriginal]);

  const handleConvert = useCallback(async () => {
    await convertToWebP(quality / 100);
  }, [convertToWebP, quality]);

  const sizeReduction = originalFile && convertedSize
    ? calculateSizeReduction(originalFile.size, convertedSize)
    : null;

  // Prevent default drag behaviors on document
  useEffect(() => {
    const preventDefaults = (e) => {
      e.preventDefault();
      e.stopPropagation();
    };

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
      document.body.addEventListener(eventName, preventDefaults, false);
    });

    return () => {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName) => {
        document.body.removeEventListener(eventName, preventDefaults, false);
      });
    };
  }, []);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-slate-100 min-h-screen">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <Header />

        {/* Upload Zone */}
        <DropZone
          isDragging={isDragging}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onFileSelect={handleFileSelect}
          error={dragError}
          clearError={clearError}
        />

        {/* Settings Section */}
        {showPreview && (
          <SettingsSection
            quality={quality}
            onQualityChange={setQuality}
            onConvert={handleConvert}
            isConverting={isConverting}
          />
        )}

        {/* Preview Section */}
        {showPreview && (
          <PreviewSection
            originalSrc={originalSrc}
            convertedSrc={convertedDataUrl}
            originalSize={originalFile ? formatFileSize(originalFile.size) : '-'}
            convertedSize={convertedSize ? formatFileSize(convertedSize) : null}
            isConverting={isConverting}
            sizeReduction={sizeReduction}
            downloadUrl={convertedDataUrl || '#'}
            downloadFilename={originalFile ? generateWebpFilename(originalFile.name) : 'converted.webp'}
          />
        )}

        {/* Info Cards */}
        <InfoCards />

        {/* Error Display */}
        {converterError && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
            {converterError}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;

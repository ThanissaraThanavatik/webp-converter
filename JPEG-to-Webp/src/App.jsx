import { useState, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import { Header } from './components/layout/Header';
import { DropZone } from './components/ui/DropZone';
import { SettingsSection } from './components/ui/SettingsSection';
import { PreviewSection } from './components/ui/PreviewSection';
import { FileQueue } from './components/ui/FileQueue';
import { InfoCards } from './components/ui/InfoCards';
import { FormatSelector } from './components/ui/FormatSelector';
import { ResizeOptions } from './components/ui/ResizeOptions';
import { QualityPresets } from './components/ui/QualityPresets';
import { QualitySlider } from './components/ui/QualitySlider';
import { useImageConverter } from './hooks/useImageConverter';
import { useDragDrop } from './hooks/useDragDrop';
import { formatFileSize, calculateSizeReduction, generateWebpFilename } from './utils/fileUtils';
import { THAI_TEXT, OUTPUT_FORMATS, QUALITY_PRESETS } from './constants/thaiText';
import './assets/styles/main.css';

function App() {
  const [quality, setQuality] = useState(QUALITY_PRESETS.webOptimized);
  const [format, setFormat] = useState(OUTPUT_FORMATS.webp);
  const [resizeOptions, setResizeOptions] = useState(null);
  const [showPreview, setShowPreview] = useState(false);

  const {
    images,
    isConverting,
    error: converterError,
    addImage,
    removeImage,
    clearAll,
    convertImage,
    convertAll,
    getConvertedImages,
    getExtension,
  } = useImageConverter();

  const handleFileDrop = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const id = addImage(file, img);
        if (images.length === 0) {
          setShowPreview(true);
        }
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [addImage, images.length]);

  const {
    isDragging,
    error: dragError,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFileSelect,
    clearError,
  } = useDragDrop(handleFileDrop, true);

  const handleConvert = useCallback(async () => {
    if (images.length > 0) {
      await convertAll(format, quality / 100, resizeOptions);
    }
  }, [images, format, quality, resizeOptions, convertAll]);

  const handleDownload = useCallback((image) => {
    if (!image.convertedDataUrl) return;

    const link = document.createElement('a');
    link.href = image.convertedDataUrl;
    link.download = image.file.name.replace(/\.[^/.]+$/, '') + getExtension(format);
    link.click();
  }, [format, getExtension]);

  const handleDownloadAll = useCallback(async () => {
    const convertedImages = getConvertedImages();
    if (convertedImages.length === 0) return;

    const zip = new JSZip();
    const ext = getExtension(format);

    convertedImages.forEach((image) => {
      const filename = image.file.name.replace(/\.[^/.]+$/, '') + ext;
      // Convert data URL to binary
      const base64Data = image.convertedDataUrl.split(',')[1];
      zip.file(filename, base64Data, { base64: true });
    });

    const content = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = `converted-images${ext.replace('.', '-')}.zip`;
    link.click();
    URL.revokeObjectURL(link.href);
  }, [getConvertedImages, format, getExtension]);

  const primaryImage = images[0];
  const sizeReduction = primaryImage && primaryImage.convertedSize
    ? calculateSizeReduction(primaryImage.file.size, primaryImage.convertedSize)
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
    <div className="min-h-screen">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-purple-200/30 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-teal-200/30 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-pink-200/20 blur-3xl" />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
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

        {/* File Queue */}
        <FileQueue
          images={images}
          onRemove={removeImage}
          onDownload={handleDownload}
          onDownloadAll={handleDownloadAll}
        />

        {/* Settings Section */}
        {showPreview && (
          <div className="mb-10 p-8 rounded-3xl bg-white shadow-lg animate-fade-in animation-delay-300">
            {/* Quality Presets */}
            <QualityPresets quality={quality} onChange={setQuality} />

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              {/* Format Selector */}
              <FormatSelector format={format} onChange={setFormat} />

              {/* Resize Options */}
              <ResizeOptions options={resizeOptions} onChange={setResizeOptions} />
            </div>

            {/* Quality Slider */}
            <QualitySlider quality={quality} onChange={setQuality} />

            {/* Action Buttons */}
            <div className="flex justify-end mt-6">
              <button
                onClick={handleConvert}
                disabled={isConverting || images.length === 0}
                className={`
                  canva-btn-primary inline-flex items-center gap-3 px-8 py-4 text-base
                  ${isConverting || images.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                {isConverting ? (
                  <>
                    <svg className="w-5 h-5 canva-spinner" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    {images.length > 1 ? THAI_TEXT.settings.converting + ` (${images.length})` : THAI_TEXT.settings.converting}
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    {images.length > 1 ? THAI_TEXT.settings.convertAllButton : THAI_TEXT.settings.convertButton}
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {/* Preview Section - Show only for single image */}
        {showPreview && images.length === 1 && primaryImage && (
          <PreviewSection
            originalSrc={primaryImage.originalSrc}
            convertedSrc={primaryImage.convertedDataUrl}
            originalSize={formatFileSize(primaryImage.file.size)}
            convertedSize={primaryImage.convertedSize ? formatFileSize(primaryImage.convertedSize) : null}
            isConverting={primaryImage.isConverting}
            sizeReduction={sizeReduction}
            downloadUrl={primaryImage.convertedDataUrl || '#'}
            downloadFilename={primaryImage.file.name.replace(/\.[^/.]+$/, '') + getExtension(format)}
          />
        )}

        {/* Info Cards */}
        <InfoCards />

        {/* Error Display */}
        {converterError && (
          <div className="mt-8 p-6 rounded-3xl bg-red-50 border-2 border-red-200 text-red-600 text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {converterError}
            </div>
          </div>
        )}

        {/* Footer */}
        <footer className="mt-20 text-center animate-fade-in animation-delay-500">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/60 backdrop-blur-sm shadow-sm">
            <span className="text-sm" style={{ color: '#8E8E93' }}>
              Made with ❤️ for faster web • Batch conversion • Multiple formats
            </span>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;

import { useState, useCallback, useEffect } from 'react';
import JSZip from 'jszip';
import { Header } from './components/layout/Header';
import { DropZone } from './components/ui/DropZone';
import { HorizontalFileList } from './components/ui/HorizontalFileList';
import { CompactSettings } from './components/ui/CompactSettings';
import { PreviewSection } from './components/ui/PreviewSection';
import { FeatureGrid } from './components/ui/FeatureGrid';
import { useImageConverter } from './hooks/useImageConverter';
import { useDragDrop } from './hooks/useDragDrop';
import { formatFileSize, calculateSizeReduction } from './utils/fileUtils';
import { OUTPUT_FORMATS, QUALITY_PRESETS } from './constants/thaiText';
import './assets/styles/main.css';

function App() {
  const [quality, setQuality] = useState(QUALITY_PRESETS.webOptimized);
  const [format, setFormat] = useState(OUTPUT_FORMATS.webp);

  const {
    images,
    isConverting,
    error: converterError,
    addImage,
    removeImage,
    clearAll,
    convertAll,
    getConvertedImages,
    getExtension,
  } = useImageConverter();

  const handleFileDrop = useCallback((file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => addImage(file, img);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }, [addImage]);

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
    if (images.length > 0) await convertAll(format, quality / 100);
  }, [images, format, quality, convertAll]);

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
  const sizeReduction = primaryImage?.convertedSize
    ? calculateSizeReduction(primaryImage.file.size, primaryImage.convertedSize)
    : null;

  const convertedCount = images.filter(img => img.convertedDataUrl).length;
  const totalOriginalSize = images.reduce((sum, img) => sum + img.file.size, 0);
  const totalConvertedSize = images.reduce((sum, img) => sum + (img.convertedSize || 0), 0);
  const totalSaved = totalOriginalSize - totalConvertedSize;

  const formatDefs = [
    { value: OUTPUT_FORMATS.webp, label: 'WebP', desc: 'ลดขนาด 25-35% · เหมาะสำหรับเว็บ' },
    { value: OUTPUT_FORMATS.png,  label: 'PNG',  desc: 'ไม่สูญเสียคุณภาพ · ขนาดใหญ่กว่า' },
    { value: OUTPUT_FORMATS.avif, label: 'AVIF', desc: 'บีบอัดสูงสุด · ลดขนาด 40-50%' },
  ];
  const qualityPresets = [
    { value: QUALITY_PRESETS.smallestSize, label: 'เล็ก' },
    { value: QUALITY_PRESETS.webOptimized, label: 'เว็บ' },
    { value: QUALITY_PRESETS.highQuality,  label: 'สูง' },
  ];

  useEffect(() => {
    const preventDefaults = (e) => { e.preventDefault(); e.stopPropagation(); };
    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev =>
      document.body.addEventListener(ev, preventDefaults, false)
    );
    return () => ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(ev =>
      document.body.removeEventListener(ev, preventDefaults, false)
    );
  }, []);

  return (
    /* Full-viewport shell — dvh for mobile browser chrome, screen as fallback */
    <div className="flex flex-col overflow-hidden h-screen" style={{ height: '100dvh' }}>

      {/* ── Header ─────────────────────────────────────── */}
      <header className="shrink-0 bg-[var(--bg-card)] border-b border-[var(--border-subtle)] relative z-10">
        <div className="max-w-[1440px] mx-auto px-5 lg:px-8 py-3">
          <Header />
        </div>
      </header>

      {/* ── Body ────────────────────────────────────────── */}
      <div className="flex-1 min-h-0 overflow-hidden flex">
        <div className="w-full max-w-[1440px] mx-auto flex min-h-0 overflow-hidden">

          {/* ── Left — scrollable content ── */}
          <div className="flex-1 min-w-0 overflow-y-auto custom-scrollbar">
            <div className="px-5 lg:px-8 py-6 flex flex-col gap-5 min-h-full">

              {/* Drop zone */}
              <section className="animate-slide-up shrink-0">
                <DropZone
                  isDragging={isDragging}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onFileSelect={handleFileSelect}
                  error={dragError}
                  clearError={clearError}
                />
              </section>

              {/* File list */}
              {images.length > 0 && (
                <section className="animate-slide-up delay-100 shrink-0">
                  <HorizontalFileList
                    images={images}
                    onRemove={removeImage}
                    onClearAll={clearAll}
                    onDownload={handleDownload}
                    onDownloadAll={handleDownloadAll}
                  />
                </section>
              )}

              {/* Mobile-only inline settings */}
              {images.length > 0 && (
                <div className="lg:hidden card p-5 animate-slide-up delay-100 shrink-0">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.1em] text-[var(--text-muted)] mb-4">
                    การตั้งค่า
                  </p>
                  <CompactSettings
                    quality={quality}
                    format={format}
                    onQualityChange={setQuality}
                    onFormatChange={setFormat}
                    onConvert={handleConvert}
                    isConverting={isConverting}
                    imageCount={images.length}
                  />
                </div>
              )}

              {/* Preview (single image) */}
              {images.length === 1 && primaryImage && (
                <section className="animate-slide-up delay-200 shrink-0">
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
                </section>
              )}

              {/* Converter error */}
              {converterError && (
                <div className="p-4 bg-[var(--error-subtle)] border border-[var(--error)]/20 rounded-lg animate-slide-up shrink-0">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-[var(--error)] shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <span className="text-sm text-[var(--error)]">{converterError}</span>
                  </div>
                </div>
              )}

              {/* Empty state — feature grid */}
              {images.length === 0 && (
                <section className="animate-slide-up delay-200 flex-1 flex flex-col justify-end">
                  <FeatureGrid />
                </section>
              )}

              {/* Footer */}
              <footer className="mt-auto pt-5 border-t border-[var(--border-subtle)] shrink-0">
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>Client-side processing · Files never leave your device</span>
                  <span className="font-mono">v1.0</span>
                </div>
              </footer>
            </div>
          </div>

          {/* ── Right — sticky settings sidebar ── */}
          <aside className="hidden lg:flex flex-col w-72 xl:w-80 shrink-0 border-l border-[var(--border-subtle)] overflow-y-auto custom-scrollbar bg-[var(--bg-card)]">
            <div className="flex flex-col flex-1 p-5 gap-5">

              {/* Section: Output format */}
              <div>
                <p className="sidebar-label mb-3">รูปแบบไฟล์</p>
                <div className="flex gap-1">
                  {formatDefs.map((f) => (
                    <button
                      key={f.value}
                      onClick={() => setFormat(f.value)}
                      className={`flex-1 py-2 px-2 text-xs font-medium rounded-md transition-all ${
                        format === f.value
                          ? 'bg-[var(--accent-primary)] text-white shadow-sm'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
                <p className="text-[10px] text-[var(--text-muted)] mt-2 leading-relaxed">
                  {formatDefs.find(f => f.value === format)?.desc}
                </p>
              </div>

              <hr className="border-[var(--border-subtle)]" />

              {/* Section: Quality */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <p className="sidebar-label">คุณภาพ</p>
                  <span className="text-xs font-mono font-semibold text-[var(--text-primary)]">{quality}%</span>
                </div>

                <div className="flex gap-1 mb-3">
                  {qualityPresets.map((p) => (
                    <button
                      key={p.value}
                      onClick={() => setQuality(p.value)}
                      className={`flex-1 py-1.5 px-2 text-[10px] font-medium rounded-md transition-all ${
                        quality === p.value
                          ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]/40'
                          : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>

                <input
                  type="range"
                  min="1"
                  max="100"
                  value={quality}
                  onChange={(e) => setQuality(parseInt(e.target.value))}
                  className="slider"
                />
              </div>

              {/* Convert + Download — when files loaded */}
              {images.length > 0 && (
                <>
                  <hr className="border-[var(--border-subtle)]" />

                  <div className="space-y-2">
                    <button
                      onClick={handleConvert}
                      disabled={isConverting}
                      className="w-full btn-primary py-3"
                    >
                      {isConverting ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                          </svg>
                          กำลังแปลง...
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          {images.length > 1 ? `แปลง ${images.length} ไฟล์` : 'แปลงไฟล์'}
                        </>
                      )}
                    </button>

                    {convertedCount > 0 && (
                      <button
                        onClick={handleDownloadAll}
                        className="w-full btn-secondary text-sm py-2.5"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                        ดาวน์โหลดทั้งหมด ({convertedCount})
                      </button>
                    )}
                  </div>
                </>
              )}

              {/* Stats panel — when files loaded */}
              {images.length > 0 && (
                <>
                  <hr className="border-[var(--border-subtle)]" />

                  <div>
                    <p className="sidebar-label mb-3">สถานะ</p>

                    <div className="space-y-2.5">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--text-secondary)]">ไฟล์ทั้งหมด</span>
                        <span className="text-sm font-mono text-[var(--text-primary)]">{images.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-[var(--text-secondary)]">แปลงแล้ว</span>
                        <span className={`text-sm font-mono ${
                          convertedCount === images.length && images.length > 0
                            ? 'text-[var(--success)]'
                            : 'text-[var(--text-primary)]'
                        }`}>
                          {convertedCount} / {images.length}
                        </span>
                      </div>
                      {totalOriginalSize > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[var(--text-secondary)]">ขนาดต้นฉบับ</span>
                          <span className="text-sm font-mono text-[var(--text-muted)]">
                            {formatFileSize(totalOriginalSize)}
                          </span>
                        </div>
                      )}
                      {totalSaved > 0 && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-[var(--text-secondary)]">ประหยัดได้</span>
                          <span className="text-sm font-mono text-[var(--success)]">
                            -{((totalSaved / totalOriginalSize) * 100).toFixed(0)}%
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Thin conversion progress */}
                    <div className="mt-4 h-px bg-[var(--border-subtle)] rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[var(--accent-primary)] rounded-full transition-all duration-700 ease-out"
                        style={{ width: `${images.length > 0 ? (convertedCount / images.length) * 100 : 0}%` }}
                      />
                    </div>
                  </div>
                </>
              )}

            </div>
          </aside>

        </div>
      </div>
    </div>
  );
}

export default App;

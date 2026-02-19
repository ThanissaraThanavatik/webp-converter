import { formatFileSize } from '../../utils/fileUtils';

export const HorizontalFileList = ({ images, onRemove, onDownload, onDownloadAll, onClearAll }) => {
  if (images.length === 0) return null;

  const convertedCount = images.filter(img => img.convertedDataUrl).length;
  const allConverted = convertedCount === images.length;

  return (
    <div className="space-y-3">
      {/* Header Stats */}
      <div className="flex items-center justify-between flex-wrap gap-y-1.5">
        <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
          <span className="text-sm text-[var(--text-muted)]">
            <span className="font-semibold text-[var(--text-primary)]">{images.length}</span> ไฟล์
          </span>
          {convertedCount > 0 && (
            <span className="text-sm text-[var(--success)]">
              แปลงแล้ว {convertedCount}
            </span>
          )}
          <div className="h-4 w-px bg-[var(--border-subtle)] hidden sm:block"></div>
          <button
            onClick={onClearAll}
            className="text-xs text-[var(--text-muted)] hover:text-[var(--error)] transition-colors"
          >
            ล้างทั้งหมด
          </button>
        </div>

        {convertedCount > 0 && (
          <button
            onClick={onDownloadAll}
            className="text-xs font-medium text-[var(--accent-primary)] hover:underline"
          >
            ดาวน์โหลดทั้งหมด
          </button>
        )}
      </div>

      {/* Progress Bar */}
      {convertedCount > 0 && convertedCount < images.length && (
        <div className="progress-bar h-1">
          <div
            className="progress-bar-fill bg-[var(--accent-primary)]"
            style={{ width: `${(convertedCount / images.length) * 100}%` }}
          />
        </div>
      )}

      {/* Horizontal Scrollable List */}
      <div className="relative">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-[var(--border-medium)] scrollbar-track-transparent">
          {images.map((image, index) => {
            const hasConverted = !!image.convertedDataUrl;
            const isConverting = image.isConverting;
            const reduction = hasConverted
              ? ((image.file.size - image.convertedSize) / image.file.size) * 100
              : null;

            return (
              <div
                key={image.id}
                className="flex-shrink-0 w-32 group"
              >
                {/* Thumbnail Container */}
                <div className="relative aspect-square rounded-lg overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-subtle)]">
                  <img
                    src={hasConverted ? image.convertedDataUrl : image.originalSrc}
                    alt={image.file.name}
                    className="w-full h-full object-cover"
                  />

                  {/* Status Badge */}
                  <div className="absolute top-1.5 right-1.5">
                    {hasConverted && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--success)] text-white">
                        <svg className="w-2.5 h-2.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    )}
                    {isConverting && (
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[var(--accent-primary)]">
                        <svg className="w-2.5 h-2.5 text-white animate-spin" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      </span>
                    )}
                  </div>

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1">
                    {hasConverted && (
                      <button
                        onClick={() => onDownload(image)}
                        className="p-1.5 rounded-md bg-white/20 text-white hover:bg-white/30"
                        title="ดาวน์โหลด"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={() => onRemove(image.id)}
                      className="p-1.5 rounded-md bg-white/20 text-white hover:bg-red-500"
                      title="ลบ"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* File Info */}
                <div className="mt-1.5">
                  <p className="text-xs text-[var(--text-secondary)] truncate">
                    {image.file.name}
                  </p>                  <div className="flex items-center gap-1 text-xs">
                    <span className="text-[var(--text-muted)] font-mono">{formatFileSize(image.file.size)}</span>
                    {hasConverted && reduction !== null && (
                      <span className={`font-medium ${reduction > 0 ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                        {reduction > 0 ? '↓' : '↑'}{Math.abs(reduction).toFixed(0)}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

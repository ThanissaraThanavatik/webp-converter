import { formatFileSize } from '../../utils/fileUtils';

export const FileQueue = ({ images, onRemove, onClearAll, onDownload, onDownloadAll }) => {
  if (images.length === 0) return null;

  const convertedCount = images.filter(img => img.convertedDataUrl).length;

  return (
    <div className="card p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="label">รายการไฟล์</span>
          <span className="inline-code">{images.length}</span>
        </div>
        <div className="flex items-center gap-2">
          {convertedCount > 0 && (
            <button onClick={onDownloadAll} className="btn-primary">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              ดาวน์โหลดทั้งหมด
            </button>
          )}
          {images.length > 1 && (
            <button onClick={onClearAll} className="btn-ghost danger">
              ล้างทั้งหมด
            </button>
          )}
        </div>
      </div>

      {/* Grid view for 4+ files */}
      {images.length >= 4 ? (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((image, index) => {
            const hasConverted = !!image.convertedDataUrl;
            const isConverting = image.isConverting;
            const reduction = hasConverted
              ? ((image.file.size - image.convertedSize) / image.file.size) * 100
              : null;

            return (
              <div
                key={image.id}
                className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--accent-primary)] transition-all duration-200"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Thumbnail */}
                <img
                  src={hasConverted ? image.convertedDataUrl : image.originalSrc}
                  alt={image.file.name}
                  className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
                />

                {/* Status indicator */}
                {hasConverted && (
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--success)] rounded-full border-2 border-white"></div>
                )}
                {isConverting && (
                  <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-[var(--accent-primary)] rounded-full border-2 border-white animate-pulse"></div>
                )}

                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center p-2">
                  <p className="text-white text-xs font-medium truncate w-full text-center mb-1">
                    {image.file.name}
                  </p>
                  <div className="flex items-center gap-1 text-white/80 text-xs mb-1 font-mono">
                    <span>{formatFileSize(image.file.size)}</span>
                    {hasConverted && (
                      <>
                        <span>→</span>
                        <span className="text-[var(--success)]">{formatFileSize(image.convertedSize)}</span>
                      </>
                    )}
                  </div>
                  {reduction !== null && (
                    <span className={`text-xs font-medium ${reduction > 0 ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                      {reduction > 0 ? '-' : '+'}{Math.abs(reduction).toFixed(0)}%
                    </span>
                  )}
                  <div className="flex items-center gap-2 mt-2">
                    {hasConverted && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onDownload(image);
                        }}
                        className="icon-btn bg-white/20 hover:bg-white/30 text-white border-white/20"
                        title="ดาวน์โหลด"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                        </svg>
                      </button>
                    )}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemove(image.id);
                      }}
                      className="icon-btn bg-white/20 hover:bg-red-500 text-white border-white/20"
                      title="ลบ"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* File List for 1-3 files */
        <div className="space-y-2">
          {images.map((image, index) => {
            const hasConverted = !!image.convertedDataUrl;
            const isConverting = image.isConverting;
            const reduction = hasConverted
              ? ((image.file.size - image.convertedSize) / image.file.size) * 100
              : null;

            return (
              <div
                key={image.id}
                className="card p-3 flex items-center gap-3 animate-slide-up hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                {/* Thumbnail */}
                <div className="thumbnail">
                  <img
                    src={hasConverted ? image.convertedDataUrl : image.originalSrc}
                    alt={image.file.name}
                  />
                </div>

                {/* File Info */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate">
                    {image.file.name}
                  </p>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-[var(--text-muted)] font-mono">
                      {formatFileSize(image.file.size)}
                    </span>
                    {hasConverted && (
                      <>
                        <span className="text-xs text-[var(--text-muted)]">→</span>
                        <span className="text-xs text-[var(--accent-primary)] font-mono font-medium">
                          {formatFileSize(image.convertedSize)}
                        </span>
                        {reduction !== null && (
                          <span className={`text-xs font-medium ${reduction > 0 ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
                            {reduction > 0 ? '-' : '+'}{Math.abs(reduction).toFixed(0)}%
                          </span>
                        )}
                      </>
                    )}
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center gap-2">
                  {isConverting && (
                    <span className="badge badge-process">
                      <svg className="w-3 h-3 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                      </svg>
                      กำลังแปลง
                    </span>
                  )}
                  {hasConverted && (
                    <span className="badge badge-success">
                      <span className="status-dot success"></span>
                      เสร็จสิ้น
                    </span>
                  )}
                  {hasConverted && (
                    <button
                      onClick={() => onDownload(image)}
                      className="icon-btn"
                      title="ดาวน์โหลด"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                    </button>
                  )}
                  <button
                    onClick={() => onRemove(image.id)}
                    className="icon-btn danger"
                    title="ลบ"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Progress Bar */}
      {convertedCount > 0 && convertedCount < images.length && (
        <div className="mt-4">
          <div className="progress-bar">
            <div
              className="progress-bar-fill bg-[var(--accent-primary)]"
              style={{ width: `${(convertedCount / images.length) * 100}%` }}
            />
          </div>
          <p className="text-xs text-[var(--text-muted)] mt-2 text-center font-mono">
            {convertedCount} / {images.length} ไฟล์
          </p>
        </div>
      )}
    </div>
  );
};

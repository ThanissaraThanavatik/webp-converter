import { useState } from 'react';

export const PreviewSection = ({
  originalSrc,
  convertedSrc,
  originalSize,
  convertedSize,
  isConverting,
  sizeReduction,
  downloadUrl,
  downloadFilename,
}) => {
  const [isExpanded, setIsExpanded] = useState(true);

  return (
    <div className="card overflow-hidden">
      {/* Collapsible Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full px-4 py-3 flex items-center justify-between bg-[var(--bg-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
      >
        <div className="flex items-center gap-3">
          <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span className="text-sm font-medium text-[var(--text-primary)]">เปรียบเทียบรูปภาพ</span>
          {sizeReduction && (
            <span className={`text-xs font-medium ${sizeReduction.isReduction ? 'text-[var(--success)]' : 'text-[var(--warning)]'}`}>
              {sizeReduction.text}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {convertedSrc && (
            <a
              href={downloadUrl}
              download={downloadFilename}
              onClick={(e) => e.stopPropagation()}
              className="text-xs text-[var(--accent-primary)] hover:underline"
            >
              ดาวน์โหลด
            </a>
          )}
          <svg 
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24" 
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Collapsible Content */}
      <div className={`
        overflow-hidden transition-all duration-300 ease-in-out
        ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
      `}>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Original */}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1.5 font-medium">ต้นฉบับ</p>
              <div className="aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border-subtle)]">
                <img
                  src={originalSrc}
                  alt="Original"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-mono text-center">{originalSize}</p>
            </div>

            {/* Converted */}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1.5 font-medium">ผลลัพธ์</p>
              <div className="aspect-square bg-[var(--bg-secondary)] rounded-lg overflow-hidden border border-[var(--border-subtle)] relative">
                {isConverting ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <svg className="w-6 h-6 text-[var(--text-muted)] animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                  </div>
                ) : convertedSrc ? (
                  <img
                    src={convertedSrc}
                    alt="Converted"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xs text-[var(--text-muted)]">ยังไม่ได้แปลง</span>
                  </div>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)] mt-1.5 font-mono text-center">
                {convertedSize || '-'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

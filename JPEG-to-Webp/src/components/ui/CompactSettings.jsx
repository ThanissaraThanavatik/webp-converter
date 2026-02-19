import { useState } from 'react';
import { THAI_TEXT, OUTPUT_FORMATS, QUALITY_PRESETS } from '../../constants/thaiText';

export const CompactSettings = ({
  quality,
  format,
  onQualityChange,
  onFormatChange,
  onConvert,
  isConverting,
  imageCount,
}) => {
  const formats = [
    { value: OUTPUT_FORMATS.webp, label: 'WebP' },
    { value: OUTPUT_FORMATS.png, label: 'PNG' },
    { value: OUTPUT_FORMATS.avif, label: 'AVIF' },
  ];

  const presets = [
    { value: QUALITY_PRESETS.smallestSize, label: 'เล็ก' },
    { value: QUALITY_PRESETS.webOptimized, label: 'เว็บ' },
    { value: QUALITY_PRESETS.highQuality, label: 'สูง' },
  ];

  return (
    <div className="space-y-4">
      {/* Format Quick Select */}
      <div>
        <span className="text-xs font-medium text-[var(--text-muted)] mb-2 block">รูปแบบ</span>
        <div className="flex gap-1">
          {formats.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => onFormatChange(fmt.value)}
              className={`
                flex-1 py-2 px-3 text-xs font-medium rounded-md transition-all
                ${format === fmt.value 
                  ? 'bg-[var(--accent-primary)] text-white' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)]'
                }
              `}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Quality Presets */}
      <div>
        <span className="text-xs font-medium text-[var(--text-muted)] mb-2 block">คุณภาพ ({quality}%)</span>
        <div className="flex gap-1 mb-3">
          {presets.map((preset) => (
            <button
              key={preset.value}
              onClick={() => onQualityChange(preset.value)}
              className={`
                flex-1 py-1.5 px-2 text-xs rounded-md transition-all
                ${quality === preset.value 
                  ? 'bg-[var(--accent-subtle)] text-[var(--accent-primary)] border border-[var(--accent-primary)]' 
                  : 'bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:bg-[var(--bg-hover)]'
                }
              `}
            >
              {preset.label}
            </button>
          ))}
        </div>
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => onQualityChange(parseInt(e.target.value))}
          className="slider"
        />
      </div>

      {/* Convert Button */}
      <button
        onClick={onConvert}
        disabled={isConverting}
        className="w-full btn-primary py-3"
      >
        {isConverting ? (
          <>
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>กำลังแปลง...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>{imageCount > 1 ? `แปลง ${imageCount} ไฟล์` : 'แปลงไฟล์'}</span>
          </>
        )}
      </button>
    </div>
  );
};

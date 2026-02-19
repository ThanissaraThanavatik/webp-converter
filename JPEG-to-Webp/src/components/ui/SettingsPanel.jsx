import { useState } from 'react';
import { THAI_TEXT, OUTPUT_FORMATS, QUALITY_PRESETS } from '../../constants/thaiText';

export const SettingsPanel = ({
  quality,
  format,
  resizeOptions,
  onQualityChange,
  onFormatChange,
  onResizeChange,
  onConvert,
  isConverting,
  imageCount,
}) => {
  const [presetsExpanded, setPresetsExpanded] = useState(true);
  const [sliderExpanded, setSliderExpanded] = useState(true);

  const formats = [
    { value: OUTPUT_FORMATS.webp, label: 'WebP' },
    { value: OUTPUT_FORMATS.png, label: 'PNG' },
    { value: OUTPUT_FORMATS.avif, label: 'AVIF' },
  ];

  const presets = [
    { key: 'smallestSize', label: THAI_TEXT.presets.smallestSize, value: QUALITY_PRESETS.smallestSize, hint: 'ไฟล์เล็กสุด' },
    { key: 'webOptimized', label: THAI_TEXT.presets.webOptimized, value: QUALITY_PRESETS.webOptimized, hint: 'เหมาะกับเว็บ' },
    { key: 'highQuality', label: THAI_TEXT.presets.highQuality, value: QUALITY_PRESETS.highQuality, hint: 'คุณภาพสูงสุด' },
  ];

  return (
    <div className="card p-5 h-full flex flex-col">
      {/* Format Selection */}
      <div className="mb-4">
        <span className="label">{THAI_TEXT.format.title}</span>
        <div className="btn-group">
          {formats.map((fmt) => (
            <button
              key={fmt.value}
              onClick={() => onFormatChange(fmt.value)}
              className={`btn-group-item ${format === fmt.value ? 'active' : ''}`}
            >
              {fmt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="divider my-4" />

      {/* Quality Presets - Collapsible */}
      <div className="mb-4">
        <button
          onClick={() => setPresetsExpanded(!presetsExpanded)}
          className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
        >
          <span className="label mb-0">{THAI_TEXT.presets.title}</span>
          <svg
            className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${presetsExpanded ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        <div className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${presetsExpanded ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}>
          <div className="grid grid-cols-3 gap-2">
            {presets.map((preset) => (
              <button
                key={preset.key}
                onClick={() => onQualityChange(preset.value)}
                className={`preset-card ${quality === preset.value ? 'active' : ''}`}
              >
                <span className="text-sm font-medium">{preset.label}</span>
                <span className={`text-xs mt-1 ${quality === preset.value ? 'text-white/70' : 'text-[var(--text-muted)]'}`}>
                  {preset.hint}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Quality Slider - Collapsible */}
      <div className="mb-4">
        <button
          onClick={() => setSliderExpanded(!sliderExpanded)}
          className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-[var(--bg-hover)] transition-colors"
        >
          <span className="label mb-0">{THAI_TEXT.settings.qualityLabel}</span>
          <div className="flex items-center gap-2">
            <span className="inline-code">{quality}%</span>
            <svg
              className={`w-4 h-4 text-[var(--text-muted)] transition-transform duration-200 ${sliderExpanded ? 'rotate-180' : ''}`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>
        <div className={`
          overflow-hidden transition-all duration-200 ease-in-out
          ${sliderExpanded ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0'}
        `}>
          <input
            type="range"
            min="1"
            max="100"
            value={quality}
            onChange={(e) => onQualityChange(parseInt(e.target.value))}
            className="slider"
          />
          <p className="text-xs text-[var(--text-muted)] mt-2">
            {THAI_TEXT.settings.qualityHint}
          </p>
        </div>
      </div>

      {/* Spacer to push button to bottom */}
      <div className="flex-1"></div>

      <div className="divider my-4" />

      {/* Action Button */}
      <div className="flex justify-end">
        <button
          onClick={onConvert}
          disabled={isConverting}
          className="btn-primary"
        >
          {isConverting ? (
            <>
              <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              {THAI_TEXT.settings.converting}
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {imageCount > 1 ? THAI_TEXT.settings.convertAllButton : THAI_TEXT.settings.convertButton}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

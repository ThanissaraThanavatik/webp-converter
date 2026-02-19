import { THAI_TEXT } from '../../constants/thaiText';

export const QualitySlider = ({ quality, onChange }) => {
  const getQualityColor = (q) => {
    if (q < 50) return '#EF4444';
    if (q < 80) return '#F59E0B';
    return '#10B981';
  };

  const qualityColor = getQualityColor(quality);

  return (
    <div className="flex-1">
      <div className="flex items-center justify-between mb-3">
        <label className="text-base font-semibold" style={{ color: '#1F2937' }}>
          {THAI_TEXT.settings.qualityLabel}
        </label>
        <div className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-full transition-colors duration-300"
            style={{ backgroundColor: qualityColor }}
          />
          <span className="text-2xl font-bold" style={{ color: qualityColor }}>
            {quality}%
          </span>
        </div>
      </div>

      <div className="relative">
        {/* Slider */}
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="seedream-slider w-full"
        />

        {/* Quality labels */}
        <div className="flex justify-between mt-3 text-xs" style={{ color: '#9CA3AF' }}>
          <span>ไฟล์เล็ก</span>
          <span>คุณภาพสูง</span>
        </div>
      </div>

      <p className="text-xs mt-3 px-4 py-2 rounded-xl bg-blue-50 text-center" style={{ color: '#4B5563' }}>
        {THAI_TEXT.settings.qualityHint}
      </p>
    </div>
  );
};

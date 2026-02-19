import { THAI_TEXT } from '../../constants/thaiText';

export const QualitySlider = ({ quality, onChange }) => {
  return (
    <div className="flex-1">
      <label className="block text-sm font-semibold text-slate-700 mb-2">
        {THAI_TEXT.settings.qualityLabel}
      </label>
      <div className="flex items-center gap-4">
        <input
          type="range"
          min="1"
          max="100"
          value={quality}
          onChange={(e) => onChange(parseInt(e.target.value, 10))}
          className="slider-thumb flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
        />
        <span className="text-lg font-bold text-blue-600 w-16 text-right">{quality}%</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{THAI_TEXT.settings.qualityHint}</p>
    </div>
  );
};

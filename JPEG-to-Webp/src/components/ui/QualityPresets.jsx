import { THAI_TEXT, QUALITY_PRESETS } from '../../constants/thaiText';

export const QualityPresets = ({ quality, onChange }) => {
  const presets = [
    {
      key: 'smallestSize',
      label: THAI_TEXT.presets.smallestSize,
      value: QUALITY_PRESETS.smallestSize,
      color: 'from-amber-400 to-orange-500',
      icon: '⚡',
    },
    {
      key: 'webOptimized',
      label: THAI_TEXT.presets.webOptimized,
      value: QUALITY_PRESETS.webOptimized,
      color: 'from-blue-500 to-indigo-500',
      icon: '🌐',
    },
    {
      key: 'highQuality',
      label: THAI_TEXT.presets.highQuality,
      value: QUALITY_PRESETS.highQuality,
      color: 'from-indigo-500 to-purple-500',
      icon: '✨',
    },
  ];

  return (
    <div className="mb-6">
      <label className="block text-base font-semibold mb-3" style={{ color: '#1F2937' }}>
        {THAI_TEXT.presets.title}
      </label>
      <div className="grid grid-cols-3 gap-3">
        {presets.map((preset) => (
          <button
            key={preset.key}
            onClick={() => onChange(preset.value)}
            className={`
              relative px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200
              ${quality === preset.value
                ? `bg-gradient-to-r ${preset.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
              }
            `}
          >
            <span className="text-lg mr-1">{preset.icon}</span>
            <span className="text-xs">{preset.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

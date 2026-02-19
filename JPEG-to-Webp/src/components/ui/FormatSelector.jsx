import { THAI_TEXT, OUTPUT_FORMATS } from '../../constants/thaiText';

export const FormatSelector = ({ format, onChange }) => {
  const formats = [
    { value: OUTPUT_FORMATS.webp, label: THAI_TEXT.format.webp, color: 'from-blue-500 to-blue-600', textColor: 'text-blue-600' },
    { value: OUTPUT_FORMATS.png, label: THAI_TEXT.format.png, color: 'from-indigo-500 to-indigo-600', textColor: 'text-indigo-600' },
    { value: OUTPUT_FORMATS.avif, label: THAI_TEXT.format.avif, color: 'from-purple-500 to-purple-600', textColor: 'text-purple-600' },
  ];

  return (
    <div className="flex-1">
      <label className="block text-base font-semibold mb-3" style={{ color: '#1F2937' }}>
        {THAI_TEXT.format.title}
      </label>
      <div className="flex gap-3">
        {formats.map((fmt) => (
          <button
            key={fmt.value}
            onClick={() => onChange(fmt.value)}
            className={`
              relative flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-200
              ${format === fmt.value
                ? `bg-gradient-to-r ${fmt.color} text-white shadow-lg scale-105`
                : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
              }
            `}
          >
            {fmt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

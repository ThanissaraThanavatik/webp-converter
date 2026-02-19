import { THAI_TEXT } from '../../constants/thaiText';

const PreviewCard = ({
  label,
  src,
  size,
  badgeColor,
  gradientBg,
  icon,
  isConverting
}) => (
  <div className="canva-card overflow-hidden hover-scale">
    {/* Header */}
    <div
      className={`px-6 py-5 flex items-center gap-3 ${gradientBg}`}
    >
      <span className={`w-3 h-3 rounded-full ${badgeColor}`} />
      <h3 className="font-semibold text-lg" style={{ color: '#1C1C1E' }}>
        {label}
      </h3>
    </div>

    {/* Image container */}
    <div className="p-6">
      <div className="aspect-video rounded-2xl overflow-hidden mb-4 bg-gray-100 relative">
        {src ? (
          <img className="w-full h-full object-contain" src={src} alt={label} />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-3 opacity-30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {icon}
            </svg>
            <span className="text-sm opacity-50">รอการแปลง...</span>
          </div>
        )}

        {/* Converting overlay */}
        {isConverting && (
          <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm flex items-center justify-center">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-3 rounded-2xl canva-glass">
                <svg className="w-8 h-8 text-white canva-spinner" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
              </div>
              <span className="text-white font-medium">{THAI_TEXT.preview.converting}</span>
            </div>
          </div>
        )}
      </div>

      {/* File size */}
      <div className="flex justify-between items-center text-sm">
        <span style={{ color: '#8E8E93' }}>{THAI_TEXT.preview.fileSize}</span>
        <span className={`font-semibold ${size ? 'text-purple-600' : 'opacity-50'}`} style={{ fontSize: '15px' }}>
          {size || '-'}
        </span>
      </div>
    </div>
  </div>
);

export const ImagePreview = ({
  originalSrc,
  convertedSrc,
  originalSize,
  convertedSize,
  isConverting,
  sizeReduction
}) => {
  return (
    <>
      <div className="grid md:grid-cols-2 gap-6 mb-10 animate-fade-in animation-delay-400">
        {/* Original */}
        <PreviewCard
          label={THAI_TEXT.preview.originalLabel}
          src={originalSrc}
          size={originalSize}
          badgeColor="bg-gray-400"
          gradientBg="bg-gray-50"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
        />

        {/* Converted */}
        <PreviewCard
          label={THAI_TEXT.preview.convertedLabel}
          src={convertedSrc}
          size={convertedSize}
          badgeColor="bg-purple-500"
          gradientBg="bg-gradient-to-r from-purple-50 to-teal-50"
          icon={<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />}
          isConverting={isConverting}
        />
      </div>

      {/* Size reduction badge */}
      {sizeReduction && (
        <div className="flex justify-center mb-8 animate-fade-in animation-delay-500">
          <div className={`
            inline-flex items-center gap-3 px-6 py-4 rounded-2xl shadow-lg
            ${sizeReduction.isReduction
              ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200'
              : 'bg-gradient-to-r from-orange-50 to-red-50 border-2 border-orange-200'
            }
          `}>
            <div className={`
              w-10 h-10 rounded-xl flex items-center justify-center
              ${sizeReduction.isReduction ? 'bg-green-500' : 'bg-orange-500'}
            `}>
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {sizeReduction.isReduction ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 10l7-7m0 0l7 7m-7-7v18" />
                )}
              </svg>
            </div>
            <div>
              <p className="text-xs" style={{ color: '#8E8E93' }}>ขนาดไฟล์</p>
              <p className={`text-lg font-bold ${sizeReduction.className || 'text-gray-700'}`}>
                {sizeReduction.text}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

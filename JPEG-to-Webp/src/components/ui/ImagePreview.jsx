import { THAI_TEXT } from '../../constants/thaiText';

export const ImagePreview = ({ originalSrc, convertedSrc, originalSize, convertedSize, isConverting, sizeReduction }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mb-8">
      {/* Original */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-slate-400 rounded-full"></span>
            {THAI_TEXT.preview.originalLabel}
          </h3>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4">
            <img className="w-full h-full object-contain" src={originalSrc} alt="Original" />
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-slate-500">{THAI_TEXT.preview.fileSize}</span>
            <span className="font-semibold text-slate-700">{originalSize}</span>
          </div>
        </div>
      </div>

      {/* Converted */}
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-purple-50 px-6 py-4 border-b border-blue-100">
          <h3 className="font-semibold text-slate-700 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            {THAI_TEXT.preview.convertedLabel}
          </h3>
        </div>
        <div className="p-6">
          <div className="aspect-video bg-slate-100 rounded-xl overflow-hidden mb-4 relative">
            {convertedSrc ? (
              <img className="w-full h-full object-contain" src={convertedSrc} alt="Converted" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
            {isConverting && (
              <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
                <div className="text-white text-center">
                  <svg className="animate-spin h-10 w-10 mx-auto mb-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  <span className="text-sm font-medium">{THAI_TEXT.preview.converting}</span>
                </div>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{THAI_TEXT.preview.fileSize}</span>
              <span className={`font-semibold text-blue-600 ${convertedSize ? '' : 'opacity-50'}`}>
                {convertedSize || '-'}
              </span>
            </div>
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-500">{THAI_TEXT.preview.sizeReduction}</span>
              <span className={`font-semibold ${sizeReduction?.className || 'opacity-50'}`}>
                {sizeReduction?.text || '-'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

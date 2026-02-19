import { THAI_TEXT } from '../../constants/thaiText';
import { ImagePreview } from './ImagePreview';

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
  return (
    <div>
      <ImagePreview
        originalSrc={originalSrc}
        convertedSrc={convertedSrc}
        originalSize={originalSize}
        convertedSize={convertedSize}
        isConverting={isConverting}
        sizeReduction={sizeReduction}
      />

      {/* Download Section */}
      {convertedSrc && (
        <div className="text-center animate-fade-in animation-delay-500">
          <div className="inline-flex flex-col items-center">
            <a
              href={downloadUrl}
              download={downloadFilename}
              className="group relative inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-500 to-emerald-600 text-white text-lg font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
            >
              <svg className="w-6 h-6 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {THAI_TEXT.preview.downloadButton}
            </a>
            <p className="mt-4 text-sm" style={{ color: '#8E8E93' }}>
              ไฟล์: <span className="font-medium" style={{ color: '#636366' }}>{downloadFilename}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

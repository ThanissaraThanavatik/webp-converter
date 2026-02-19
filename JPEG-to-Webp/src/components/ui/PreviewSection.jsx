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

      {/* Download Button */}
      {convertedSrc && (
        <div className="text-center">
          <a
            href={downloadUrl}
            download={downloadFilename}
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            {THAI_TEXT.preview.downloadButton}
          </a>
          <p className="text-slate-500 mt-3 text-sm">{THAI_TEXT.preview.downloadHint}</p>
        </div>
      )}
    </div>
  );
};

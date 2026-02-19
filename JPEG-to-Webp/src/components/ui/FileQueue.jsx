import { THAI_TEXT } from '../../constants/thaiText';
import { formatFileSize } from '../../utils/fileUtils';

export const FileQueue = ({ images, onRemove, onDownload, onDownloadAll }) => {
  if (images.length === 0) return null;

  return (
    <div className="mb-8 animate-fade-in animation-delay-300">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold" style={{ color: '#1C1C1E' }}>
          {THAI_TEXT.batch.title} ({images.length})
        </h3>
        <div className="flex gap-2">
          {images.filter((img) => img.convertedDataUrl).length > 0 && (
            <button onClick={onDownloadAll} className="canva-btn-secondary inline-flex items-center gap-2 px-4 py-2 text-sm">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {THAI_TEXT.batch.downloadAll}
            </button>
          )}
          <button
            onClick={() => {/* TODO: clear all */}}
            className="px-4 py-2 text-sm text-gray-500 hover:text-red-500 transition-colors"
          >
            {THAI_TEXT.batch.clearAll}
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {images.map((image, index) => (
          <div
            key={image.id}
            className="canva-card p-4 flex items-center gap-4 animate-fade-in"
            style={{ animationDelay: `${300 + index * 50}ms` }}
          >
            {/* Thumbnail */}
            <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 flex-shrink-0">
              <img
                src={image.convertedDataUrl || image.originalSrc}
                alt={image.file.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm truncate" style={{ color: '#1C1C1E' }}>
                {image.file.name}
              </p>
              <div className="flex items-center gap-4 mt-1 text-xs" style={{ color: '#8E8E93' }}>
                <span>{formatFileSize(image.file.size)}</span>
                {image.convertedDataUrl && (
                  <>
                    <span>→</span>
                    <span className="text-purple-600 font-medium">
                      {formatFileSize(image.convertedSize)}
                    </span>
                    <span className={`text-xs ${
                      image.convertedSize < image.file.size ? 'text-green-600' : 'text-orange-600'
                    }`}>
                      {(((image.file.size - image.convertedSize) / image.file.size) * 100).toFixed(0)}%
                    </span>
                  </>
                )}
              </div>
            </div>

            {/* Status */}
            <div className="flex items-center gap-2">
              {image.isConverting && (
                <div className="px-3 py-1 rounded-full bg-purple-100 text-purple-600 text-xs font-medium animate-pulse">
                  {THAI_TEXT.settings.converting}
                </div>
              )}
              {image.convertedDataUrl && (
                <button
                  onClick={() => onDownload(image)}
                  className="px-3 py-1 rounded-full bg-green-100 text-green-600 text-xs font-medium hover:bg-green-200 transition-colors"
                >
                  {THAI_TEXT.preview.downloadButton}
                </button>
              )}
              <button
                onClick={() => onRemove(image.id)}
                className="p-2 rounded-full hover:bg-red-100 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

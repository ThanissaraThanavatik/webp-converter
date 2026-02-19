import { useRef, useState } from 'react';
import { THAI_TEXT } from '../../constants/thaiText';

export const DropZone = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  error,
  clearError,
}) => {
  const fileInputRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    clearError?.();
    fileInputRef.current?.click();
  };

  return (
    <div className="mb-10 animate-fade-in animation-delay-200">
      <div
        className={`
          relative overflow-hidden rounded-3xl p-12 text-center transition-all duration-300 cursor-pointer
          ${isDragging
            ? 'border-4 border-purple-500 bg-purple-50 scale-[1.02]'
            : 'border-2 border-dashed border-gray-300 bg-white hover:border-purple-400 hover:shadow-xl'
          }
          ${isHovered && !isDragging ? 'scale-[1.01]' : ''}
        `}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleClick}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-300"
             style={{
               background: 'linear-gradient(135deg, rgba(125, 42, 232, 0.05) 0%, rgba(0, 196, 204, 0.05) 100%)',
               opacity: isDragging ? 1 : isHovered ? 0.5 : 0
             }}
        />

        {/* Content */}
        <div className="relative z-10">
          {/* Icon container with gradient */}
          <div className={`
            inline-flex items-center justify-center w-24 h-24 mb-6 rounded-3xl transition-all duration-300
            ${isDragging
              ? 'canva-gradient-bg scale-110'
              : 'bg-gradient-to-br from-purple-100 to-teal-100'
            }
          `}>
            <svg className={`w-12 h-12 transition-colors duration-300 ${isDragging ? 'text-white' : 'text-purple-600'}`}
                 fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
          </div>

          {/* Main text */}
          <p className="text-2xl font-semibold mb-3 transition-colors duration-300"
             style={{ color: isDragging ? '#7D2AE8' : '#1C1C1E' }}>
            {THAI_TEXT.dropZone.title}
          </p>

          {/* Subtitle */}
          <p className="text-gray-500 mb-6">{THAI_TEXT.dropZone.subtitleBatch}</p>

          {/* Action buttons */}
          <div className="flex items-center justify-center gap-4">
            <button className="canva-btn-primary inline-flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
              </svg>
              {THAI_TEXT.dropZone.selectFiles}
            </button>
          </div>

          {/* Batch hint */}
          <p className="mt-4 text-xs" style={{ color: '#8E8E93' }}>
            รองรับการเลือกไฟล์พร้อมกันหลายไฟล์
          </p>
        </div>

        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png"
          multiple
          className="hidden"
          onChange={onFileSelect}
        />
      </div>

      {/* Error message */}
      {error && (
        <div className="mt-4 p-4 rounded-2xl bg-red-50 border-2 border-red-200 text-red-600 text-center animate-fade-in flex items-center justify-center gap-3">
          <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}
    </div>
  );
};

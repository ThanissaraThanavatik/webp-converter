import { useRef } from 'react';
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

  const handleClick = () => {
    clearError?.();
    fileInputRef.current?.click();
  };

  const dropZoneClasses = `
    border-3 border-dashed rounded-2xl p-12 text-center bg-white shadow-lg
    transition-all duration-300 cursor-pointer
    ${isDragging ? 'border-blue-500 bg-blue-50 shadow-xl' : 'border-slate-300 hover:border-blue-400 hover:shadow-xl'}
  `;

  return (
    <div className="mb-8">
      <div
        className={dropZoneClasses}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={handleClick}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/jpg"
          className="hidden"
          onChange={onFileSelect}
        />
        <div className="mb-4">
          <svg className="w-16 h-16 mx-auto text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
          </svg>
        </div>
        <p className="text-xl font-semibold text-slate-700 mb-2">{THAI_TEXT.dropZone.title}</p>
        <p className="text-slate-500">{THAI_TEXT.dropZone.subtitle}</p>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600 text-center">
          {error}
        </div>
      )}
    </div>
  );
};

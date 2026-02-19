export const DropZone = ({
  isDragging,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  error,
  clearError,
}) => {
  return (
    <div
      className={`
        relative p-12 lg:p-16 text-center cursor-pointer transition-all duration-200 rounded-xl border-2 border-dashed
        ${isDragging
          ? 'bg-[var(--accent-subtle)] border-[var(--accent-primary)] scale-[1.01]'
          : 'bg-[var(--bg-card)] border-[var(--border-subtle)] hover:border-[var(--accent-primary)]/50'
        }
      `}
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={() => {
        clearError?.();
        document.querySelector('input[type="file"]')?.click();
      }}
    >
      <div className={`
        inline-flex items-center justify-center w-16 h-16 mb-4 rounded-2xl transition-all
        ${isDragging 
          ? 'bg-[var(--accent-primary)] text-white shadow-lg' 
          : 'bg-[var(--bg-secondary)] text-[var(--accent-primary)]'
        }
      `}>
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 16.5V9.75m0 0l-3.75 3.75M12 9.75l3.75 3.75M3 17.25V6.75A2.25 2.25 0 015.25 4.5h13.5A2.25 2.25 0 0121 6.75v10.5A2.25 2.25 0 0118.75 19.5H5.25A2.25 2.25 0 013 17.25z" />
        </svg>
      </div>

      <p className={`text-base lg:text-lg font-medium mb-2 ${isDragging ? 'text-[var(--accent-primary)]' : 'text-[var(--text-primary)]'}`}>
        {isDragging ? 'วางไฟล์ที่นี่' : 'ลากไฟล์มาวาง หรือคลิกเพื่อเลือก'}
      </p>

      <p className="text-sm text-[var(--text-muted)]">
        รองรับ JPG, PNG, WebP, AVIF • แปลงได้หลายไฟล์พร้อมกัน
      </p>

      <input
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={onFileSelect}
      />

      {/* Error Message */}
      {error && (
        <div className="mt-4 p-3 bg-[var(--error-subtle)] border border-[var(--error)]/20 rounded-lg">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-[var(--error)]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
            <span className="text-sm text-[var(--error)]">{error}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export const StatsPanel = ({ images, isConverting, format }) => {
  const convertedCount = images.filter(img => img.convertedDataUrl).length;
  const totalCount = images.length;

  // Calculate total size saved
  const totalOriginalSize = images.reduce((sum, img) => sum + img.file.size, 0);
  const totalConvertedSize = images.reduce((sum, img) => sum + (img.convertedSize || 0), 0);
  const totalSaved = totalOriginalSize - totalConvertedSize;
  const savedPercent = totalOriginalSize > 0 ? ((totalSaved / totalOriginalSize) * 100).toFixed(1) : 0;

  const stats = [
    {
      label: 'ไฟล์ทั้งหมด',
      value: totalCount,
      unit: 'ไฟล์',
      color: 'bg-[var(--accent-primary)]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
    },
    {
      label: 'แปลงแล้ว',
      value: convertedCount,
      unit: 'ไฟล์',
      color: 'bg-[var(--success)]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      label: 'ประหยัดพื้นที่',
      value: totalSaved > 0 ? savedPercent : '-',
      unit: totalSaved > 0 ? '%' : '-',
      color: 'bg-[var(--cyan-primary)]',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    }
  ];

  if (totalCount === 0) return null;

  return (
    <div className="card p-5 animate-slide-up">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
        <span>สถิติการแปลง</span>
      </h3>
      
      <div className="grid grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="text-center p-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-subtle)] hover:border-[var(--border-medium)] transition-colors"
          >
            <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${stat.color} text-white mb-2`}>
              {stat.icon}
            </div>
            <p className="text-xl font-bold text-[var(--text-primary)]">
              {stat.value}
            </p>
            <p className="text-xs text-[var(--text-muted)]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      {totalCount > 0 && (
        <div className="mt-4 pt-4 border-t border-[var(--border-subtle)]">
          <div className="flex items-center justify-between text-xs text-[var(--text-muted)] mb-2">
            <span>ความคืบหน้า</span>
            <span className="text-[var(--accent-primary)] font-medium">{convertedCount}/{totalCount}</span>
          </div>
          <div className="progress-bar">
            <div
              className="progress-bar-fill bg-[var(--accent-primary)]"
              style={{ width: `${(convertedCount / totalCount) * 100}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export const QuickActions = ({ onClearAll, onDownloadAll, imageCount, convertedCount, isConverting }) => {
  if (imageCount === 0) return null;

  const actions = [
    {
      label: 'ดาวน์โหลดทั้งหมด',
      description: 'รวมเป็นไฟล์ ZIP',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        </svg>
      ),
      onClick: onDownloadAll,
      disabled: convertedCount === 0 || isConverting,
      primary: true
    },
    {
      label: 'ล้างทั้งหมด',
      description: 'เริ่มใหม่',
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 011-1h-4a1 1 0 01-1 1v3M4 7h16" />
        </svg>
      ),
      onClick: onClearAll,
      disabled: isConverting,
      primary: false
    }
  ];

  return (
    <div className="card p-5 animate-slide-up">
      <h3 className="text-sm font-semibold text-[var(--text-primary)] mb-4 flex items-center gap-2">
        <svg className="w-4 h-4 text-[var(--accent-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        <span>ดำเนินการด่วน</span>
      </h3>
      
      <div className="space-y-2">
        {actions.map((action, index) => (
          <button
            key={index}
            onClick={action.onClick}
            disabled={action.disabled}
            className={`
              w-full flex items-center gap-3 p-3 rounded-lg
              transition-all duration-200 group
              ${action.disabled
                ? 'opacity-50 cursor-not-allowed bg-[var(--bg-secondary)]'
                : action.primary 
                  ? 'bg-[var(--bg-secondary)] hover:bg-[var(--accent-primary)] hover:text-white'
                  : 'bg-[var(--bg-secondary)] hover:bg-[var(--error-subtle)] hover:text-[var(--error)]'
              }
            `}
          >
            <div className={`
              flex items-center justify-center w-10 h-10 rounded-lg
              ${action.disabled
                ? 'bg-[var(--border-subtle)] text-[var(--text-muted)]'
                : action.primary
                  ? 'bg-[var(--accent-primary)] text-white group-hover:bg-white group-hover:text-[var(--accent-primary)]'
                  : 'bg-[var(--error-subtle)] text-[var(--error)]'
              }
            `}>
              {action.icon}
            </div>

            <div className="flex-1 text-left">
              <p className={`text-sm font-medium ${action.disabled ? 'text-[var(--text-muted)]' : 'text-[var(--text-primary)] group-hover:text-current'}`}>
                {action.label}
              </p>
              <p className={`text-xs ${action.disabled ? 'text-[var(--text-muted)]' : 'text-[var(--text-secondary)] group-hover:text-current/70'}`}>
                {action.description}
              </p>
            </div>

            {!action.disabled && (
              <svg className="w-4 h-4 text-[var(--text-muted)] group-hover:text-current group-hover:translate-x-1 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

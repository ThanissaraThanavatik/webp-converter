import { useTheme } from '../../contexts/ThemeContext';

export const Header = () => {
  const { toggleTheme, isDark } = useTheme();

  return (
    <header className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        {/* Logo */}
        <div className="w-10 h-10 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--purple-primary)] rounded-lg flex items-center justify-center">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </div>

        <div>
          <h1 className="text-lg font-semibold text-[var(--text-primary)]">Image Converter</h1>
          <p className="text-xs text-[var(--text-muted)]">แปลง WebP, PNG, AVIF</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="hidden sm:flex items-center gap-1.5 px-2.5 py-1 bg-[var(--success-subtle)] rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--success)]"></span>
          <span className="text-xs font-medium text-[var(--success)]">พร้อมใช้งาน</span>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-hover)] transition-colors"
          aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {isDark ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

import { THAI_TEXT } from '../../constants/thaiText';
import { QualitySlider } from './QualitySlider';

export const SettingsSection = ({ quality, onQualityChange, onConvert, isConverting }) => {
  return (
    <div className="mb-10 p-8 rounded-3xl bg-white shadow-lg animate-fade-in animation-delay-300">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <QualitySlider quality={quality} onChange={onQualityChange} />

        <button
          onClick={onConvert}
          disabled={isConverting}
          className={`
            canva-btn-primary inline-flex items-center gap-3 px-8 py-4 text-base
            ${isConverting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isConverting ? (
            <>
              <svg className="w-5 h-5 canva-spinner" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
              </svg>
              กำลังแปลง...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              {THAI_TEXT.settings.convertButton}
            </>
          )}
        </button>
      </div>
    </div>
  );
};

import { THAI_TEXT } from '../../constants/thaiText';
import { QualitySlider } from './QualitySlider';

export const SettingsSection = ({ quality, onQualityChange, onConvert, isConverting }) => {
  return (
    <div className="mb-8 bg-white rounded-2xl shadow-lg p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <QualitySlider quality={quality} onChange={onQualityChange} />
        <button
          onClick={onConvert}
          disabled={isConverting}
          className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          {THAI_TEXT.settings.convertButton}
        </button>
      </div>
    </div>
  );
};

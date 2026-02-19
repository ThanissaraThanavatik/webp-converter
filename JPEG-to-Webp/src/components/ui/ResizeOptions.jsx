import { useState, useEffect } from 'react';
import { THAI_TEXT } from '../../constants/thaiText';

export const ResizeOptions = ({ options, onChange }) => {
  const [mode, setMode] = useState(options ? 'custom' : 'original');
  const [width, setWidth] = useState(options?.width || '');
  const [height, setHeight] = useState(options?.height || '');
  const [lockRatio, setLockRatio] = useState(true);
  const [aspectRatio, setAspectRatio] = useState(null);

  useEffect(() => {
    if (options?.width && options?.height && lockRatio) {
      setAspectRatio(options.width / options.height);
    }
  }, [options?.width, options?.height, lockRatio]);

  const handleWidthChange = (value) => {
    setWidth(value);
    if (lockRatio && aspectRatio && value) {
      const newHeight = Math.round(value / aspectRatio);
      setHeight(newHeight);
      updateOptions({ width: parseInt(value), height: newHeight });
    } else {
      updateOptions({ width: value ? parseInt(value) : null, height: height ? parseInt(height) : null });
    }
  };

  const handleHeightChange = (value) => {
    setHeight(value);
    if (lockRatio && aspectRatio && value) {
      const newWidth = Math.round(value * aspectRatio);
      setWidth(newWidth);
      updateOptions({ width: newWidth, height: parseInt(value) });
    } else {
      updateOptions({ width: width ? parseInt(width) : null, height: value ? parseInt(value) : null });
    }
  };

  const updateOptions = (opts) => {
    if (opts.width || opts.height) {
      onChange(opts);
    } else {
      onChange(null);
    }
  };

  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === 'original') {
      setWidth('');
      setHeight('');
      onChange(null);
    }
  };

  return (
    <div className="flex-1">
      <label className="block text-base font-semibold mb-3" style={{ color: '#1F2937' }}>
        {THAI_TEXT.resize.title}
      </label>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => handleModeChange('original')}
          className={`
            flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
            ${mode === 'original'
              ? 'bg-gradient-to-r from-gray-600 to-gray-700 text-white shadow-lg'
              : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
            }
          `}
        >
          {THAI_TEXT.resize.original}
        </button>
        <button
          onClick={() => handleModeChange('custom')}
          className={`
            flex-1 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200
            ${mode === 'custom'
              ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg'
              : 'bg-white text-gray-600 shadow-md hover:shadow-lg'
            }
          `}
        >
          {THAI_TEXT.resize.custom}
        </button>
      </div>

      {mode === 'custom' && (
        <div className="flex gap-3 items-end">
          <div className="flex-1">
            <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>
              {THAI_TEXT.resize.width}
            </label>
            <input
              type="number"
              value={width}
              onChange={(e) => handleWidthChange(e.target.value)}
              placeholder="1920"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <div className="flex-1">
            <label className="block text-xs mb-1" style={{ color: '#9CA3AF' }}>
              {THAI_TEXT.resize.height}
            </label>
            <input
              type="number"
              value={height}
              onChange={(e) => handleHeightChange(e.target.value)}
              placeholder="1080"
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:outline-none transition-colors"
            />
          </div>

          <button
            onClick={() => setLockRatio(!lockRatio)}
            className={`
              px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
              ${lockRatio
                ? 'bg-blue-100 text-blue-600'
                : 'bg-gray-100 text-gray-500'
              }
            `}
            title={THAI_TEXT.resize.lockRatio}
          >
            <svg className={`w-5 h-5 ${lockRatio ? '' : 'opacity-50'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
};

import { THAI_TEXT } from '../../constants/thaiText';

export const Header = () => {
  return (
    <div className="text-center mb-12 animate-fade-in">
      {/* Logo/Icon */}
      <div className="inline-flex items-center justify-center w-20 h-20 mb-6 rounded-3xl seedream-gradient-bg shadow-lg animate-float">
        <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      </div>

      {/* Title with gradient */}
      <h1 className="text-5xl md:text-6xl font-bold mb-4 animate-fade-in animation-delay-100" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif' }}>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500">
          {THAI_TEXT.title}
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-xl text-gray-600 max-w-2xl mx-auto animate-fade-in animation-delay-200" style={{ color: '#4B5563' }}>
        {THAI_TEXT.subtitle}
      </p>

      {/* Badge */}
      <div className="inline-flex items-center gap-2 mt-6 px-4 py-2 rounded-full bg-white/80 backdrop-blur-sm shadow-md animate-fade-in animation-delay-300">
        <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
        <span className="text-sm font-medium" style={{ color: '#4B5563' }}>Client-side Processing • 100% Private</span>
      </div>
    </div>
  );
};

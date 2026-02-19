import { THAI_TEXT } from '../../constants/thaiText';

export const Header = () => {
  return (
    <div className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-slate-800 mb-3">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
          {THAI_TEXT.title}
        </span>
      </h1>
      <p className="text-slate-600 text-lg">{THAI_TEXT.subtitle}</p>
    </div>
  );
};

import { THAI_TEXT } from '../../constants/thaiText';

const InfoCard = ({ icon, title, description, gradientBg, iconColor }) => (
  <div className="seedream-card p-8 hover-scale group">
    <div
      className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 ${gradientBg}`}
    >
      <svg className={`w-8 h-8 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <h3 className="font-bold text-xl mb-3" style={{ color: '#1F2937' }}>
      {title}
    </h3>
    <p className="text-base leading-relaxed" style={{ color: '#4B5563' }}>
      {description}
    </p>
  </div>
);

export const InfoCards = () => {
  const cards = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
      title: THAI_TEXT.info.fast.title,
      description: THAI_TEXT.info.fast.description,
      gradientBg: 'bg-gradient-to-br from-blue-100 to-blue-200',
      iconColor: 'text-blue-600',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      title: THAI_TEXT.info.secure.title,
      description: THAI_TEXT.info.secure.description,
      gradientBg: 'bg-gradient-to-br from-green-100 to-emerald-100',
      iconColor: 'text-green-600',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
      title: THAI_TEXT.info.batch.title,
      description: THAI_TEXT.info.batch.description,
      gradientBg: 'bg-gradient-to-br from-indigo-100 to-purple-100',
      iconColor: 'text-indigo-600',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-16 animate-fade-in animation-delay-500">
      {cards.map((card, index) => (
        <div key={index} style={{ animationDelay: `${500 + index * 100}ms` }}>
          <InfoCard {...card} />
        </div>
      ))}
    </div>
  );
};

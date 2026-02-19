import { THAI_TEXT } from '../../constants/thaiText';

const InfoCard = ({ icon, title, description, bgColor, iconColor }) => (
  <div className="bg-white rounded-xl p-6 shadow-md">
    <div className={`w-12 h-12 ${bgColor} rounded-xl flex items-center justify-center mb-4`}>
      <svg className={`w-6 h-6 ${iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        {icon}
      </svg>
    </div>
    <h3 className="font-semibold text-slate-800 mb-2">{title}</h3>
    <p className="text-slate-600 text-sm">{description}</p>
  </div>
);

export const InfoCards = () => {
  const cards = [
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
      title: THAI_TEXT.info.fast.title,
      description: THAI_TEXT.info.fast.description,
      bgColor: 'bg-blue-100',
      iconColor: 'text-blue-600',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />,
      title: THAI_TEXT.info.secure.title,
      description: THAI_TEXT.info.secure.description,
      bgColor: 'bg-green-100',
      iconColor: 'text-green-600',
    },
    {
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />,
      title: THAI_TEXT.info.quality.title,
      description: THAI_TEXT.info.quality.description,
      bgColor: 'bg-purple-100',
      iconColor: 'text-purple-600',
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6 mt-12">
      {cards.map((card, index) => (
        <InfoCard key={index} {...card} />
      ))}
    </div>
  );
};

export const FeatureGrid = () => {
  const features = [
    { icon: '⚡', title: 'เร็ว', desc: 'แปลงแบบ Real-time' },
    { icon: '🔒', title: 'ปลอดภัย', desc: 'ประมวลผลฝั่ง Client' },
    { icon: '🎨', title: 'คุณภาพ', desc: 'ปรับได้ตามต้องการ' },
    { icon: '📦', title: 'หลายรูปแบบ', desc: 'WebP, PNG, AVIF' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {features.map((feature, index) => (
        <div key={index} className="card p-3 text-center">
          <div className="text-2xl mb-1">{feature.icon}</div>
          <p className="text-sm font-medium text-[var(--text-primary)]">{feature.title}</p>
          <p className="text-xs text-[var(--text-muted)]">{feature.desc}</p>
        </div>
      ))}
    </div>
  );
};

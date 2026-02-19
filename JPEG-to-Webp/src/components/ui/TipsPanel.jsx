export const TipsPanel = ({ hasFiles }) => {
  const tips = hasFiles ? [
    { icon: '💡', title: 'คุณภาพ 80-85%', desc: 'เหมาะสำหรับเว็บ' },
    { icon: '🎯', title: 'WebP', desc: 'ลดขนาด 25-35%' },
  ] : [
    { icon: '🖼️', title: 'ลากวาง', desc: 'หรือคลิกเลือกไฟล์' },
    { icon: '⚡', title: 'หลายไฟล์', desc: 'แปลงพร้อมกันได้' },
    { icon: '🔒', title: 'ปลอดภัย', desc: 'ไม่อัปโหลดเซิร์ฟเวอร์' },
  ];

  return (
    <div className="card p-4">
      <h3 className="text-xs font-semibold text-[var(--text-muted)] mb-3 uppercase tracking-wide">เคล็ดลับ</h3>
      <div className="space-y-2">
        {tips.map((tip, index) => (
          <div key={index} className="flex items-center gap-3">
            <span className="text-base">{tip.icon}</span>
            <div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{tip.title}</p>
              <p className="text-xs text-[var(--text-muted)]">{tip.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

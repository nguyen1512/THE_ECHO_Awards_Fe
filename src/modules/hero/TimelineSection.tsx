import React from 'react';

export function TimelineSection() {
  const steps = [
    {
      period: '15/10 - 05/11',
      desc: 'Bình chọn Online cơ sở',
      active: true,
    },
    {
      period: '06/11 - 15/11',
      desc: 'Hội đồng chuyên môn đánh giá',
      active: false,
    },
    {
      period: '20/11',
      desc: 'Đêm Gala Trao giải & Tri ân',
      active: false,
    },
  ];

  return (
    <div className="w-full max-w-[760px] mx-auto mt-6 flex flex-col sm:flex-row border border-[#2b47b0] rounded-2xl bg-[#0a1a60] overflow-hidden text-left shadow-lg">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className={`flex-1 p-4 md:p-5 border-b sm:border-b-0 sm:border-r border-[#2b47b0] last:border-b-0 sm:last:border-r-0 ${
            step.active ? 'bg-[#112680]/60' : ''
          }`}
        >
          <strong
            className={`block font-display text-lg md:text-xl font-bold ${
              step.active ? 'text-[#ff9a5c]' : 'text-white'
            }`}
          >
            {step.period}
          </strong>
          <span className="text-xs md:text-sm text-[#a9b9e8]">{step.desc}</span>
        </div>
      ))}
    </div>
  );
}

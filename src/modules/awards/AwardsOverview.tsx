import React from 'react';
import { AWARDS_DATA } from '@/constants/awards';
import { AwardGroupCard } from './AwardGroupCard';

export function AwardsOverview() {
  return (
    <section id="tong-quan" className="py-16 md:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-4">
        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#ff9a5c]">
            HỆ THỐNG GIẢI THƯỞNG
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide chrome-text">
            TỔNG QUAN HẠNG MỤC
          </h2>
          <p className="text-sm md:text-base text-[#a9b9e8]">
            Mỗi giải thưởng đại diện cho một giá trị cốt lõi mà các thầy cô và các bạn Class Manager mang lại: sự truyền cảm hứng, tính chuyên môn vững vàng, khả năng kết nối và sự tận tâm đồng hành.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <AwardGroupCard
            role="gv"
            title="Giải thưởng Giáo viên"
            sub="5 giải dành cho Giáo viên"
            zone="Khu Giáo viên"
            awards={AWARDS_DATA.gv}
          />
          <AwardGroupCard
            role="cm"
            title="Giải thưởng CM"
            sub="3 giải dành cho Class Manager"
            zone="Khu Class Manager"
            awards={AWARDS_DATA.cm}
          />
        </div>
      </div>
    </section>
  );
}

import React from 'react';
import { CampusItem } from '@/types/campuses';

interface CampusTabsProps {
  campuses: CampusItem[];
  selectedId: string;
  onSelect: (id: string) => void;
}

export function CampusTabs({ campuses, selectedId, onSelect }: CampusTabsProps) {
  return (
    <div className="flex flex-col gap-2.5 mb-10 p-5 border border-[#2b47b0] rounded-2xl bg-[#0a1a60]">
      <b className="font-display text-xs md:text-sm font-semibold uppercase tracking-wider text-[#ff9a5c]">
        CHỌN CƠ SỞ ĐỂ XEM DANH SÁCH VÀ BÌNH CHỌN:
      </b>
      <div className="flex gap-2 flex-wrap" role="tablist">
        {campuses.map((c) => {
          const isSelected = c.id === selectedId;
          return (
            <button
              key={c.id}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(c.id)}
              className={`font-sans text-xs md:text-sm font-semibold whitespace-nowrap rounded-full py-2 px-4 transition-all duration-150 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#ff8a3d] text-[#1a0a00] border-[1.5px] border-[#ff8a3d] shadow-md font-bold'
                  : 'bg-transparent text-[#a9b9e8] border-[1.5px] border-[#2b47b0] hover:text-[#f2f6ff] hover:border-[#7fb2ff]'
              }`}
            >
              A&amp;U {c.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

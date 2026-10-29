import React from 'react';
import Image from 'next/image';

export function Footer() {
  return (
    <footer className="border-t border-[#2b47b0] py-10 text-center text-[#a9b9e8] text-sm relative z-10 bg-[#02081f]/80">
      <div className="max-w-[1120px] mx-auto px-4 flex flex-col items-center gap-3">
        <Image
          src="/foot-logo.png"
          alt="A&U The Echo Awards"
          width={180}
          height={48}
          className="h-10 md:h-12 w-auto object-contain mx-auto opacity-90"
        />
        <p className="mt-1">
          THE ECHO Awards · Vinh danh Giáo viên và Class Manager A&amp;U English 20/11
        </p>
        <span className="font-script text-2xl md:text-3xl text-[#f2f6ff] block">
          Every lesson leaves an echo
        </span>
        <p className="text-xs text-[#a9b9e8]/70 mt-2">
          Dữ liệu bình chọn và lời nhắn được đồng bộ an toàn qua Google Sheets.
        </p>
      </div>
    </footer>
  );
}

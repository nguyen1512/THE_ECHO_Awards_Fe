import React from 'react';
import Image from 'next/image';

export function HeaderNav() {
  return (
    <header className="sticky top-0 z-40 bg-[#02081f]/90 backdrop-blur-md border-b border-[#2b47b0]">
      <div className="max-w-[1120px] mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 py-3">
        <a href="#top" className="flex items-center" aria-label="THE ECHO AWARDS">
          <Image
            src="/logo.png"
            alt="THE ECHO A&U"
            width={160}
            height={36}
            className="h-8 md:h-9 w-auto object-contain"
            priority
          />
        </a>

        <nav aria-label="Điều hướng chính" className="flex items-center gap-1 sm:gap-2">
          <a
            href="#tong-quan"
            className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full text-[#a9b9e8] hover:text-[#f2f6ff] hover:bg-[#0a1a60] transition-colors"
          >
            Hạng mục
          </a>
          <a
            href="#echo-message"
            className="hidden sm:inline-block text-xs md:text-sm font-semibold tracking-wider uppercase px-3 py-1.5 rounded-full text-[#a9b9e8] hover:text-[#f2f6ff] hover:bg-[#0a1a60] transition-colors"
          >
            Echo Message
          </a>
          <a
            href="#vote"
            className="text-xs md:text-sm font-bold tracking-wider uppercase px-4 py-2 rounded-full bg-[#ff8a3d] text-[#1a0a00] hover:brightness-110 active:scale-95 transition-all shadow-md"
          >
            Bình chọn
          </a>
        </nav>
      </div>
    </header>
  );
}

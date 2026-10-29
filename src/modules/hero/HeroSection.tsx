import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import { TimelineSection } from './TimelineSection';
import { Vote, MessageSquareHeart } from 'lucide-react';

export function HeroSection() {
  return (
    <section id="top" className="relative overflow-hidden pt-0 pb-12 md:pb-16">
      {/* Keyvisual Banner */}
      <div className="w-full bg-[#0a1a60] border-b border-[#2b47b0]">
        <Image
          src="/keyvisual.jpg"
          alt="Vinh danh Giáo viên A&U 20/11 · THE ECHO · Every Lesson Leaves an Echo"
          width={1920}
          height={600}
          priority
          className="w-full h-auto max-h-[460px] object-cover object-center block"
        />
      </div>

      {/* Intro Box with orbit arcs */}
      <div className="relative overflow-hidden py-12 md:py-16">
        <div className="arcs" aria-hidden="true" />
        <div className="arcs b" aria-hidden="true" />

        <div className="max-w-[1120px] mx-auto px-4 text-center flex flex-col items-center gap-5 relative z-10">
          <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase text-[#ff9a5c]">
            SỰ KIỆN TRI ÂN 20/11
          </span>
          <h1 className="font-display font-bold text-2xl sm:text-4xl md:text-5xl uppercase tracking-wide chrome-text max-w-4xl">
            ECHO Awards 2026
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-[#f2f6ff] leading-relaxed">
            Chào mừng bạn đến với <strong>ECHO Awards</strong> – nơi học viên và toàn thể A&amp;U English cùng tôn vinh những người gieo mầm tri thức và gắn kết lớp học mỗi ngày.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mt-2">
            <a href="#vote">
              <Button size="big" variant="primary">
                <Vote className="w-5 h-5" />
                Bình chọn ngay
              </Button>
            </a>
            <a href="#echo-message">
              <Button size="big" variant="ghost">
                <MessageSquareHeart className="w-5 h-5 text-[#ff9a5c]" />
                Gửi Echo Message
              </Button>
            </a>
          </div>

          <TimelineSection />
        </div>
      </div>
    </section>
  );
}

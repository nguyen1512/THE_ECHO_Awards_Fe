import React from 'react';
import { HeaderNav } from '@/components/shared/HeaderNav';
import { Footer } from '@/components/shared/Footer';
import { HeroSection } from '@/modules/hero/HeroSection';
import { AwardsOverview } from '@/modules/awards/AwardsOverview';
import { VotingSection } from '@/modules/voting/VotingSection';
import { EchoMessageSection } from '@/modules/echo-message/EchoMessageSection';

export default function HomePage() {
  return (
    <>
      {/* Header Navigation */}
      <HeaderNav />

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Hero Banner & Timeline */}
        <HeroSection />

        {/* Tổng quan hạng mục giải thưởng */}
        <AwardsOverview />

        {/* Khu vực bình chọn theo cơ sở */}
        <VotingSection />

        {/* Form gửi và Bức tường Echo Message */}
        <EchoMessageSection />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}

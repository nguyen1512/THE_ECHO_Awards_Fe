import React from 'react';
import { AwardItem, RoleType } from '@/types/awards';
import { Award, Sparkles, Heart, Compass, Flame, ShieldCheck, Share2, Activity } from 'lucide-react';

interface AwardGroupCardProps {
  role: RoleType;
  title: string;
  sub: string;
  zone: string;
  awards: AwardItem[];
}

// Icon mapping cho từng giải thưởng để đạt chuẩn visual cao cấp, không dùng emoji
function getAwardIcon(id: string) {
  switch (id) {
    case 'inspiring':
      return <Sparkles className="w-5 h-5 text-white" />;
    case 'guiding':
      return <Compass className="w-5 h-5 text-white" />;
    case 'energy':
      return <Flame className="w-5 h-5 text-white" />;
    case 'rising':
      return <Activity className="w-5 h-5 text-white" />;
    case 'lasting':
      return <Award className="w-5 h-5 text-white" />;
    case 'steady':
      return <ShieldCheck className="w-5 h-5 text-white" />;
    case 'connecting':
      return <Share2 className="w-5 h-5 text-white" />;
    case 'caring':
      return <Heart className="w-5 h-5 text-white" />;
    default:
      return <Award className="w-5 h-5 text-white" />;
  }
}

export function AwardGroupCard({ role, title, sub, zone, awards }: AwardGroupCardProps) {
  const isGv = role === 'gv';
  const topColorClass = isGv ? 'border-t-[#ff9a5c]' : 'border-t-[#7fb2ff]';
  const zoneColorClass = isGv ? 'text-[#ff9a5c]' : 'text-[#7fb2ff]';
  const iconGradient = isGv
    ? 'bg-gradient-to-br from-[#1c3fc0] to-[#ff8a3d]'
    : 'bg-gradient-to-br from-[#1c3fc0] to-[#7fb2ff]';

  return (
    <div
      className={`bg-[#0a1a60] border border-[#2b47b0] border-t-[5px] ${topColorClass} rounded-2xl p-6 md:p-8 flex flex-col gap-5 shadow-xl`}
    >
      <div className="flex flex-col gap-1">
        <span className={`text-xs font-bold tracking-[0.16em] uppercase ${zoneColorClass}`}>
          {zone}
        </span>
        <h3 className="font-display text-base md:text-lg font-bold uppercase text-white">
          {title}
          <small className="block text-xs md:text-sm font-normal text-[#a9b9e8] capitalize mt-1">
            {sub}
          </small>
        </h3>
      </div>

      <div className="flex flex-col gap-4">
        {awards.map((award, index) => (
          <div
            key={award.id}
            className={`flex gap-3.5 items-start pt-4 ${
              index === 0 ? 'border-t-0 pt-0' : 'border-t border-[#2b47b0]'
            }`}
          >
            <div
              className={`shrink-0 w-10 h-10 rounded-xl ${iconGradient} flex items-center justify-center shadow-md`}
            >
              {getAwardIcon(award.id)}
            </div>
            <div className="flex-1 min-w-0">
              <strong className="font-display text-sm font-semibold block text-[#f2f6ff] mb-1">
                {award.name}
              </strong>
              <p className="text-xs md:text-sm text-[#a9b9e8] leading-relaxed">{award.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

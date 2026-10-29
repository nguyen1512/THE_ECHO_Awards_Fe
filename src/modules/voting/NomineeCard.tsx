import React from 'react';
import { getInitials, getRoleLine } from '@/utils/text';
import { getAvatarColor } from '@/utils/color';
import { Button } from '@/components/ui/Button';
import { Check } from 'lucide-react';

interface NomineeCardProps {
  name: string;
  role: 'gv' | 'cm';
  campusName: string;
  awardName: string;
  isVoted: boolean;
  avatarUrl?: string;
  onVote: () => void;
}

export function NomineeCard({
  name,
  role,
  campusName,
  awardName,
  isVoted,
  avatarUrl,
  onVote,
}: NomineeCardProps) {
  const avatarColor = getAvatarColor(name, campusName);
  const initials = getInitials(name);
  const roleLabel = role === 'gv' ? 'Giáo viên' : 'Class Manager';
  const roleText = getRoleLine(name, roleLabel, campusName);

  return (
    <article className="text-[#f2f6ff] bg-[#02081f] border-[1.5px] border-[#2b47b0] rounded-2xl p-4 md:p-5 flex flex-col items-center text-center gap-2 hover:border-[#7fb2ff] transition-colors shadow-md">
      {/* Avatar Container */}
      <div
        className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center font-display font-semibold text-xl md:text-2xl text-white relative mb-2 shadow-inner ${
          avatarUrl ? 'border-2 border-[#ff9a5c]' : 'border-2 border-dashed border-white/60'
        }`}
        style={{ backgroundColor: avatarColor }}
      >
        {avatarUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={avatarUrl}
            alt={name}
            loading="lazy"
            className="w-full h-full rounded-full object-cover object-top"
          />
        ) : (
          <>
            {initials}
            <small className="absolute -bottom-2 text-[10px] font-bold bg-[#02081f] text-[#a9b9e8] py-0.5 px-2 rounded-full border border-[#2b47b0]">
              Ảnh
            </small>
          </>
        )}
      </div>

      {/* Info */}
      <div className="flex flex-col gap-1 items-center mb-2 flex-1">
        <h4 className="font-bold text-sm md:text-base leading-snug break-words">{name}</h4>
        <span className="text-xs text-[#a9b9e8]">{roleText}</span>
        <span className="text-[11px] font-bold tracking-wider py-0.5 px-2.5 rounded-full bg-[#112680] text-[#ff9a5c] mt-1">
          {awardName}
        </span>
      </div>

      {/* Vote Action */}
      <div className="w-full mt-auto pt-2">
        {isVoted ? (
          <Button variant="voted" size="sm" className="w-full">
            <Check className="w-4 h-4 text-emerald-400" />
            Đã bình chọn
          </Button>
        ) : (
          <Button variant="primary" size="sm" onClick={onVote} className="w-full">
            Bình chọn
          </Button>
        )}
      </div>
    </article>
  );
}

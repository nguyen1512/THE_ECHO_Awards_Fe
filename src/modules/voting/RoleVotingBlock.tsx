import React from 'react';
import { AwardItem, RoleType } from '@/types/awards';
import { CampusItem } from '@/types/campuses';
import { Chip } from '@/components/ui/Chip';
import { NomineeCard } from './NomineeCard';
import { getNomineeAvatar } from '@/constants/avatars';

interface RoleVotingBlockProps {
  stepNumber: number;
  role: RoleType;
  title: string;
  awards: AwardItem[];
  currentAward: AwardItem;
  campus: CampusItem;
  votedMap?: Record<string, boolean>;
  onSelectAward: (awardId: string) => void;
  onOpenVote: (name: string) => void;
}

export function RoleVotingBlock({
  stepNumber,
  role,
  title,
  awards,
  currentAward,
  campus,
  votedMap = {},
  onSelectAward,
  onOpenVote,
}: RoleVotingBlockProps) {
  const nomineeList = campus[role] || [];
  const accentColor = role === 'gv' ? 'text-[#ff9a5c]' : 'text-[#7fb2ff]';
  const borderAccent = role === 'gv' ? 'border-l-[#ff9a5c]' : 'border-l-[#7fb2ff]';

  return (
    <div className="flex flex-col gap-4">
      {/* Title */}
      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide text-white">
        <span className={accentColor}>{stepNumber}. </span>
        {title}
      </h3>

      {/* Award Chips */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
        {awards.map((award) => (
          <Chip
            key={award.id}
            active={award.id === currentAward.id}
            onClick={() => onSelectAward(award.id)}
          >
            {award.name}
          </Chip>
        ))}
      </div>

      {/* Award Description Banner */}
      <div className={`text-xs md:text-sm text-[#a9b9e8] py-3 px-4 border-l-4 ${borderAccent} bg-[#0a1a60] rounded-r-xl`}>
        <b className="text-white font-semibold">{currentAward.name}:</b> {currentAward.desc}
      </div>

      {/* Current Campus indicator */}
      <p className="text-xs md:text-sm text-[#a9b9e8]">
        Cơ sở đang xem: <b className="text-white">A&amp;U {campus.name}</b>
      </p>

      {/* Cards Grid or Empty State */}
      {nomineeList.length === 0 ? (
        <div className="p-8 border-[1.5px] border-dashed border-[#2b47b0] rounded-2xl text-[#a9b9e8] text-center text-sm md:text-base">
          A&amp;U {campus.name} hiện chưa có {role === 'gv' ? 'Giáo viên' : 'Class Manager'} trong danh sách đề cử. Hãy chọn cơ sở khác ở phía trên.
        </div>
      ) : (
        <div className="grid grid-cols-1 min-[420px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-5">
          {nomineeList.map((nominee) => {
            const vkey = `${role}|${currentAward.id}|${campus.id}|${nominee}`;
            const isVoted = !!votedMap[vkey];
            return (
              <NomineeCard
                key={nominee}
                name={nominee}
                role={role}
                campusName={campus.name}
                awardName={currentAward.name}
                isVoted={isVoted}
                avatarUrl={getNomineeAvatar(campus.id, nominee)}
                onVote={() => onOpenVote(nominee)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

'use client';

import React from 'react';
import { useVoting } from './hooks/useVoting';
import { CampusTabs } from './CampusTabs';
import { RoleVotingBlock } from './RoleVotingBlock';
import { VoteBottomSheet } from './VoteBottomSheet';
import { DuplicateVoteModal } from './DuplicateVoteModal';
import { AWARDS_DATA } from '@/constants/awards';

export function VotingSection() {
  const {
    campuses,
    selectedCampusId,
    currentCampus,
    currentGvAward,
    currentCmAward,
    currentPick,
    isSheetOpen,
    isSubmitting,
    submitSuccess,
    submitError,
    submittedStudent,
    duplicateModal,
    handleSelectCampus,
    handleSelectAward,
    handleOpenVote,
    handleCloseVote,
    handleSubmitVote,
    handleCloseDuplicateModal,
  } = useVoting();

  return (
    <section
      id="vote"
      className="py-16 md:py-20 bg-gradient-to-b from-[#0a1a60]/60 to-[#040c32]/70 border-y border-[#2b47b0] relative z-10"
    >
      <div className="max-w-[1120px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#ff9a5c]">
            KHU VỰC BÌNH CHỌN
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide chrome-text">
            BÌNH CHỌN THEO CƠ SỞ
          </h2>
          <p className="text-sm md:text-base text-[#a9b9e8]">
            Chọn cơ sở của bạn, chọn giải thưởng và gửi một phiếu bình chọn kèm lời nhắn tri ân đến thầy cô hoặc anh chị Class Manager đã đồng hành cùng bạn.
          </p>
        </div>

        {/* Campus Tabs */}
        <CampusTabs
          campuses={campuses}
          selectedId={selectedCampusId}
          onSelect={handleSelectCampus}
        />

        {/* Block 1: Giáo viên (Không giới hạn lần vote ở thẻ ứng viên) */}
        <RoleVotingBlock
          stepNumber={1}
          role="gv"
          title="Bình chọn cho giáo viên"
          awards={AWARDS_DATA.gv}
          currentAward={currentGvAward}
          campus={currentCampus}
          onSelectAward={(awardId) => handleSelectAward('gv', awardId)}
          onOpenVote={(name) => handleOpenVote('gv', name)}
        />

        <div className="my-14 border-t border-[#2b47b0]" />

        {/* Block 2: Class Manager (Không giới hạn lần vote ở thẻ ứng viên) */}
        <RoleVotingBlock
          stepNumber={2}
          role="cm"
          title="Bình chọn cho Class Manager (CM)"
          awards={AWARDS_DATA.cm}
          currentAward={currentCmAward}
          campus={currentCampus}
          onSelectAward={(awardId) => handleSelectAward('cm', awardId)}
          onOpenVote={(name) => handleOpenVote('cm', name)}
        />
      </div>

      {/* Vote Bottom Sheet */}
      <VoteBottomSheet
        isOpen={isSheetOpen}
        onClose={handleCloseVote}
        pick={currentPick}
        onSubmit={handleSubmitVote}
        isSubmitting={isSubmitting}
        successMessage={submitSuccess}
        errorMessage={submitError}
        submittedStudent={submittedStudent}
      />

      {/* Duplicate Vote Warning Popup */}
      <DuplicateVoteModal
        isOpen={duplicateModal.isOpen}
        onClose={handleCloseDuplicateModal}
        studentCode={duplicateModal.studentCode}
        role={duplicateModal.role}
      />
    </section>
  );
}

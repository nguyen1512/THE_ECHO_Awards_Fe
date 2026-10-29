'use client';

import React from 'react';
import { useEchoMessage } from './hooks/useEchoMessage';
import { EchoComposer } from './EchoComposer';
import { EchoWall } from './EchoWall';

export function EchoMessageSection() {
  const {
    senderName,
    setSenderName,
    targetRole,
    setTargetRole,
    selectedCampusId,
    setSelectedCampusId,
    selectedPerson,
    setSelectedPerson,
    message,
    setMessage,
    availableCampuses,
    currentCampus,
    availablePersons,
    isSubmitting,
    submitSuccess,
    wallNotes,
    isLoadingWall,
    handleSubmit,
  } = useEchoMessage();

  return (
    <section id="echo-message" className="py-16 md:py-20 relative z-10">
      <div className="max-w-[1120px] mx-auto px-4">
        {/* Section Header */}
        <div className="flex flex-col gap-3 mb-10 max-w-2xl">
          <p className="text-xs font-bold tracking-[0.18em] uppercase text-[#ff9a5c]">
            LỜI NHẮN TỪ HỌC VIÊN
          </p>
          <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-wide chrome-text">
            Echo Message
          </h2>
          <p className="text-sm md:text-base text-[#a9b9e8]">
            Những lời nhắn ấm áp từ học viên A&amp;U gửi đến các Giáo viên và Class Manager, chứa đựng lời cảm ơn chân thành, những kỷ niệm đáng nhớ và sự trân trọng dành cho những người đã đồng hành trên hành trình học tập.
          </p>
        </div>

        {/* Composer Form */}
        <EchoComposer
          senderName={senderName}
          onSenderNameChange={setSenderName}
          targetRole={targetRole}
          onTargetRoleChange={setTargetRole}
          campuses={availableCampuses}
          selectedCampusId={selectedCampusId}
          onCampusChange={setSelectedCampusId}
          currentCampus={currentCampus}
          persons={availablePersons}
          selectedPerson={selectedPerson}
          onPersonChange={setSelectedPerson}
          message={message}
          onMessageChange={setMessage}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          submitSuccess={submitSuccess}
        />

        {/* Echo Wall */}
        <EchoWall notes={wallNotes} isLoading={isLoadingWall} />
      </div>
    </section>
  );
}

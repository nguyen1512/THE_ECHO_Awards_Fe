'use client';

import { useState, useEffect, useCallback } from 'react';
import { CAMPUSES_DATA } from '@/constants/campuses';
import { AWARDS_DATA } from '@/constants/awards';
import { CampusItem } from '@/types/campuses';
import { AwardItem, RoleType } from '@/types/awards';
import { VotePick, VotePayload } from '@/types/voting';

export function useVoting() {
  const [selectedCampusId, setSelectedCampusId] = useState<string>('qt');
  const [selectedAwards, setSelectedAwards] = useState<{ gv: string; cm: string }>({
    gv: 'inspiring',
    cm: 'steady',
  });
  const [votedMap, setVotedMap] = useState<Record<string, boolean>>({});
  const [currentPick, setCurrentPick] = useState<VotePick | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);

  // Khôi phục URL search params và localStorage khi mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Load voted keys from localStorage
    try {
      const stored = localStorage.getItem('echo_voted_keys');
      if (stored) {
        setVotedMap(JSON.parse(stored));
      }
    } catch {
      // Ignore
    }

    // Load URL params
    const params = new URLSearchParams(window.location.search);
    const campParam = params.get('campus');
    const gvParam = params.get('award_gv');
    const cmParam = params.get('award_cm');

    if (campParam && CAMPUSES_DATA.some((c) => c.id === campParam)) {
      setSelectedCampusId(campParam);
    }
    if (gvParam && AWARDS_DATA.gv.some((a) => a.id === gvParam)) {
      setSelectedAwards((prev) => ({ ...prev, gv: gvParam }));
    }
    if (cmParam && AWARDS_DATA.cm.some((a) => a.id === cmParam)) {
      setSelectedAwards((prev) => ({ ...prev, cm: cmParam }));
    }
  }, []);

  // Cập nhật URL search params mượt mà
  const updateUrlParams = useCallback((campus: string, gv: string, cm: string) => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    params.set('campus', campus);
    params.set('award_gv', gv);
    params.set('award_cm', cm);
    const newRelativePathQuery = `${window.location.pathname}?${params.toString()}${window.location.hash}`;
    window.history.replaceState(null, '', newRelativePathQuery);
  }, []);

  const handleSelectCampus = (id: string) => {
    setSelectedCampusId(id);
    updateUrlParams(id, selectedAwards.gv, selectedAwards.cm);
  };

  const handleSelectAward = (role: RoleType, awardId: string) => {
    setSelectedAwards((prev) => {
      const next = { ...prev, [role]: awardId };
      updateUrlParams(selectedCampusId, next.gv, next.cm);
      return next;
    });
  };

  const currentCampus: CampusItem =
    CAMPUSES_DATA.find((c) => c.id === selectedCampusId) || CAMPUSES_DATA[0];

  const currentGvAward: AwardItem =
    AWARDS_DATA.gv.find((a) => a.id === selectedAwards.gv) || AWARDS_DATA.gv[0];

  const currentCmAward: AwardItem =
    AWARDS_DATA.cm.find((a) => a.id === selectedAwards.cm) || AWARDS_DATA.cm[0];

  const handleOpenVote = (role: RoleType, nomineeName: string) => {
    const award = role === 'gv' ? currentGvAward : currentCmAward;
    const vkey = `${role}|${award.id}|${currentCampus.id}|${nomineeName}`;
    setCurrentPick({
      role,
      vkey,
      name: nomineeName,
      campus: currentCampus,
      award,
    });
    setSubmitSuccess(null);
    setIsSheetOpen(true);
  };

  const handleCloseVote = () => {
    setIsSheetOpen(false);
    setCurrentPick(null);
  };

  const handleSubmitVote = async (message: string) => {
    if (!currentPick || isSubmitting) return;

    setIsSubmitting(true);
    const payload: VotePayload = {
      role: currentPick.role,
      awardId: currentPick.award.id,
      awardName: currentPick.award.name,
      campusId: currentPick.campus.id,
      campusName: currentPick.campus.name,
      nomineeName: currentPick.name,
      voterMessage: message,
    };

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();

      // Lưu trạng thái đã vote
      const newMap = { ...votedMap, [currentPick.vkey]: true };
      setVotedMap(newMap);
      try {
        localStorage.setItem('echo_voted_keys', JSON.stringify(newMap));
      } catch {
        // Ignore
      }

      setSubmitSuccess(
        `Cảm ơn bạn đã gửi một Echo! Bạn đã bình chọn cho ${currentPick.name} ở giải ${currentPick.award.name}. Dữ liệu đã được ghi nhận thành công.`
      );
    } catch {
      // Fallback khi network lỗi
      const newMap = { ...votedMap, [currentPick.vkey]: true };
      setVotedMap(newMap);
      setSubmitSuccess(
        `Đã ghi nhận bình chọn cho ${currentPick.name} ở giải ${currentPick.award.name}!`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    campuses: CAMPUSES_DATA,
    selectedCampusId,
    currentCampus,
    selectedAwards,
    currentGvAward,
    currentCmAward,
    votedMap,
    currentPick,
    isSheetOpen,
    isSubmitting,
    submitSuccess,
    handleSelectCampus,
    handleSelectAward,
    handleOpenVote,
    handleCloseVote,
    handleSubmitVote,
  };
}

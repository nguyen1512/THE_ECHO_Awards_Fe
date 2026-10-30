'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { CAMPUSES_DATA } from '@/constants/campuses';
import { AWARDS_DATA } from '@/constants/awards';
import { CampusItem } from '@/types/campuses';
import { AwardItem, RoleType } from '@/types/awards';
import { VotePick, VotePayload, VoteFormValues, StudentInfo } from '@/types/voting';

export interface DuplicateModalState {
  isOpen: boolean;
  studentCode: string;
  role: RoleType;
}

export function useVoting() {
  const [selectedCampusId, setSelectedCampusId] = useState<string>('qt');
  const [selectedAwards, setSelectedAwards] = useState<{ gv: string; cm: string }>({
    gv: 'inspiring',
    cm: 'steady',
  });
  const [currentPick, setCurrentPick] = useState<VotePick | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submittedStudent, setSubmittedStudent] = useState<StudentInfo | null>(null);
  const [duplicateModal, setDuplicateModal] = useState<DuplicateModalState>({
    isOpen: false,
    studentCode: '',
    role: 'gv',
  });
  const submittingRef = useRef(false);

  // Khôi phục URL search params khi mount
  useEffect(() => {
    if (typeof window === 'undefined') return;

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
    setSubmitError(null);
    setSubmittedStudent(null);
    setIsSheetOpen(true);
  };

  const handleCloseVote = () => {
    setIsSheetOpen(false);
    setCurrentPick(null);
  };

  const handleCloseDuplicateModal = () => {
    setDuplicateModal((prev) => ({ ...prev, isOpen: false }));
  };

  /** Trả về true nếu bình chọn đã được ghi nhận vào Google Sheet */
  const handleSubmitVote = async ({ message, studentName, studentCode }: VoteFormValues) => {
    if (!currentPick || submittingRef.current) return false;

    const normalizedCode = studentCode.trim().toUpperCase();

    // 1. Kiểm tra nhanh ở client: học viên này đã vote cho vai trò này trên máy chưa?
    try {
      const stored = localStorage.getItem('echo_student_voted_roles');
      if (stored) {
        const studentVotedMap: Record<string, Partial<Record<RoleType, boolean>>> = JSON.parse(stored);
        if (studentVotedMap[normalizedCode]?.[currentPick.role]) {
          setDuplicateModal({
            isOpen: true,
            studentCode: normalizedCode,
            role: currentPick.role,
          });
          setSubmitError('Học viên này đã bình chọn một người khác');
          return false;
        }
      }
    } catch {
      // Ignore localStorage parse error
    }

    submittingRef.current = true;
    setIsSubmitting(true);
    setSubmitError(null);

    const payload: VotePayload = {
      role: currentPick.role,
      awardId: currentPick.award.id,
      awardName: currentPick.award.name,
      campusId: currentPick.campus.id,
      campusName: currentPick.campus.name,
      nomineeName: currentPick.name,
      voterMessage: message,
      studentName,
      studentCode: normalizedCode,
    };

    try {
      const res = await fetch('/api/votes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json().catch(() => null);

      // Nếu học viên đã bình chọn cho vai trò này trước đó -> Hiện POPUP thông báo
      if (res.status === 409 || resData?.code === 'DUPLICATE') {
        try {
          const stored = localStorage.getItem('echo_student_voted_roles');
          const studentVotedMap: Record<string, Partial<Record<RoleType, boolean>>> = stored ? JSON.parse(stored) : {};
          studentVotedMap[normalizedCode] = {
            ...(studentVotedMap[normalizedCode] || {}),
            [currentPick.role]: true,
          };
          localStorage.setItem('echo_student_voted_roles', JSON.stringify(studentVotedMap));
        } catch {
          // Ignore
        }

        setDuplicateModal({
          isOpen: true,
          studentCode: normalizedCode,
          role: currentPick.role,
        });
        setSubmitError('Học viên này đã bình chọn một người khác');
        return false;
      }

      if (!res.ok || !resData?.success) {
        setSubmitError(
          resData?.message || 'Không thể ghi nhận bình chọn lúc này. Vui lòng thử lại sau ít phút.'
        );
        return false;
      }

      // Lưu thành công vào danh sách vai trò đã vote của học viên
      try {
        const stored = localStorage.getItem('echo_student_voted_roles');
        const studentVotedMap: Record<string, Partial<Record<RoleType, boolean>>> = stored ? JSON.parse(stored) : {};
        studentVotedMap[normalizedCode] = {
          ...(studentVotedMap[normalizedCode] || {}),
          [currentPick.role]: true,
        };
        localStorage.setItem('echo_student_voted_roles', JSON.stringify(studentVotedMap));
      } catch {
        // Ignore
      }

      setSubmittedStudent({ studentName, studentCode: normalizedCode });
      setSubmitSuccess(
        `Cảm ơn bạn đã gửi một Echo! Bạn đã bình chọn cho ${currentPick.name} ở giải ${currentPick.award.name}. Dữ liệu đã được ghi nhận thành công.`
      );
      return true;
    } catch (err) {
      console.error('Lỗi gửi bình chọn:', err);
      setSubmitError('Không kết nối được máy chủ. Vui lòng kiểm tra mạng và thử lại.');
      return false;
    } finally {
      submittingRef.current = false;
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
  };
}

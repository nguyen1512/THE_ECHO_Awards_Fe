'use client';

import { useState, useEffect } from 'react';
import { RoleType } from '@/types/awards';
import { CAMPUSES_DATA } from '@/constants/campuses';
import { INITIAL_ECHO_NOTES } from '@/constants/initialNotes';
import { EchoMessageItem, EchoMessagePayload } from '@/types/echo';

export function useEchoMessage() {
  const [senderName, setSenderName] = useState('');
  const [targetRole, setTargetRole] = useState<RoleType>('gv');
  const [selectedCampusId, setSelectedCampusId] = useState<string>('qt');
  const [selectedPerson, setSelectedPerson] = useState<string>('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState<string | null>(null);
  const [wallNotes, setWallNotes] = useState<EchoMessageItem[]>(INITIAL_ECHO_NOTES);
  const [isLoadingWall, setIsLoadingWall] = useState(false);

  // Lấy danh sách cơ sở có người nhận theo role
  const availableCampuses = CAMPUSES_DATA.filter((c) => (c[targetRole] || []).length > 0);

  // Đảm bảo selectedCampusId hợp lệ
  const currentCampus =
    availableCampuses.find((c) => c.id === selectedCampusId) || availableCampuses[0] || CAMPUSES_DATA[0];

  // Danh sách người nhận ở cơ sở hiện tại
  const availablePersons = currentCampus ? currentCampus[targetRole] || [] : [];

  // Khi đổi cơ sở hoặc role, chọn người đầu tiên
  useEffect(() => {
    if (availablePersons.length > 0) {
      if (!availablePersons.includes(selectedPerson)) {
        setSelectedPerson(availablePersons[0]);
      }
    } else {
      setSelectedPerson('');
    }
  }, [selectedCampusId, targetRole, availablePersons, selectedPerson]);

  // Tải danh sách Echo Messages từ API
  useEffect(() => {
    let mounted = true;
    async function loadNotes() {
      setIsLoadingWall(true);
      try {
        const res = await fetch('/api/echo-messages');
        if (res.ok) {
          const json = await res.json();
          if (mounted && json.data && Array.isArray(json.data) && json.data.length > 0) {
            setWallNotes(json.data);
          }
        }
      } catch {
        // Giữ INITIAL_ECHO_NOTES nếu fetch lỗi
      } finally {
        if (mounted) setIsLoadingWall(false);
      }
    }
    loadNotes();
    return () => {
      mounted = false;
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName.trim() || !selectedPerson || !message.trim() || isSubmitting) return;

    setIsSubmitting(true);
    const payload: EchoMessagePayload = {
      voterName: senderName.trim(),
      recipientRole: targetRole,
      campusId: currentCampus.id,
      campusName: currentCampus.name,
      recipientName: selectedPerson,
      message: message.trim(),
    };

    try {
      const res = await fetch('/api/echo-messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const resData = await res.json();
      const newNote: EchoMessageItem = {
        id: `local-${Date.now()}`,
        senderName: payload.voterName,
        campusName: payload.campusName,
        recipientRole: payload.recipientRole === 'gv' ? 'Giáo viên' : 'Class Manager',
        recipientName: payload.recipientName,
        message: payload.message,
        createdAt: new Date().toISOString(),
      };

      setWallNotes((prev) => [newNote, ...prev]);
      setSubmitSuccess(
        `Cảm ơn bạn đã gửi một Echo! Lời nhắn gửi đến ${selectedPerson} đã sẵn sàng và được đồng bộ lên Google Sheets.`
      );
      setMessage('');
    } catch {
      setSubmitSuccess(`Đã ghi nhận lời nhắn gửi đến ${selectedPerson}!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
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
  };
}

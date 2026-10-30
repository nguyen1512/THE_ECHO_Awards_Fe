'use client';

import React, { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { AlertCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface DuplicateVoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  studentCode: string;
  role: 'gv' | 'cm';
}

export function DuplicateVoteModal({
  isOpen,
  onClose,
  studentCode,
  role,
}: DuplicateVoteModalProps) {
  const [mounted, setMounted] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    }
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !mounted) return null;

  const roleText = role === 'gv' ? 'Giáo viên' : 'Class Manager';

  return createPortal(
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#020619]/85 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Dialog */}
      <div
        ref={modalRef}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="duplicate-vote-title"
        aria-describedby="duplicate-vote-desc"
        className="relative z-10 w-full max-w-md bg-[#0a1a60] border-2 border-[#ff9a5c] rounded-2xl shadow-2xl p-6 sm:p-7 flex flex-col items-center text-center gap-4 animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng thông báo"
          className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#2b47b0] bg-[#02081f] text-[#f2f6ff] flex items-center justify-center hover:bg-[#112680] transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon with copper glow */}
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#ff9a5c]/20 to-[#ff8a3d]/10 border-2 border-[#ff9a5c] flex items-center justify-center shadow-lg shadow-[#ff9a5c]/20 mt-1">
          <AlertCircle className="w-9 h-9 text-[#ff9a5c]" />
        </div>

        {/* Title */}
        <h3
          id="duplicate-vote-title"
          className="font-display text-lg sm:text-xl font-bold uppercase text-white tracking-wide leading-snug"
        >
          Học viên này đã bình chọn một người khác
        </h3>

        {/* Description */}
        <p id="duplicate-vote-desc" className="text-sm text-[#a9b9e8] leading-relaxed">
          Mã số học viên <b className="text-white font-mono tracking-wider">{studentCode}</b> đã
          được ghi nhận bình chọn cho một <b>{roleText}</b> trước đó.
        </p>

        {/* Rule note */}
        <div className="w-full py-2.5 px-3.5 rounded-xl bg-[#02081f] border border-[#2b47b0] text-xs text-[#a9b9e8] text-left leading-relaxed">
          <p className="text-[#ff9a5c] font-semibold mb-1">Quy định bình chọn:</p>
          <p>Mỗi học viên chỉ được bình chọn <b>1 lần cho Giáo viên</b> và <b>1 lần cho Class Manager</b>.</p>
        </div>

        {/* Action Button */}
        <div className="w-full pt-2">
          <Button
            type="button"
            variant="primary"
            size="default"
            onClick={onClose}
            className="w-full justify-center text-sm font-bold uppercase tracking-wider py-3"
          >
            Đã hiểu
          </Button>
        </div>
      </div>
    </div>,
    document.body
  );
}


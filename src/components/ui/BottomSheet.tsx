import React, { useEffect, useRef } from 'react';
import { X } from 'lucide-react';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

export function BottomSheet({ isOpen, onClose, title, children }: BottomSheetProps) {
  const sheetRef = useRef<HTMLDivElement>(null);

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

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 bg-[#020619]/75 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet Container */}
      <div
        ref={sheetRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="sheet-title"
        className="fixed left-0 right-0 bottom-0 z-50 max-h-[90vh] overflow-y-auto bg-[#0a1a60] border-t-[3px] border-t-[#ff8a3d] rounded-t-[24px] shadow-2xl p-6 pb-8 md:max-w-2xl md:mx-auto md:relative md:top-auto md:bottom-auto md:my-auto md:rounded-2xl md:border-[1.5px] md:border-[#ff8a3d]"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Đóng"
          className="absolute top-4 right-4 w-9 h-9 rounded-full border border-[#2b47b0] bg-[#02081f] text-[#f2f6ff] flex items-center justify-center hover:bg-[#112680] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="max-w-xl mx-auto flex flex-col gap-4">
          <h3 id="sheet-title" className="font-display text-base md:text-lg font-bold uppercase pr-10 text-white">
            {title}
          </h3>
          {children}
        </div>
      </div>
    </>
  );
}

import React from 'react';
import { RoleType } from '@/types/awards';
import { CampusItem } from '@/types/campuses';
import { SelectDropdown } from '@/components/ui/SelectDropdown';
import { Button } from '@/components/ui/Button';
import { countSentences, getInitials, getRoleLine } from '@/utils/text';
import { getAvatarColor } from '@/utils/color';
import { CheckCircle2, Loader2, Send } from 'lucide-react';

interface EchoComposerProps {
  senderName: string;
  onSenderNameChange: (val: string) => void;
  targetRole: RoleType;
  onTargetRoleChange: (val: RoleType) => void;
  campuses: CampusItem[];
  selectedCampusId: string;
  onCampusChange: (id: string) => void;
  currentCampus: CampusItem;
  persons: string[];
  selectedPerson: string;
  onPersonChange: (name: string) => void;
  message: string;
  onMessageChange: (val: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isSubmitting: boolean;
  submitSuccess: string | null;
}

export function EchoComposer({
  senderName,
  onSenderNameChange,
  targetRole,
  onTargetRoleChange,
  campuses,
  selectedCampusId,
  onCampusChange,
  currentCampus,
  persons,
  selectedPerson,
  onPersonChange,
  message,
  onMessageChange,
  onSubmit,
  isSubmitting,
  submitSuccess,
}: EchoComposerProps) {
  const sentenceCount = countSentences(message);
  const charLength = message.length;
  const isTooManySentences = sentenceCount > 3;
  const isTooLong = charLength > 400;
  const isValid =
    senderName.trim().length > 0 &&
    selectedPerson.length > 0 &&
    sentenceCount >= 1 &&
    sentenceCount <= 3 &&
    charLength <= 400;

  const getHintText = () => {
    if (!senderName.trim()) return 'Vui lòng nhập họ và tên của bạn.';
    if (!selectedPerson) return 'Vui lòng chọn người nhận.';
    if (sentenceCount === 0) return 'Viết ít nhất 1 câu để gửi.';
    if (isTooManySentences) return 'Rút gọn còn tối đa 3 câu để gửi.';
    if (isTooLong) return 'Độ dài vượt quá 400 ký tự cho phép.';
    return 'Sẵn sàng gửi Echo Message!';
  };

  const recipientLabel = targetRole === 'gv' ? 'Giáo viên' : 'Class Manager';
  const roleText = selectedPerson
    ? getRoleLine(selectedPerson, recipientLabel, currentCampus.name)
    : '';
  const avatarColor = selectedPerson
    ? getAvatarColor(selectedPerson, currentCampus.name)
    : '#1c3fc0';
  const initials = selectedPerson ? getInitials(selectedPerson) : 'AU';

  return (
    <form
      onSubmit={onSubmit}
      className="bg-[#0a1a60] border-2 border-[#ff8a3d] rounded-3xl p-6 sm:p-8 md:p-10 flex flex-col gap-5 shadow-[0_0_0_6px_rgba(255,154,92,0.4)] relative"
    >
      {/* 4 Fields Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Field 1: Sender Name */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label htmlFor="c-name" className="text-xs font-bold text-[#a9b9e8]">
            Tên của bạn
          </label>
          <input
            type="text"
            id="c-name"
            value={senderName}
            onChange={(e) => onSenderNameChange(e.target.value)}
            placeholder="Họ và tên học viên"
            autoComplete="name"
            className="w-full bg-[#02081f] text-[#f2f6ff] border-[1.5px] border-[#2b47b0] rounded-xl py-3 px-4 text-sm md:text-base font-sans focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d]"
          />
        </div>

        {/* Field 2: Role */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-xs font-bold text-[#a9b9e8]">Bạn muốn gửi cho</label>
          <SelectDropdown
            options={[
              { value: 'gv', label: 'Giáo viên' },
              { value: 'cm', label: 'Class Manager (CM)' },
            ]}
            value={targetRole}
            onChange={(val) => onTargetRoleChange(val as RoleType)}
          />
        </div>

        {/* Field 3: Campus */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-xs font-bold text-[#a9b9e8]">Cơ sở</label>
          <SelectDropdown
            options={campuses.map((c) => ({
              value: c.id,
              label: `A&U ${c.name}`,
            }))}
            value={selectedCampusId}
            onChange={onCampusChange}
          />
        </div>

        {/* Field 4: Person */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className="text-xs font-bold text-[#a9b9e8]">Người nhận</label>
          <SelectDropdown
            options={persons.map((p) => ({ value: p, label: p }))}
            value={selectedPerson}
            onChange={onPersonChange}
            placeholder="-- Chọn người nhận --"
          />
        </div>
      </div>

      {/* Recipient Preview Box */}
      {selectedPerson && (
        <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#112680] border border-[#2b47b0] animate-fadeIn">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-base text-white border border-white/60 shrink-0"
            style={{ backgroundColor: avatarColor }}
          >
            {initials}
          </div>
          <div className="flex-1 min-w-0">
            <b className="block text-sm md:text-base text-white truncate">{selectedPerson}</b>
            <span className="text-xs text-[#a9b9e8] block truncate">{roleText}</span>
          </div>
        </div>
      )}

      {/* Message Label & Textarea */}
      <div className="flex flex-col gap-1.5">
        <label htmlFor="c-msg" className="font-display text-sm md:text-base font-bold uppercase text-white mt-1">
          Echo Message của bạn
        </label>
        <textarea
          id="c-msg"
          rows={5}
          value={message}
          onChange={(e) => onMessageChange(e.target.value)}
          placeholder="Viết 1 đến 3 câu. Hãy kể câu chuyện thật hoặc lý do bạn muốn gửi lời cảm ơn đến thầy cô hoặc anh chị CM..."
          className="w-full bg-[#02081f] text-[#f2f6ff] border-[1.5px] border-[#2b47b0] rounded-xl p-4 text-base md:text-lg font-sans resize-y focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d]"
        />
      </div>

      {/* Counts */}
      <div className="flex justify-between items-center text-xs text-[#a9b9e8]">
        <span className={isTooManySentences ? 'text-[#ff9a5c] font-bold' : ''}>
          {sentenceCount} câu (tối đa 3)
        </span>
        <span className={isTooLong ? 'text-[#ff9a5c] font-bold' : ''}>
          {charLength} / 400 ký tự
        </span>
      </div>

      {/* Submit Action */}
      <div className="flex flex-col sm:flex-row items-center gap-4 pt-1">
        <Button
          type="submit"
          size="big"
          variant="primary"
          disabled={!isValid || isSubmitting}
          className="w-full sm:w-auto"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Đang gửi tin nhắn...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Gửi Echo Message
            </>
          )}
        </Button>
        <span className="text-xs md:text-sm text-[#a9b9e8]">{getHintText()}</span>
      </div>

      {/* Success Alert */}
      {submitSuccess && (
        <div className="p-4 rounded-xl bg-[#112680] border border-[#ff8a3d] text-[#f2f6ff] text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{submitSuccess}</span>
        </div>
      )}
    </form>
  );
}

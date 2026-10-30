import React, { useState, useEffect, useRef } from 'react';
import { BottomSheet } from '@/components/ui/BottomSheet';
import { VotePick, VoteFormValues, StudentInfo } from '@/types/voting';
import { getInitials, getRoleLine, countSentences } from '@/utils/text';
import { getAvatarColor } from '@/utils/color';
import { Button } from '@/components/ui/Button';
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react';
import { StudentInfoFields } from './StudentInfoFields';
import { useStudentInfo } from './hooks/useStudentInfo';

interface VoteBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  pick: VotePick | null;
  onSubmit: (values: VoteFormValues) => Promise<boolean>;
  isSubmitting: boolean;
  successMessage: string | null;
  errorMessage: string | null;
  submittedStudent: StudentInfo | null;
}

export function VoteBottomSheet({
  isOpen,
  onClose,
  pick,
  onSubmit,
  isSubmitting,
  successMessage,
  errorMessage,
  submittedStudent,
}: VoteBottomSheetProps) {
  const [message, setMessage] = useState('');
  const student = useStudentInfo();
  const { resetTouched } = student;
  const nameInputRef = useRef<HTMLInputElement>(null);
  const codeInputRef = useRef<HTMLInputElement>(null);
  const phoneInputRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  // Reset message khi mở sheet mới (giữ nguyên tên + mã / sđt học viên đã nhập)
  useEffect(() => {
    if (isOpen) {
      setMessage('');
      resetTouched();
    }
  }, [isOpen, pick, resetTouched]);

  if (!pick) return null;

  const sentenceCount = countSentences(message);
  const charLength = message.length;
  const isTooManySentences = sentenceCount > 3;
  const isTooLong = charLength > 400;
  const isMessageValid = sentenceCount >= 1 && sentenceCount <= 3 && charLength <= 400;

  const getHintText = () => {
    if (sentenceCount === 0) return 'Viết ít nhất 1 câu để gửi.';
    if (isTooManySentences) return 'Rút gọn còn tối đa 3 câu để gửi.';
    if (isTooLong) return 'Độ dài vượt quá 400 ký tự cho phép.';
    return 'Sẵn sàng gửi bình chọn!';
  };

  const roleLabel = pick.role === 'gv' ? 'Giáo viên' : 'Class Manager';
  const roleText = getRoleLine(pick.name, roleLabel, pick.campus.name);
  const avatarColor = getAvatarColor(pick.name, pick.campus.name);
  const initials = getInitials(pick.name);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Đưa con trỏ tới ô lỗi đầu tiên
    const invalidField = student.validateAll();
    if (invalidField === 'studentName') return nameInputRef.current?.focus();
    if (invalidField === 'studentCode') {
      if (!student.studentCode.trim() && !student.studentPhone.trim()) {
        return codeInputRef.current?.focus();
      }
      return codeInputRef.current?.focus();
    }
    if (invalidField === 'studentPhone') return phoneInputRef.current?.focus();
    if (!isMessageValid) return messageRef.current?.focus();

    const info = student.getStudentInfo();
    const ok = await onSubmit({ message, ...info });
    if (ok) student.rememberStudentInfo(info);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} title="Gửi kèm Echo Message">
      {/* Recipient Profile Bar */}
      <div className="flex items-center gap-3.5 p-3 rounded-xl bg-[#112680] border border-[#2b47b0]">
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center font-display font-semibold text-base text-white border border-white/60 shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <b className="block text-sm md:text-base text-white truncate">{pick.name}</b>
          <span className="text-xs text-[#a9b9e8] block truncate">
            {roleText} · <span className="text-[#ff9a5c] font-semibold">{pick.award.name}</span>
          </span>
        </div>
      </div>

      {successMessage ? (
        <div className="p-4 rounded-xl bg-[#112680] border border-[#ff8a3d] text-[#f2f6ff] text-sm flex flex-col gap-2">
          <div className="flex items-center gap-2 text-[#ff9a5c] font-bold">
            <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            Bình chọn thành công!
          </div>
          <p className="text-xs md:text-sm text-[#a9b9e8]">{successMessage}</p>
          {submittedStudent && (
            <dl className="grid grid-cols-[auto_1fr] gap-x-3 gap-y-1 text-xs md:text-sm py-2.5 px-3 rounded-lg bg-[#02081f] border border-[#2b47b0]">
              <dt className="text-[#a9b9e8]">Học viên:</dt>
              <dd className="text-white font-semibold break-words min-w-0">{submittedStudent.studentName}</dd>
              {submittedStudent.studentCode && (
                <>
                  <dt className="text-[#a9b9e8]">Mã số:</dt>
                  <dd className="text-white font-semibold tracking-wider break-all min-w-0">{submittedStudent.studentCode}</dd>
                </>
              )}
              {submittedStudent.studentPhone && (
                <>
                  <dt className="text-[#a9b9e8]">Số điện thoại:</dt>
                  <dd className="text-white font-semibold tracking-wider break-all min-w-0">{submittedStudent.studentPhone}</dd>
                </>
              )}
            </dl>
          )}
          <div className="pt-2">
            <Button size="sm" variant="ghost" onClick={onClose} className="w-full">
              Đóng cửa sổ
            </Button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
          <StudentInfoFields
            studentName={student.studentName}
            studentCode={student.studentCode}
            studentPhone={student.studentPhone}
            nameError={student.nameError}
            codeError={student.codeError}
            phoneError={student.phoneError}
            identifierError={student.identifierError}
            onNameChange={student.handleNameChange}
            onCodeChange={student.handleCodeChange}
            onPhoneChange={student.handlePhoneChange}
            onBlur={student.handleBlur}
            nameInputRef={nameInputRef}
            codeInputRef={codeInputRef}
            phoneInputRef={phoneInputRef}
            disabled={isSubmitting}
          />

          <label htmlFor="vote-msg" className="text-xs md:text-sm text-[#a9b9e8]">
            Từ 1 đến 3 câu: lời cảm ơn, sự trân trọng hoặc một kỷ niệm đáng nhớ dành cho người bạn bình chọn.
          </label>

          <textarea
            ref={messageRef}
            id="vote-msg"
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            disabled={isSubmitting}
            placeholder="Ví dụ: Cô luôn nhắn hỏi thăm mỗi khi em vắng buổi học, và nhờ đó em đã không bỏ cuộc..."
            className="w-full bg-[#02081f] text-[#f2f6ff] border-[1.5px] border-[#2b47b0] rounded-xl p-3.5 text-sm md:text-base font-sans resize-y focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d] disabled:opacity-60"
          />

          {/* Counts */}
          <div className="flex justify-between items-center text-xs text-[#a9b9e8]">
            <span className={isTooManySentences ? 'text-[#ff9a5c] font-bold' : ''}>
              {sentenceCount} câu (tối đa 3)
            </span>
            <span className={isTooLong ? 'text-[#ff9a5c] font-bold' : ''}>
              {charLength} / 400 ký tự
            </span>
          </div>

          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-2 p-3 rounded-xl bg-[#02081f] border border-[#ff9a5c] text-xs md:text-sm text-[#f2f6ff]"
            >
              <AlertCircle className="w-4 h-4 text-[#ff9a5c] shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <Button
              type="submit"
              size="default"
              variant="primary"
              disabled={isSubmitting}
              aria-busy={isSubmitting}
              className="w-full sm:w-auto"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Đang ghi nhận...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Gửi bình chọn
                </>
              )}
            </Button>
            <span className="text-xs text-[#a9b9e8]">{getHintText()}</span>
          </div>
        </form>
      )}
    </BottomSheet>
  );
}

import React from 'react';
import { STUDENT_NAME_MAX, STUDENT_CODE_MAX } from '@/utils/student';
import { StudentField } from './hooks/useStudentInfo';

interface StudentInfoFieldsProps {
  studentName: string;
  studentCode: string;
  studentPhone: string;
  nameError: string | null;
  codeError: string | null;
  phoneError: string | null;
  identifierError: string | null;
  onNameChange: (val: string) => void;
  onCodeChange: (val: string) => void;
  onPhoneChange: (val: string) => void;
  onBlur: (field: StudentField) => void;
  nameInputRef?: React.Ref<HTMLInputElement>;
  codeInputRef?: React.Ref<HTMLInputElement>;
  phoneInputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
}

const inputBase =
  'w-full bg-[#02081f] text-[#f2f6ff] border-[1.5px] rounded-xl py-2.5 px-3.5 text-sm md:text-base font-sans placeholder:text-[#a9b9e8]/50 focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d] disabled:opacity-60 transition-colors';

export function StudentInfoFields({
  studentName,
  studentCode,
  studentPhone,
  nameError,
  codeError,
  phoneError,
  identifierError,
  onNameChange,
  onCodeChange,
  onPhoneChange,
  onBlur,
  nameInputRef,
  codeInputRef,
  phoneInputRef,
  disabled,
}: StudentInfoFieldsProps) {
  const hasIdentifierError = !!identifierError && !studentCode.trim() && !studentPhone.trim();

  return (
    <div className="flex flex-col gap-3">
      {/* 1. Họ và tên học viên (Bắt buộc) */}
      <div className="flex flex-col gap-1 min-w-0">
        <label htmlFor="vote-student-name" className="text-xs font-bold text-[#a9b9e8]">
          Họ và tên học viên <span className="text-[#ff9a5c]">*</span>
        </label>
        <input
          ref={nameInputRef}
          id="vote-student-name"
          type="text"
          value={studentName}
          onChange={(e) => onNameChange(e.target.value)}
          onBlur={() => onBlur('studentName')}
          placeholder="Ví dụ: Nguyễn Văn An"
          maxLength={STUDENT_NAME_MAX + 20}
          autoComplete="name"
          autoCapitalize="words"
          enterKeyHint="next"
          disabled={disabled}
          aria-invalid={!!nameError}
          aria-describedby={nameError ? 'vote-student-name-error' : undefined}
          className={`${inputBase} ${nameError ? 'border-[#ff9a5c]' : 'border-[#2b47b0]'}`}
        />
        {nameError && (
          <p id="vote-student-name-error" role="alert" className="text-xs text-[#ff9a5c] font-semibold mt-0.5">
            {nameError}
          </p>
        )}
      </div>

      {/* 2. Mã số học viên & Số điện thoại (Nhập 1 trong 2 hoặc cả hai) */}
      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-[#a9b9e8]">
            Thông tin xác thực <span className="text-[#ff9a5c]">*</span>
          </span>
          <span className="text-[11px] text-[#ff9a5c] italic">
            (Nhập Mã học viên HOẶC Số điện thoại, hoặc cả hai)
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Ô Mã học viên */}
          <div className="flex flex-col gap-1 min-w-0">
            <label htmlFor="vote-student-code" className="text-[11px] text-[#a9b9e8]">
              Mã số học viên
            </label>
            <input
              ref={codeInputRef}
              id="vote-student-code"
              type="text"
              value={studentCode}
              onChange={(e) => onCodeChange(e.target.value)}
              onBlur={() => onBlur('studentCode')}
              placeholder="Ví dụ: HV12345"
              maxLength={STUDENT_CODE_MAX + 10}
              autoComplete="off"
              autoCapitalize="characters"
              autoCorrect="off"
              spellCheck={false}
              enterKeyHint="next"
              disabled={disabled}
              aria-invalid={!!codeError || hasIdentifierError}
              aria-describedby={codeError ? 'vote-student-code-error' : undefined}
              className={`${inputBase} uppercase tracking-wider ${
                codeError || hasIdentifierError ? 'border-[#ff9a5c]' : 'border-[#2b47b0]'
              }`}
            />
            {codeError && (
              <p id="vote-student-code-error" role="alert" className="text-xs text-[#ff9a5c] font-semibold mt-0.5">
                {codeError}
              </p>
            )}
          </div>

          {/* Ô Số điện thoại */}
          <div className="flex flex-col gap-1 min-w-0">
            <label htmlFor="vote-student-phone" className="text-[11px] text-[#a9b9e8]">
              Số điện thoại
            </label>
            <input
              ref={phoneInputRef}
              id="vote-student-phone"
              type="tel"
              value={studentPhone}
              onChange={(e) => onPhoneChange(e.target.value)}
              onBlur={() => onBlur('studentPhone')}
              placeholder="Ví dụ: 0912345678"
              maxLength={15}
              autoComplete="tel"
              enterKeyHint="next"
              disabled={disabled}
              aria-invalid={!!phoneError || hasIdentifierError}
              aria-describedby={phoneError ? 'vote-student-phone-error' : undefined}
              className={`${inputBase} tracking-wide ${
                phoneError || hasIdentifierError ? 'border-[#ff9a5c]' : 'border-[#2b47b0]'
              }`}
            />
            {phoneError && (
              <p id="vote-student-phone-error" role="alert" className="text-xs text-[#ff9a5c] font-semibold mt-0.5">
                {phoneError}
              </p>
            )}
          </div>
        </div>

        {hasIdentifierError && (
          <p role="alert" className="text-xs text-[#ff9a5c] font-semibold mt-1">
            {identifierError}
          </p>
        )}
      </div>
    </div>
  );
}

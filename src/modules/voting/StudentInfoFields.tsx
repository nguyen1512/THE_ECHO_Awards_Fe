import React from 'react';
import { STUDENT_NAME_MAX, STUDENT_CODE_MAX } from '@/utils/student';

interface StudentInfoFieldsProps {
  studentName: string;
  studentCode: string;
  nameError: string | null;
  codeError: string | null;
  onNameChange: (val: string) => void;
  onCodeChange: (val: string) => void;
  onBlur: (field: 'studentName' | 'studentCode') => void;
  nameInputRef?: React.Ref<HTMLInputElement>;
  codeInputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
}

const inputBase =
  'w-full bg-[#02081f] text-[#f2f6ff] border-[1.5px] rounded-xl py-3 px-4 text-base font-sans placeholder:text-[#a9b9e8]/60 focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d] disabled:opacity-60';

export function StudentInfoFields({
  studentName,
  studentCode,
  nameError,
  codeError,
  onNameChange,
  onCodeChange,
  onBlur,
  nameInputRef,
  codeInputRef,
  disabled,
}: StudentInfoFieldsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div className="flex flex-col gap-1.5 min-w-0">
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
          <p id="vote-student-name-error" role="alert" className="text-xs text-[#ff9a5c] font-semibold">
            {nameError}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1.5 min-w-0">
        <label htmlFor="vote-student-code" className="text-xs font-bold text-[#a9b9e8]">
          Mã số học viên <span className="text-[#ff9a5c]">*</span>
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
          aria-invalid={!!codeError}
          aria-describedby={codeError ? 'vote-student-code-error' : undefined}
          className={`${inputBase} uppercase tracking-wider ${codeError ? 'border-[#ff9a5c]' : 'border-[#2b47b0]'}`}
        />
        {codeError && (
          <p id="vote-student-code-error" role="alert" className="text-xs text-[#ff9a5c] font-semibold">
            {codeError}
          </p>
        )}
      </div>
    </div>
  );
}

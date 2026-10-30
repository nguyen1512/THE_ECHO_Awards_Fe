'use client';

import { useState, useCallback } from 'react';
import { StudentInfo } from '@/types/voting';
import {
  normalizeStudentName,
  normalizeStudentCode,
  normalizeStudentPhone,
  validateStudentName,
  validateStudentCode,
  validateStudentPhone,
  validateStudentIdentifiers,
} from '@/utils/student';

const STORAGE_KEY = 'echo_student_info';

export type StudentField = 'studentName' | 'studentCode' | 'studentPhone';

/**
 * Quản lý các trường Tên + Mã số học viên + Số điện thoại:
 * Yêu cầu: Bắt buộc Tên học viên, và có ít nhất 1 trong 2: Mã học viên hoặc Số điện thoại (hoặc cả hai).
 */
function loadStoredStudentInfo(): Partial<StudentInfo> {
  if (typeof window === 'undefined') return {};
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? (JSON.parse(stored) as Partial<StudentInfo>) : {};
  } catch {
    return {};
  }
}

export function useStudentInfo() {
  const [studentName, setStudentName] = useState(() => {
    const v = loadStoredStudentInfo().studentName;
    return typeof v === 'string' ? v : '';
  });
  const [studentCode, setStudentCode] = useState(() => {
    const v = loadStoredStudentInfo().studentCode;
    return typeof v === 'string' ? v : '';
  });
  const [studentPhone, setStudentPhone] = useState(() => {
    const v = loadStoredStudentInfo().studentPhone;
    return typeof v === 'string' ? v : '';
  });

  const [touched, setTouched] = useState<Record<StudentField, boolean>>({
    studentName: false,
    studentCode: false,
    studentPhone: false,
  });

  const nameError = validateStudentName(studentName);
  const codeError = validateStudentCode(studentCode);
  const phoneError = validateStudentPhone(studentPhone);
  const identifierError = validateStudentIdentifiers(studentCode, studentPhone);

  const handleNameChange = (val: string) => setStudentName(val);
  const handleCodeChange = (val: string) => setStudentCode(val.toUpperCase());
  const handlePhoneChange = (val: string) => setStudentPhone(val);

  const handleBlur = (field: StudentField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'studentName') setStudentName((v) => normalizeStudentName(v));
    if (field === 'studentCode') setStudentCode((v) => normalizeStudentCode(v));
    if (field === 'studentPhone') setStudentPhone((v) => normalizeStudentPhone(v));
  };

  /** Đánh dấu tất cả trường đã chạm khi bấm gửi, trả về trường lỗi đầu tiên hoặc null nếu hợp lệ */
  const validateAll = useCallback((): StudentField | null => {
    setTouched({ studentName: true, studentCode: true, studentPhone: true });
    if (nameError) return 'studentName';
    if (!studentCode.trim() && !studentPhone.trim()) {
      return 'studentCode';
    }
    if (codeError) return 'studentCode';
    if (phoneError) return 'studentPhone';
    return null;
  }, [nameError, codeError, phoneError, studentCode, studentPhone]);

  const resetTouched = useCallback(() => {
    setTouched({ studentName: false, studentCode: false, studentPhone: false });
  }, []);

  const getStudentInfo = (): StudentInfo => ({
    studentName: normalizeStudentName(studentName),
    studentCode: normalizeStudentCode(studentCode),
    studentPhone: normalizeStudentPhone(studentPhone),
  });

  const rememberStudentInfo = (info: StudentInfo) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    } catch {
      // Ignore
    }
  };

  // Xác định lỗi hiển thị cho từng trường
  const displayedNameError = touched.studentName ? nameError : null;
  const displayedCodeError = touched.studentCode ? codeError : null;
  const displayedPhoneError = touched.studentPhone ? phoneError : null;
  // Lỗi chung khi cả 2 trường mã và số điện thoại đều trống (chỉ hiện khi đã chạm cả 2 hoặc submit)
  const displayedIdentifierError =
    (touched.studentCode && touched.studentPhone) || (touched.studentCode && !studentPhone.trim())
      ? identifierError
      : null;

  return {
    studentName,
    studentCode,
    studentPhone,
    nameError: displayedNameError,
    codeError: displayedCodeError,
    phoneError: displayedPhoneError,
    identifierError: displayedIdentifierError,
    handleNameChange,
    handleCodeChange,
    handlePhoneChange,
    handleBlur,
    validateAll,
    resetTouched,
    getStudentInfo,
    rememberStudentInfo,
  };
}

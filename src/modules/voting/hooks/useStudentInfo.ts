'use client';

import { useState, useCallback } from 'react';
import { StudentInfo } from '@/types/voting';
import {
  normalizeStudentName,
  normalizeStudentCode,
  validateStudentName,
  validateStudentCode,
} from '@/utils/student';

const STORAGE_KEY = 'echo_student_info';

type StudentField = 'studentName' | 'studentCode';

/**
 * Quản lý 2 trường Tên + Mã số học viên: giá trị, lỗi inline (hiện khi blur hoặc khi bấm gửi)
 * và ghi nhớ vào localStorage để tự điền cho lần bình chọn sau.
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
  // Tự điền từ localStorage (form chỉ render khi mở sheet ở client nên không lệch hydration)
  const [studentName, setStudentName] = useState(() => {
    const v = loadStoredStudentInfo().studentName;
    return typeof v === 'string' ? v : '';
  });
  const [studentCode, setStudentCode] = useState(() => {
    const v = loadStoredStudentInfo().studentCode;
    return typeof v === 'string' ? v : '';
  });
  const [touched, setTouched] = useState<Record<StudentField, boolean>>({
    studentName: false,
    studentCode: false,
  });

  const nameError = validateStudentName(studentName);
  const codeError = validateStudentCode(studentCode);

  const handleNameChange = (val: string) => setStudentName(val);
  // Tự động viết hoa ngay khi gõ
  const handleCodeChange = (val: string) => setStudentCode(val.toUpperCase());

  const handleBlur = (field: StudentField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    if (field === 'studentName') setStudentName((v) => normalizeStudentName(v));
    if (field === 'studentCode') setStudentCode((v) => normalizeStudentCode(v));
  };

  /** Đánh dấu tất cả trường đã chạm (khi bấm gửi), trả về trường lỗi đầu tiên hoặc null nếu hợp lệ */
  const validateAll = useCallback((): StudentField | null => {
    setTouched({ studentName: true, studentCode: true });
    if (nameError) return 'studentName';
    if (codeError) return 'studentCode';
    return null;
  }, [nameError, codeError]);

  const resetTouched = useCallback(() => {
    setTouched({ studentName: false, studentCode: false });
  }, []);

  const getStudentInfo = (): StudentInfo => ({
    studentName: normalizeStudentName(studentName),
    studentCode: normalizeStudentCode(studentCode),
  });

  const rememberStudentInfo = (info: StudentInfo) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(info));
    } catch {
      // Ignore
    }
  };

  return {
    studentName,
    studentCode,
    nameError: touched.studentName ? nameError : null,
    codeError: touched.studentCode ? codeError : null,
    handleNameChange,
    handleCodeChange,
    handleBlur,
    validateAll,
    resetTouched,
    getStudentInfo,
    rememberStudentInfo,
  };
}

/**
 * Chuẩn hóa & kiểm tra thông tin học viên (dùng chung cho client và API route)
 */

export const STUDENT_NAME_MIN = 2;
export const STUDENT_NAME_MAX = 100;
export const STUDENT_CODE_MIN = 3;
export const STUDENT_CODE_MAX = 20;

// Chữ cái Unicode (kể cả tiếng Việt có dấu), khoảng trắng, dấu chấm, nháy đơn, gạch nối
const STUDENT_NAME_PATTERN = /^[\p{L}\p{M}][\p{L}\p{M}\s.'-]*$/u;
const STUDENT_CODE_PATTERN = /^[A-Z0-9]+$/;
// Số điện thoại Việt Nam: 10 chữ số (hoặc đầu +84), hỗ trợ các đầu số 03, 05, 07, 08, 09
const VIETNAM_PHONE_PATTERN = /^(0|\+84)(3|5|7|8|9)[0-9]{8}$/;

/** Trim và gộp nhiều khoảng trắng liên tiếp thành 1 */
export function normalizeStudentName(value: string): string {
  return (value || '').normalize('NFC').replace(/\s+/g, ' ').trim();
}

/** Trim và viết hoa mã học viên */
export function normalizeStudentCode(value: string): string {
  return (value || '').trim().toUpperCase();
}

/** Chuẩn hóa số điện thoại: bỏ khoảng trắng, dấu chấm, gạch nối, chuyển +84 thành 0 */
export function normalizeStudentPhone(value: string): string {
  const cleaned = (value || '').trim().replace(/[\s.-]/g, '');
  if (cleaned.startsWith('+84')) {
    return '0' + cleaned.slice(3);
  }
  return cleaned;
}

/** Trả về thông báo lỗi tiếng Việt, hoặc null nếu hợp lệ */
export function validateStudentName(value: string): string | null {
  const name = normalizeStudentName(value);
  if (!name) return 'Vui lòng nhập họ và tên học viên.';
  if (name.length < STUDENT_NAME_MIN) return `Họ và tên cần ít nhất ${STUDENT_NAME_MIN} ký tự.`;
  if (name.length > STUDENT_NAME_MAX) return `Họ và tên tối đa ${STUDENT_NAME_MAX} ký tự.`;
  if (!STUDENT_NAME_PATTERN.test(name)) return 'Họ và tên chỉ gồm chữ cái và khoảng trắng.';
  return null;
}

export function validateStudentCode(value: string): string | null {
  const code = normalizeStudentCode(value);
  if (!code) return null; // Có thể để trống nếu đã nhập số điện thoại
  if (!STUDENT_CODE_PATTERN.test(code)) return 'Mã số học viên chỉ gồm chữ và số, không dấu cách hay ký tự đặc biệt.';
  if (code.length < STUDENT_CODE_MIN || code.length > STUDENT_CODE_MAX) {
    return `Mã số học viên dài từ ${STUDENT_CODE_MIN} đến ${STUDENT_CODE_MAX} ký tự.`;
  }
  return null;
}

export function validateStudentPhone(value: string): string | null {
  const phone = normalizeStudentPhone(value);
  if (!phone) return null; // Có thể để trống nếu đã nhập mã học viên
  if (!VIETNAM_PHONE_PATTERN.test(phone)) {
    return 'Số điện thoại không hợp lệ (cần 10 chữ số, ví dụ: 0912345678).';
  }
  return null;
}

/**
 * Kiểm tra ràng buộc: Phải có ít nhất Mã học viên HOẶC Số điện thoại (hoặc cả hai)
 */
export function validateStudentIdentifiers(code: string, phone: string): string | null {
  const normalizedCode = normalizeStudentCode(code);
  const normalizedPhone = normalizeStudentPhone(phone);

  if (!normalizedCode && !normalizedPhone) {
    return 'Vui lòng nhập Mã số học viên hoặc Số điện thoại (hoặc cả hai).';
  }

  if (normalizedCode) {
    const codeError = validateStudentCode(normalizedCode);
    if (codeError) return codeError;
  }

  if (normalizedPhone) {
    const phoneError = validateStudentPhone(normalizedPhone);
    if (phoneError) return phoneError;
  }

  return null;
}

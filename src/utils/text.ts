import { SPECIAL_TITLES } from '@/constants/campuses';

/**
 * Đếm số câu tiếng Việt hợp lệ trong chuỗi
 */
export function countSentences(text: string): number {
  if (!text || !text.trim()) return 0;
  const matches = text.trim().match(/[^.!?…]+[.!?…]*/g) || [];
  return matches.filter((x) => x.trim().length > 1).length;
}

/**
 * Lấy 2 chữ cái đầu viết tắt cho avatar đại diện
 */
export function getInitials(name: string): string {
  if (!name) return 'AU';
  const cleanName = name.replace(/^(Cô|Thầy|Anh|Chị|Bạn)\s+/i, '').trim();
  const words = cleanName.split(/\s+/).filter(Boolean);
  if (words.length === 0) return 'AU';
  if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
  return (words[0][0] + words[words.length - 1][0]).toUpperCase();
}

/**
 * Trả về chuỗi chức danh hoặc role + cơ sở
 */
export function getRoleLine(name: string, roleLabel: string, campusName: string): string {
  if (SPECIAL_TITLES[name]) {
    return SPECIAL_TITLES[name];
  }
  return `${roleLabel} · A&U ${campusName}`;
}

export const AVATAR_HUES = [
  '#1c3fc0',
  '#2f6bdc',
  '#c2561a',
  '#4a3fc0',
  '#b8441f',
  '#1f58c9',
  '#7934a3',
  '#1e6d8a',
];

/**
 * Trả về mã màu đồng nhất cho từng người dựa theo tên và cơ sở
 */
export function getAvatarColor(name: string, campusName: string = ''): string {
  const index = (name.length + campusName.length) % AVATAR_HUES.length;
  return AVATAR_HUES[index];
}

import { AwardsData } from '@/types/awards';

export const AWARDS_DATA: AwardsData = {
  gv: [
    {
      id: 'inspiring',
      name: 'Inspiring Echo',
      desc: 'Tôn vinh giáo viên truyền cảm hứng, tạo động lực và lan tỏa năng lượng tích cực đến học viên.',
    },
    {
      id: 'guiding',
      name: 'Guiding Echo',
      desc: 'Dành cho giáo viên tận tâm hướng dẫn, hỗ trợ và theo sát sự tiến bộ của học viên.',
    },
    {
      id: 'energy',
      name: 'Energy Echo',
      desc: 'Ghi nhận giáo viên tạo ra những lớp học sôi nổi, vui vẻ và giàu tính tương tác.',
    },
    {
      id: 'rising',
      name: 'Rising Echo',
      desc: 'Dành cho giáo viên mới có tiềm năng và thành tích nổi bật.',
    },
    {
      id: 'lasting',
      name: 'Lasting Echo',
      desc: 'Tôn vinh giáo viên tạo ảnh hưởng tích cực và lâu dài đến học viên.',
    },
  ],
  cm: [
    {
      id: 'steady',
      name: 'Steady Echo',
      desc: 'Ghi nhận CM luôn trách nhiệm, đáng tin cậy và hỗ trợ lớp học vận hành suôn sẻ.',
    },
    {
      id: 'connecting',
      name: 'Connecting Echo',
      desc: 'Dành cho CM giỏi kết nối học viên, giáo viên, phụ huynh và trung tâm.',
    },
    {
      id: 'caring',
      name: 'Caring Echo',
      desc: 'Tôn vinh CM luôn quan tâm, kiên nhẫn và đồng hành cùng học viên trong suốt quá trình học tập.',
    },
  ],
};

export const ROLE_LABELS: Record<'gv' | 'cm', string> = {
  gv: 'Giáo viên',
  cm: 'Class Manager',
};

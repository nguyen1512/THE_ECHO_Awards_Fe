import { CampusItem } from '@/types/campuses';

export const CAMPUSES_DATA: CampusItem[] = [
  {
    id: 'qt',
    name: 'Quang Trung',
    gv: [
      'Nguyễn Thị Mỹ Hạnh',
      'Nguyễn Thị Nguyệt',
      'Trần Minh Thu',
      'Nguyễn Trang Uyên',
      'Trần Thị Minh Hà',
      'Lê Khắc Quý',
      'Bùi Khánh Linh',
      'Hoàng Đức Linh',
      'Mai Huy',
    ],
    cm: ['Lê Huyền Trang', 'Hoàng Thị Tuyết Chinh'],
  },
  {
    id: 'pk',
    name: 'Phùng Khoang',
    gv: [
      'Trịnh Hoàng Mi',
      'Trần Ngọc Nam',
      'Nguyễn Đức Thịnh An',
      'Phùng Thị Như Quỳnh',
      'Nguyễn Hải Nam',
      'Trần Tuấn Hải',
      'Bùi Thị Như Quỳnh',
      'Nguyễn Mỹ Minh Tâm',
    ],
    cm: ['Nguyễn Ngọc Chi', 'Phạm Hương Giang'],
  },
  {
    id: 'mk',
    name: 'Minh Khai + Hòa Lạc',
    gv: [
      'Vũ Quỳnh Anh',
      'Nguyễn Doãn Quốc Anh',
      'Nguyễn Tuấn Nghĩa',
      'Đào Quế Anh',
      'Vũ Hùng Dương',
    ],
    cm: ['Nguyễn Thu Khương Anh', 'Lương Thị Kim Oanh'],
  },
  {
    id: 'ptd',
    name: 'Phạm Thận Duật',
    gv: [
      'Bùi Thuý Nga',
      'Hoàng Tiến Minh',
      'Hà Phương Ngân',
      'Nguyễn Thuỷ Tiên',
      'Nguyễn Anh Đức',
      'Trần Nhật Tài',
      'Nguyễn Thị Khánh Linh',
      'Vũ Thị Ngân',
      'Trương Ánh Ngọc',
    ],
    cm: ['Phạm Minh Hương', 'Trần Thị Kim Huệ', 'Trần Yến Nhi'],
  },
  {
    id: 'md',
    name: 'Mỹ Đình',
    gv: ['Phan Thị Minh Phương', 'Hoàng Quang Đức'],
    cm: [],
  },
  {
    id: 'hn',
    name: 'Hoàng Ngân',
    gv: [
      'Nguyễn Nhật Long',
      'Nguyễn Tuấn Anh',
      'Lê Tú Anh',
      'Nguyễn Thị Phương Loan',
      'Thuỳ Trang',
      'Cao Thị Diễm Quỳnh',
    ],
    cm: ['Lê Phú An'],
  },
  {
    id: 'btl',
    name: 'Bắc Từ Liêm',
    gv: ['Vũ Hoài An', 'Thu Uyên'],
    cm: ['Ngô Thị Hằng Nga'],
  },
];

export const SPECIAL_TITLES: Record<string, string> = {
  'Nguyễn Thị Mỹ Hạnh': 'PPGV Cụm',
  'Nguyễn Thị Nguyệt': 'HOC Quang Trung',
  'Trịnh Hoàng Mi': 'Teacher Lead',
  'Vũ Quỳnh Anh': 'Teacher Lead',
  'Bùi Thuý Nga': 'PPGV Cụm',
  'Hoàng Tiến Minh': 'Teacher Lead',
  'Nguyễn Nhật Long': 'Teacher Lead',
};

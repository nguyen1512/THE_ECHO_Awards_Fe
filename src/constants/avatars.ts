/**
 * Ảnh đại diện ứng viên (lấy từ Google Sheet danh sách GV tham gia 20/11).
 * Key: `${campusId}|${tên ứng viên}`. Ai không có trong map sẽ hiện avatar chữ cái.
 */
export const NOMINEE_AVATARS: Record<string, string> = {
  'qt|Nguyễn Thị Mỹ Hạnh': '/avatars/qt-nguyen-thi-my-hanh.jpg',
  'qt|Nguyễn Thị Nguyệt': '/avatars/qt-nguyen-thi-nguyet.jpg',
  'qt|Trần Minh Thu': '/avatars/qt-tran-minh-thu.jpg',
  'qt|Nguyễn Trang Uyên': '/avatars/qt-nguyen-trang-uyen.jpg',
  'qt|Trần Thị Minh Hà': '/avatars/qt-tran-thi-minh-ha.jpg',
  'qt|Lê Khắc Quý': '/avatars/qt-le-khac-quy.jpg',
  'qt|Bùi Khánh Linh': '/avatars/qt-bui-khanh-linh.jpg',
  'qt|Hoàng Đức Linh': '/avatars/qt-hoang-duc-linh.jpg',
  'qt|Mai Huy': '/avatars/qt-mai-huy.jpg',
  'pk|Trịnh Hoàng Mi': '/avatars/pk-trinh-hoang-mi.jpg',
  'pk|Trần Ngọc Nam': '/avatars/pk-tran-ngoc-nam.jpg',
  'pk|Nguyễn Đức Thịnh An': '/avatars/pk-nguyen-duc-thinh-an.jpg',
  'pk|Phùng Thị Như Quỳnh': '/avatars/pk-phung-thi-nhu-quynh.jpg',
  'pk|Nguyễn Hải Nam': '/avatars/pk-nguyen-hai-nam.jpg',
  'pk|Trần Tuấn Hải': '/avatars/pk-tran-tuan-hai.jpg',
  'pk|Bùi Thị Như Quỳnh': '/avatars/pk-bui-thi-nhu-quynh.jpg',
  'mk|Vũ Quỳnh Anh': '/avatars/mk-vu-quynh-anh.jpg',
  'mk|Nguyễn Doãn Quốc Anh': '/avatars/mk-nguyen-doan-quoc-anh.jpg',
  'mk|Nguyễn Tuấn Nghĩa': '/avatars/mk-nguyen-tuan-nghia.jpg',
  'mk|Đào Quế Anh': '/avatars/mk-dao-que-anh.jpg',
  'mk|Vũ Hùng Dương': '/avatars/mk-vu-hung-duong.jpg',
  'ptd|Bùi Thuý Nga': '/avatars/ptd-bui-thuy-nga.jpg',
  'ptd|Hoàng Tiến Minh': '/avatars/ptd-hoang-tien-minh.jpg',
  'ptd|Hà Phương Ngân': '/avatars/ptd-ha-phuong-ngan.jpg',
  'ptd|Nguyễn Thuỷ Tiên': '/avatars/ptd-nguyen-thuy-tien.jpg',
  'ptd|Nguyễn Anh Đức': '/avatars/ptd-nguyen-anh-duc.jpg',
  'ptd|Trần Nhật Tài': '/avatars/ptd-tran-nhat-tai.jpg',
  'ptd|Nguyễn Thị Khánh Linh': '/avatars/ptd-nguyen-thi-khanh-linh.jpg',
  'ptd|Cô Vũ Thị Ngân': '/avatars/ptd-co-vu-thi-ngan.jpg',
  'ptd|Cô Trương Ánh Ngọc': '/avatars/ptd-co-truong-anh-ngoc.jpg',
  'md|Cô Minh Phương': '/avatars/md-co-minh-phuong.jpg',
  'md|Hoàng Quang Đức': '/avatars/md-hoang-quang-duc.jpg',
  'hn|Nguyễn Nhật Long': '/avatars/hn-nguyen-nhat-long.jpg',
  'hn|Lê Tú Anh': '/avatars/hn-le-tu-anh.jpg',
  'hn|Nguyễn Thị Phương Loan': '/avatars/hn-nguyen-thi-phuong-loan.jpg',
  'hn|Cao Thị Diễm Quỳnh': '/avatars/hn-cao-thi-diem-quynh.jpg',
  'btl|Vũ Hoài An': '/avatars/btl-vu-hoai-an.jpg',
  'btl|Thu Uyên': '/avatars/btl-thu-uyen.jpg',
};

export function getNomineeAvatar(campusId: string, name: string): string | undefined {
  return NOMINEE_AVATARS[`${campusId}|${name}`];
}

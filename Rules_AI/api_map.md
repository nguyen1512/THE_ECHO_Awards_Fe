# BẢN ĐỒ API & GOOGLE SHEETS ENDPOINTS (THE ECHO AWARDS)

| Endpoint | Method | Chức năng | Nguồn dữ liệu |
| :--- | :--- | :--- | :--- |
| `/api/votes` | `POST` | Ghi nhận lượt bình chọn mới | Ghi vào Google Sheet (Tab `Votes`) |
| `/api/votes` | `GET` | Lấy thống kê số lượt bình chọn | Đọc từ Google Sheet (Tab `Votes`) |
| `/api/echo-messages` | `GET` | Lấy danh sách tin nhắn Echo Wall | Đọc từ Google Sheet (Tab `EchoMessages`) |
| `/api/echo-messages` | `POST` | Gửi tin nhắn tri ân mới từ Composer | Ghi vào Google Sheet (Tab `EchoMessages`) |
| `/api/nominations` | `GET` | Lấy danh mục cơ sở và ứng viên | Đọc từ Google Sheet hoặc Constants |

### Cấu trúc Google Sheets Schema

#### 1. Sheet Tab: `Votes`
- Cột A: `Timestamp` (Thời gian bình chọn theo giờ VN, ví dụ `2026-10-29 17:15:00`; các dòng cũ dạng ISO `2026-10-29T10:15:00Z`)
- Cột B: `Role` (`gv` hoặc `cm`)
- Cột C: `AwardId` (`inspiring`, `guiding`, `energy`, `rising`, `lasting`, `steady`, `connecting`, `caring`)
- Cột D: `AwardName` (Ví dụ `Inspiring Echo`)
- Cột E: `CampusId` (`qt`, `pk`, `mk`, `ptd`, `md`, `hn`, `btl`)
- Cột F: `CampusName` (`Quang Trung`, `Phùng Khoang`,...)
- Cột G: `NomineeName` (Tên giáo viên hoặc CM)
- Cột H: `VoterMessage` (Lời nhắn kèm theo từ 1 đến 3 câu)
- Cột I: `StudentName` (Tên học viên bình chọn)
- Cột J: `StudentCode` (Mã số học viên, viết hoa — dùng làm khóa chống trùng)

#### 2. Sheet Tab: `EchoMessages`
- Cột A: `Timestamp` (Thời gian gửi)
- Cột B: `VoterName` (Tên học viên gửi)
- Cột C: `RecipientRole` (`Giáo viên` hoặc `Class Manager`)
- Cột D: `CampusId` (Mã cơ sở)
- Cột E: `CampusName` (Tên cơ sở)
- Cột F: `RecipientName` (Tên người nhận)
- Cột G: `Message` (Nội dung lời nhắn)
- Cột H: `Status` (`approved` hoặc `pending`)
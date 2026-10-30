# QUY CHUẨN API & GOOGLE SHEETS (THE ECHO AWARDS)

Hệ thống The Echo Awards sử dụng Next.js Route Handlers kết nối trực tiếp với Google Sheets làm CSDL lưu trữ và đồng bộ hóa.

---

## 1. CÁC ENDPOINT API CHÍNH

### A. `POST /api/votes`
- **Chức năng:** Ghi nhận 1 lượt bình chọn mới của người dùng.
- **Request Body (JSON):**
  ```json
  {
    "role": "gv" | "cm",
    "awardId": "inspiring",
    "awardName": "Inspiring Echo",
    "campusId": "qt",
    "campusName": "Quang Trung",
    "nomineeName": "Nguyễn Thị Mỹ Hạnh",
    "voterMessage": "Cô luôn là nguồn cảm hứng lớn...",
    "studentName": "Nguyễn Văn An",
    "studentCode": "HV12345"
  }
  ```
- **Xử lý:** Validate `studentName`/`studentCode` (400 nếu sai), lưu vào Tab `Votes` của Google Sheet kèm `timestamp` (ISO string, Apps Script đổi sang giờ VN).
- **Response:** `200` thành công · `400` dữ liệu sai · `409` mã học viên đã bình chọn cho ứng viên này · `502` không ghi được Google Sheet.

### B. `GET /api/echo-messages`
- **Chức năng:** Lấy danh sách các tin nhắn tri ân để hiển thị trên Echo Wall.
- **Query Params:** `?limit=50&status=approved`
- **Response (JSON):**
  ```json
  {
    "success": true,
    "data": [
      {
        "id": "1",
        "senderName": "Nguyễn Minh Châu",
        "campusName": "Quang Trung",
        "recipientRole": "Giáo viên",
        "message": "Có hôm em muốn nghỉ học vì áp lực...",
        "createdAt": "2026-10-29T08:00:00Z"
      }
    ]
  }
  ```

### C. `POST /api/echo-messages`
- **Chức năng:** Gửi 1 Echo Message mới từ Form Composer.
- **Request Body (JSON):**
  ```json
  {
    "voterName": "Họ và tên học viên",
    "recipientRole": "gv" | "cm",
    "campusId": "qt",
    "campusName": "Quang Trung",
    "recipientName": "Nguyễn Thị Mỹ Hạnh",
    "message": "Nội dung lời nhắn..."
  }
  ```
- **Xử lý:** Ghi vào Tab `EchoMessages` của Google Sheet.

### D. `GET /api/nominations`
- **Chức năng:** Lấy danh mục các cơ sở, giải thưởng, và danh sách ứng viên (đọc từ Google Sheet hoặc fallback static).

---

## 2. KIẾN TRÚC KẾT NỐI GOOGLE SHEETS

1. **Chế độ Webhook Google Apps Script (Khuyên dùng):**
   - Biến môi trường: `GOOGLE_SHEET_WEBAPP_URL=https://script.google.com/macros/s/.../exec`
   - Server gửi HTTP POST với payload `{ action: 'appendVote', data: { ... } }` tới Google Apps Script URL.
   - Script chạy cực nhanh, không cần cấu hình Google Cloud Console phức tạp.

2. **Chế độ Service Account:**
   - Biến môi trường:
     - `GOOGLE_SERVICE_ACCOUNT_EMAIL=...`
     - `GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n..."`
     - `GOOGLE_SHEET_ID=...`

3. **Chế độ Fallback Tự Động (In-Memory / Local Cache):**
   - Khi chưa cấu hình 2 chế độ trên, API tự động chuyển sang lưu tạm trong memory store và nạp dữ liệu mẫu ban đầu từ constants.
   - Giúp website luôn chạy mượt 100%, không bị crash hoặc đơ khi người dùng chưa kịp thiết lập key.

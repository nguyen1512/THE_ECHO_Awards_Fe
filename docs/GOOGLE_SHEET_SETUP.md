# Cấu hình Google Sheet cho THE ECHO AWARDS

Website gửi mỗi lượt bình chọn từ server (`POST /api/votes`) tới một **Google Apps Script Web App**. URL Web App chỉ nằm ở phía server (biến `GOOGLE_SHEET_WEBAPP_URL`), không lộ ra trình duyệt và không bị CORS.

## Cấu trúc tab `Votes`

| Cột | Tiêu đề | Ghi chú |
| :-- | :-- | :-- |
| A | Thời gian | Giờ Việt Nam (UTC+7), dạng `yyyy-MM-dd HH:mm:ss` |
| B | Vai trò | `gv` / `cm` |
| C | Mã giải thưởng | `inspiring`, `steady`, ... |
| D | Tên giải thưởng | |
| E | Mã cơ sở | `qt`, `pk`, ... |
| F | Tên cơ sở | |
| G | Người được bình chọn | |
| H | Lời nhắn | 1–3 câu |
| **I** | **Tên học viên** | Mới |
| **J** | **Mã số học viên** | Mới, đã viết hoa |

Cột I, J nằm ở cuối nên dữ liệu A–H cũ không bị xê dịch. Các dòng cũ sẽ để trống I, J.

**Chống trùng:** Apps Script từ chối (trả `code: "DUPLICATE"`, thông báo "Học viên này đã bình chọn một người khác") nếu một mã học viên đã bình chọn cho vai trò đó trước đó (mỗi học viên chỉ được vote 1 lần cho Giáo viên và 1 lần cho Class Manager). Website sẽ hiển thị popup cảnh báo tương ứng.

## Lần đầu thiết lập (Sheet mới)

1. Tạo Google Sheet mới: <https://sheets.new>.
2. Menu **Tiện ích mở rộng (Extensions) → Apps Script**.
3. Xóa mã mặc định, dán toàn bộ nội dung file [`google-apps-script.gs`](./google-apps-script.gs), bấm **Lưu**.
4. Chọn hàm `setupHeaders` trên thanh công cụ → **Chạy (Run)** → cấp quyền khi được hỏi. Hàm tạo 2 tab `Votes`, `EchoMessages` kèm tiêu đề.
5. **Triển khai (Deploy) → Triển khai mới (New deployment)**:
   - Loại: **Ứng dụng web (Web app)**
   - Thực thi dưới dạng (Execute as): **Tôi (Me)**
   - Ai có quyền truy cập (Who has access): **Bất kỳ ai (Anyone)**
6. Bấm **Triển khai**, sao chép **URL ứng dụng web** (dạng `https://script.google.com/macros/s/.../exec`).

## Cập nhật Sheet đang chạy (đã có dữ liệu)

1. Mở Apps Script của Sheet hiện tại, thay toàn bộ mã bằng [`google-apps-script.gs`](./google-apps-script.gs), **Lưu**.
2. Chạy `setupHeaders` một lần để hàng tiêu đề có thêm cột I, J.
3. **Deploy → Manage deployments (Quản lý tác vụ triển khai)** → chọn deployment đang dùng → biểu tượng bút chì **Edit** → **Version: New version** → **Deploy**.
   Cách này giữ nguyên URL cũ, không cần đổi biến môi trường. (Nếu tạo "New deployment" thì URL sẽ đổi.)

> Nếu chưa cập nhật mã Apps Script, website vẫn ghi được A–H như cũ nhưng cột I, J sẽ trống và chưa có chống trùng.

## Cấu hình website

**Local:** tạo `.env.local` (không commit):

```env
GOOGLE_SHEET_WEBAPP_URL="https://script.google.com/macros/s/.../exec"
```

**Vercel:** Project → Settings → Environment Variables → thêm `GOOGLE_SHEET_WEBAPP_URL` cho **Production** và **Preview** → Deployments → **Redeploy** bản mới nhất.

## Kiểm tra nhanh

- Mở URL Web App trên trình duyệt → phải thấy `{"success":true,"message":"The Echo Awards Google Sheet Endpoint Ready"}`.
- Gửi thử 1 bình chọn trên website → một dòng mới xuất hiện ở tab `Votes` với đủ cột I, J.
- Gửi lại đúng bình chọn đó với cùng mã học viên → website báo đã bình chọn trước đó, Sheet không thêm dòng.

## Xử lý lỗi

Nếu Apps Script lỗi, hết thời gian chờ (20 giây) hoặc trả phản hồi không hợp lệ, `/api/votes` trả HTTP 502, website báo lỗi cho người dùng (không báo thành công giả) và ghi log `Error in /api/votes POST` trên Vercel → Logs.

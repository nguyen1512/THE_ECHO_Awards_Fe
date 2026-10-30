# THE ECHO AWARDS - AI CODING RULES & DESIGN PATTERNS

Tài liệu quy chuẩn lập trình và cấu trúc thiết kế chi tiết dành cho dự án **THE ECHO AWARDS**.

---

## 1. COMPONENT DECOMPOSITION & SEPARATION OF CONCERNS (SoC)

Mỗi component phải duy trì sự phân tách rõ ràng giữa **Dữ liệu tĩnh (Data)**, **Trạng thái & Logic (Hooks)**, **Tiện ích (Utils)** và **Giao diện (UI View)**.

### A. Dữ liệu tĩnh & Cấu hình (Mock Data / Constants)
- Không viết cứng các mảng lớn danh sách cơ sở, giải thưởng, ứng viên trực tiếp trong thân component hiển thị.
- Đặt danh sách dữ liệu gốc vào `src/constants/awards.ts`, `src/constants/campuses.ts`, `src/constants/notes.ts`.

### B. Custom Hooks cho Logic
- Trích xuất toàn bộ state, event handler, đếm số câu/ký tự, kiểm tra điều kiện submit, tương tác API vào Custom Hooks riêng biệt tại `src/modules/[feature]/hooks/`.
- UI Component chỉ đảm nhận nhiệm vụ đọc state từ Hook và render giao diện.

### C. Giới hạn quy mô Component
- Không tạo các file khổng lồ gộp chung cả Hero, Overview, Vote Section, Bottom Sheet, Composer và Wall vào một file `page.tsx`.
- Chia nhỏ thành các component chức năng rõ ràng theo từng module:
  - `HeroSection.tsx`, `Timeline.tsx`
  - `AwardsOverview.tsx`, `AwardGroupCard.tsx`
  - `VotingSection.tsx`, `CampusTabs.tsx`, `AwardChips.tsx`, `NomineeCard.tsx`
  - `VoteBottomSheet.tsx`
  - `EchoComposer.tsx`, `EchoWall.tsx`, `EchoNoteCard.tsx`
  - `HeaderNav.tsx`, `Footer.tsx`

### D. Tiện ích dùng chung (Utilities)
- Các hàm định dạng, hàm đếm câu/ký tự tiếng Việt, hàm lấy chữ cái đầu (initials), hàm sinh màu sắc avatar (hue) đặt tại `src/utils/text.ts`, `src/utils/color.ts`.

---

## 2. QUY CHUẨN GIAO DIỆN & STYLING (TAILWIND CSS & CSS VARIABLES)

- Sử dụng hệ thống biến màu của The Echo Awards:
  - Nền tối ngân hà: `bg-[#02081f]` kết hợp gradient bầu trời sao `sky` và `twinkle`.
  - Bề mặt card: `bg-[#0a1a60]`, viền `border-[#2b47b0]`.
  - Điểm nhấn: Ánh đồng `text-[#ff9a5c]`, màu cam `bg-[#ff8a3d]`, chrome gradient ánh kim.
- Mọi tương tác hover, active, focus-visible đều có hiệu ứng mượt mà và trực quan.

---

## 3. QUY CHUẨN FORM & VALIDATION

### A. Kiểm soát nội dung Echo Message (Validation Rule)
- Số lượng câu: Bắt buộc từ **1 đến 3 câu** (theo regex nhận diện câu tiếng Việt: `/[^.!?…]+[.!?…]*/g`).
- Độ dài: Tối đa **400 ký tự**.
- Có bộ đếm trực quan: hiển thị rõ số câu (cảnh báo đỏ nếu > 3 câu) và số ký tự hiện tại `/ 400`.
- Nút gửi chỉ kích hoạt khi thỏa mãn đủ điều kiện hợp lệ.

### B. Trạng thái bình chọn (Voting State)
- Mỗi ứng viên tại mỗi hạng mục của mỗi cơ sở có một khóa định danh duy nhất (`role|awardId|campusId|nomineeName`).
- Lưu vết bình chọn vào `localStorage` phía client để giữ trạng thái "Đã bình chọn" và vô hiệu hóa nút bấm tương ứng.

---

## 4. QUY CHUẨN KẾT NỐI GOOGLE SHEETS

1. Mọi request gửi bình chọn (`POST /api/votes`) hoặc gửi tin nhắn tri ân (`POST /api/echo-messages`) đều được gửi về API Route Next.js để server-side xử lý đẩy vào Google Sheets.
2. Trả về cấu trúc JSON chuẩn:
```json
{
  "success": true,
  "message": "Cảm ơn bạn đã gửi một Echo thành công!",
  "data": { ... }
}
```
3. Nếu Google Sheet chưa được cấu hình biến môi trường, hệ thống tự động ghi nhận vào bộ nhớ đệm (In-memory Storage) và trả về thông báo mô phỏng thành công để không làm đứt gãy luồng trải nghiệm người dùng.
4. Với bình chọn (`POST /api/votes`): khi Google Sheet ĐÃ cấu hình mà ghi thất bại (HTTP lỗi, timeout, hoặc JSON `success: false`), API trả lỗi (502) và UI báo lỗi — tuyệt đối không báo thành công giả. Trùng lượt (cùng mã học viên + khóa `role|awardId|campusId|nomineeName`) trả 409.

### C. Thông tin học viên trong form bình chọn
- `studentName`: bắt buộc, trim + gộp khoảng trắng, 2–100 ký tự, chữ cái Unicode (tiếng Việt có dấu).
- `studentCode`: bắt buộc, trim, tự viết hoa, chỉ `A-Z0-9`, 3–20 ký tự.
- Hàm chuẩn hóa/validate dùng chung client + server tại `src/utils/student.ts`.

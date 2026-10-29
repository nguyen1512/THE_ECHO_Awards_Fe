# 🏆 THE ECHO AWARDS - MASTER AI INSTRUCTIONS & DISPATCHER

Tài liệu này là **Root Context** dành cho AI Agent trong dự án **THE ECHO AWARDS** (Hệ thống website vinh danh, bình chọn Giáo viên và Class Manager 20/11 - A&U English).
Mục tiêu: Tối ưu hóa Token, đảm bảo an toàn kiến trúc, chuẩn mực mã nguồn cao cấp và thực thi tự động.

---

## 0. 🚀 AUTO-BOOTSTRAP CONTEXT (BẮT BUỘC ĐỌC ĐẦU TIÊN)

Khi bắt đầu bất kỳ lượt trò chuyện hay tác vụ nào (dù User chỉ đính kèm file `.agents/AGENTS.md` này), AI **bắt buộc** phải tự động truy cập và đọc toàn bộ nội dung của các file sau đây để đồng bộ ngữ cảnh (không cần đợi User phải kéo từng file vào):

1. **Kế hoạch & Lịch sử công việc:** [plan/history/](file:///d:/TheEchoAdwards/plan/history/) (Xem file `TODO_YYYY_MM_DD.md` gần nhất để lấy task `[ ]` cần thực hiện và lịch sử).
2. **Tổng hợp kiến trúc & Tính năng:** [plan/summary.md](file:///d:/TheEchoAdwards/plan/summary.md) (Xem các tính năng đã làm để tránh code trùng lắp).
3. **Quy chuẩn lập trình Frontend & Kiến trúc:** [Rules_AI/rules.md](file:///d:/TheEchoAdwards/Rules_AI/rules.md) & [Rules_AI/frontend_ai_rules.md](file:///d:/TheEchoAdwards/Rules_AI/frontend_ai_rules.md).
4. **Quy chuẩn API & Google Sheets Data:** [Rules_AI/api_rules.md](file:///d:/TheEchoAdwards/Rules_AI/api_rules.md) & [Rules_AI/api_map.md](file:///d:/TheEchoAdwards/Rules_AI/api_map.md).
5. **Bản đồ cấu trúc mã nguồn:** [Rules_AI/frontend_map.md](file:///d:/TheEchoAdwards/Rules_AI/frontend_map.md) để định vị file nhanh chóng.
6. **Quy tắc sử dụng component UI dùng chung:** [Rules_AI/ui_component_rules.md](file:///d:/TheEchoAdwards/Rules_AI/ui_component_rules.md).

---

## 1. 🔄 CORE WORKFLOW (MUST FOLLOW)

Mỗi khi bắt đầu một lượt làm việc (Task), AI **bắt buộc** thực hiện theo chu trình sau:

1. **Plan & Synchronize:** Đọc [plan/history/](file:///d:/TheEchoAdwards/plan/history/) (file `TODO_YYYY_MM_DD.md` của ngày hiện tại) và [plan/summary.md](file:///d:/TheEchoAdwards/plan/summary.md) để nắm task và lịch sử.
2. **Search Strategy:** Tra cứu [frontend_map.md](file:///d:/TheEchoAdwards/Rules_AI/frontend_map.md) hoặc [api_map.md](file:///d:/TheEchoAdwards/Rules_AI/api_map.md) để lần theo dấu vết file, không tìm kiếm bừa bãi.
3. **Execute (Code & Rules Audit):** 
   - Thực hiện thay đổi tuân thủ kiến trúc tách biệt (Separation of Concerns).
   - **Bắt buộc rà soát quy chuẩn**: Mỗi component < 300 dòng, không dùng barrel file (`index.ts`), kiểu dữ liệu Type-Safe đầy đủ.
   - **Bắt buộc kiểm tra tái sử dụng UI Component**: Sử dụng các component chuẩn hệ thống (`Button`, `Card`, `SelectDropdown`, `Dialog`, `BottomSheet`...) từ `@/components/ui/` hoặc `@/components/shared/`.
4. **Validation (BẮT BUỘC BUILD):** 
   - Kiểm tra Type-Safe: `npx tsc --noEmit`.
   - **Bắt buộc chạy lệnh Build (`npm run build`)** kết thúc thành công với mã thoát 0 (Exit Code 0).
5. **Update State & History:** 
   - Ghi nhận trạng thái hoàn thành `[x]` và chi tiết công việc vào `plan/history/TODO_YYYY_MM_DD.md`.
6. **Report:** Báo cáo cho User bằng Markdown Links (`file:///path/to/file`).

---

## 2. 🗺️ PROJECT & ARCHITECTURE MAP (THE ECHO AWARDS)

Dự án được xây dựng dưới dạng **Fullstack Next.js App Router (TypeScript, Tailwind CSS)** tích hợp cơ chế lưu trữ dữ liệu thời gian thực vào **Google Sheets**.

### A. Công nghệ chủ đạo
- **Framework:** Next.js (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS, Custom CSS Variables theo thiết kế Keyvisual (Navy sky, copper arcs, chrome gradient, star twinkle animation).
- **Icons:** Thư viện vector chuẩn `lucide-react`.
- **Database / Storage:** Google Sheets API v4 & Google Apps Script Webhook với fallback memory/static caching để luôn hoạt động mượt mà.

### B. Core Modules
- `src/modules/home/`: Landing page tổng quan, Hero Keyvisual banner, timeline, giới thiệu giải thưởng.
- `src/modules/voting/`: Bộ lọc cơ sở (Campus Tabs), chip chọn hạng mục giải thưởng GV & CM, danh sách thẻ ứng viên, modal/sheet gửi bình chọn kèm lời nhắn (1-3 câu, tối đa 400 ký tự).
- `src/modules/echo-message/`: Form soạn Echo Message (Composer) và Bức tường tri ân (Echo Wall) hiển thị các tin nhắn đã gửi.
- `src/modules/google-sheets/`: Service đọc và ghi dữ liệu hai chiều vào Google Sheets (Votes, EchoMessages, Nominations).
- `src/app/api/`: Các endpoint Next.js Route Handlers (`/api/votes`, `/api/echo-messages`, `/api/nominations`, `/api/health`).

---

## 3. 🛡️ AI SAFETY & EDITING SCOPE

1. **Giới hạn phạm vi (Scope Bound):** Sửa đúng vị trí component và hook liên quan đến yêu cầu.
2. **Bảo toàn giao diện & Tinh thần thiết kế:** Giữ trọn vẹn mỹ thuật cao cấp từ file `THE ECHO Awards (3).html` (Tone màu Navy ban đêm `#02081f`, ánh kim Chrome, vòng cung đồng Copper `#ff9a5c`, hiệu ứng sao lấp lánh Twinkle, font `Unbounded` & `Montserrat`).
3. **Data Resilience:** Đảm bảo hệ thống luôn có fallback data hoàn chỉnh, hoạt động trơn tru ngay cả khi Google Sheets chưa được kết nối API key.

---

## 4. ✅ VALIDATION CHECKLIST (TRƯỚC KHI BÁO CÁO)

- [ ] Lỗi Type: Không còn `any` không cần thiết. `npx tsc --noEmit` pass 100%.
- [ ] Build Production: **Bắt buộc chạy `npm run build` thành công 100%**.
- [ ] Clean up: Đã xóa `console.log` debug rác và unused imports.
- [ ] URL Params Sync: Trạng thái chọn cơ sở (`campus`), hạng mục giải thưởng (`award_gv`, `award_cm`) được đồng bộ 2 chiều lên URL.
- [ ] No Hardcoded Emojis: 100% icon lấy từ `lucide-react`.

---

## 5. 📊 QUY TẮC LƯU TRỮ VÀ ĐỒNG BỘ DỮ LIỆU GOOGLE SHEETS

1. **Tab `Votes`:** Lưu trữ lịch sử bình chọn:
   - Cột: `Timestamp`, `Role` (gv/cm), `AwardId`, `AwardName`, `CampusId`, `CampusName`, `NomineeName`, `VoterMessage`.
2. **Tab `EchoMessages`:** Lưu trữ lời nhắn tri ân hiển thị lên Echo Wall:
   - Cột: `Timestamp`, `VoterName`, `RecipientRole`, `CampusId`, `CampusName`, `RecipientName`, `Message`, `Status` (approved/pending).
3. **Cơ chế Dual-Mode:** Hỗ trợ cả 2 phương thức:
   - **Mode 1 (Webhook Apps Script):** Thiết lập cực nhanh qua biến môi trường `GOOGLE_SHEET_WEBAPP_URL`.
   - **Mode 2 (Service Account):** Cấu hình qua `GOOGLE_SERVICE_ACCOUNT_EMAIL`, `GOOGLE_PRIVATE_KEY`, `GOOGLE_SHEET_ID`.
   - **Fallback mode:** Tự động fallback sang Local Memory Store khi chưa nhập credentials để trải nghiệm phát triển không bị gián đoạn.

---

## 6. 📝 QUY ĐỊNH NGÔN NGỮ TÀI LIỆU (DOCUMENTATION LANGUAGE)

- **Tất cả các tài liệu làm việc và báo cáo** (`plan/`, `TODO_YYYY_MM_DD.md`, `summary.md`, `walkthrough.md`) **BẮT BUỘC phải được viết hoàn toàn bằng tiếng Việt**.

---

*Hết nội dung ROOT CONTEXT The Echo Awards.*

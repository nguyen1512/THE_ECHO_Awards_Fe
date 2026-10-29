# FRONTEND AI RULES (THE ECHO AWARDS)

Đây là các quy tắc kiến trúc và code dành riêng cho AI khi làm việc với giao diện Next.js của dự án **THE ECHO AWARDS**, nhằm tối ưu hóa hiệu năng, tiết kiệm Token và giữ vững chất lượng thiết kế mỹ thuật cao cấp.

## 1. NO BARREL FILES (Export Rules)
- TUYỆT ĐỐI KHÔNG sử dụng `index.ts` để re-export các components, hooks hay types.
- Import trực tiếp từ file gốc. 
  - *Đúng:* `import { useVotes } from '@/modules/voting/hooks/useVotes'`
  - *Sai:* `import { useVotes } from '@/modules/voting'`
- *Lý do:* Giúp AI và bundler theo dấu dependencies bằng path chính xác tuyệt đối mà không cần dùng Search tool làm tốn token.

## 2. COLOCATION & MODULE-BASED ARCHITECTURE
- Cấu trúc mã nguồn theo tính năng độc lập tại `src/modules/[feature-name]/`:
  - `src/modules/voting/`: Component bình chọn, chọn cơ sở, chọn giải thưởng, card ứng viên, bottom sheet bình chọn.
  - `src/modules/echo-message/`: Form soạn lời nhắn tri ân và Echo Wall.
  - `src/modules/awards/`: Bảng tổng hợp các hạng mục giải thưởng GV và CM.
  - `src/modules/google-sheets/`: Service và hooks kết nối dữ liệu Google Sheets.
- Thành phần dùng chung toàn hệ thống nằm ở `src/components/ui/`, `src/components/shared/`, `src/utils/`, `src/types/`, `src/constants/`.

## 3. COMPONENT SIZE LIMITS (< 300 DÒNG)
- Mỗi file component không nên vượt quá 300 dòng để đảm bảo code gọn gàng, modular và dễ bảo trì.
- Nếu vượt quá, chủ động tách thành các sub-components cùng thư mục.
- Tránh over-engineering (tạo file chỉ bọc 1 thẻ div vô nghĩa).

## 4. DESIGN SYSTEM & VISUAL EXCELLENCE
- Tuân thủ chặt chẽ bảng màu thương hiệu của The Echo Awards:
  - Background ban đêm: `--bg: #02081f`, bề mặt thẻ: `--surface: #0a1a60`, `--surface-2: #112680`, đường viền: `--line: #2b47b0`.
  - Màu nhấn ánh đồng: `--copper: #ff9a5c`, cam rực rỡ: `--orange: #ff8a3d`.
  - Hiệu ứng ánh kim Chrome Text Gradient (`bg-clip-text text-transparent`).
  - Bầu trời ngàn sao lấp lánh Twinkle Sky Animation.
  - Typography: Google Fonts `Unbounded` (tiêu đề, số thứ tự, thẻ), `Montserrat` (nội dung, thông tin), `Playball` (chữ ký nghệ thuật footer).

## 5. MANDATORY URL PARAMS SYNC
- Trạng thái chọn cơ sở (`campus`), hạng mục giải thưởng GV (`award_gv`), hạng mục giải thưởng CM (`award_cm`) **BẮT BUỘC** được đồng bộ 2 chiều lên URL SearchParams:
  - Ví dụ: `/?campus=qt&award_gv=inspiring&award_cm=steady`
- Khôi phục trạng thái từ URL khi F5/reload trang để người dùng giữ nguyên ngữ cảnh đang xem.
- Cập nhật URL mượt mà bằng `window.history.replaceState` mà không reload lại toàn bộ trang.

## 6. VALIDATION & BUILD VERIFICATION
- Sau khi chỉnh sửa, **bắt buộc chạy `npm run build`** thành công 100% (Exit code 0).
- Không để phát sinh lỗi TypeScript (`npx tsc --noEmit`).

## 7. STRICTLY NO HARDCODED UNICODE EMOJIS
- TUYỆT ĐỐI CẤM dùng emoji unicode thô (như 📘, 🌟, ✨, 🚀, 💡,...).
- BẮT BUỘC dùng icon vector từ thư viện `lucide-react` (ví dụ: `<Award />`, `<Sparkles />`, `<Heart />`, `<Send />`, `<CheckCircle2 />`, `<Users />`, `<BookOpen />`...).

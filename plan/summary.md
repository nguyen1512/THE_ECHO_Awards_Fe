# TỔNG HỢP KIẾN TRÚC & TÍNH NĂNG - THE ECHO AWARDS

Hệ thống website vinh danh, bình chọn Giáo viên và Class Manager nhân ngày Nhà giáo Việt Nam 20/11 cho A&U English.

## 1. Kiến trúc kỹ thuật
- **Nền tảng:** Next.js (App Router), React 19, TypeScript.
- **Styling:** Tailwind CSS v4, custom visual design tokens:
  - Bầu trời sao lấp lánh (Twinkle Sky)
  - Vòng cung đồng (Copper Arcs)
  - Hiệu ứng ánh kim Chrome typography
  - Nền tối navy sang trọng (`#02081f`)
- **Icon:** Vector icon chính quy từ `lucide-react`.
- **Cơ sở dữ liệu:** Google Sheets (tab `Votes` & `EchoMessages`), hỗ trợ Google Apps Script Webhook / Service Account với fallback cache.

## 2. Các phân hệ chính
1. **Header & Navigation:** Sticky header, logo, điều hướng nhanh tới các section, nút CTA "Bình chọn".
2. **Hero & Keyvisual:** Banner chính "Every Lesson Leaves an Echo", hiệu ứng quỹ đạo, timeline sự kiện (Vòng 1, Vòng 2, Gala).
3. **Overview Giải thưởng:** Nhóm 5 giải thưởng Giáo viên và 3 giải thưởng Class Manager với huy hiệu và mô tả chi tiết.
4. **Phân hệ Bình chọn (Voting):**
   - Lọc theo 7 cơ sở (Quang Trung, Phùng Khoang, Minh Khai + Hòa Lạc, Phạm Thận Duật, Mỹ Đình, Hoàng Ngân, Bắc Từ Liêm).
   - Chip chuyển đổi giải thưởng Giáo viên & CM.
   - Thẻ ứng viên (Avatar phối màu động, tên, vai trò/chức danh, giải thưởng, nút Bình chọn).
   - Bottom Sheet gửi bình chọn kèm lời nhắn (1-3 câu, tối đa 400 ký tự) có validation số câu, đếm ký tự thời gian thực.
5. **Phân hệ Lời nhắn tri ân (Echo Message):**
   - Form soạn lời nhắn (Composer) chọn người nhận, cơ sở, nhập lời nhắn.
   - Bức tường tri ân (Echo Wall) hiển thị trực quan các thẻ lời nhắn gửi giáo viên/CM.
6. **Tích hợp Google Sheets:**
   - Đẩy dữ liệu vote vào Google Sheet tab `Votes`.
   - Đẩy dữ liệu lời nhắn vào Google Sheet tab `EchoMessages` và nạp động hiển thị lên Echo Wall.
   - Kèm mẫu file Google Apps Script để người dùng triển khai ngay trên Google Drive.

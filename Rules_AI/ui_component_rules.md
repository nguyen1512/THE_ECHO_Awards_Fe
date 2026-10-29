# 📚 QUY TẮC SỬ DỤNG COMPONENT UI CHUNG (THE ECHO AWARDS)

## 1️⃣ Button
- **Component**: `Button` (`src/components/ui/Button.tsx`).
- **Variants**:
  - `primary`: Nền cam gradient rực rỡ `--orange` (`#ff8a3d`), chữ đen cam, hover brightness cao.
  - `ghost`: Nền trong suốt, viền vi tinh xảo `--line` (`#2b47b0`), chữ sáng.
  - `voted`: Trạng thái đã bình chọn, nền `--surface-2`, chữ xám mờ mịt, disabled.
- **Sizes**: `default` (padding vừa vặn), `big` (padding lớn cho CTA chính), `sm` (gọn gàng trong thẻ).

## 2️⃣ Card & Group Container
- **Component**: `Card` (`src/components/ui/Card.tsx`).
- **Cấu trúc**: Bề mặt kính màu xanh bóng tối `--surface` (`#0a1a60`), viền xanh `--line`, bo góc mượt mà `rounded-2xl` hoặc `rounded-xl`.
- **Hỗ trợ Accent Top Border**: Viền trên nhấn màu ánh đồng `border-t-4 border-[#ff9a5c]` (cho Giáo viên) hoặc màu sao xanh `border-t-4 border-[#7fb2ff]` (cho Class Manager).

## 3️⃣ SelectDropdown
- **Component**: `SelectDropdown` (`src/components/ui/SelectDropdown.tsx`).
- **Đặc điểm**: Bọc tùy chỉnh với style tối đồng bộ, mũi tên custom, hỗ trợ placeholder và disabled state.
- **Lưu ý**: Tuyệt đối không dùng thẻ `<select>` thô mộc mặc định của trình duyệt mà không có styling hệ thống.

## 4️⃣ BottomSheet / Modal
- **Component**: `BottomSheet` (`src/components/ui/BottomSheet.tsx`).
- **Cấu trúc**: Slide up từ dưới đáy màn hình trên mobile hoặc modal trung tâm trên desktop, có backdrop phủ mờ, nút đóng `×`, hỗ trợ phím `Escape` và click bên ngoài để đóng.
- **Accessibility**: Có đầy đủ thuộc tính `role="dialog"`, `aria-modal="true"`.

## 5️⃣ Filter Chips & Tabs
- **Component**: `FilterChips` và `Tabs` (`src/components/ui/Tabs.tsx`, `src/components/ui/Chip.tsx`).
- **Cấu trúc**: Dạng viên thuốc `rounded-full` hoặc chip bo tròn `rounded-xl`, phản hồi trạng thái `aria-selected` / `aria-pressed`.

## 6️⃣ Icons Vector (lucide-react)
- **Quy tắc nghiêm ngặt**: TUYỆT ĐỐI KHÔNG sử dụng emoji unicode thô (📘, 🌟, ✨, 🚀, 💡,...).
- Bắt buộc dùng icon từ `lucide-react`:
  - `<Award />`: Giải thưởng, cúp vinh danh
  - `<Sparkles />`: Điểm sáng, truyền cảm hứng
  - `<Heart />`: Sự quan tâm, chăm sóc
  - `<Users />`: Kết nối, tập thể
  - `<Send />`: Gửi lời nhắn
  - `<CheckCircle2 />`: Bình chọn thành công
  - `<GraduationCap />`: Giáo viên
  - `<Headphones />` hoặc `<Smile />`: Class Manager

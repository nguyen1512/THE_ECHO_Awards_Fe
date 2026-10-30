# BẢN ĐỒ CẤU TRÚC MÃ NGUỒN FRONTEND (THE ECHO AWARDS)

Thư mục chính: `src/`

```
src/
├── app/
│   ├── layout.tsx                     # Root Layout: Fonts Unbounded & Montserrat, Twinkle sky, Metas
│   ├── page.tsx                       # Trang chủ THE ECHO Awards tích hợp toàn bộ các Section
│   ├── globals.css                    # CSS Tokens & Animations: Twinkle, Chrome text, Copper arcs
│   └── api/                           # Next.js Route Handlers
│       ├── votes/route.ts             # POST ghi nhận vote, GET thống kê
│       ├── echo-messages/route.ts     # GET/POST danh sách tin nhắn tri ân
│       └── nominations/route.ts       # GET cơ sở và ứng viên
├── components/
│   ├── ui/                            # Các UI Components dùng chung
│   │   ├── Button.tsx                 # Button hệ thống (primary, ghost, voted, sm, big)
│   │   ├── Card.tsx                   # Card bao bọc bề mặt
│   │   ├── SelectDropdown.tsx         # Dropdown chọn lựa chuẩn
│   │   ├── BottomSheet.tsx            # Sheet popup gửi bình chọn kèm Echo Message
│   │   └── Chip.tsx                   # Filter chip bấm chọn hạng mục
│   └── shared/
│       ├── HeaderNav.tsx              # Thanh điều hướng sticky với logo và CTA
│       ├── Footer.tsx                 # Chân trang với chữ ký nghệ thuật và logo
│       └── TwinkleSky.tsx             # Bầu trời sao lấp lánh nền
├── constants/
│   ├── awards.ts                      # Danh sách hạng mục giải thưởng GV & CM
│   ├── campuses.ts                    # Danh sách 7 cơ sở và giáo viên/CM trực thuộc
│   └── initialNotes.ts                # Dữ liệu ban đầu cho Echo Wall
├── modules/
│   ├── hero/                          # Hero Section & Keyvisual Banner & Timeline
│   │   ├── HeroSection.tsx
│   │   └── TimelineSection.tsx
│   ├── awards/                        # Hạng mục giải thưởng
│   │   ├── AwardsOverview.tsx
│   │   └── AwardGroupCard.tsx
│   ├── voting/                        # Khu vực bình chọn
│   │   ├── VotingSection.tsx
│   │   ├── CampusTabs.tsx
│   │   ├── RoleVotingBlock.tsx
│   │   ├── NomineeCard.tsx
│   │   ├── VoteBottomSheet.tsx
│   │   ├── StudentInfoFields.tsx      # 2 ô Họ tên + Mã số học viên trong form bình chọn
│   │   ├── hooks/useVoting.ts         # Quản lý state chọn cơ sở, chọn giải, bình chọn
│   │   └── hooks/useStudentInfo.ts    # Validate + ghi nhớ (localStorage) tên/mã học viên
│   ├── echo-message/                  # Lời nhắn từ học viên
│   │   ├── EchoMessageSection.tsx
│   │   ├── EchoComposer.tsx
│   │   ├── EchoWall.tsx
│   │   ├── EchoNoteCard.tsx
│   │   └── hooks/useEchoMessage.ts    # Quản lý form gửi tin nhắn và nạp tin nhắn
│   └── google-sheets/                 # Service kết nối Google Sheets
│       ├── googleSheetsService.ts
│       (Mã Google Apps Script: docs/google-apps-script.gs, hướng dẫn: docs/GOOGLE_SHEET_SETUP.md)
├── types/
│   ├── awards.ts
│   ├── campuses.ts
│   ├── voting.ts
│   └── echo.ts
└── utils/
    ├── text.ts                        # Hàm đếm số câu, đếm ký tự, format chữ hoa initials
    └── color.ts                       # Hàm tính màu sắc avatar ngẫu nhiên theo tên
```

import type { Metadata } from 'next';
import { Unbounded, Montserrat, Playball } from 'next/font/google';
import './globals.css';
import { TwinkleSky } from '@/components/shared/TwinkleSky';

const unbounded = Unbounded({
  variable: '--font-unbounded',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin', 'vietnamese'],
  display: 'swap',
});

const playball = Playball({
  variable: '--font-playball',
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'THE ECHO Awards · Vinh danh Giáo viên & CM A&U English 20/11',
  description:
    'Sự kiện vinh danh và bình chọn Giáo viên & Class Manager A&U 20/11 - Every Lesson Leaves an Echo. Gửi kèm lời nhắn tri ân lưu trữ Google Sheets.',
  icons: {
    icon: '/logo.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${unbounded.variable} ${montserrat.variable} ${playball.variable} scroll-smooth`}
    >
      <body className="min-h-screen relative antialiased selection:bg-[#ff8a3d] selection:text-[#1a0a00]">
        <TwinkleSky />
        <div className="relative z-10 flex flex-col min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
}

import React from 'react';
import Image from 'next/image';
import { Download, ExternalLink } from 'lucide-react';

export function Footer() {
  const sheetUrl =
    'https://docs.google.com/spreadsheets/d/1u13uCk5rCNCB7Ovz8JPI8k_aeqwoTGBZxmYWMdsxlcI/edit';

  return (
    <footer className="border-t border-[#2b47b0] py-10 text-center text-[#a9b9e8] text-sm relative z-10 bg-[#02081f]/80">
      <div className="max-w-[1120px] mx-auto px-4 flex flex-col items-center gap-3">
        <Image
          src="/foot-logo.png"
          alt="A&U The Echo Awards"
          width={180}
          height={48}
          className="h-10 md:h-12 w-auto object-contain mx-auto opacity-90"
        />
        <p className="mt-1">
          THE ECHO Awards · Vinh danh Giáo viên và Class Manager A&amp;U English 20/11
        </p>
        <span className="font-script text-2xl md:text-3xl text-[#f2f6ff] block">
          Every lesson leaves an echo
        </span>

        {/* Export & Google Sheets Quick Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-3 pt-3 border-t border-[#2b47b0]/50 text-xs">
          <a
            href="/api/export?type=votes"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1a60] border border-[#2b47b0] text-[#ff9a5c] hover:bg-[#112680] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất Excel Bình Chọn
          </a>
          <a
            href="/api/export?type=messages"
            download
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1a60] border border-[#2b47b0] text-[#7fb2ff] hover:bg-[#112680] transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            Xuất Excel Lời Nhắn
          </a>
          <a
            href={sheetUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#0a1a60] border border-[#2b47b0] text-emerald-400 hover:bg-[#112680] transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Mở Google Sheet dữ liệu
          </a>
        </div>

        <p className="text-xs text-[#a9b9e8]/70 mt-2">
          Dữ liệu bình chọn và lời nhắn được đồng bộ an toàn qua Google Sheets.
        </p>
      </div>
    </footer>
  );
}

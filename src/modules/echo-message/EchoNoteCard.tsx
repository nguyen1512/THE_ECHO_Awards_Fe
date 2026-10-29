import React from 'react';
import { EchoMessageItem } from '@/types/echo';
import { getInitials } from '@/utils/text';
import { getAvatarColor } from '@/utils/color';

interface EchoNoteCardProps {
  note: EchoMessageItem;
  index: number;
}

export function EchoNoteCard({ note, index }: EchoNoteCardProps) {
  const avatarColor = getAvatarColor(note.senderName, note.campusName);
  const initials = getInitials(note.senderName);

  // Viền trên luân phiên theo chu kỳ: copper, star, white
  const borderTopClass =
    index % 3 === 0
      ? 'border-t-4 border-t-[#ff9a5c]'
      : index % 3 === 1
      ? 'border-t-4 border-t-[#7fb2ff]'
      : 'border-t-4 border-t-[#f2f6ff]';

  return (
    <article
      className={`bg-[#0a1a60] border border-[#2b47b0] ${borderTopClass} rounded-2xl p-5 md:p-6 flex flex-col gap-4 shadow-lg min-w-0 transition-transform duration-200 hover:-translate-y-1`}
    >
      {/* Message Quote */}
      <blockquote className="text-sm md:text-base text-[#f2f6ff] leading-relaxed italic">
        &ldquo;{note.message}&rdquo;
      </blockquote>

      {/* Sender Profile Bar */}
      <div className="flex items-center gap-3 flex-wrap mt-auto pt-3 border-t border-[#2b47b0]/60">
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center font-display font-semibold text-xs text-white border border-white/40 shrink-0"
          style={{ backgroundColor: avatarColor }}
        >
          {initials}
        </div>
        <div className="flex-1 min-w-0">
          <strong className="block text-sm text-white truncate">{note.senderName}</strong>
          <span className="text-xs text-[#a9b9e8] block truncate">
            Học viên A&amp;U {note.campusName}
          </span>
        </div>
        <span className="bg-[#112680] text-[#ff9a5c] text-[11px] font-bold px-3 py-1 rounded-full border border-[#2b47b0]/50 shrink-0 ml-auto">
          Gửi {note.recipientRole}
        </span>
      </div>
    </article>
  );
}

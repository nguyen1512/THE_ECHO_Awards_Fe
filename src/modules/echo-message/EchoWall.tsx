import React from 'react';
import { EchoMessageItem } from '@/types/echo';
import { EchoNoteCard } from './EchoNoteCard';
import { Loader2 } from 'lucide-react';

interface EchoWallProps {
  notes: EchoMessageItem[];
  isLoading: boolean;
}

export function EchoWall({ notes, isLoading }: EchoWallProps) {
  return (
    <div className="mt-14">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-display text-base md:text-xl font-bold uppercase tracking-wide text-white">
          Những Echo đã được gửi đi
        </h3>
        {isLoading && (
          <span className="text-xs text-[#a9b9e8] flex items-center gap-1.5">
            <Loader2 className="w-3.5 h-3.5 animate-spin" /> Đang cập nhật...
          </span>
        )}
      </div>

      {notes.length === 0 ? (
        <div className="p-8 border border-dashed border-[#2b47b0] rounded-2xl text-center text-[#a9b9e8] text-sm">
          Chưa có lời nhắn nào được gửi đi. Hãy là người đầu tiên gửi một Echo!
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {notes.map((note, idx) => (
            <EchoNoteCard key={note.id || idx} note={note} index={idx} />
          ))}
        </div>
      )}
    </div>
  );
}

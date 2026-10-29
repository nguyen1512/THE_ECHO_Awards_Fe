import React from 'react';

interface ChipProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  active?: boolean;
  children: React.ReactNode;
}

export function Chip({ active = false, className = '', children, ...props }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={active}
      className={`font-sans text-left text-[#f2f6ff] border-[1.5px] rounded-xl py-3 px-3.5 transition-all duration-150 cursor-pointer select-none min-w-0 ${
        active
          ? 'border-[#ff8a3d] bg-[#112680] shadow-[0_0_0_2px_rgba(255,154,92,0.4)]'
          : 'border-[#2b47b0] bg-[#02081f] hover:border-[#7fb2ff] hover:bg-[#0a1a60]/50'
      } ${className}`}
      {...props}
    >
      <span className="block font-display text-xs font-semibold leading-tight">{children}</span>
    </button>
  );
}

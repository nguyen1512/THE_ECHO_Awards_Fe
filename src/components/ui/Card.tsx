import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  accentTop?: 'copper' | 'star' | 'white' | 'orange' | 'none';
  children: React.ReactNode;
}

export function Card({
  accentTop = 'none',
  className = '',
  children,
  ...props
}: CardProps) {
  const accentBorder = {
    none: '',
    copper: 'border-t-4 border-t-[#ff9a5c]',
    star: 'border-t-4 border-t-[#7fb2ff]',
    white: 'border-t-4 border-t-[#f2f6ff]',
    orange: 'border-t-4 border-t-[#ff8a3d]',
  };

  return (
    <div
      className={`bg-[#0a1a60] border border-[#2b47b0] rounded-2xl p-6 transition-colors duration-200 ${accentBorder[accentTop]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

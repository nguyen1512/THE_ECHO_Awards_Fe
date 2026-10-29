import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'ghost' | 'voted';
  size?: 'sm' | 'default' | 'big';
  children: React.ReactNode;
}

export function Button({
  variant = 'primary',
  size = 'default',
  className = '',
  disabled,
  children,
  ...props
}: ButtonProps) {
  const baseStyles =
    'font-sans font-bold rounded-xl cursor-pointer transition-all duration-200 inline-flex items-center justify-center gap-2 text-center select-none disabled:cursor-not-allowed';

  const sizeStyles = {
    sm: 'py-2 px-3 text-xs',
    default: 'py-3 px-6 text-sm',
    big: 'py-4 px-8 text-base md:text-lg',
  };

  const variantStyles = {
    primary:
      'bg-[#ff8a3d] text-[#1a0a00] hover:brightness-110 active:scale-[0.98] disabled:opacity-45 disabled:hover:brightness-100 disabled:active:scale-100',
    ghost:
      'bg-transparent text-[#f2f6ff] border-[1.5px] border-[#2b47b0] hover:bg-[#0a1a60] active:scale-[0.98] disabled:opacity-45',
    voted:
      'bg-[#112680] text-[#a9b9e8] border border-[#2b47b0] cursor-default opacity-85',
  };

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
      disabled={disabled || variant === 'voted'}
      {...props}
    >
      {children}
    </button>
  );
}

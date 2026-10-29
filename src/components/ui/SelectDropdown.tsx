import React from 'react';
import { ChevronDown } from 'lucide-react';

interface SelectOption {
  value: string;
  label: string;
}

interface SelectDropdownProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function SelectDropdown({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  disabled,
  ...props
}: SelectDropdownProps) {
  return (
    <div className="relative w-full">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        className={`w-full appearance-none bg-[#02081f] text-[#f2f6ff] border-[1.5px] border-[#2b47b0] rounded-xl py-3 px-4 pr-10 text-sm md:text-base font-sans transition-colors focus:outline-none focus:border-[#ff8a3d] focus:ring-1 focus:ring-[#ff8a3d] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="bg-[#0a1a60] text-white">
            {opt.label}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-[#a9b9e8]">
        <ChevronDown className="w-4 h-4" />
      </div>
    </div>
  );
}

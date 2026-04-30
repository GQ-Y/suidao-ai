import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';

interface CustomSelectProps {
  options: string[];
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomSelect({ options, value, onChange, placeholder, className = '' }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div 
        className="flex items-center justify-between px-3 py-1 bg-[#051020]/80 border border-cyan-900/60 text-cyan-200 rounded-sm cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all text-xs font-mono h-full backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || placeholder || "Select..."}</span>
        <ChevronDown className={`w-3 h-3 ml-2 text-cyan-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-[#051020] border border-cyan-800 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] z-50 overflow-hidden font-mono text-xs max-h-[200px] overflow-y-auto custom-scrollbar">
          {options.map((opt, i) => (
            <div 
              key={i}
              className={`px-3 py-2 cursor-pointer transition-colors ${value === opt ? 'text-cyan-300 bg-cyan-900/40' : 'text-cyan-600 hover:bg-cyan-900/20 hover:text-cyan-300'}`}
              onClick={() => {
                onChange(opt);
                setIsOpen(false);
              }}
            >
              {opt}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

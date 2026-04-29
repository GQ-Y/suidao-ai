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
        className="flex items-center justify-between px-3 py-1 bg-slate-900 border border-slate-700 text-slate-300 rounded cursor-pointer hover:border-slate-500 transition-colors text-xs font-mono h-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{value || placeholder || "Select..."}</span>
        <ChevronDown className={`w-3 h-3 ml-2 text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </div>
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-slate-900 border border-slate-700 rounded shadow-2xl z-50 overflow-hidden font-mono text-xs max-h-[200px] overflow-y-auto custom-scrollbar">
          {options.map((opt, i) => (
            <div 
              key={i}
              className={`px-3 py-2 cursor-pointer transition-colors ${value === opt ? 'text-cyan-400 bg-slate-800/80' : 'text-slate-400 hover:bg-slate-800 hover:text-slate-200'}`}
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

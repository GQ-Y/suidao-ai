import React, { useState, useRef, useEffect } from 'react';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface CustomDatePickerProps {
  value: Date | null;
  onChange: (date: Date) => void;
  placeholder?: string;
  className?: string;
}

export default function CustomDatePicker({ value, onChange, placeholder = "Select date", className = '' }: CustomDatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(value || new Date());
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

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onChange(newDate);
    setIsOpen(false);
  };

  const formatDate = (d: Date | null) => {
    if (!d) return "";
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
  };

  return (
    <div className={`relative ${className}`} ref={ref}>
      <div 
        className="flex flex-1 items-center justify-between px-3 py-1 bg-[#051020]/80 border border-cyan-900/60 text-cyan-200 rounded-sm cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(0,229,255,0.2)] transition-all text-xs font-mono min-w-[120px] h-full backdrop-blur-sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>{value ? formatDate(value) : placeholder}</span>
        <CalendarIcon className="w-3 h-3 ml-2 text-cyan-500" />
      </div>
      
      {isOpen && (
        <div className="absolute top-full mt-1 left-0 bg-[#051020] border border-cyan-800 rounded-sm shadow-[0_0_15px_rgba(0,0,0,0.8)] z-50 p-3 w-[240px]">
          <div className="flex justify-between items-center mb-3">
            <button onClick={handlePrevMonth} className="p-1 hover:bg-cyan-900/30 rounded text-cyan-600 hover:text-cyan-300 transition-colors"><ChevronLeft className="w-4 h-4"/></button>
            <div className="text-cyan-300 font-bold text-xs tracking-widest uppercase">
              {currentMonth.getFullYear()} - {String(currentMonth.getMonth() + 1).padStart(2, '0')}
            </div>
            <button onClick={handleNextMonth} className="p-1 hover:bg-cyan-900/30 rounded text-cyan-600 hover:text-cyan-300 transition-colors"><ChevronRight className="w-4 h-4"/></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center mb-1">
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
              <div key={d} className="text-[10px] text-cyan-700 font-bold uppercase">{d}</div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="p-1" />
            ))}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const isSelected = value?.getDate() === day && value?.getMonth() === currentMonth.getMonth() && value?.getFullYear() === currentMonth.getFullYear();
              return (
                <div 
                  key={day}
                  onClick={() => handleDateClick(day)}
                 className={`p-1 text-xs text-center rounded-sm cursor-pointer transition-colors ${isSelected ? 'bg-cyan-500 text-black font-bold shadow-[0_0_8px_rgba(0,229,255,0.6)]' : 'text-cyan-500 hover:bg-cyan-900/30 hover:text-cyan-200'}`}
                >
                  {day}
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  );
}

import React from 'react';
import { X, Play, Camera } from 'lucide-react';

interface MediaModalProps {
  onClose: () => void;
  mode: 'live' | 'playback'; // Depending on what is selected
}

export default function MediaModal({ onClose, mode }: MediaModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 font-sans">
      <div className="bg-[#0A0D12] w-full max-w-[1200px] h-[80vh] border-4 border-slate-800 rounded shadow-2xl flex flex-col overflow-hidden relative">
        {/* Header Bar overlay */}
        <div className="absolute top-0 left-0 right-0 h-14 bg-gradient-to-b from-black/80 to-transparent z-10 flex flex-row-reverse items-center px-4">
           <button onClick={onClose} className="p-2 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-red-500 hover:text-white transition-colors backdrop-blur-sm">
             <X className="w-5 h-5 flex-shrink-0" />
           </button>
        </div>

        {/* Video / Full Image View */}
        <div className="flex-1 w-full relative bg-black">
           <img 
               src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
               alt="Live camera view" 
               className="w-full h-full object-cover"
           />
           {/* Simulate Video Playback UI overlay if needed */}
           {mode === 'playback' && (
             <div className="absolute bottom-4 left-4 right-32 bg-slate-900/80 backdrop-blur-md border border-slate-700 rounded p-3 flex items-center gap-4 text-slate-300">
                <Play className="w-5 h-5 text-slate-400" fill="currentColor" />
                <div className="h-2 flex-1 bg-slate-800 rounded overflow-hidden relative">
                  <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-slate-500 rounded" />
                </div>
                <div className="text-xs font-mono tracking-widest">00:15 / 00:45</div>
             </div>
           )}

           {/* Floating Mode Switch Buttons on the right edge */}
           <div className="absolute right-6 top-1/2 transform -translate-y-1/2 flex flex-col gap-8">
              <button 
                className={`flex flex-col items-center justify-center w-24 h-24 rounded border-4 text-white shadow-2xl transition-all hover:scale-105 ${
                  mode === 'live' ? 'bg-[#14181F] border-slate-500 text-slate-200' : 'bg-[#0A0D12] border-slate-800 text-slate-600 hover:border-slate-600'
                }`}
              >
                <Camera className="w-8 h-8 mb-2" />
                <span className="text-[10px] font-bold uppercase tracking-wider">现场画面</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center w-24 h-24 rounded border-4 text-white shadow-2xl transition-all hover:scale-105 ${
                  mode === 'playback' ? 'bg-[#14181F] border-slate-500 text-slate-200' : 'bg-[#0A0D12] border-slate-800 text-slate-600 hover:border-slate-600'
                }`}
              >
                <Play className="w-8 h-8 mb-2 ml-1" fill="currentColor" />
                <span className="text-[10px] font-bold uppercase tracking-wider">录像回放</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

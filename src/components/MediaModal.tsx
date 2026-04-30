import React from 'react';
import { X, Play, Camera } from 'lucide-react';

interface MediaModalProps {
  onClose: () => void;
  mode: 'live' | 'playback'; // Depending on what is selected
}

export default function MediaModal({ onClose, mode }: MediaModalProps) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-md p-6 font-mono tracking-widest text-cyan-100">
      <div className="cyber-panel bg-[#050A10]/95 w-full max-w-[1200px] h-[80vh] border border-cyan-800/80 rounded-sm shadow-[0_0_50px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden relative">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none"></div>
        <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none"></div>
        
        {/* Header Bar overlay */}
        <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/90 to-transparent z-10 flex items-center justify-between px-6">
           <div className="flex items-center gap-4 text-glow">
              <span className="text-cyan-500 font-bold tracking-widest uppercase text-sm">视频流 <span className="animate-pulse">///</span> 活跃</span>
              <span className="text-xs text-cyan-600">设备: CAM-21-ALPHA</span>
           </div>
           <button onClick={onClose} className="p-2 rounded-sm bg-[#051020] border border-cyan-900 text-cyan-600 hover:bg-red-500 hover:text-white hover:border-red-500 transition-colors backdrop-blur-sm">
             <X className="w-5 h-5 flex-shrink-0" />
           </button>
        </div>

        {/* Video / Full Image View */}
        <div className="flex-1 w-full relative bg-black flex items-center justify-center border-y border-cyan-900/30">
           {/* Scanlines overlay */}
           <div className="absolute inset-0 scanlines opacity-50 z-10 pointer-events-none"></div>
           <div className="absolute inset-0 bg-cyan-950/10 mix-blend-screen z-10 pointer-events-none"></div>
           
           <img 
               src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
               alt="Live camera view" 
               className="w-full h-full object-cover opacity-90"
           />
           {/* Simulate Video Playback UI overlay if needed */}
           {mode === 'playback' && (
             <div className="absolute bottom-6 left-6 right-48 bg-[#050A10]/80 backdrop-blur-md border border-cyan-900/80 rounded-sm p-4 flex items-center gap-6 text-cyan-300 z-20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
                <Play className="w-5 h-5 text-cyan-400" fill="currentColor" />
                <div className="h-1 flex-1 bg-cyan-950 rounded-sm overflow-hidden relative shadow-[inset_0_0_5px_rgba(0,0,0,0.5)]">
                  <div className="absolute left-0 top-0 bottom-0 w-1/3 bg-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.8)]" />
                </div>
                <div className="text-[10px] font-mono tracking-widest text-cyan-500">
                   <span className="text-cyan-200">00:15</span> / 00:45
                </div>
             </div>
           )}

           {/* Floating Mode Switch Buttons on the right edge */}
           <div className="absolute right-8 top-1/2 transform -translate-y-1/2 flex flex-col gap-8 z-20">
              <button 
                className={`flex flex-col items-center justify-center w-24 h-24 rounded-sm border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all hover:scale-105 ${
                  mode === 'live' ? 'bg-[#0A1A2F]/90 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'bg-[#050A10]/80 border-cyan-900/60 text-cyan-700 hover:border-cyan-700 hover:text-cyan-500'
                }`}
              >
                <Camera className={`w-8 h-8 mb-2 ${mode === 'live' ? 'drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]' : ''}`} />
                <span className="text-[11px] font-bold tracking-widest text-glow">现场画面</span>
              </button>
              <button 
                className={`flex flex-col items-center justify-center w-24 h-24 rounded-sm border-2 shadow-[0_0_15px_rgba(0,0,0,0.5)] transition-all hover:scale-105 ${
                  mode === 'playback' ? 'bg-[#0A1A2F]/90 border-cyan-400 text-cyan-100 shadow-[0_0_20px_rgba(0,229,255,0.3)]' : 'bg-[#050A10]/80 border-cyan-900/60 text-cyan-700 hover:border-cyan-700 hover:text-cyan-500'
                }`}
              >
                <Play className={`w-8 h-8 mb-2 ml-1 ${mode === 'playback' ? 'drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]' : ''}`} fill="currentColor" />
                <span className="text-[11px] font-bold tracking-widest text-glow">录像回放</span>
              </button>
           </div>
        </div>
      </div>
    </div>
  );
}

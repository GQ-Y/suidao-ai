import React, { useState } from 'react';
import { X, Play, Camera, Upload } from 'lucide-react';

interface EventHandlingModalProps {
  onClose: () => void;
  onOpenMedia: (mode: 'live' | 'playback') => void;
}

export default function EventHandlingModal({ onClose, onOpenMedia }: EventHandlingModalProps) {
  const [handleType, setHandleType] = useState('消警');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-[#0A0D12]/95 cyber-panel backdrop-blur-xl w-[900px] border border-cyan-500/50 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.15)] flex flex-col overflow-hidden font-sans relative">
        {/* Decorative corner pieces */}
        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
        <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
        <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
        
        {/* Header */}
        <div className="h-12 bg-gradient-to-r from-cyan-950/80 to-[#051020] flex items-center justify-between px-4 border-b border-cyan-800/80">
           <div className="flex-1 text-center text-cyan-200 font-bold tracking-widest uppercase text-glow">
             事件消除
           </div>
           <button onClick={onClose} className="p-1 rounded-sm bg-[#051020] border border-cyan-900/80 text-cyan-500 hover:text-white hover:bg-red-500 hover:border-red-500 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-cyan-100 font-mono">
          <div className="font-bold text-sm text-cyan-500 uppercase tracking-widest flex items-center gap-2">
             <span className="w-2 h-2 bg-cyan-500 rounded-sm inline-block shadow-[0_0_8px_rgba(0,229,255,0.8)]"></span>
             抓拍画面
          </div>
          
          <div className="relative w-full h-[380px] bg-black rounded-sm border border-cyan-900/60 overflow-hidden shadow-[inset_0_0_20px_rgba(0,229,255,0.1)]">
             {/* Mock Tunnel Image with overlay for tech feel */}
             <div className="absolute inset-0 bg-cyan-950/20 mix-blend-color z-10 pointer-events-none"></div>
             <img 
               src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
               alt="Tunnel camera" 
               className="w-full h-full object-cover opacity-80"
             />
             
             {/* HUD elements over image */}
             <div className="absolute top-4 left-4 z-20 text-[11px] text-red-500 font-bold tracking-widest bg-black/50 px-2 py-1 rounded-sm border border-red-900/50 text-glow-red animate-pulse">
               检测到告警
             </div>
             
             {/* Overlay floating action buttons */}
             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6 z-20">
                <button 
                  onClick={() => onOpenMedia('live')}
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-[#051020]/80 hover:bg-cyan-950 border border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:text-cyan-200 transition-all hover:scale-105 backdrop-blur-md"
                >
                  <Camera className="w-6 h-6 mb-1 drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]" />
                  <span className="text-[10px] font-bold tracking-widest">现场画面</span>
                </button>
                <button 
                  onClick={() => onOpenMedia('playback')}
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-[#051020]/80 hover:bg-cyan-950 border border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(0,229,255,0.3)] hover:shadow-[0_0_25px_rgba(0,229,255,0.6)] hover:text-cyan-200 transition-all hover:scale-105 backdrop-blur-md"
                >
                  <Play className="w-6 h-6 mb-1 ml-1 drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]" fill="currentColor" />
                  <span className="text-[10px] font-bold tracking-widest">录像回放</span>
                </button>
             </div>
          </div>

          <div className="flex gap-12 text-[12px] mt-2 text-cyan-600 font-mono tracking-widest bg-[#051020]/50 p-3 border border-cyan-900/30 rounded-sm shadow-[inset_0_0_15px_rgba(0,0,0,0.5)]">
             <div>预警时间 <span className="text-cyan-200 ml-2 font-bold">2025/10/13 10:09:57</span></div>
             <div>设备名称 <span className="text-cyan-200 ml-2 font-bold">AI 设备1</span></div>
             <div>预警位置 <span className="text-cyan-200 ml-2 font-bold">K201+305 ~ K201+310</span></div>
          </div>

          <div className="flex items-center gap-6 text-[12px] text-cyan-600 mt-2 font-mono tracking-widest">
            <span className="uppercase">处理方式</span>
            <label className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shadow-[0_0_5px_rgba(0,0,0,0.5)] ${handleType === '消警' ? 'border-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.4)]' : 'border-cyan-900 group-hover:border-cyan-700'}`}>
                {handleType === '消警' && <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(0,229,255,1)]" />}
              </div>
              <span className={handleType === '消警' ? 'text-cyan-200 font-bold' : 'group-hover:text-cyan-400'}>消警</span>
              <input type="radio" className="hidden" checked={handleType === '消警'} onChange={() => setHandleType('消警')} />
            </label>
            <label className="flex items-center gap-2 cursor-pointer ml-4 group">
              <div className={`w-4 h-4 rounded-sm border flex items-center justify-center transition-colors shadow-[0_0_5px_rgba(0,0,0,0.5)] ${handleType === '误报作废' ? 'border-cyan-400 shadow-[0_0_8px_rgba(0,229,255,0.4)]' : 'border-cyan-900 group-hover:border-cyan-700'}`}>
                {handleType === '误报作废' && <div className="w-2 h-2 bg-cyan-400 shadow-[0_0_5px_rgba(0,229,255,1)]" />}
              </div>
              <span className={handleType === '误报作废' ? 'text-cyan-200 font-bold' : 'group-hover:text-cyan-400'}>误报作废</span>
              <input type="radio" className="hidden" checked={handleType === '误报作废'} onChange={() => setHandleType('误报作废')} />
            </label>
          </div>

          <div className="flex items-center gap-4 text-[12px] text-cyan-600 mt-2 font-mono tracking-widest">
            <span className="uppercase">上传文件</span>
            <label className="bg-[#051020] border border-cyan-800 hover:border-cyan-400 hover:bg-cyan-950 text-cyan-400 px-4 py-1.5 rounded-sm cursor-pointer flex items-center gap-2 transition-all shadow-[0_0_10px_rgba(0,229,255,0.1)]">
              <span className="font-bold tracking-widest text-[11px] uppercase">选取凭证</span>
              <input type="file" className="hidden" />
            </label>
            <span className="text-[11px] text-cyan-800">未选择任何文件</span>
          </div>

          <div className="flex justify-center mt-6 mb-2">
            <button className="bg-red-900/50 hover:bg-red-600 border border-red-500 text-red-100 font-bold tracking-widest px-12 py-2 rounded-sm transition-all uppercase text-[12px] shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.8)] text-glow-red">
              确定执行
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

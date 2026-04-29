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
      <div className="bg-[#0A0D12] w-[900px] border border-slate-700 rounded shadow-2xl flex flex-col overflow-hidden font-sans">
        {/* Header */}
        <div className="h-12 bg-slate-900 flex items-center justify-between px-4 border-b border-slate-800">
           <div className="flex-1 text-center text-slate-300 font-bold tracking-widest uppercase">
             事件消除
           </div>
           <button onClick={onClose} className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:text-white hover:bg-red-500 transition-colors">
             <X className="w-4 h-4" />
           </button>
        </div>

        {/* Content */}
        <div className="p-6 flex flex-col gap-4 text-slate-300">
          <div className="font-bold text-sm text-slate-400 uppercase tracking-wider">抓拍画面</div>
          
          <div className="relative w-full h-[380px] bg-black rounded border border-slate-800 overflow-hidden">
             {/* Mock Tunnel Image */}
             <img 
               src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000" 
               alt="Tunnel camera" 
               className="w-full h-full object-cover opacity-80"
             />
             
             {/* Overlay floating action buttons */}
             <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-6">
                <button 
                  onClick={() => onOpenMedia('live')}
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-green-500 hover:bg-green-400 border-[3px] border-green-300/50 text-white shadow-lg transition-transform hover:scale-105"
                >
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-bold">现场画面</span>
                </button>
                <button 
                  onClick={() => onOpenMedia('playback')}
                  className="flex flex-col items-center justify-center w-16 h-16 rounded-full bg-blue-500 hover:bg-blue-400 border-[3px] border-blue-300/50 text-white shadow-lg transition-transform hover:scale-105"
                >
                  <Play className="w-6 h-6 mb-1 ml-1" fill="currentColor" />
                  <span className="text-[10px] font-bold">录像回放</span>
                </button>
             </div>
          </div>

          <div className="flex gap-12 text-sm mt-2 text-slate-500 font-mono tracking-tight">
             <div>预警时间 <span className="text-slate-300 ml-2">2025/10/13 10:09:57</span></div>
             <div>设备名称 <span className="text-slate-300 ml-2">AI 设备1</span></div>
             <div>预警位置 <span className="text-slate-300 ml-2">K201+305 ~ K201+310</span></div>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 mt-2 font-mono">
            <span>处理方式</span>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${handleType === '消警' ? 'border-cyan-500' : 'border-slate-600'}`}>
                {handleType === '消警' && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
              </div>
              <span className={handleType === '消警' ? 'text-slate-300' : ''}>消警</span>
              <input type="radio" className="hidden" checked={handleType === '消警'} onChange={() => setHandleType('消警')} />
            </label>
            <label className="flex items-center gap-2 cursor-pointer ml-4">
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${handleType === '误报作废' ? 'border-cyan-500' : 'border-slate-600'}`}>
                {handleType === '误报作废' && <div className="w-2 h-2 rounded-full bg-cyan-500" />}
              </div>
              <span className={handleType === '误报作废' ? 'text-slate-300' : ''}>误报作废</span>
              <input type="radio" className="hidden" checked={handleType === '误报作废'} onChange={() => setHandleType('误报作废')} />
            </label>
          </div>

          <div className="flex items-center gap-4 text-sm text-slate-500 mt-2 font-mono">
            <span>上传文件</span>
            <label className="bg-slate-800 border border-slate-700 hover:bg-slate-700 text-slate-300 px-3 py-1 rounded text-xs cursor-pointer flex items-center gap-2 transition-colors">
              <span className="font-bold">选择文件</span>
              <input type="file" className="hidden" />
            </label>
            <span className="text-xs text-slate-600">未选择任何文件</span>
          </div>

          <div className="flex justify-center mt-6 mb-2">
            <button className="bg-red-600 hover:bg-red-500 text-white font-bold tracking-widest px-12 py-2 rounded transition-colors uppercase text-xs">
              确定 (CONFIRM)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { X, Search } from 'lucide-react';
import SidebarStats from './SidebarStats';
import TunnelVisualizer from './TunnelVisualizer';
import EventHandlingModal from './EventHandlingModal';
import MediaModal from './MediaModal';
import CustomSelect from './CustomSelect';
import CustomDatePicker from './CustomDatePicker';

interface DashboardProps {
  onClose: () => void;
}

export default function Dashboard({ onClose }: DashboardProps) {
  const [showHandling, setShowHandling] = useState(false);
  const [showMedia, setShowMedia] = useState<false | 'live' | 'playback'>(false);
  const [startDate, setStartDate] = useState<Date | null>(new Date());
  const [endDate, setEndDate] = useState<Date | null>(new Date());
  const [selectedDevice, setSelectedDevice] = useState("全部");

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center pt-8 pb-4 px-4 font-sans text-cyan-50">
      <div className="w-full max-w-[1500px] h-full bg-[#020610]/95 tech-grid cyber-panel flex flex-col font-mono relative backdrop-blur-xl">
        
        {/* Top Header */}
        <div className="h-16 bg-gradient-to-r from-[#031121] to-[#020815] border-b border-cyan-900/60 flex items-center justify-between px-6 relative z-20">
          <div className="flex items-center tracking-widest text-lg font-bold">
             <span className="text-cyan-700 uppercase">系统模块 // &nbsp;</span>
             <span className="text-cyan-300 text-glow">朔黄铁路 / 长梁山隧道</span>
          </div>
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex border border-cyan-900/50 rounded-sm bg-[#051020] overflow-hidden text-xs font-mono uppercase font-bold tracking-widest shadow-[0_0_15px_rgba(0,229,255,0.05)]">
             <button className="px-8 py-2 focus:outline-none bg-transparent text-cyan-700 hover:text-cyan-300 flex-1 text-center transition-colors">
               监测模块
             </button>
             <button className="px-8 py-2 focus:outline-none bg-[#0a1e3a]/40 border-b-2 border-cyan-400 text-cyan-100 border-l border-cyan-900/50 flex-1 text-center transition-colors shadow-[inset_0_-4px_10px_rgba(0,229,255,0.2)]">
               异物入侵
             </button>
          </div>

          <button onClick={onClose} className="p-2 rounded-sm bg-[#051020] text-cyan-600 hover:text-white hover:bg-red-500/90 transition-colors border border-cyan-900/50 hover:border-red-500">
             <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Panel */}
          <div className="h-full border-r border-cyan-900/40 bg-[#020712]/80 backdrop-blur-md z-10 shadow-[5px_0_15px_rgba(0,0,0,0.5)] relative">
             <SidebarStats onViewMedia={() => setShowMedia('live')} />
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col p-5 gap-5 overflow-hidden relative z-10">
             <div className="bg-[#030914]/60 border border-cyan-900/40 rounded-sm flex justify-center items-center py-2 relative cyber-panel">
                <TunnelVisualizer />
             </div>

             {/* Filters */}
             <div className="flex items-center gap-4 text-cyan-200 text-xs mt-1 pl-2 font-mono h-8">
               <span className="text-cyan-600 uppercase font-bold tracking-widest text-[11px]">时间范围</span>
               <div className="flex items-center gap-2 h-full z-20">
                 <CustomDatePicker value={startDate} onChange={setStartDate} placeholder="开始日期" />
                 <span className="text-cyan-800">—</span>
                 <CustomDatePicker value={endDate} onChange={setEndDate} placeholder="结束日期" />
               </div>
               
               <span className="text-cyan-600 ml-6 uppercase font-bold tracking-widest text-[11px] z-10">设备名称</span>
               <div className="h-full z-10 w-[140px]">
                 <CustomSelect 
                   options={['全部', 'AI 设备1', 'AI 设备2', 'AI 设备3', 'AI 设备4']} 
                   value={selectedDevice} 
                   onChange={setSelectedDevice} 
                 />
               </div>

               <button className="bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800 hover:border-cyan-400 text-cyan-200 px-6 py-1 rounded-sm shadow-[0_0_10px_rgba(0,229,255,0.1)] ml-2 transition-all flex items-center gap-2 font-sans h-full">
                 <Search className="w-3 h-3" />
                 <span className="font-bold tracking-widest text-[12px]">查询</span>
               </button>
             </div>

             {/* Table */}
             <div className="flex-1 overflow-hidden flex flex-col bg-[#030914]/80 rounded-sm border border-cyan-900/40 cyber-panel">
               <div className="bg-[#051020] text-cyan-600 uppercase font-bold grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr] gap-2 p-3 text-center text-[10px] tracking-widest border-b border-cyan-900/50 shadow-[0_4px_10px_rgba(0,0,0,0.5)] z-10 relative">
                  <div>设备名称</div>
                  <div>设备位置</div>
                  <div>侦测范围</div>
                  <div>预警状态</div>
                  <div>预警部位</div>
                  <div>最新预警时间</div>
                  <div>最新照片</div>
                  <div>处理状态</div>
                  <div>操作</div>
               </div>
               <div className="flex-1 overflow-y-auto custom-scrollbar text-cyan-200 text-xs bg-[#02050c]/50 min-h-0">
                  {/* Table Rows */}
                  {[
                    { id: '1', name: '设备1', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '预警', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '未处理', isRed: true },
                    { id: '2', name: '设备2', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '3', name: '设备3', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '4', name: '设备4', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '5', name: '设备5', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已作废', isRed: false },
                    { id: '6', name: '设备6', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr] gap-2 p-3 text-center items-center border-b border-cyan-900/30 hover:bg-cyan-900/20 transition-colors font-mono text-[11px]">
                      <div>{row.name}</div>
                      <div>{row.pos}</div>
                      <div>{row.range}</div>
                      <div className="flex items-center justify-center gap-1.5 font-bold uppercase tracking-widest text-[10px]">
                        <div className={`w-1.5 h-1.5 rounded-full ${row.isRed ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(0,229,255,0.8)]'}`}></div>
                        <span className={row.isRed ? 'text-red-400 text-glow-red' : 'text-cyan-400 text-glow'}>{row.status}</span>
                      </div>
                      <div>{row.part}</div>
                      <div className="flex flex-col whitespace-nowrap text-left pl-4">
                         <span className="text-cyan-700 font-bold">{row.time.split(' ')[0]}</span>
                         <span className="text-cyan-200">{row.time.split(' ')[1]}</span>
                      </div>
                      <div className="flex justify-center">
                         <div className="w-12 h-8 bg-[#051020] rounded-sm border border-cyan-800 overflow-hidden cursor-pointer hover:border-cyan-400 relative" onClick={() => setShowMedia('live')}>
                            <div className="absolute inset-0 bg-cyan-900/20 mix-blend-overlay z-10 pointer-events-none"></div>
                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=100&h=60" alt="thumb" className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity" />
                         </div>
                      </div>
                      <div className={row.handledStatus === '未处理' ? 'text-amber-400 font-bold tracking-widest' : row.handledStatus === '已处理' ? 'text-cyan-500 font-bold tracking-widest' : 'text-cyan-800 font-bold tracking-widest'}>
                        {row.handledStatus}
                      </div>
                      <div className="flex flex-row items-center justify-center gap-2 text-cyan-400 font-mono text-[11px] tracking-widest font-bold">
                        <button className="hover:text-white hover:bg-cyan-800 transition-colors px-2 py-0.5 border border-cyan-800 rounded-sm bg-[#051020]/50" onClick={() => setShowHandling(true)}>处理</button>
                        <button className="hover:text-white hover:bg-cyan-800 transition-colors px-2 py-0.5 border border-cyan-800 rounded-sm bg-[#051020]/50" onClick={() => setShowHandling(true)}>详情</button>
                      </div>
                    </div>
                  ))}
               </div>

               {/* Pagination Footer */}
               <div className="p-3 border-t border-cyan-900/50 flex justify-between items-center text-[11px] text-cyan-600 bg-[#02050c]/80 font-mono">
                  <div className="tracking-widest">共 243 条 / 显示 10 条</div>
                  <div className="flex gap-1">
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">&lt;</button>
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">1</button>
                    <button className="bg-transparent text-cyan-800 px-2 py-1 rounded-sm shadow pointer-events-none">...</button>
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">10</button>
                    <button className="bg-cyan-600 text-black px-2 py-1 rounded-sm shadow font-bold shadow-[0_0_10px_rgba(0,229,255,0.5)]">11</button>
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">12</button>
                    <button className="bg-transparent text-cyan-800 px-2 py-1 rounded-sm shadow pointer-events-none">...</button>
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">50</button>
                    <button className="bg-[#051020] border border-cyan-900 text-cyan-600 px-2 py-1 rounded-sm shadow hover:bg-cyan-900/40 hover:text-cyan-300 transition-colors">&gt;</button>
                  </div>
               </div>
             </div>
          </div>
        </div>
      </div>

      {showHandling && (
        <EventHandlingModal 
           onClose={() => setShowHandling(false)} 
           onOpenMedia={(mode) => setShowMedia(mode)}
        />
      )}
      
      {showMedia && (
        <MediaModal 
           onClose={() => setShowMedia(false)} 
           mode={showMedia}
        />
      )}
    </div>
  );
}

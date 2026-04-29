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
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
      <div className="w-full max-w-[1400px] h-full max-h-[850px] bg-[#0A0D12] text-slate-300 border-4 border-[#1A1F26] rounded shadow-2xl flex flex-col overflow-hidden text-sm">
        
        {/* Top Header */}
        <div className="h-14 bg-transparent border-b border-slate-800 flex items-center justify-between px-4 relative">
          <div className="flex items-center tracking-tight text-xl">
             <span className="text-slate-500 font-normal">朔黄铁路 / &nbsp;</span>
             <span className="text-white font-bold">长梁山隧道</span>
          </div>
          
          <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex border border-slate-800 rounded bg-[#14181F] overflow-hidden text-xs font-mono uppercase font-bold tracking-wider">
             <button className="px-6 py-1.5 focus:outline-none bg-slate-800/50 text-slate-400 hover:text-white flex-1 text-center transition-colors">
               监测模块
             </button>
             <button className="px-6 py-1.5 focus:outline-none bg-slate-900 border-b-2 border-cyan-400 text-cyan-400 border-l border-slate-800 flex-1 text-center transition-colors">
               异物入侵
             </button>
          </div>

          <button onClick={onClose} className="p-1.5 rounded bg-slate-900 text-slate-400 hover:text-white hover:bg-red-500 transition-colors border border-slate-700">
             <X className="w-4 h-4" />
          </button>
        </div>

        {/* Main Content Area */}
        <div className="flex flex-1 overflow-hidden">
          
          {/* Left Panel */}
          <div className="h-full border-r border-slate-800 bg-[#0A0D12]">
             <SidebarStats onViewMedia={() => setShowMedia('live')} />
          </div>

          {/* Right Panel */}
          <div className="flex-1 flex flex-col p-4 gap-4 overflow-hidden relative">
             <div className="bg-[#14181F] border border-slate-800 rounded flex justify-center items-center shadow-lg py-2">
                <TunnelVisualizer />
             </div>

             {/* Filters */}
             <div className="flex items-center gap-4 text-slate-300 text-xs mt-2 pl-2 font-mono h-8">
               <span className="text-slate-500 uppercase font-bold tracking-wider">时间范围</span>
               <div className="flex items-center gap-2 h-full z-20">
                 <CustomDatePicker value={startDate} onChange={setStartDate} placeholder="开始日期" />
                 <span className="text-slate-600">—</span>
                 <CustomDatePicker value={endDate} onChange={setEndDate} placeholder="结束日期" />
               </div>
               
               <span className="text-slate-500 ml-6 uppercase font-bold tracking-wider z-10">设备名称</span>
               <div className="h-full z-10 w-[140px]">
                 <CustomSelect 
                   options={['全部', 'AI 设备1', 'AI 设备2', 'AI 设备3', 'AI 设备4']} 
                   value={selectedDevice} 
                   onChange={setSelectedDevice} 
                 />
               </div>

               <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-white px-6 py-1 rounded shadow ml-2 transition-colors flex items-center gap-1 font-sans h-full">
                 <Search className="w-3 h-3" />
                 查询
               </button>
             </div>

             {/* Table */}
             <div className="flex-1 overflow-hidden flex flex-col bg-[#14181F] rounded border border-slate-800">
               <div className="bg-slate-900/50 text-slate-500 uppercase font-bold grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr] gap-2 p-3 text-center text-[10px] tracking-wider border-b border-slate-800">
                  <div>设备名称</div>
                  <div>设备位置</div>
                  <div>侦测范围</div>
                  <div>预警状态</div>
                  <div>预警部位</div>
                  <div>最新预警时间</div>
                  <div>预警截图</div>
                  <div>处置状态</div>
                  <div>操作</div>
               </div>
               
               <div className="flex-1 overflow-y-auto custom-scrollbar text-slate-300 text-xs">
                  {/* Table Rows */}
                  {[
                    { id: '1', name: '设备1', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '预警', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '未处理', isRed: true },
                    { id: '2', name: '设备2', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '3', name: '设备3', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '4', name: '设备4', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                    { id: '5', name: '设备5', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已作废', isRed: false },
                    { id: '6', name: '设备6', pos: 'K201+310', range: 'K201+270 ~ K201+350', status: '正常', part: 'K201+305 ~ K201+310', time: '2025-09-29 20:11:48', handledStatus: '已处理', isRed: false },
                  ].map((row, i) => (
                    <div key={i} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr_1fr_1.5fr_1.5fr] gap-2 p-3 text-center items-center border-b border-slate-800/50 hover:bg-slate-800/40 transition-colors font-mono text-[11px]">
                      <div>{row.name}</div>
                      <div>{row.pos}</div>
                      <div>{row.range}</div>
                      <div className="flex items-center justify-center gap-1.5 font-bold uppercase tracking-wide">
                        <div className={`w-2 h-2 rounded ${row.isRed ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.6)]' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)]'}`}></div>
                        <span className={row.isRed ? 'text-red-500' : 'text-emerald-500'}>{row.status}</span>
                      </div>
                      <div>{row.part}</div>
                      <div className="flex flex-col whitespace-nowrap text-left pl-4">
                         <span className="text-slate-500">{row.time.split(' ')[0]}</span>
                         <span className="text-white">{row.time.split(' ')[1]}</span>
                      </div>
                      <div className="flex justify-center">
                         <div className="w-12 h-8 bg-slate-900 rounded border border-slate-700 overflow-hidden cursor-pointer hover:border-cyan-400" onClick={() => setShowMedia('live')}>
                            <img src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=100&h=60" alt="thumb" className="w-full h-full object-cover opacity-70" />
                         </div>
                      </div>
                      <div className={row.handledStatus === '未处理' ? 'text-orange-400 font-bold' : row.handledStatus === '已处理' ? 'text-emerald-500 font-bold' : 'text-slate-500 font-bold'}>
                        {row.handledStatus}
                      </div>
                      <div className="flex flex-row items-center justify-center gap-2 text-cyan-400 font-sans text-xs">
                        <button className="hover:text-cyan-300 transition-colors px-2 py-0.5 border border-cyan-800 rounded bg-cyan-950/30" onClick={() => setShowHandling(true)}>处理</button>
                        <button className="hover:text-cyan-300 transition-colors px-2 py-0.5 border border-cyan-800 rounded bg-cyan-950/30" onClick={() => setShowHandling(true)}>详情</button>
                      </div>
                    </div>
                  ))}
               </div>

               {/* Pagination Footer */}
               <div className="p-3 border-t border-slate-800 flex justify-end items-center gap-4 text-xs text-slate-400 bg-slate-900/30 font-mono">
                  <div>共 243 条  显示 10 条 ▾</div>
                  <div className="flex gap-1">
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">&lt;</button>
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">1</button>
                    <button className="bg-transparent text-slate-600 px-2 py-1 rounded shadow pointer-events-none">...</button>
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">10</button>
                    <button className="bg-cyan-500 text-black px-2 py-1 rounded shadow font-bold">11</button>
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">12</button>
                    <button className="bg-transparent text-slate-600 px-2 py-1 rounded shadow pointer-events-none">...</button>
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">50</button>
                    <button className="bg-slate-800 border border-slate-700 text-slate-400 px-2 py-1 rounded shadow hover:bg-slate-700 hover:text-white">&gt;</button>
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

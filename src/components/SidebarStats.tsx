import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { Play, Image as ImageIcon } from 'lucide-react';

const devices = ['AI设备1', 'AI设备2', 'AI设备3', 'AI设备4', 'AI设备5', 'AI设备6'];
const pieData = [{ name: '未处理', value: 12, color: '#3b82f6' }, { name: '已处理', value: 20, color: '#14b8a6' }];

const quickAlarms = [
  { id: 1, name: 'AI设备3', location: 'K201+684', time: '2025/10/11 10:20:47' },
  { id: 2, name: 'AI设备1', location: 'K201+684', time: '2025/10/11 10:20:47' },
  { id: 3, name: 'AI设备3', location: 'K201+684', time: '2025/10/11 10:20:47' },
  { id: 4, name: 'AI设备2', location: 'K201+684', time: '2025/10/11 10:20:47' },
  { id: 5, name: 'AI设备1', location: 'K201+684', time: '2025/10/11 10:20:47' },
];

export default function SidebarStats({ onViewMedia }: { onViewMedia: () => void }) {
  const [statPeriod, setStatPeriod] = useState<'day' | 'week' | 'month'>('day');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const totalAlarms = useMemo(() => pieData.reduce((acc, curr) => acc + curr.value, 0), []);

  return (
    <div className="w-[320px] flex-shrink-0 flex flex-col gap-5 text-cyan-100 p-5 font-mono">
      
      {/* 设备信息 Topology */}
      <div className="cyber-panel flex flex-col h-[280px]">
        <div className="border-b border-cyan-900/50 p-2 text-xs font-bold flex items-center gap-2 text-cyan-400 uppercase tracking-widest bg-gradient-to-r from-cyan-900/20 to-transparent">
          <ImageIcon className="w-4 h-4 text-cyan-500" />
          <span>设备网络</span>
        </div>
        <div className="flex-1 p-4 relative flex flex-col gap-4 min-h-0">
          <div className="bg-[#051020] border border-cyan-800 p-3 rounded-sm shadow-[inset_0_0_10px_rgba(0,229,255,0.05)] flex items-center justify-between z-10 hover:border-cyan-500 transition-all cursor-pointer flex-shrink-0">
            <span className="text-cyan-100 font-bold tracking-widest text-xs text-glow">长梁山隧道</span>
            <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 px-2 py-0.5 rounded-sm text-[9px] font-bold tracking-widest uppercase">
              在线
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-2 pr-1 relative min-h-0">
            {/* Connection line behind list */}
            <div className="absolute left-[13px] top-2 bottom-4 w-px bg-cyan-900/50 z-0 border-l border-dashed border-cyan-700/30"></div>
            
            {devices.map((d, i) => (
               <div key={i} className={`relative z-10 flex items-center justify-between px-3 py-2 rounded-sm text-[10px] border shadow-sm transition-all cursor-pointer flex-shrink-0 ${i === 2 ? 'bg-red-950/40 border-red-500/50 text-red-300 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.2)]' : 'bg-[#051020] border-cyan-900/60 text-cyan-500 hover:border-cyan-500 hover:text-cyan-200 hover:shadow-[0_0_10px_rgba(0,229,255,0.1)]'}`}>
                 <div className="flex items-center gap-3">
                   <div className={`w-2 h-2 rounded-sm rotate-45 ${i === 2 ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]' : 'bg-cyan-500 shadow-[0_0_8px_rgba(0,229,255,0.8)]'}`}></div>
                   <span className="font-mono tracking-widest">{d}</span>
                 </div>
                 <span className={`font-mono text-[10px] uppercase tracking-wider ${i === 2 ? 'text-red-400 font-bold' : 'opacity-60'}`}>
                   {i === 2 ? '告警' : '正常'}
                 </span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 预警信息 */}
      <div className="cyber-panel flex flex-col flex-1 min-h-0">
        <div className="border-b border-cyan-900/50 p-2 text-xs font-bold flex items-center justify-between text-cyan-400 uppercase tracking-widest bg-gradient-to-r from-cyan-900/20 to-transparent">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-cyan-500" />
            <span>预警统计</span>
          </div>
          {/* Added Day/Week/Month selector functionality manually as requested by the prompt for statistics */}
          <div className="flex bg-[#051020] rounded-sm border border-cyan-900 overflow-hidden text-[10px]">
            {['day', 'week', 'month'].map(p => (
              <button 
                key={p} 
                className={`px-3 py-1 uppercase tracking-widest ${statPeriod === p ? 'bg-cyan-800/80 text-cyan-100' : 'text-cyan-600 hover:text-cyan-300 hover:bg-cyan-900/30'}`}
                onClick={() => setStatPeriod(p as any)}
              >
                {p === 'day' ? '日' : p === 'week' ? '周' : '月'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Doughnut Chart */}
        <div className="h-[120px] w-full flex items-center justify-around px-4 relative mt-2">
          {/* Decorative scanner line */}
          <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-900/30 pointer-events-none"></div>
          
          <div className="h-full w-[120px] relative transition-transform duration-300 hover:scale-105 cursor-pointer">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={52}
                  stroke="none"
                  dataKey="value"
                  paddingAngle={5}
                  onMouseEnter={(_, index) => setActiveIndex(index)}
                  onMouseLeave={() => setActiveIndex(null)}
                >
                  {pieData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color} 
                      style={{ 
                        filter: `drop-shadow(0px 0px 6px ${entry.color})`,
                        opacity: activeIndex === index || activeIndex === null ? 1 : 0.3,
                        outline: 'none',
                        transition: 'opacity 0.3s ease'
                      }} 
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10 text-cyan-300 mt-1">
              {activeIndex !== null ? (
                <>
                  <span className="text-xl font-bold leading-none text-glow mb-0.5" style={{ color: pieData[activeIndex].color }}>
                    {pieData[activeIndex].value}
                  </span>
                  <span className="text-[10px] font-mono font-bold tracking-widest opacity-80" style={{ color: pieData[activeIndex].color }}>
                    {((pieData[activeIndex].value / totalAlarms) * 100).toFixed(0)}%
                  </span>
                </>
              ) : (
                <>
                  <span className="text-2xl font-bold text-glow leading-none">{totalAlarms}</span>
                  <span className="text-[9px] uppercase tracking-widest text-cyan-500 font-bold mt-1">总计</span>
                </>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-3 text-xs w-[80px]">
            {pieData.map((d, index) => (
              <div 
                key={d.name} 
                className={`flex flex-col gap-1 items-end transition-all duration-300 cursor-pointer ${activeIndex === index ? 'scale-110 drop-shadow-[0_0_5px_rgba(0,229,255,0.5)]' : activeIndex !== null ? 'opacity-40' : ''}`}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
              >
                <div className="flex items-center gap-2 text-cyan-500 font-bold tracking-widest uppercase text-[10px]">
                   {d.name}
                   <div className="w-2 h-2 rounded-sm rotate-45" style={{ backgroundColor: d.color, boxShadow: activeIndex === index ? `0 0 12px ${d.color}` : `0 0 8px ${d.color}` }}></div>
                </div>
                <div className={`bg-[#051020] border font-mono px-3 py-1 rounded-sm w-[70px] text-center transition-colors duration-300 ${activeIndex === index ? 'border-cyan-400 text-cyan-100 shadow-[inset_0_0_15px_rgba(0,229,255,0.3)]' : 'border-cyan-800 text-cyan-200 shadow-[inset_0_0_8px_rgba(0,229,255,0.1)]'}`}>
                  {d.value}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Alarm List */}
        <div className="flex-1 overflow-auto custom-scrollbar mt-2 border-t border-cyan-900/30 min-h-0">
          <table className="w-full text-xs text-center border-collapse">
             <thead>
               <tr className="text-cyan-600 font-bold tracking-widest text-[11px] uppercase bg-[#051020]/50 sticky top-0 z-10 hidden">
                 <th className="font-normal py-2">编号</th>
                 <th className="font-normal py-2">位置</th>
                 <th className="font-normal py-2">时间</th>
                 <th className="font-normal py-2">操作</th>
               </tr>
             </thead>
             <tbody>
               {quickAlarms.map((row, i) => (
                 <tr key={i} className="border-b border-cyan-900/20 hover:bg-cyan-900/20 text-cyan-300 transition-colors font-mono hover:shadow-[inset_0_0_15px_rgba(0,229,255,0.05)] cursor-pointer">
                   <td className="py-3 px-1">
                     <span className="bg-[#051020] border border-cyan-900 text-[9px] px-1.5 py-0.5 rounded-sm shadow-[0_0_5px_rgba(0,0,0,0.5)]">{row.name}</span>
                   </td>
                   <td className="py-3 px-1 text-cyan-500 text-[10px]">{row.location}</td>
                   <td className="py-3 px-1 flex flex-col text-[9px] items-center justify-center">
                     <span className="text-cyan-700">{row.time.split(' ')[0]}</span>
                     <span className="text-cyan-100 font-bold">{row.time.split(' ')[1]}</span>
                   </td>
                   <td className="py-3 px-1">
                     <div className="flex items-center justify-center gap-1.5">
                       <button onClick={onViewMedia} className="p-1.5 rounded-sm bg-[#051020] border border-cyan-800 text-cyan-500 hover:bg-cyan-800 hover:text-cyan-100 transition-colors">
                         <Play className="w-3 h-3" />
                       </button>
                       <button onClick={onViewMedia} className="p-1.5 rounded-sm bg-[#051020] border border-cyan-800 text-cyan-500 hover:bg-cyan-800 hover:text-cyan-100 transition-colors">
                         <ImageIcon className="w-3 h-3" />
                       </button>
                     </div>
                   </td>
                 </tr>
               ))}
             </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

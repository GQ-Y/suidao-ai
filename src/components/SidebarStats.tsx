import React, { useState } from 'react';
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

  return (
    <div className="w-[300px] flex-shrink-0 flex flex-col gap-4 text-white p-4">
      
      {/* 设备信息 Topology */}
      <div className="bg-[#14181F] border border-slate-800 rounded shadow overflow-hidden flex flex-col h-[280px]">
        <div className="border-b border-slate-800 p-2 text-xs font-bold flex items-center gap-2 text-slate-400 uppercase">
          <ImageIcon className="w-4 h-4 text-slate-500" />
          <span>设备信息</span>
        </div>
        <div className="flex-1 p-4 relative flex flex-col gap-3">
          <div className="bg-slate-900 border border-slate-700 p-2.5 rounded shadow flex items-center justify-between z-10 hover:border-slate-500 transition-colors cursor-pointer">
            <span className="text-slate-300 font-bold tracking-widest text-xs">长梁山隧道</span>
            <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded text-[9px] font-bold tracking-widest uppercase">
              Online
            </span>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar flex flex-col gap-1.5 pr-1">
            {devices.map((d, i) => (
               <div key={i} className={`flex items-center justify-between px-3 py-2 rounded text-[10px] border shadow-sm transition-colors cursor-pointer ${i === 2 ? 'bg-red-500/10 border-red-500/40 text-red-400 animate-pulse' : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-600 hover:bg-slate-800'}`}>
                 <div className="flex items-center gap-2">
                   <div className={`w-1.5 h-1.5 rounded-full ${i === 2 ? 'bg-red-500 shadow-[0_0_5px_rgba(239,68,68,0.8)]' : 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]'}`}></div>
                   <span className="font-mono">{d}</span>
                 </div>
                 <span className="font-mono text-[9px] uppercase tracking-wider opacity-60">
                   {i === 2 ? 'Alarm' : 'Normal'}
                 </span>
               </div>
            ))}
          </div>
        </div>
      </div>

      {/* 预警信息 */}
      <div className="bg-[#14181F] border border-slate-800 rounded shadow overflow-hidden flex flex-col flex-1">
        <div className="border-b border-slate-800 p-2 text-xs font-bold flex items-center justify-between text-slate-400 uppercase">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-slate-500" />
            <span>预警信息</span>
          </div>
          {/* Added Day/Week/Month selector functionality manually as requested by the prompt for statistics */}
          <div className="flex bg-slate-900 rounded border border-slate-800 overflow-hidden text-[10px]">
            {['day', 'week', 'month'].map(p => (
              <button 
                key={p} 
                className={`px-2 py-1 capitalize ${statPeriod === p ? 'bg-slate-700 text-white' : 'text-slate-500 hover:text-slate-300'}`}
                onClick={() => setStatPeriod(p as any)}
              >
                {p === 'day' ? '日' : p === 'week' ? '周' : '月'}
              </button>
            ))}
          </div>
        </div>
        
        {/* Doughnut Chart */}
        <div className="h-[120px] w-full flex items-center justify-around px-4">
          <div className="h-full w-[120px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={35}
                  outerRadius={50}
                  stroke="none"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span className="text-2xl font-bold">32</span>
            </div>
          </div>
          <div className="flex flex-col gap-2 text-xs">
            {pieData.map(d => (
              <div key={d.name} className="flex flex-col gap-1">
                <div className="flex items-center gap-2 text-gray-300">
                   <div className="w-2 h-2 rounded-full" style={{ backgroundColor: d.color }}></div>
                   {d.name}
                </div>
                <div className="bg-cyan-950 border border-cyan-800 text-white font-mono px-3 py-1 rounded w-16 text-center">{d.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Alarm List */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          <table className="w-full text-xs text-center">
             <thead>
               <tr className="text-slate-500 border-b border-slate-800 font-bold">
                 <th className="font-normal py-2">设备编号</th>
                 <th className="font-normal py-2">预警位置</th>
                 <th className="font-normal py-2">预警时间</th>
                 <th className="font-normal py-2">操作</th>
               </tr>
             </thead>
             <tbody>
               {quickAlarms.map((row, i) => (
                 <tr key={i} className="border-b border-slate-800/50 hover:bg-slate-800/30 text-slate-300 transition-colors font-mono">
                   <td className="py-2">{row.name}</td>
                   <td className="py-2">{row.location}</td>
                   <td className="py-2 flex flex-col text-[10px]">
                     <span className="text-slate-400">{row.time.split(' ')[0]}</span>
                     <span className="text-white">{row.time.split(' ')[1]}</span>
                   </td>
                   <td className="py-2">
                     <div className="flex items-center justify-center gap-1">
                       <button onClick={onViewMedia} className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
                         <Play className="w-3 h-3" />
                       </button>
                       <button onClick={onViewMedia} className="p-1 rounded bg-slate-800 border border-slate-700 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors">
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

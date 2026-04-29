import React, { useState } from 'react';
import { Video, Disc, Activity } from 'lucide-react';

interface DeviceData {
  id: string;
  name: string;
  position: string;
  range: string;
  status: 'online' | 'offline';
  alarms: number;
  hasWarning: boolean;
  xOffset: number;
}

const devices: DeviceData[] = [
  { id: '1', name: 'AI 设备1', position: 'K201+130', range: 'K201+110 ~ K201+150', status: 'online', alarms: 5, hasWarning: false, xOffset: 80 },
  { id: '2', name: 'AI 设备2', position: 'K201+170', range: 'K201+150 ~ K201+190', status: 'online', alarms: 0, hasWarning: false, xOffset: 200 },
  { id: '3', name: 'AI 设备3', position: 'K201+230', range: 'K201+210 ~ K201+250', status: 'online', alarms: 32, hasWarning: true, xOffset: 350 },
  { id: '4', name: 'AI 设备4', position: 'K201+250', range: 'K201+230 ~ K201+270', status: 'online', alarms: 0, hasWarning: false, xOffset: 450 },
  { id: '5', name: 'AI 设备5', position: 'K201+290', range: 'K201+270 ~ K201+310', status: 'online', alarms: 0, hasWarning: false, xOffset: 550 },
  { id: '6', name: 'AI 设备6', position: 'K201+330', range: 'K201+310 ~ K201+350', status: 'online', alarms: 2, hasWarning: false, xOffset: 680 },
];

export default function TunnelVisualizer() {
  const [hoveredDevice, setHoveredDevice] = useState<DeviceData | null>(null);

  // Tunnel segments configuration
  const segments = [
    { start: 0, end: 130, label: 'K201+130' },
    { start: 130, end: 260, label: 'K201+170' },
    { start: 260, end: 390, label: 'K201+210', warning: true },
    { start: 390, end: 520, label: 'K201+250' },
    { start: 520, end: 650, label: 'K201+290' },
    { start: 650, end: 780, label: 'K201+330' },
  ];

  return (
    <div className="relative w-full h-[240px] flex flex-col items-center justify-center p-[20px] font-mono overflow-hidden">
      {/* Grid Pattern Background */}
      <div 
        className="absolute inset-0 opacity-[0.15]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #334155 1px, transparent 1px), linear-gradient(to bottom, #334155 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      
      {/* HUD Info */}
      <div className="absolute top-4 left-4 text-[10px] text-slate-500 flex flex-col tracking-widest z-10">
        <span>MODE: <span className="text-emerald-500 font-bold">NORMAL</span></span>
        <span>SCAN: <span className="text-cyan-500 font-bold">ACTIVE</span></span>
        <span>SYS: ONLINE</span>
      </div>

      <svg className="w-full h-full max-w-[800px] z-10 relative" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="tunnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0f172a" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0f172a" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="tunnelRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        <g transform="translate(10, 0)">
          {/* Back hidden lines for depth */}
          {segments.map((seg, i) => (
             i < segments.length && (
               <path key={`back-${i}`} d={`M ${seg.start} 50 C ${seg.start+30} 50, ${seg.start+30} 140, ${seg.start} 140 L ${seg.end} 140 C ${seg.end+30} 140, ${seg.end+30} 50, ${seg.end} 50 Z`}
               fill="none" stroke="#1e293b" strokeDasharray="5 5" strokeWidth="1" />
             )
          ))}

          {/* Tube fill and front edges */}
          {segments.map((seg, i) => {
            const isWarning = seg.warning;
            const nextSeg = segments[i + 1] || { start: seg.end };
            return (
              <g key={`front-${i}`}>
                {i < segments.length && (
                  <path
                    d={`M ${seg.start} 50 C ${seg.start+30} 50, ${seg.start+30} 140, ${seg.start} 140 L ${nextSeg.start} 140 C ${nextSeg.start+30} 140, ${nextSeg.start+30} 50, ${nextSeg.start} 50 Z`}
                    fill={isWarning ? "url(#tunnelRedGrad)" : "url(#tunnelGrad)"}
                    stroke={isWarning ? "#ef4444" : "#475569"}
                    strokeWidth="1.5"
                  />
                )}
                {/* Front Ring */}
                <ellipse 
                  cx={seg.start} cy="95" rx="15" ry="45" 
                  fill={isWarning || (i>0 && segments[i-1].warning) ? "rgba(239, 68, 68, 0.15)" : "rgba(15, 23, 42, 0.7)"} 
                  stroke={isWarning || (i>0 && segments[i-1].warning) ? "#ef4444" : "#64748b"} 
                  strokeWidth={isWarning || (i>0 && segments[i-1].warning) ? "2.5" : "1.5"} 
                />
                
                {/* Red radar warning arc */}
                {(isWarning || (i>0 && segments[i-1].warning)) && (
                   <path
                     d={`M ${seg.start-10} 95 A 30 55 0 0 1 ${seg.start-10} 40`}
                     fill="none" stroke="#ef4444" strokeWidth="5" strokeLinecap="round" className="animate-pulse"
                   />
                )}
                
                <text x={seg.start} y="165" fill="#64748b" fontSize="10" textAnchor="middle" className="tracking-wider">{seg.label}</text>
              </g>
            );
          })}
          
          {/* Base Grid Line */}
          <line x1="0" y1="150" x2="780" y2="150" stroke="#334155" strokeWidth="2" strokeDasharray="4 4" />
        </g>
      </svg>

      {/* Render the Device Markers as absolute HTML to allow easy Tooltips */}
      {devices.map((device) => (
        <div
          key={device.id}
          className="absolute"
          style={{ 
            left: `calc(50% - 400px + ${device.xOffset}px)`, 
            top: '165px' 
          }}
          onMouseEnter={() => setHoveredDevice(device)}
          onMouseLeave={() => setHoveredDevice(null)}
        >
          {/* Position Tag */}
          <div className="text-[12px] text-slate-500 font-mono tracking-tight mb-2 whitespace-nowrap transform -translate-x-1/2 text-center">
            {device.position}
          </div>
          
          {/* Icon marker cluster */}
          <div className="flex items-center gap-1 transform -translate-x-1/2">
             <div className="bg-slate-800 p-1 rounded border border-slate-700">
                <Disc className="w-3 h-3 text-slate-500" />
             </div>
             {/* Main pointer with warning logic */}
             <div className={`relative p-1.5 rounded-full border shadow-lg ${device.hasWarning ? 'bg-red-600/90 border-red-500 animate-bounce' : 'bg-slate-700/80 border-slate-500'} cursor-pointer hover:scale-110 transition-transform`}>
                <Video className="w-4 h-4 text-white" />
                {device.hasWarning && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                  </span>
                )}
             </div>
             <div className="bg-slate-800 p-1 rounded border border-slate-700">
                <Activity className="w-3 h-3 text-slate-500" />
             </div>
          </div>
        </div>
      ))}

      {/* Tooltip */}
      {hoveredDevice && (
        <div
          className="absolute pointer-events-none z-10 bg-[#0A0D12]/95 backdrop-blur-sm border border-slate-800 text-slate-300 p-4 rounded shadow-2xl text-sm"
          style={{
            left: `calc(50% - 400px + ${hoveredDevice.xOffset}px)`,
            top: '80px',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold flex items-center justify-between min-w-[200px] mb-2 border-b border-slate-800 pb-2">
            <span>设备名称: {hoveredDevice.name}</span>
            <span className={hoveredDevice.status === 'online' ? 'text-emerald-400' : 'text-slate-500'}>
              {hoveredDevice.status === 'online' ? '在线' : '离线'}
            </span>
          </div>
          <div className="text-slate-400 font-mono space-y-1">
            <p>设备位置: {hoveredDevice.position}</p>
            <p>监测范围: {hoveredDevice.range}</p>
            <p className="flex items-center gap-2 font-sans tracking-tight mt-2">
              预警次数: <span className={hoveredDevice.hasWarning ? 'text-red-500 font-bold text-lg' : 'text-white font-bold text-lg'}>{hoveredDevice.alarms}</span> 次
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

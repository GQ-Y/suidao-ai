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
        className="absolute inset-0 opacity-[0.2]"
        style={{ 
          backgroundImage: 'linear-gradient(to right, #00E5FF 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      />
      {/* Scanning radar sweep */}
      <div className="absolute top-0 bottom-0 left-0 w-[200%] bg-gradient-to-r from-transparent via-cyan-500/10 to-cyan-400/30 animate-[scan_6s_linear_infinite] transform -translate-x-full pointer-events-none z-0"></div>
      
      {/* HUD Info */}
      <div className="absolute top-4 left-4 text-[11px] text-cyan-600 flex flex-col tracking-widest z-10 font-bold">
        <span>模式: <span className="text-cyan-300">正常</span></span>
        <span>扫描: <span className="text-emerald-400">激活</span></span>
        <span className="text-glow animate-pulse">系统: 在线</span>
      </div>

      <svg className="w-full h-full max-w-[800px] z-10 relative" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="tunnelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#041224" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#0a2a4f" stopOpacity="0.6" />
          </linearGradient>
          <linearGradient id="tunnelRedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#8b0000" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#ff4d4f" stopOpacity="0.2" />
          </linearGradient>
        </defs>

        <g transform="translate(10, 0)">
          {/* Back hidden lines for depth */}
          {segments.map((seg, i) => (
             i < segments.length && (
               <path key={`back-${i}`} d={`M ${seg.start} 50 C ${seg.start+30} 50, ${seg.start+30} 140, ${seg.start} 140 L ${seg.end} 140 C ${seg.end+30} 140, ${seg.end+30} 50, ${seg.end} 50 Z`}
               fill="none" stroke="#063259" strokeDasharray="5 5" strokeWidth="1" />
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
                    stroke={isWarning ? "#ef4444" : "#00E5FF"}
                    strokeOpacity={isWarning ? "0.8" : "0.3"}
                    strokeWidth="1.5"
                    className={isWarning ? "animate-pulse" : ""}
                  />
                )}
                {/* Front Ring */}
                <ellipse 
                  cx={seg.start} cy="95" rx="15" ry="45" 
                  fill={isWarning || (i>0 && segments[i-1].warning) ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 229, 255, 0.1)"} 
                  stroke={isWarning || (i>0 && segments[i-1].warning) ? "#ef4444" : "#00E5FF"} 
                  strokeOpacity={isWarning || (i>0 && segments[i-1].warning) ? "1" : "0.5"}
                  strokeWidth="2" 
                  className={isWarning || (i>0 && segments[i-1].warning) ? "animate-pulse" : ""}
                />
                
                <text x={seg.start} y="165" fill="#00E5FF" opacity="0.6" fontSize="10" textAnchor="middle" className="tracking-widest">{seg.label}</text>
              </g>
            );
          })}
          
          {/* Base Grid Line */}
          <line x1="0" y1="150" x2="780" y2="150" stroke="#063259" strokeWidth="2" strokeDasharray="4 4" />
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
          <div className="text-[10px] text-cyan-400 font-bold font-mono tracking-widest mb-2 whitespace-nowrap transform -translate-x-1/2 text-center text-glow">
            {device.position}
          </div>
          
          {/* Icon marker cluster */}
          <div className="flex items-center gap-1.5 transform -translate-x-1/2">
             <div className="bg-[#051020] p-1 rounded-sm border border-cyan-900 shadow-[0_0_5px_rgba(0,229,255,0.2)]">
                <Disc className="w-3 h-3 text-cyan-500" />
             </div>
             {/* Main pointer with warning logic */}
             <div className={`relative p-1.5 rounded-full border shadow-lg ${device.hasWarning ? 'bg-red-950/90 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse' : 'bg-[#0a2a4f]/80 border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.4)]'} cursor-pointer hover:scale-110 transition-transform`}>
                <Video className={`w-4 h-4 ${device.hasWarning ? 'text-red-300' : 'text-cyan-100'}`} />
                {device.hasWarning && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
                  </span>
                )}
             </div>
             <div className="bg-[#051020] p-1 rounded-sm border border-cyan-900 shadow-[0_0_5px_rgba(0,229,255,0.2)]">
                <Activity className={`w-3 h-3 animate-pulse ${device.hasWarning ? 'text-red-500' : 'text-emerald-400'}`} />
             </div>
          </div>
        </div>
      ))}

      {/* Tooltip */}
      {hoveredDevice && (
        <div
          className="absolute pointer-events-none z-50 bg-[#020a16]/95 backdrop-blur-md border border-cyan-500/50 text-cyan-100 p-4 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.2)] text-xs cyber-panel font-mono"
          style={{
            left: `calc(50% - 400px + ${hoveredDevice.xOffset}px)`,
            top: '80px',
            transform: 'translateX(-50%)'
          }}
        >
          <div className="font-bold flex items-center justify-between min-w-[200px] mb-3 border-b border-cyan-800/80 pb-2">
            <span className="text-glow tracking-widest">{hoveredDevice.name}</span>
            <span className={hoveredDevice.status === 'online' ? 'text-cyan-400' : 'text-slate-500'}>
              {hoveredDevice.status === 'online' ? '在线' : '离线'}
            </span>
          </div>
          <div className="text-cyan-600 font-mono space-y-1 tracking-widest">
            <p>位置:   <span className="text-cyan-200">{hoveredDevice.position}</span></p>
            <p>范围: <span className="text-cyan-200">{hoveredDevice.range}</span></p>
            <p className="flex items-center gap-2 mt-3 text-[11px]">
              预警: <span className={hoveredDevice.hasWarning ? 'text-red-400 font-bold text-lg text-glow-red' : 'text-cyan-100 font-bold text-lg text-glow'}>{hoveredDevice.alarms}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

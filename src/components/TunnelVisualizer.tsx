import React, { useState, useMemo } from 'react';
import { Video, Disc, Activity } from 'lucide-react';

interface DeviceData {
  id: string;
  name: string;
  position: string;
  range: string;
  status: 'online' | 'offline';
  alarms: number;
  hasWarning: boolean;
  isDirty: boolean;
  xOffset: number;
}

interface TunnelVisualizerProps {
  onDeviceClick?: (deviceId: string, hasWarning: boolean) => void;
  isMaintenance?: boolean;
  isDirtAlarm?: boolean;
  fullScreen?: boolean;
}

export default function TunnelVisualizer({ onDeviceClick, isMaintenance = false, isDirtAlarm = false, fullScreen = false }: TunnelVisualizerProps = {}) {
  const [hoveredDevice, setHoveredDevice] = useState<DeviceData | null>(null);

  const numDevices = 23;
  const tunnelLength = 1700; // 1.7km
  const startKm = 200;
  const startM = 0;
  const totalSvgWidth = 2600;
  const marginX = 80;
  const useableWidth = totalSvgWidth - marginX * 2;

  const devices: DeviceData[] = useMemo(() => {
    return Array.from({ length: numDevices }, (_, i) => {
      const currentM = startM + Math.round((i / (numDevices - 1)) * tunnelLength);
      const mRemainder = currentM % 1000;
      const kmStr = `K${startKm + Math.floor(currentM / 1000)}`;
      const mStr = mRemainder.toString().padStart(3, '0');
      const pos = `${kmStr}+${mStr}`;
      
      const isWarning = i === 4 || i === 15 || i === 18; 
      const isDirty = isDirtAlarm && (i === 6 || i === 11 || i === 20);

      return {
        id: String(i + 1),
        name: `AI 设备 ${i + 1}`,
        position: pos,
        range: `${kmStr}+${(Math.max(0, mRemainder - 35)).toString().padStart(3, '0')} ~ ${kmStr}+${(mRemainder + 40).toString().padStart(3, '0')}`,
        status: i === 12 ? 'offline' : 'online',
        alarms: isWarning ? (i === 4 ? 32 : (i === 15 ? 12 : 5)) : 0,
        hasWarning: isWarning,
        isDirty: isDirty,
        xOffset: marginX + Math.round((i / (numDevices - 1)) * useableWidth)
      };
    });
  }, [isDirtAlarm]);

  return (
    <div className={`relative w-full ${fullScreen ? 'h-full' : 'h-[280px]'} flex flex-col font-mono overflow-hidden`}>
      {/* HUD Info Fixed */}
      <div className="absolute top-4 left-4 text-[11px] text-cyan-600 flex flex-col tracking-widest z-20 font-bold bg-[#02050c]/80 p-2 rounded-sm backdrop-blur-sm border border-cyan-900/30">
        <span>模式: <span className={isMaintenance ? "text-orange-400" : "text-cyan-300"}>{isMaintenance ? "施工维护" : "正常"}</span></span>
        <span>扫描: <span className="text-emerald-400">激活</span></span>
        <span className="text-glow animate-pulse">系统: 在线</span>
      </div>
      
      <div className="absolute top-4 right-6 text-[11px] text-cyan-600 flex flex-col items-end tracking-widest z-20 font-bold border-r-2 border-cyan-500/50 pr-3 bg-[#02050c]/80 p-2 rounded-sm backdrop-blur-sm shadow-[0_0_10px_rgba(0,0,0,0.5)]">
        <span>隧道全长 <span className="text-cyan-300 ml-2">1.7km</span></span>
        <span>监控节点 <span className="text-cyan-300 ml-2">23个</span></span>
      </div>

      {/* Scrollable Container */}
      <div className={`w-full flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar relative z-10 ${fullScreen ? 'flex items-center px-4' : 'px-4'}`}>
        <div className={`relative h-full w-full ${!fullScreen ? 'min-w-[2600px]' : ''}`} style={!fullScreen ? { width: totalSvgWidth } : {}}>
          
          {/* Grid Background */}
          <div 
            className="absolute inset-0 opacity-[0.2]"
            style={{ 
              backgroundImage: 'linear-gradient(to right, #00E5FF 1px, transparent 1px), linear-gradient(to bottom, #00E5FF 1px, transparent 1px)',
              backgroundSize: fullScreen ? '80px 80px' : '40px 40px'
            }}
          />
          {/* Scanning radar sweep */}
          <div className="absolute top-0 bottom-0 left-0 w-full bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent animate-[scan_6s_linear_infinite] pointer-events-none z-0 translate-x-[-100%]"></div>

          <svg className={`w-full ${fullScreen ? 'h-full max-h-[800px]' : 'h-[200px]'} absolute z-10 top-1/2 transform -translate-y-1/2`} viewBox={`0 0 ${totalSvgWidth} 200`} preserveAspectRatio="none">
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

            <g>
              {/* Back hidden lines for depth */}
              {devices.map((dev, i) => (
                 i < devices.length - 1 && (
                   <path key={`back-${i}`} d={`M ${dev.xOffset} 50 C ${dev.xOffset+30} 50, ${dev.xOffset+30} 140, ${dev.xOffset} 140 L ${devices[i+1].xOffset} 140 C ${devices[i+1].xOffset+30} 140, ${devices[i+1].xOffset+30} 50, ${devices[i+1].xOffset} 50 Z`}
                   fill="none" stroke="#063259" strokeDasharray="5 5" strokeWidth="1" />
                 )
              ))}

              {/* Tube fill and front edges */}
              {devices.map((dev, i) => {
                const isWarning = dev.hasWarning;
                const nextDev = devices[i + 1] || dev;
                
                return (
                  <g key={`front-${i}`}>
                    {i < devices.length - 1 && (
                      <path
                        d={`M ${dev.xOffset} 50 C ${dev.xOffset+30} 50, ${dev.xOffset+30} 140, ${dev.xOffset} 140 L ${nextDev.xOffset} 140 C ${nextDev.xOffset+30} 140, ${nextDev.xOffset+30} 50, ${nextDev.xOffset} 50 Z`}
                        fill={isWarning ? "url(#tunnelRedGrad)" : "url(#tunnelGrad)"}
                        stroke={isWarning ? "#ef4444" : "#00E5FF"}
                        strokeOpacity={isWarning ? "0.8" : "0.3"}
                        strokeWidth="1.5"
                        className={isWarning ? "animate-pulse" : ""}
                      />
                    )}
                    {/* Front Ring */}
                    <ellipse 
                      cx={dev.xOffset} cy="95" rx="15" ry="45" 
                      fill={isWarning || (i>0 && devices[i-1].hasWarning) ? "rgba(239, 68, 68, 0.15)" : "rgba(0, 229, 255, 0.1)"} 
                      stroke={isWarning || (i>0 && devices[i-1].hasWarning) ? "#ef4444" : "#00E5FF"} 
                      strokeOpacity={isWarning || (i>0 && devices[i-1].hasWarning) ? "1" : "0.5"}
                      strokeWidth="2" 
                      className={isWarning || (i>0 && devices[i-1].hasWarning) ? "animate-pulse" : ""}
                    />
                  </g>
                );
              })}
              
              {/* Base Grid Line */}
              <line x1="0" y1="150" x2={totalSvgWidth} y2="150" stroke="#063259" strokeWidth="2" strokeDasharray="4 4" />
              <line x1={marginX} y1="145" x2={marginX} y2="155" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
              <text x={marginX} y="175" fill="#00E5FF" opacity="0.8" fontSize="12" textAnchor="middle" className="font-bold tracking-widest">起点 0km (K200+000)</text>
              
              <line x1={devices[devices.length - 1].xOffset} y1="145" x2={devices[devices.length - 1].xOffset} y2="155" stroke="#00E5FF" strokeWidth="2" opacity="0.5" />
              <text x={devices[devices.length - 1].xOffset} y="175" fill="#00E5FF" opacity="0.8" fontSize="12" textAnchor="middle" className="font-bold tracking-widest">终点 1.7km (K201+700)</text>
            </g>
          </svg>

          {/* Device Markers */}
          {devices.map((device) => (
            <div
              key={device.id}
              className="absolute z-20 group"
              style={{ left: `${(device.xOffset / totalSvgWidth) * 100}%`, top: '50%', transform: `translateY(${fullScreen ? '45px' : '15px'})` }}
              onMouseEnter={() => setHoveredDevice(device)}
              onMouseLeave={() => setHoveredDevice(null)}
            >
              {/* Position Tag - Only show on hover or for warnings */}
              <div className={`absolute bottom-full left-1/2 transform -translate-x-1/2 mb-4 text-[10px] ${device.hasWarning ? 'text-red-400 opacity-100 flex text-glow-red' : device.isDirty ? 'text-yellow-400 opacity-100 flex' : 'text-cyan-400 opacity-0 group-hover:opacity-100'} font-bold font-mono tracking-widest whitespace-nowrap text-center transition-all duration-300 pointer-events-none`} style={device.isDirty ? { textShadow: '0 0 10px rgba(234,179,8,0.8)' } : {}}>
                {device.position}
                {/* Arrow down */}
                <div className={`absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-[4px] border-l-transparent border-r-[4px] border-r-transparent border-t-[4px] ${device.hasWarning ? 'border-t-red-400' : device.isDirty ? 'border-t-yellow-400' : 'border-t-cyan-400'}`}></div>
              </div>
              
              {/* Icon marker cluster */}
              <div className="flex items-center gap-1.5 transform -translate-x-1/2">
                 <div className="bg-[#051020] p-1 rounded-sm border border-cyan-900 shadow-[0_0_5px_rgba(0,229,255,0.2)] scale-75">
                    <Disc className="w-3 h-3 text-cyan-500" />
                 </div>
                 {/* Main pointer */}
                 <div 
                   className={`relative p-1.5 rounded-full border shadow-lg ${device.hasWarning ? 'bg-red-950/90 border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] animate-pulse scale-110' : device.isDirty ? 'bg-yellow-950/90 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.6)] animate-pulse scale-110' : 'bg-[#0a2a4f]/80 border-cyan-400 shadow-[0_0_10px_rgba(0,229,255,0.4)] hover:shadow-[0_0_15px_rgba(0,229,255,0.8)]'} cursor-pointer hover:scale-125 transition-all duration-300 z-10`}
                   onClick={() => onDeviceClick && onDeviceClick(device.id, device.hasWarning)}
                 >
                    <Video className={`w-3 h-3 ${device.hasWarning ? 'text-red-300' : device.isDirty ? 'text-yellow-300' : 'text-cyan-100'}`} />
                    {device.hasWarning && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,1)]"></span>
                      </span>
                    )}
                    {device.isDirty && !device.hasWarning && (
                      <span className="absolute -top-1 -right-1 flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-yellow-500 shadow-[0_0_8px_rgba(234,179,8,1)]"></span>
                      </span>
                    )}
                 </div>
                 <div className="bg-[#051020] p-1 rounded-sm border border-cyan-900 shadow-[0_0_5px_rgba(0,229,255,0.2)] scale-75">
                    <Activity className={`w-3 h-3 ${device.status === 'online' ? 'text-emerald-400' : 'text-slate-600'} ${device.hasWarning ? 'animate-pulse text-red-500' : ''}`} />
                 </div>
              </div>
            </div>
          ))}

          {/* Tooltip */}
          {hoveredDevice && (
            <div
              className="absolute z-[60] w-max bg-[#020a16]/95 backdrop-blur-md border border-cyan-500/50 text-cyan-100 p-3 rounded-sm shadow-[0_0_30px_rgba(0,229,255,0.4)] text-[11px] cyber-panel font-mono pointer-events-none transition-all duration-75 ease-linear"
              style={{
                left: `${(hoveredDevice.xOffset / totalSvgWidth) * 100}%`,
                top: '40px',
                transform: 'translateX(-50%)'
              }}
            >
              <div className="font-bold flex items-center justify-between min-w-[160px] mb-2 border-b border-cyan-800/80 pb-2">
                <span className="text-glow tracking-widest">{hoveredDevice.name} <span className="text-[10px] text-cyan-500 font-normal ml-1">({hoveredDevice.id})</span></span>
                <span className={hoveredDevice.status === 'online' ? 'text-cyan-400 text-[10px]' : 'text-slate-500 text-[10px]'}>
                  {hoveredDevice.status === 'online' ? '在线' : '离线'}
                </span>
              </div>
              <div className="text-cyan-600 font-mono space-y-1 tracking-wider text-[10px]">
                <p>位置: <span className="text-cyan-200">{hoveredDevice.position}</span></p>
                <p>范围: <span className="text-cyan-200">{hoveredDevice.range}</span></p>
                <p className="flex items-center gap-2 mt-2">
                  预警: <span className={hoveredDevice.hasWarning ? 'text-red-400 font-bold text-sm text-glow-red' : 'text-cyan-100 font-bold text-sm text-glow'}>{hoveredDevice.alarms}</span>
                </p>
                {hoveredDevice.isDirty && (
                  <div className="mt-2 text-[10px] text-yellow-300 bg-yellow-900/40 border border-yellow-700/50 p-1 rounded-sm flex items-center justify-center font-bold tracking-widest animate-pulse shadow-[0_0_10px_rgba(234,179,8,0.2)]">
                    ⚠️ 需脏污清洁
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="w-screen h-screen bg-[#020617] overflow-hidden relative">
      {/* Background Image / Blend */}
      <div className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-luminosity" 
           style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000")' }}>
      </div>
      {/* Vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#01040a] via-transparent to-[#01040a] pointer-events-none" />
      {/* Scanlines overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none z-10" />
      <Dashboard onClose={() => alert("Close Modal - Navigating out")} />
    </div>
  );
}

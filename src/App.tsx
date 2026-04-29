/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <div className="w-screen h-screen bg-gray-900 bg-cover bg-center overflow-hidden" 
         style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?auto=format&fit=crop&q=80&w=2000")' }}>
      {/* 
        This wrapper mimics the dark environment in which the platform normally exists.
        The dashboard is actually a modal/overlay in the original prototype.
      */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm pointer-events-none" />
      <Dashboard onClose={() => alert("Close Modal - Navigating out")} />
    </div>
  );
}

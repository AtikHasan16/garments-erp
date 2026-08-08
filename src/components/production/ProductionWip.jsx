'use client';

import React, { useState } from 'react';
import { 
  Factory, 
  AlertTriangle, 
  SlidersHorizontal
} from 'lucide-react';

export const ProductionWip = ({ lines }) => {
  const [floorFilter, setFloorFilter] = useState('All');

  const filteredLines = lines.filter((line) => {
    return floorFilter === 'All' || line.floor === floorFilter;
  });

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-950 tracking-tight flex items-center gap-2">
            <Factory className="w-5 h-5 text-emerald-600" />
            Production Floor WIP & Line Efficiency
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">Real-time cutting, sewing line hourly output, operator density, and bottleneck diagnostics</p>
        </div>

        {/* Floor Filter */}
        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-700 bg-white border border-stone-200 p-2 rounded-xl shadow-sm">
          <SlidersHorizontal className="w-4 h-4 text-amber-600" />
          <span>FLOOR FILTER:</span>
          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="bg-stone-100 text-stone-900 font-extrabold text-xs rounded-lg px-2.5 py-1 border border-stone-200 focus:outline-none"
          >
            <option value="All">All Factory Floors</option>
            <option value="Floor A">Floor A (Denim & Outerwear)</option>
            <option value="Floor B">Floor B (Knit & Polo Tops)</option>
          </select>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">RUNNING LINES</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">5 <span className="text-sm font-bold text-stone-500">Active</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Floors A & B Operating</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">DAILY OUTPUT</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">2,045 <span className="text-sm font-bold text-stone-500">Pcs</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Target: 2,330 Pcs</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">LINE EFFICIENCY</span>
          <h3 className="text-3xl font-extrabold text-emerald-700 tracking-tight mt-2">89.4%</h3>
          <p className="text-xs text-emerald-800 mt-1 font-semibold">Sewing Lines Overall</p>
        </div>

        <div className="p-5 rounded-2xl bg-black text-white shadow-md flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-300 uppercase tracking-wider">BOTTLENECK ALERTS</span>
          <h3 className="text-3xl font-extrabold text-amber-400 tracking-tight mt-2">1 <span className="text-sm font-bold text-stone-300">Line Action</span></h3>
          <p className="text-xs text-stone-400 mt-1 font-semibold">Line 02 Thread Tension</p>
        </div>
      </div>

      {/* Production Lines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLines.map((line) => (
          <div key={line.id} className="bg-white rounded-2xl border border-stone-200 p-6 space-y-5 shadow-sm">
            {/* Line Title & Status */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-stone-950">{line.lineName}</h3>
                  <span className="text-[10px] font-bold text-amber-900 bg-amber-500/15 px-2 py-0.5 rounded border border-amber-500/30">
                    {line.floor}
                  </span>
                </div>
                <p className="text-xs text-stone-500 mt-0.5">
                  Supervisor: <span className="text-stone-900 font-bold">{line.supervisor}</span> &bull; Style: <span className="text-amber-700 font-mono font-bold">{line.assignedStyle}</span> ({line.buyer})
                </p>
              </div>

              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                line.status === 'Bottleneck' 
                  ? 'bg-red-100 text-red-800 border-red-300 animate-pulse' 
                  : 'bg-emerald-50 text-emerald-800 border-emerald-300'
              }`}>
                {line.status}
              </span>
            </div>

            {/* Line Efficiency Meter */}
            <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-stone-600">Daily Target vs Actual Output</span>
                <span className="font-extrabold text-stone-950 font-mono">
                  {line.actualOutput} / {line.targetOutput} pcs ({line.efficiencyPercent}%)
                </span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    line.efficiencyPercent >= 90 
                      ? 'bg-emerald-500' 
                      : line.efficiencyPercent >= 80 
                      ? 'bg-amber-500' 
                      : 'bg-red-500'
                  }`}
                  style={{ width: `${Math.min(line.efficiencyPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Hourly Sparkline Trend */}
            <div className="space-y-2">
              <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider block">
                Hourly Output Trend (pcs/hr)
              </span>
              <div className="flex items-end gap-1.5 h-16 bg-stone-50 p-2.5 rounded-xl border border-stone-200">
                {line.hourlyOutput.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div 
                      className={`w-full rounded-xs transition-all ${
                        line.status === 'Bottleneck' ? 'bg-[#b45309]' : 'bg-black'
                      }`}
                      style={{ height: `${(val / 90) * 100}%` }}
                    />
                    <span className="text-[9px] text-stone-500 font-mono font-bold">H{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottleneck Warning Callout */}
            {line.status === 'Bottleneck' && line.bottleneckReason && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-extrabold text-red-950 uppercase tracking-wider text-[10px] block">Bottleneck Diagnostic:</span>
                  <span>{line.bottleneckReason}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

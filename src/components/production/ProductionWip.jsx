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
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Factory className="w-5 h-5 text-emerald-400" />
            Production Floor WIP & Line Efficiency
          </h2>
          <p className="text-xs text-slate-400">Real-time cutting, sewing line hourly output, operator density, and bottleneck diagnostics</p>
        </div>

        {/* Floor Filter */}
        <div className="flex items-center gap-1.5 text-xs text-stone-300 bg-stone-900 border border-stone-800 p-2 rounded-xl">
          <SlidersHorizontal className="w-4 h-4 text-amber-500" />
          <span>Floor Filter:</span>
          <select
            value={floorFilter}
            onChange={(e) => setFloorFilter(e.target.value)}
            className="bg-stone-950 text-white font-bold text-xs rounded-lg px-2.5 py-1 border border-stone-800 focus:outline-none"
          >
            <option value="All">All Factory Floors</option>
            <option value="Floor A">Floor A (Denim & Outerwear)</option>
            <option value="Floor B">Floor B (Knit & Polo Tops)</option>
          </select>
        </div>
      </div>

      {/* Production Lines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLines.map((line) => (
          <div key={line.id} className="bg-stone-900 rounded-2xl border border-stone-800 p-6 space-y-5 shadow-xl">
            {/* Line Title & Status */}
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-extrabold text-white">{line.lineName}</h3>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {line.floor}
                  </span>
                </div>
                <p className="text-xs text-stone-400 mt-0.5">
                  Supervisor: <span className="text-stone-200 font-semibold">{line.supervisor}</span> &bull; Style: <span className="text-amber-400 font-mono font-bold">{line.assignedStyle}</span> ({line.buyer})
                </p>
              </div>

              <span className={`text-[10px] font-bold uppercase px-3 py-1 rounded-full border ${
                line.status === 'Bottleneck' 
                  ? 'bg-rose-500/10 text-rose-400 border-rose-500/30 animate-pulse' 
                  : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
              }`}>
                {line.status}
              </span>
            </div>

            {/* Line Efficiency Meter */}
            <div className="bg-stone-950 p-4 rounded-xl border border-stone-800/80 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-stone-400">Daily Target vs Actual Output</span>
                <span className="font-extrabold text-white font-mono">
                  {line.actualOutput} / {line.targetOutput} pcs ({line.efficiencyPercent}%)
                </span>
              </div>
              <div className="w-full bg-stone-800 h-2.5 rounded-full overflow-hidden">
                <div 
                  className={`h-full rounded-full transition-all duration-500 ${
                    line.efficiencyPercent >= 90 
                      ? 'bg-emerald-500' 
                      : line.efficiencyPercent >= 80 
                      ? 'bg-amber-500' 
                      : 'bg-rose-500'
                  }`}
                  style={{ width: `${Math.min(line.efficiencyPercent, 100)}%` }}
                />
              </div>
            </div>

            {/* Hourly Sparkline Trend */}
            <div className="space-y-2">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                Hourly Output Trend (pcs/hr)
              </span>
              <div className="flex items-end gap-1.5 h-16 bg-stone-950/60 p-2.5 rounded-xl border border-stone-800/60">
                {line.hourlyOutput.map((val, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
                    <div 
                      className={`w-full rounded-xs transition-all ${
                        line.status === 'Bottleneck' ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ height: `${(val / 90) * 100}%` }}
                    />
                    <span className="text-[9px] text-stone-500 font-mono">H{i+1}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottleneck Warning Callout */}
            {line.status === 'Bottleneck' && line.bottleneckReason && (
              <div className="p-3.5 rounded-xl bg-rose-950/30 border border-rose-500/30 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-rose-200 uppercase tracking-wider text-[10px] block">Bottleneck Diagnostic:</span>
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

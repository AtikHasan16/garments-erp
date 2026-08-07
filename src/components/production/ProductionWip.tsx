'use client';

import React, { useState } from 'react';
import { 
  Factory, 
  AlertOctagon
} from 'lucide-react';
import { ProductionLine, GarmentOrder } from '../../types/erp';

interface ProductionWipProps {
  lines: ProductionLine[];
  orders?: GarmentOrder[];
}

export const ProductionWip: React.FC<ProductionWipProps> = ({ lines }) => {
  const [selectedFloorFilter, setSelectedFloorFilter] = useState<string>('All');

  const floors = ['All', 'Floor A', 'Floor B', 'Floor C'];

  const filteredLines = lines.filter(line => 
    selectedFloorFilter === 'All' || line.floor === selectedFloorFilter
  );

  const avgEfficiency = Math.round(lines.reduce((acc, l) => acc + l.efficiencyPercent, 0) / lines.length);
  const totalWorkers = lines.reduce((acc, l) => acc + l.activeWorkers, 0);
  const bottleneckLinesCount = lines.filter(l => l.status === 'Bottleneck').length;

  return (
    <div className="space-y-6">
      {/* Module Title & Floor Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-6 rounded-2xl text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Factory className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold tracking-tight">Production WIP & Floor Line Monitoring</h2>
            <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase animate-pulse">
              IoT Sensor Active
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Granular visibility across Cutting, Sewing, and Finishing assembly lines with bottleneck detection.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-stone-800/80 rounded-xl border border-stone-700 text-right">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Avg Line Efficiency</span>
            <span className="text-lg font-extrabold text-emerald-400">{avgEfficiency}%</span>
          </div>
          <div className="px-4 py-2 bg-stone-800/80 rounded-xl border border-stone-700 text-right">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Floor Operators</span>
            <span className="text-lg font-extrabold text-stone-100">{totalWorkers} Workers</span>
          </div>
        </div>
      </div>

      {/* Bottleneck Alert Banner if bottleneck lines exist */}
      {bottleneckLinesCount > 0 && (
        <div className="bg-rose-500/10 border border-rose-500/30 rounded-xl p-4 flex items-center justify-between text-rose-800 dark:text-rose-200">
          <div className="flex items-center gap-3">
            <AlertOctagon className="w-5 h-5 text-rose-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Line Bottleneck Alert:</span> {bottleneckLinesCount} sewing line(s) currently reporting operator delay or material shortage (Line 02 & Line 05).
            </div>
          </div>
          <button className="bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
            View Bottleneck Diagnostics
          </button>
        </div>
      )}

      {/* Floor Selector Filter */}
      <div className="flex items-center justify-between bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">
            Factory Floor:
          </span>
          <div className="flex items-center gap-1">
            {floors.map(floor => (
              <button
                key={floor}
                onClick={() => setSelectedFloorFilter(floor)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  selectedFloorFilter === floor
                    ? 'bg-amber-700 text-white shadow-sm'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
                }`}
              >
                {floor}
              </button>
            ))}
          </div>
        </div>

        <div className="text-xs font-medium text-stone-500">
          Showing {filteredLines.length} Assembly Lines
        </div>
      </div>

      {/* Production Lines Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredLines.map((line) => {
          const isBottleneck = line.status === 'Bottleneck';
          const targetAchievedPercent = Math.round((line.actualOutput / line.targetOutput) * 100);

          return (
            <div 
              key={line.id}
              className={`bg-white dark:bg-stone-900 border rounded-2xl p-6 shadow-sm space-y-4 transition-all ${
                isBottleneck 
                  ? 'border-rose-500/60 ring-1 ring-rose-500/30' 
                  : 'border-stone-200 dark:border-stone-800 hover:border-amber-500/40'
              }`}
            >
              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-stone-900 dark:text-white">
                      {line.lineName}
                    </h3>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700">
                      {line.floor}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-0.5">Supervisor: {line.supervisor}</p>
                </div>

                <span className={`text-[10px] font-extrabold uppercase px-2.5 py-1 rounded-full border ${
                  line.status === 'Running'
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                    : isBottleneck
                    ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30 animate-pulse'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                }`}>
                  {line.status}
                </span>
              </div>

              {/* Assigned Style & Buyer */}
              <div className="bg-stone-50 dark:bg-stone-800/60 p-3 rounded-xl border border-stone-200/80 dark:border-stone-700/80 flex items-center justify-between text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Current Style</span>
                  <span className="font-bold text-stone-800 dark:text-stone-200">{line.assignedStyle}</span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-stone-400 block">Buyer</span>
                  <span className="font-semibold text-stone-700 dark:text-stone-300">{line.buyer}</span>
                </div>
              </div>

              {/* Metrics Grid */}
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-stone-100/70 dark:bg-stone-800/40 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 font-semibold uppercase block">Hourly Target</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-white">{line.targetOutput} pcs</span>
                </div>

                <div className="bg-stone-100/70 dark:bg-stone-800/40 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 font-semibold uppercase block">Actual Output</span>
                  <span className="text-sm font-extrabold text-stone-900 dark:text-white">{line.actualOutput} pcs</span>
                </div>

                <div className="bg-stone-100/70 dark:bg-stone-800/40 p-2.5 rounded-xl border border-stone-200/60 dark:border-stone-800">
                  <span className="text-[10px] text-stone-500 font-semibold uppercase block">Line Efficiency</span>
                  <span className={`text-sm font-extrabold ${line.efficiencyPercent >= 85 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'}`}>
                    {line.efficiencyPercent}%
                  </span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-semibold text-stone-600 dark:text-stone-400">
                  <span>Shift Target Progress</span>
                  <span>{targetAchievedPercent}%</span>
                </div>
                <div className="w-full bg-stone-200 dark:bg-stone-800 h-2.5 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-500 ${
                      line.efficiencyPercent >= 85
                        ? 'bg-emerald-500'
                        : isBottleneck
                        ? 'bg-rose-500'
                        : 'bg-amber-500'
                    }`}
                    style={{ width: `${Math.min(targetAchievedPercent, 100)}%` }}
                  />
                </div>
              </div>

              {/* Hourly Output Sparkline Bar Chart */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block mb-1">
                  Hourly Shift Trend (8 AM - 4 PM)
                </span>
                <div className="flex items-end gap-1.5 h-12 pt-1">
                  {line.hourlyOutput.map((val, idx) => {
                    const maxVal = Math.max(...line.hourlyOutput, line.targetOutput);
                    const heightPct = Math.round((val / maxVal) * 100);
                    return (
                      <div key={idx} className="w-full flex flex-col items-center gap-1 group relative">
                        <div 
                          className={`w-full rounded-xs transition-all ${
                            val >= line.targetOutput ? 'bg-amber-600' : 'bg-stone-400 dark:bg-stone-600'
                          }`}
                          style={{ height: `${heightPct}%` }}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
};

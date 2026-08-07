'use client';

import React from 'react';
import { GarmentOrder, ProductionLine, InventoryItem, QualityAudit } from '../../types/erp';
import { 
  DollarSign, 
  ShoppingBag, 
  Factory, 
  ShieldAlert, 
  TrendingUp, 
  Clock, 
  ArrowUpRight,
  AlertTriangle,
  CheckCircle2
} from 'lucide-react';

interface OverviewDashboardProps {
  orders: GarmentOrder[];
  lines: ProductionLine[];
  inventory: InventoryItem[];
  audits?: QualityAudit[];
  qualityAudits?: QualityAudit[];
  onSelectOrder?: (order: GarmentOrder) => void;
  onNavigateToTab?: (tab: 'orders' | 'production' | 'inventory' | 'quality') => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  orders,
  lines,
  inventory,
  audits = [],
  qualityAudits = audits,
  onSelectOrder,
  onNavigateToTab,
}) => {
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);
  const totalQty = orders.reduce((sum, o) => sum + o.orderQty, 0);
  const lowStockCount = inventory.filter((i) => i.status === 'Low Stock' || i.status === 'Critical').length;
  const avgEfficiency = Math.round(
    lines.reduce((sum, l) => sum + l.efficiencyPercent, 0) / (lines.length || 1)
  );

  const bottleneckLine = lines.find((l) => l.status === 'Bottleneck');

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner Alert if Bottleneck exists */}
      {bottleneckLine && (
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-semibold text-amber-200">
                Floor Bottleneck Alert: {bottleneckLine.lineName}
              </h4>
              <p className="text-xs text-amber-300/80">
                Efficiency down to {bottleneckLine.efficiencyPercent}% on style {bottleneckLine.assignedStyle} ({bottleneckLine.buyer}). Sewing supervisor notified.
              </p>
            </div>
          </div>
          <button
            onClick={() => onNavigateToTab?.('production')}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 transition-colors"
          >
            Inspect Floor Line &rarr;
          </button>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {/* Card 1: FOB Value */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-2xl group-hover:bg-indigo-500/10 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Active FOB Order Book</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">
            ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </div>
          <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs last month</span>
          </div>
        </div>

        {/* Card 2: Total Garment Volume */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full blur-2xl group-hover:bg-violet-500/10 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Total Order Volume</span>
            <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
              <ShoppingBag className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">
            {totalQty.toLocaleString()} <span className="text-sm text-slate-400 font-normal">Pcs</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-2 font-medium">
            <span>{orders.length} Active Buyer POs</span>
          </div>
        </div>

        {/* Card 3: Sewing Floor Efficiency */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl group-hover:bg-emerald-500/10 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Average Floor Efficiency</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Factory className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">
            {avgEfficiency}%
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full" 
              style={{ width: `${avgEfficiency}%` }}
            />
          </div>
        </div>

        {/* Card 4: Inventory & Critical Trims */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl relative overflow-hidden group hover:border-slate-700 transition-all">
          <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-2xl group-hover:bg-amber-500/10 transition-all" />
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-medium text-slate-400">Low Fabric / Trims Alert</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-slate-100 tracking-tight">
            {lowStockCount} <span className="text-sm text-slate-400 font-normal">Items Low</span>
          </div>
          <button
            onClick={() => onNavigateToTab?.('inventory')}
            className="flex items-center gap-1 text-xs text-amber-400 hover:text-amber-300 mt-2 font-medium transition-colors"
          >
            <span>Review Reorder List</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Grid Section: Live Production Floor Status & Recent Active Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2/3): Live Floor Production Line Matrix */}
        <div className="lg:col-span-2 p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                  <Factory className="w-4 h-4 text-indigo-400" />
                  Live Sewing Floor Lines (Today Output)
                </h3>
                <p className="text-xs text-slate-400">Hourly target vs actual pieces sewn across active lines</p>
              </div>
              <button 
                onClick={() => onNavigateToTab?.('production')}
                className="text-xs text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-1"
              >
                <span>View All Lines</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Production Lines Progress List */}
            <div className="space-y-4">
              {lines.map((line) => {
                const percent = Math.min(100, Math.round((line.actualOutput / line.targetOutput) * 100));
                return (
                  <div 
                    key={line.id} 
                    className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-slate-700 transition-all"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className={`w-2.5 h-2.5 rounded-full ${
                          line.status === 'Running' 
                            ? 'bg-emerald-400 shadow-sm shadow-emerald-500/50' 
                            : line.status === 'Bottleneck' 
                            ? 'bg-amber-400 animate-ping' 
                            : 'bg-slate-500'
                        }`} />
                        <div>
                          <h4 className="text-sm font-semibold text-slate-200">{line.lineName}</h4>
                          <p className="text-xs text-slate-400">
                            Buyer: <span className="text-slate-300 font-medium">{line.buyer}</span> &bull; Style: <span className="text-indigo-400">{line.assignedStyle}</span>
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-100">
                          {line.actualOutput} / <span className="text-slate-400 text-xs">{line.targetOutput} pcs</span>
                        </div>
                        <div className="text-xs text-emerald-400 font-medium">
                          {line.efficiencyPercent}% Efficiency
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full bg-slate-800/80 h-2 rounded-full overflow-hidden">
                      <div 
                        className={`h-full rounded-full transition-all duration-500 ${
                          line.status === 'Bottleneck' 
                            ? 'bg-linear-to-r from-amber-500 to-red-500' 
                            : 'bg-linear-to-r from-indigo-500 to-emerald-400'
                        }`}
                        style={{ width: `${percent}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column (1/3): Quality Audit (DHU) & Quick Milestones */}
        <div className="space-y-6">
          {/* Quality Audit Card */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                Quality & DHU Score
              </h3>
              <span className="text-xs font-semibold px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                AQL 2.5 Standard
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80 mb-4">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>Avg Factory Defect Rate (DHU)</span>
                <span className="text-emerald-400 font-bold">2.4% (Pass)</span>
              </div>
              <p className="text-[11px] text-slate-400">
                Target is &lt; 3.0%. 300 pieces checked today across cutting and end-of-line sewing.
              </p>
            </div>

            {/* Audit Logs */}
            <div className="space-y-3">
              {qualityAudits.slice(0, 2).map((audit) => (
                <div key={audit.id} className="p-3 rounded-lg bg-slate-950/40 border border-slate-800/60 text-xs">
                  <div className="flex justify-between font-semibold text-slate-300">
                    <span>{audit.lineName}</span>
                    <span className={audit.status.includes('Passed') ? 'text-emerald-400' : 'text-amber-400'}>
                      {audit.status}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400 mt-1">
                    <span>Checked: {audit.checkedQty} pcs</span>
                    <span>DHU: {audit.dhuRate}%</span>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => onNavigateToTab?.('quality')}
              className="w-full mt-4 py-2 text-xs font-semibold rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-center"
            >
              Open Full Quality Dashboard
            </button>
          </div>

          {/* Quick Shipments Widget */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800/80 shadow-xl">
            <h3 className="text-base font-bold text-slate-100 flex items-center gap-2 mb-4">
              <Clock className="w-4 h-4 text-purple-400" />
              Upcoming Expedited Shipments
            </h3>

            <div className="space-y-3">
              {orders.slice(0, 3).map((ord) => (
                <div 
                  key={ord.id}
                  onClick={() => onSelectOrder?.(ord)}
                  className="p-3 rounded-xl bg-slate-950/60 border border-slate-800/80 hover:border-indigo-500/50 cursor-pointer transition-all flex items-center justify-between"
                >
                  <div>
                    <h4 className="text-xs font-semibold text-slate-200">{ord.styleName}</h4>
                    <p className="text-[11px] text-slate-400">{ord.buyer} &bull; {ord.orderQty.toLocaleString()} pcs</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                      {ord.shipmentDate}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

'use client';

import React from 'react';
import { 
  ShoppingBag, 
  Package, 
  Factory, 
  Truck, 
  Plus, 
  AlertTriangle, 
  TrendingUp, 
  Layers
} from 'lucide-react';

export const OverviewDashboard = ({
  orders,
  lines,
  inventory,
  onNavigateToTab,
  onOpenNewOrderModal,
}) => {
  const totalPcs = orders.reduce((sum, o) => sum + o.orderQty, 0);
  const totalValue = orders.reduce((sum, o) => sum + o.totalValue, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'Shipped').length;

  const lowStockItems = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical');
  const bottleneckLines = lines.filter(l => l.status === 'Bottleneck');

  const totalTargetOutput = lines.reduce((sum, l) => sum + l.targetOutput, 0);
  const totalActualOutput = lines.reduce((sum, l) => sum + l.actualOutput, 0);
  const overallEfficiency = totalTargetOutput > 0 ? ((totalActualOutput / totalTargetOutput) * 100).toFixed(1) : '0.0';

  const getStatusBadge = (status) => {
    switch (status) {
      case 'PP Approved':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/30';
      case 'In Cutting':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/30';
      case 'In Sewing':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30';
      case 'Finishing':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Shipped':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-[#292524] text-stone-400 border-stone-800';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner / Header Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-500 font-bold uppercase tracking-widest mb-1">
            <Layers className="w-4 h-4" />
            <span>GarmentsOS Dashboard</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            Factory Production & Merchandise Overview
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigateToTab('orders')}
            className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-4 py-2.5 rounded-xl border border-stone-700 transition-colors cursor-pointer"
          >
            Manage Styles & POs
          </button>
          <button
            onClick={onOpenNewOrderModal}
            className="bg-[#b45309] hover:bg-[#92400e] text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>New Purchase Order</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Orders */}
        <div 
          onClick={() => onNavigateToTab('orders')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              ORDER SUMMARY
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 group-hover:scale-110 transition-transform">
              <ShoppingBag className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-mono">
              {activeOrdersCount} <span className="text-xs font-normal text-stone-400">Active POs</span>
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              {totalPcs.toLocaleString()} Pcs &bull; ${totalValue.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Card 2: Inventory */}
        <div 
          onClick={() => onNavigateToTab('inventory')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-rose-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              INVENTORY SUMMARY
            </span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-400 group-hover:scale-110 transition-transform">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-mono flex items-center gap-2">
              <span>{lowStockItems.length}</span>
              <span className="text-xs font-normal text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded-full border border-rose-500/30">
                Low Alerts
              </span>
            </h3>
            <p className="text-xs text-stone-400">
              Fabric rolls, yarn & trims in-house
            </p>
          </div>
        </div>

        {/* Card 3: Production WIP Efficiency */}
        <div 
          onClick={() => onNavigateToTab('production')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-emerald-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              PRODUCTION SUMMARY
            </span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
              <Factory className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-mono">
              {overallEfficiency}% <span className="text-xs font-normal text-emerald-400">Efficiency</span>
            </h3>
            <p className="text-xs text-stone-400 font-mono">
              {totalActualOutput.toLocaleString()} / {totalTargetOutput.toLocaleString()} Pcs today
            </p>
          </div>
        </div>

        {/* Card 4: Delivery Challans */}
        <div 
          onClick={() => onNavigateToTab('logistics')}
          className="p-5 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/50 transition-all cursor-pointer group shadow-lg"
        >
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
              DELIVERY SUMMARY
            </span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
              <Truck className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-extrabold text-white font-mono">
              3 <span className="text-xs font-normal text-stone-400">Active Gate Passes</span>
            </h3>
            <p className="text-xs text-stone-400">
              23,400 Pcs dispatched this week
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Active Buyer Orders Table & Line Efficiency Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Buyer Orders Table (Span 8) */}
        <div className="lg:col-span-8 bg-stone-900 rounded-2xl border border-stone-800 p-5 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-500" />
                Active Buyer Purchase Orders
              </h3>
              <p className="text-xs text-stone-400">Order fulfillment and sewing line progress</p>
            </div>
            <button 
              onClick={() => onNavigateToTab('orders')}
              className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
            >
              View All POs &rarr;
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-stone-300">
              <thead className="bg-stone-950 text-stone-400 uppercase font-semibold text-[10px] border-b border-stone-800">
                <tr>
                  <th className="py-3 px-3">Style & PO</th>
                  <th className="py-3 px-3">Buyer</th>
                  <th className="py-3 px-3">Order Qty</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-3">Sewing %</th>
                  <th className="py-3 px-3 text-right">Ship Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-800/80 font-medium">
                {orders.slice(0, 5).map((o) => (
                  <tr key={o.id} className="hover:bg-stone-800/40 transition-colors">
                    <td className="py-3 px-3 font-semibold text-white">
                      <div>{o.styleName}</div>
                      <div className="text-[10px] text-amber-400 font-mono">{o.poNumber} &bull; {o.styleCode}</div>
                    </td>
                    <td className="py-3 px-3 text-stone-300">{o.buyer}</td>
                    <td className="py-3 px-3 font-mono font-bold text-white">{o.orderQty.toLocaleString()} Pcs</td>
                    <td className="py-3 px-3">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${getStatusBadge(o.status)}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 w-32">
                      <div className="flex justify-between text-[10px] text-stone-400 mb-1">
                        <span>{o.sewingProgress}%</span>
                      </div>
                      <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className="bg-amber-600 h-full rounded-full" 
                          style={{ width: `${o.sewingProgress}%` }}
                        />
                      </div>
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-stone-300">{o.shipmentDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Factory Line Output & Bottlenecks (Span 4) */}
        <div className="lg:col-span-4 space-y-6">
          {/* Bottleneck Alert Callout if any line has issues */}
          {bottleneckLines.length > 0 && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-500/40 text-amber-200 space-y-2 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-amber-500 animate-pulse" />
                <span>Line Bottleneck Alert</span>
              </div>
              {bottleneckLines.map((line) => (
                <div key={line.id} className="text-xs space-y-1 bg-stone-950/60 p-3 rounded-xl border border-amber-500/20">
                  <div className="flex justify-between font-bold text-white">
                    <span>{line.lineName}</span>
                    <span className="text-amber-400 font-mono">{line.efficiencyPercent}% Eff</span>
                  </div>
                  <p className="text-[11px] text-stone-300">{line.bottleneckReason}</p>
                </div>
              ))}
            </div>
          )}

          {/* Line Efficiency Status */}
          <div className="bg-stone-900 rounded-2xl border border-stone-800 p-5 space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                Daily Line Output vs Target
              </h3>
              <button 
                onClick={() => onNavigateToTab('production')}
                className="text-xs font-bold text-amber-500 hover:underline cursor-pointer"
              >
                Line WIP &rarr;
              </button>
            </div>

            <div className="space-y-3">
              {lines.map((line) => (
                <div key={line.id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between text-stone-300 font-medium">
                    <span>{line.lineName}</span>
                    <span className="font-bold font-mono text-white">
                      {line.actualOutput} / {line.targetOutput} pcs ({line.efficiencyPercent}%)
                    </span>
                  </div>
                  <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all ${
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

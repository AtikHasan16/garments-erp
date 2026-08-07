'use client';

import React, { useState } from 'react';
import { GarmentOrder, ProductionLine, InventoryItem, QualityAudit } from '../../types/erp';
import { 
  FileText, 
  Package, 
  Cpu, 
  Truck, 
  MoreVertical, 
  Search, 
  Bell, 
  ChevronRight,
  Plus
} from 'lucide-react';

interface OverviewDashboardProps {
  orders: GarmentOrder[];
  lines: ProductionLine[];
  inventory: InventoryItem[];
  audits?: QualityAudit[];
  qualityAudits?: QualityAudit[];
  onSelectOrder?: (order: GarmentOrder) => void;
  onNavigateToTab?: (tab: 'orders' | 'production' | 'inventory' | 'quality' | 'logistics') => void;
  onOpenNewOrderModal?: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigateToTab,
  onOpenNewOrderModal,
}) => {
  const [dashboardSearch, setDashboardSearch] = useState('');

  // Sample data matching exact values in user's design image
  const activeBuyerOrders = [
    { styleCode: 'GOS-102', buyerName: 'Global Denim Co.', quantity: '5,000', deliveryDate: '2026-11-20', progress: 65, status: 'Sewing', statusBg: 'bg-amber-100 text-amber-800 border-amber-200' },
    { styleCode: 'GOS-103', buyerName: 'Nordic Threads', quantity: '2,500', deliveryDate: '2026-11-25', progress: 20, status: 'In-Cut', statusBg: 'bg-stone-200 text-stone-700 border-stone-300' },
    { styleCode: 'GOS-104', buyerName: 'Urban Outfitters', quantity: '8,000', deliveryDate: '2026-11-18', progress: 95, status: 'QC Pass', statusBg: 'bg-black text-white' },
    { styleCode: 'GOS-105', buyerName: 'Zara Basics', quantity: '12,000', deliveryDate: '2026-12-05', progress: 45, status: 'Sewing', statusBg: 'bg-amber-100 text-amber-800 border-amber-200' },
    { styleCode: 'GOS-106', buyerName: 'H&M Group', quantity: '3,200', deliveryDate: '2026-12-10', progress: 5, status: 'In-Cut', statusBg: 'bg-stone-200 text-stone-700 border-stone-300' },
  ];

  const filteredOrders = activeBuyerOrders.filter(o => 
    o.styleCode.toLowerCase().includes(dashboardSearch.toLowerCase()) ||
    o.buyerName.toLowerCase().includes(dashboardSearch.toLowerCase())
  );

  return (
    <div className="bg-[#f8fafc] text-stone-900 min-h-screen p-6 font-sans space-y-6 rounded-3xl border border-stone-200/80 shadow-sm">
      
      {/* Top Header / Search & Active Line Status Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-stone-200">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-wider text-stone-500">
          <span>GARMENTSOS</span>
          <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
          <span className="text-stone-900">DASHBOARD</span>
        </div>

        {/* Center Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text"
            placeholder="Search Order or Style #..."
            value={dashboardSearch}
            onChange={(e) => setDashboardSearch(e.target.value)}
            className="w-full bg-stone-100 text-xs text-stone-800 placeholder-stone-400 rounded-full pl-10 pr-4 py-2 border border-stone-200 focus:outline-none focus:border-amber-600 focus:bg-white transition-all"
          />
        </div>

        {/* Right Status */}
        <div className="flex items-center gap-4 text-xs font-semibold">
          <div className="flex items-center gap-2 bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200 text-stone-700">
            <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
            <span>Factory Line A: Active</span>
          </div>

          <button className="relative p-2 rounded-full text-stone-500 hover:text-stone-900 hover:bg-stone-100 transition-colors">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500" />
          </button>
        </div>
      </div>

      {/* Top 4 Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Card 1: ORDER SUMMARY */}
        <div 
          onClick={() => onNavigateToTab?.('orders')}
          className="bg-stone-50 p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3 relative hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
              ORDER SUMMARY
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-200/60 text-stone-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-950 tracking-tight">
            1,240
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
              420 Pending
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-stone-900" />
              820 Done
            </span>
          </div>
        </div>

        {/* Card 2: INVENTORY SUMMARY */}
        <div 
          onClick={() => onNavigateToTab?.('inventory')}
          className="bg-stone-50 p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3 relative hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
              INVENTORY SUMMARY
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-200/60 text-stone-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Package className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-950 tracking-tight">
            45.2k <span className="text-xl font-bold text-stone-700">Kg</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold text-stone-600">
            <span>Trims: 85%</span>
            <span>Acc: 92%</span>
          </div>
        </div>

        {/* Card 3: PRODUCTION SUMMARY */}
        <div 
          onClick={() => onNavigateToTab?.('production')}
          className="bg-stone-50 p-5 rounded-2xl border border-stone-200/90 shadow-xs space-y-3 relative hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-500">
              PRODUCTION SUMMARY
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-200/60 text-stone-700 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Cpu className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-stone-950 tracking-tight">
            94.2%
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
            <span>3.4k U/hr</span>
            <span>•</span>
            <span>12.5k WIP</span>
          </div>
        </div>

        {/* Card 4: DELIVERY SUMMARY (Dark Card Highlight) */}
        <div 
          onClick={() => onNavigateToTab?.('logistics')}
          className="bg-stone-950 text-white p-5 rounded-2xl border border-stone-800 shadow-md space-y-3 relative hover:border-amber-500/50 transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-stone-400">
              DELIVERY SUMMARY
            </span>
            <div className="w-8 h-8 rounded-lg bg-stone-800 text-stone-200 flex items-center justify-center group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-extrabold text-white tracking-tight">
            850 <span className="text-lg font-normal text-stone-300">Units</span>
          </div>
          <div className="text-xs font-semibold text-stone-400">
            12 Pending Dispatch • DHL Active
          </div>
        </div>

      </div>

      {/* Main Grid: Active Buyer Orders (Left 70%) & Daily Output vs Target (Right 30%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Column: Active Buyer Orders Table */}
        <div className="lg:col-span-8 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-stone-950 tracking-tight">
              Active Buyer Orders
            </h3>
            <button className="p-1 rounded-lg text-stone-400 hover:text-stone-800 transition-colors">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          {/* Table */}
          <div className="overflow-x-auto rounded-xl border border-stone-200">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-stone-950 text-white uppercase font-extrabold text-[10px] tracking-wider">
                  <th className="py-3 px-4">STYLE CODE</th>
                  <th className="py-3 px-4">BUYER NAME</th>
                  <th className="py-3 px-4">QUANTITY</th>
                  <th className="py-3 px-4">DELIVERY DATE</th>
                  <th className="py-3 px-4">PROGRESS</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-semibold text-stone-800">
                {filteredOrders.map((order, idx) => (
                  <tr 
                    key={idx}
                    onClick={() => onNavigateToTab?.('orders')}
                    className="hover:bg-stone-50 transition-colors cursor-pointer"
                  >
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {order.styleCode}
                    </td>
                    <td className="py-3.5 px-4">
                      {order.buyerName}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {order.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {order.deliveryDate}
                    </td>
                    <td className="py-3.5 px-4 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all ${
                              order.progress >= 90 
                                ? 'bg-rose-600' 
                                : order.progress >= 50 
                                ? 'bg-[#b45309]' 
                                : 'bg-stone-800'
                            }`}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono text-stone-500">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border ${order.statusBg}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-center">
            <button 
              onClick={() => onNavigateToTab?.('orders')}
              className="text-xs font-bold text-stone-800 hover:text-amber-700 transition-colors flex items-center gap-1 mx-auto cursor-pointer"
            >
              <span>View All Orders</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Daily Output vs Target Bar Chart */}
        <div className="lg:col-span-4 bg-white p-6 rounded-2xl border border-stone-200 shadow-xs flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-stone-950 tracking-tight">
              Daily Output vs Target
            </h3>

            {/* Custom Bar Graph Component */}
            <div className="pt-6 pb-2 space-y-8">
              <div className="flex items-end justify-between gap-4 h-48 px-2 border-b border-stone-200 pb-2">
                
                {/* Line A */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div className="w-1/2 bg-stone-200 h-full rounded-t-sm" title="Target: 4,000 pcs" />
                    <div className="w-1/2 bg-[#b45309] h-4/5 rounded-t-sm" title="Actual: 3,400 pcs" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 uppercase">LINE A</span>
                </div>

                {/* Line B */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div className="w-1/2 bg-stone-200 h-4/5 rounded-t-sm" title="Target: 3,200 pcs" />
                    <div className="w-1/2 bg-stone-950 h-4/5 rounded-t-sm" title="Actual: 3,200 pcs" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 uppercase">LINE B</span>
                </div>

                {/* Line C */}
                <div className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex items-end justify-center gap-1.5 h-36">
                    <div className="w-1/2 bg-stone-200 h-[90%] rounded-t-sm" title="Target: 3,800 pcs" />
                    <div className="w-1/2 bg-[#b45309] h-2/3 rounded-t-sm" title="Actual: 2,800 pcs" />
                  </div>
                  <span className="text-[11px] font-bold text-stone-600 uppercase">LINE C</span>
                </div>

              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-6 text-xs font-semibold text-stone-600">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-stone-200" />
                  Target
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-xs bg-[#b45309]" />
                  Actual
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Action Bar */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
        <button
          onClick={() => onNavigateToTab?.('inventory')}
          className="border border-stone-300 bg-white hover:bg-stone-50 text-stone-800 font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs cursor-pointer"
        >
          Log Fabric Arrival
        </button>

        <button
          onClick={() => {
            if (onOpenNewOrderModal) {
              onOpenNewOrderModal();
            } else {
              onNavigateToTab?.('orders');
            }
          }}
          className="bg-black hover:bg-stone-800 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Buyer Order</span>
        </button>
      </div>

    </div>
  );
};

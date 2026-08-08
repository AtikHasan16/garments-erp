'use client';

import React from 'react';
import { 
  ClipboardList, 
  PackageCheck, 
  Cpu, 
  Truck, 
  MoreVertical, 
  Plus, 
  ArrowRight
} from 'lucide-react';

export const OverviewDashboard = ({
  onNavigateToTab,
  onOpenNewOrderModal,
}) => {
  const activeOrders = [
    {
      styleCode: 'GOS-102',
      buyerName: 'Global Denim Co.',
      quantity: '5,000',
      deliveryDate: '2023-11-20',
      progress: 65,
      progressColor: 'bg-[#b45309]',
      status: 'Sewing',
      statusBadge: 'bg-amber-500/15 text-amber-900 border-amber-500/30',
    },
    {
      styleCode: 'GOS-103',
      buyerName: 'Nordic Threads',
      quantity: '2,500',
      deliveryDate: '2023-11-25',
      progress: 20,
      progressColor: 'bg-stone-700',
      status: 'In-Cut',
      statusBadge: 'bg-stone-200 text-stone-700 border-stone-300',
    },
    {
      styleCode: 'GOS-104',
      buyerName: 'Urban Outfitters',
      quantity: '8,000',
      deliveryDate: '2023-11-18',
      progress: 95,
      progressColor: 'bg-red-700',
      status: 'QC Pass',
      statusBadge: 'bg-black text-white border-black',
    },
    {
      styleCode: 'GOS-105',
      buyerName: 'Zara Basics',
      quantity: '12,000',
      deliveryDate: '2023-12-05',
      progress: 45,
      progressColor: 'bg-[#b45309]',
      status: 'Sewing',
      statusBadge: 'bg-amber-500/15 text-amber-900 border-amber-500/30',
    },
    {
      styleCode: 'GOS-106',
      buyerName: 'H&M Group',
      quantity: '3,200',
      deliveryDate: '2023-12-10',
      progress: 5,
      progressColor: 'bg-stone-700',
      status: 'In-Cut',
      statusBadge: 'bg-stone-200 text-stone-700 border-stone-300',
    },
  ];

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full">
      {/* Top 4 KPI Summary Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Card 1: ORDER SUMMARY */}
        <div 
          onClick={() => onNavigateToTab('orders')}
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 tracking-wider uppercase">
              ORDER SUMMARY
            </span>
            <ClipboardList className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight font-sans">
              1,240
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold flex items-center gap-3">
              <span><span className="text-amber-600 font-bold">&bull;</span> 420 Pending</span>
              <span><span className="text-stone-900 font-bold">&bull;</span> 820 Done</span>
            </p>
          </div>
        </div>

        {/* Card 2: INVENTORY SUMMARY */}
        <div 
          onClick={() => onNavigateToTab('inventory')}
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 tracking-wider uppercase">
              INVENTORY SUMMARY
            </span>
            <PackageCheck className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight font-sans">
              45.2k <span className="text-xl font-bold text-stone-700">Kg</span>
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold">
              Trims: <span className="text-stone-900 font-bold">85%</span> &bull; Acc: <span className="text-stone-900 font-bold">92%</span>
            </p>
          </div>
        </div>

        {/* Card 3: PRODUCTION SUMMARY */}
        <div 
          onClick={() => onNavigateToTab('production')}
          className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-extrabold text-stone-500 tracking-wider uppercase">
              PRODUCTION SUMMARY
            </span>
            <Cpu className="w-4 h-4 text-stone-400" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight font-sans">
              94.2%
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold">
              3.4k U/hr &bull; 12.5k WIP
            </p>
          </div>
        </div>

        {/* Card 4: DELIVERY SUMMARY (Black Card) */}
        <div 
          onClick={() => onNavigateToTab('logistics')}
          className="p-5 rounded-2xl bg-black text-white shadow-md hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
        >
          <div className="flex items-center justify-between text-stone-400">
            <span className="text-[11px] font-extrabold tracking-wider uppercase text-stone-300">
              DELIVERY SUMMARY
            </span>
            <Truck className="w-4 h-4 text-stone-300" />
          </div>
          <div className="mt-4">
            <h3 className="text-3xl font-extrabold text-white tracking-tight font-sans">
              850 <span className="text-lg font-bold text-stone-300">Units</span>
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-semibold">
              12 Pending Dispatch &bull; DHL Active
            </p>
          </div>
        </div>
      </div>

      {/* Middle Grid: Active Buyer Orders Table & Daily Output vs Target Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Buyer Orders Card (Span 8) */}
        <div className="lg:col-span-8 bg-white rounded-2xl border border-stone-200 p-6 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-stone-950 tracking-tight">
              Active Buyer Orders
            </h3>
            <button className="text-stone-400 hover:text-stone-900 p-1">
              <MoreVertical className="w-4 h-4" />
            </button>
          </div>

          <div className="overflow-hidden rounded-xl border border-stone-200">
            <table className="w-full text-left text-xs font-sans">
              {/* Black Header Banner */}
              <thead className="bg-black text-white uppercase text-[10px] font-bold tracking-wider">
                <tr>
                  <th className="py-3 px-4">STYLE CODE</th>
                  <th className="py-3 px-4">BUYER NAME</th>
                  <th className="py-3 px-4">QUANTITY</th>
                  <th className="py-3 px-4">DELIVERY DATE</th>
                  <th className="py-3 px-4">PROGRESS</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
                {activeOrders.map((order, idx) => (
                  <tr key={idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {order.styleCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-700">
                      {order.buyerName}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {order.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {order.deliveryDate}
                    </td>
                    <td className="py-3.5 px-4 w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${order.progressColor}`}
                            style={{ width: `${order.progress}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-stone-600">{order.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${order.statusBadge}`}>
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 text-right">
            <button 
              onClick={() => onNavigateToTab('orders')}
              className="text-xs font-bold text-stone-900 hover:text-amber-700 inline-flex items-center gap-1 cursor-pointer"
            >
              <span>View All Orders</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right Column: Daily Output vs Target Chart Card (Span 4) */}
        <div className="lg:col-span-4 bg-white rounded-2xl border border-stone-200 p-6 space-y-6 shadow-sm flex flex-col justify-between">
          <div>
            <h3 className="text-base font-extrabold text-stone-950 tracking-tight mb-6">
              Daily Output vs Target
            </h3>

            {/* Custom Dual Bar Chart Visualization */}
            <div className="h-56 flex items-end justify-around border-b border-stone-200 pb-4 px-2">
              {/* LINE A */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-44">
                  <div className="w-7 bg-stone-200 h-[85%] rounded-t-sm" title="Target" />
                  <div className="w-7 bg-[#b45309] h-[75%] rounded-t-sm" title="Actual" />
                </div>
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">LINE A</span>
              </div>

              {/* LINE B */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-44">
                  <div className="w-7 bg-stone-200 h-[70%] rounded-t-sm" title="Target" />
                  <div className="w-7 bg-black h-[72%] rounded-t-sm" title="Actual" />
                </div>
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">LINE B</span>
              </div>

              {/* LINE C */}
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-end gap-1.5 h-44">
                  <div className="w-7 bg-stone-200 h-[80%] rounded-t-sm" title="Target" />
                  <div className="w-7 bg-[#b45309] h-[60%] rounded-t-sm" title="Actual" />
                </div>
                <span className="text-[10px] font-bold text-stone-600 uppercase tracking-wider">LINE C</span>
              </div>
            </div>

            {/* Chart Legend */}
            <div className="flex items-center justify-center gap-6 text-xs text-stone-600 font-semibold pt-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-stone-200 rounded-xs inline-block" />
                <span>Target</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 bg-[#b45309] rounded-xs inline-block" />
                <span>Actual</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Right Action Buttons */}
      <div className="flex justify-end items-center gap-4 pt-4">
        <button
          onClick={() => onNavigateToTab('inventory')}
          className="bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          Log Fabric Arrival
        </button>
        <button
          onClick={onOpenNewOrderModal}
          className="bg-black hover:bg-stone-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Buyer Order</span>
        </button>
      </div>
    </div>
  );
};

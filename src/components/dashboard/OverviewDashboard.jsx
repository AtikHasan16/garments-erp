'use client';

import React from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  ClipboardList, 
  PackageCheck, 
  Cpu, 
  Truck, 
  MoreVertical, 
  Plus, 
  ArrowRight,
  Database
} from 'lucide-react';

export const OverviewDashboard = ({
  onNavigateToTab,
}) => {
  const { 
    orders, 
    inventory, 
    challans, 
    openOrderModal, 
    openInventoryModal, 
    seedDatabase 
  } = useERP();

  const activeOrdersCount = orders.filter(o => o.status !== 'Shipped').length;
  const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;
  const totalChallanUnits = challans.reduce((sum, c) => sum + (c.totalQuantity || 0), 0);

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full">
      {/* DB Seeder Banner if empty */}
      {orders.length === 0 && (
        <div className="p-4 rounded-2xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Database className="w-5 h-5 text-amber-700 animate-bounce" />
            <div>
              <h4 className="text-xs font-bold text-amber-950">MongoDB Atlas Database Connected</h4>
              <p className="text-[11px] text-amber-900">Click to populate live MongoDB collection with sample enterprise records.</p>
            </div>
          </div>
          <button
            onClick={seedDatabase}
            className="bg-stone-950 hover:bg-stone-800 text-white font-bold px-4 py-2 rounded-xl text-xs uppercase tracking-wider transition-colors cursor-pointer shadow-md"
          >
            Seed MongoDB Data
          </button>
        </div>
      )}

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
              {orders.length > 0 ? orders.length : 1240}
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold flex items-center gap-3">
              <span><span className="text-amber-600 font-bold">&bull;</span> {activeOrdersCount} Active POs</span>
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
              {inventory.length > 0 ? `${inventory.length} Items` : '45.2k Kg'}
            </h3>
            <p className="text-xs text-stone-500 mt-1 font-semibold">
              Low Alerts: <span className="text-stone-900 font-bold">{lowStockCount}</span>
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
              {challans.length > 0 ? `${totalChallanUnits.toLocaleString()} Pcs` : '850 Units'}
            </h3>
            <p className="text-xs text-stone-400 mt-1 font-semibold">
              {challans.length > 0 ? `${challans.length} Gate Passes` : '12 Pending Dispatch'}
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
              Active Buyer Orders (Live MongoDB Collection)
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
                {orders.slice(0, 5).map((order, idx) => (
                  <tr key={order._id || idx} className="hover:bg-stone-50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-stone-900">
                      {order.styleCode}
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-stone-700">
                      {order.buyer}
                    </td>
                    <td className="py-3.5 px-4 font-mono">
                      {order.orderQty?.toLocaleString() || order.quantity}
                    </td>
                    <td className="py-3.5 px-4 font-mono text-stone-600">
                      {order.shipmentDate || order.deliveryDate}
                    </td>
                    <td className="py-3.5 px-4 w-32">
                      <div className="flex items-center gap-2">
                        <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                          <div 
                            className="h-full rounded-full bg-[#b45309]"
                            style={{ width: `${order.sewingProgress || order.progress || 65}%` }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-stone-600">{order.sewingProgress || order.progress || 65}%</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="inline-block text-[10px] font-bold px-3 py-1 rounded-full border bg-amber-500/15 text-amber-900 border-amber-500/30">
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
          onClick={openInventoryModal}
          className="bg-stone-100 hover:bg-stone-200 text-stone-900 border border-stone-300 font-bold px-4 py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
        >
          Log Fabric Arrival
        </button>
        <button
          onClick={openOrderModal}
          className="bg-black hover:bg-stone-800 text-white font-bold px-5 py-2.5 rounded-xl text-xs shadow-md flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Buyer Order</span>
        </button>
      </div>
    </div>
  );
};

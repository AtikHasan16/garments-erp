'use client';

import React, { useState } from 'react';
import { GarmentOrder } from '../../types/erp';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ChevronRight
} from 'lucide-react';

interface OrderManagementProps {
  orders: GarmentOrder[];
  searchQuery?: string;
  onSelectOrder?: (order: GarmentOrder) => void;
  onOpenNewOrderModal?: () => void;
}

export const OrderManagement: React.FC<OrderManagementProps> = ({
  orders,
  onSelectOrder,
  onOpenNewOrderModal,
}) => {
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [buyerFilter, setBuyerFilter] = useState<string>('All');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const buyers = Array.from(new Set(orders.map((o) => o.buyer)));

  const filteredOrders = orders.filter((o) => {
    const matchesStatus = statusFilter === 'All' || o.status === statusFilter;
    const matchesBuyer = buyerFilter === 'All' || o.buyer === buyerFilter;
    const matchesSearch = 
      o.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.styleCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.styleName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.buyer.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesStatus && matchesBuyer && matchesSearch;
  });

  const getStatusBadge = (status: GarmentOrder['status']) => {
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
      case 'Sampling':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-slate-500/10 text-slate-400 border-slate-500/30';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-indigo-400" />
            Merchandise & Buyer Purchase Orders
          </h2>
          <p className="text-xs text-slate-400">Track order lifecycle, sampling milestones, and production progress</p>
        </div>

        <button
          onClick={onOpenNewOrderModal}
          className="self-start sm:self-auto bg-linear-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/25 transition-all"
        >
          + Create New Garment PO
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-60">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PO#, Style, Buyer..."
              className="w-full bg-slate-950/80 border border-slate-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Stages</option>
              <option value="Sampling">Sampling</option>
              <option value="PP Approved">PP Approved</option>
              <option value="In Cutting">In Cutting</option>
              <option value="In Sewing">In Sewing</option>
              <option value="Finishing">Finishing</option>
              <option value="Shipped">Shipped</option>
            </select>
          </div>

          {/* Buyer Select */}
          <div className="flex items-center gap-1.5 text-xs text-slate-400">
            <span>Buyer:</span>
            <select
              value={buyerFilter}
              onChange={(e) => setBuyerFilter(e.target.value)}
              className="bg-slate-950/80 border border-slate-800 rounded-xl px-3 py-1.5 text-xs text-slate-200 focus:outline-none"
            >
              <option value="All">All Buyers</option>
              {buyers.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="rounded-2xl bg-slate-900/80 border border-slate-800/80 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/90 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800/80">
              <tr>
                <th className="py-3.5 px-4">PO & Style Info</th>
                <th className="py-3.5 px-4">Buyer Name</th>
                <th className="py-3.5 px-4">Order Qty & FOB</th>
                <th className="py-3.5 px-4">Status & Line</th>
                <th className="py-3.5 px-4">Sampling Milestones</th>
                <th className="py-3.5 px-4">Cutting / Sewing %</th>
                <th className="py-3.5 px-4">Shipment Date</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectOrder?.(order)}
                >
                  {/* PO & Style Info */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-slate-100 group-hover:text-indigo-400 transition-colors">
                      {order.styleName}
                    </div>
                    <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>{order.poNumber}</span>
                      <span>&bull;</span>
                      <span className="text-indigo-400 font-semibold">{order.styleCode}</span>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td className="py-4 px-4 font-medium text-slate-200">
                    {order.buyer}
                  </td>

                  {/* Qty & FOB Value */}
                  <td className="py-4 px-4">
                    <div className="font-semibold text-slate-100">
                      {order.orderQty.toLocaleString()} Pcs
                    </div>
                    <div className="text-[11px] text-slate-400">
                      ${order.fobPrice.toFixed(2)} / pc (${order.totalValue.toLocaleString()})
                    </div>
                  </td>

                  {/* Status & Assigned Line */}
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-semibold px-2.5 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-[11px] text-slate-400 mt-1">
                      {order.factoryLine}
                    </div>
                  </td>

                  {/* Sampling Milestones */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span title="Lab Dip" className={`w-2 h-2 rounded-full ${order.samplingMilestones.labDip ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span title="Fit Sample" className={`w-2 h-2 rounded-full ${order.samplingMilestones.fitSample ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span title="PP Sample" className={`w-2 h-2 rounded-full ${order.samplingMilestones.ppSample ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                      <span title="Fabric Received" className={`w-2 h-2 rounded-full ${order.samplingMilestones.bulkFabricReceived ? 'bg-emerald-400' : 'bg-slate-600'}`} />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      {order.samplingMilestones.ppSample ? 'PP Approved' : 'Sampling Pending'}
                    </span>
                  </td>

                  {/* Progress Bars */}
                  <td className="py-4 px-4 w-36">
                    <div className="space-y-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-slate-400">
                          <span>Cut: {order.cuttingProgress}%</span>
                          <span>Sew: {order.sewingProgress}%</span>
                        </div>
                        <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                          <div 
                            className="bg-indigo-400 h-full rounded-full" 
                            style={{ width: `${order.sewingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Shipment Date */}
                  <td className="py-4 px-4 font-mono text-slate-300 font-medium">
                    {order.shipmentDate}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectOrder?.(order);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

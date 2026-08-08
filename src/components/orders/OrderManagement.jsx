'use client';

import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ChevronRight,
  Plus,
  X,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { MOCK_TECH_PACK } from '../../data/mockErpData';

export const OrderManagement = ({
  orders,
  onSelectOrder,
  onOpenNewOrderModal,
}) => {
  const [statusFilter, setStatusFilter] = useState('All');
  const [buyerFilter, setBuyerFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrderDetails, setSelectedOrderDetails] = useState(null);

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
      case 'Sampling':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      default:
        return 'bg-stone-800 text-stone-400 border-stone-700';
    }
  };

  const handleOrderClick = (order) => {
    setSelectedOrderDetails(order);
    if (onSelectOrder) {
      onSelectOrder(order);
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
          <p className="text-xs text-slate-400">Track order lifecycle, sampling milestones, and style Tech Pack BOM specifications.</p>
        </div>

        <button
          onClick={onOpenNewOrderModal}
          className="self-start sm:self-auto bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Create New Garment PO</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-60">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PO#, Style, Buyer..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <Filter className="w-3.5 h-3.5" />
            <span>Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
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
          <div className="flex items-center gap-1.5 text-xs text-stone-400">
            <span>Buyer:</span>
            <select
              value={buyerFilter}
              onChange={(e) => setBuyerFilter(e.target.value)}
              className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
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
      <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase font-semibold text-[11px] border-b border-stone-800">
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
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {filteredOrders.map((order) => (
                <tr 
                  key={order.id} 
                  className="hover:bg-stone-800/40 transition-colors group cursor-pointer"
                  onClick={() => handleOrderClick(order)}
                >
                  {/* PO & Style Info */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white group-hover:text-amber-400 transition-colors">
                      {order.styleName}
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono flex items-center gap-2 mt-0.5">
                      <span>{order.poNumber}</span>
                      <span>&bull;</span>
                      <span className="text-amber-400 font-semibold">{order.styleCode}</span>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td className="py-4 px-4 font-medium text-stone-200">
                    {order.buyer}
                  </td>

                  {/* Qty & FOB Value */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">
                      {order.orderQty.toLocaleString()} Pcs
                    </div>
                    <div className="text-[11px] text-stone-400 font-mono">
                      ${order.fobPrice.toFixed(2)} / pc (${order.totalValue.toLocaleString()})
                    </div>
                  </td>

                  {/* Status & Assigned Line */}
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-[11px] text-stone-400 mt-1">
                      {order.factoryLine}
                    </div>
                  </td>

                  {/* Sampling Milestones */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span title="Lab Dip" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones.labDip ? 'bg-emerald-400' : 'bg-stone-700'}`} />
                      <span title="Fit Sample" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones.fitSample ? 'bg-emerald-400' : 'bg-stone-700'}`} />
                      <span title="PP Sample" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones.ppSample ? 'bg-emerald-400' : 'bg-stone-700'}`} />
                      <span title="Fabric Received" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones.bulkFabricReceived ? 'bg-emerald-400' : 'bg-stone-700'}`} />
                    </div>
                    <span className="text-[10px] text-stone-400 mt-1 block">
                      {order.samplingMilestones.ppSample ? 'PP Approved' : 'Sampling Pending'}
                    </span>
                  </td>

                  {/* Progress Bars */}
                  <td className="py-4 px-4 w-36">
                    <div className="space-y-1.5">
                      <div>
                        <div className="flex justify-between text-[10px] text-stone-400 font-mono">
                          <span>Cut: {order.cuttingProgress}%</span>
                          <span>Sew: {order.sewingProgress}%</span>
                        </div>
                        <div className="w-full bg-stone-800 h-1.5 rounded-full overflow-hidden mt-0.5">
                          <div 
                            className="bg-amber-600 h-full rounded-full" 
                            style={{ width: `${order.sewingProgress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Shipment Date */}
                  <td className="py-4 px-4 font-mono text-stone-300 font-medium">
                    {order.shipmentDate}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleOrderClick(order);
                      }}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-amber-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Style & Tech Pack BOM Detail Modal */}
      {selectedOrderDetails && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-stone-800 text-stone-100 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4" />
                <span>Style Spec & Tech Pack Specification</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">
                {selectedOrderDetails.styleName}
              </h3>
              <p className="text-xs text-stone-400 mt-1 font-mono">
                PO: {selectedOrderDetails.poNumber} | Style Code: {selectedOrderDetails.styleCode} | Buyer: {selectedOrderDetails.buyer}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-950 p-4 rounded-2xl border border-stone-800 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Order Quantity</span>
                <span className="font-extrabold text-white text-sm">{selectedOrderDetails.orderQty.toLocaleString()} Pcs</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">FOB Unit Price</span>
                <span className="font-extrabold text-amber-400 text-sm">${selectedOrderDetails.fobPrice.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Total Value</span>
                <span className="font-extrabold text-emerald-400 text-sm">${selectedOrderDetails.totalValue.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Shipment Date</span>
                <span className="font-bold text-stone-200 text-xs font-mono">{selectedOrderDetails.shipmentDate}</span>
              </div>
            </div>

            {/* Sampling Milestones Checklist */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Sampling Approvals & Materials Status
              </h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${selectedOrderDetails.samplingMilestones.labDip ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Lab Dip Shade</span>
                </div>
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${selectedOrderDetails.samplingMilestones.fitSample ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Fit Sample</span>
                </div>
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${selectedOrderDetails.samplingMilestones.ppSample ? 'bg-emerald-400/10 border-emerald-500/30 text-emerald-400' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>PP Sample</span>
                </div>
                <div className={`p-3 rounded-xl border flex items-center gap-2 ${selectedOrderDetails.samplingMilestones.bulkFabricReceived ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-stone-950 border-stone-800 text-stone-500'}`}>
                  <CheckCircle2 className="w-4 h-4 shrink-0" />
                  <span>Bulk Fabric Received</span>
                </div>
              </div>
            </div>

            {/* Bill of Materials (BOM) Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
                Itemized Bill of Materials (BOM)
              </h4>
              <div className="overflow-x-auto rounded-xl border border-stone-800">
                <table className="w-full text-left text-xs">
                  <thead className="bg-stone-950 text-stone-400 uppercase font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Item</th>
                      <th className="py-2.5 px-3">Specification</th>
                      <th className="py-2.5 px-3">Garment Consumption</th>
                      <th className="py-2.5 px-3">Unit Cost</th>
                      <th className="py-2.5 px-3">Nominated Supplier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-800">
                    {MOCK_TECH_PACK.bom.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-800/40">
                        <td className="py-2.5 px-3 font-bold text-white">{item.item}</td>
                        <td className="py-2.5 px-3 text-stone-300">{item.specification}</td>
                        <td className="py-2.5 px-3 font-mono text-amber-400">{item.consumptionPerGarment}</td>
                        <td className="py-2.5 px-3 font-mono">${item.unitCost.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-stone-400">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-stone-800">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
              >
                Close Spec Sheet
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

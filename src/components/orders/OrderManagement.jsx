'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  ChevronRight,
  Plus,
  X,
  Sparkles,
  Trash2
} from 'lucide-react';
import { MOCK_TECH_PACK } from '../../data/mockErpData';

export const OrderManagement = () => {
  const { orders, openOrderModal, deleteOrder } = useERP();

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
        return 'bg-blue-50 text-blue-700 border-blue-200';
      case 'In Cutting':
        return 'bg-stone-200 text-stone-700 border-stone-300';
      case 'In Sewing':
        return 'bg-amber-500/15 text-amber-900 border-amber-500/30';
      case 'Finishing':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Shipped':
        return 'bg-[#22c55e]/15 text-emerald-900 border-emerald-300';
      case 'Sampling':
        return 'bg-purple-50 text-purple-700 border-purple-200';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-950 tracking-tight flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-amber-600" />
            Merchandise & Buyer Purchase Orders (MongoDB Atlas Live)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">Track order lifecycle, sampling milestones, and style Tech Pack BOM specifications</p>
        </div>

        <button
          onClick={openOrderModal}
          className="self-start sm:self-auto bg-black hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Buyer Order</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 flex-1 min-w-60">
          <div className="relative w-full max-w-xs">
            <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search PO#, Style, Buyer..."
              className="w-full bg-stone-100 border border-stone-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Status Select */}
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
            <Filter className="w-3.5 h-3.5" />
            <span>STATUS:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none"
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
          <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
            <span>BUYER:</span>
            <select
              value={buyerFilter}
              onChange={(e) => setBuyerFilter(e.target.value)}
              className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none"
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
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-black text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">PO & STYLE INFO</th>
                <th className="py-3.5 px-4">BUYER NAME</th>
                <th className="py-3.5 px-4">ORDER QTY & FOB</th>
                <th className="py-3.5 px-4">STATUS & LINE</th>
                <th className="py-3.5 px-4">SAMPLING MILESTONES</th>
                <th className="py-3.5 px-4">PROGRESS</th>
                <th className="py-3.5 px-4">DELIVERY DATE</th>
                <th className="py-3.5 px-4 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
              {filteredOrders.map((order) => (
                <tr 
                  key={order._id || order.id} 
                  className="hover:bg-stone-50 transition-colors group cursor-pointer"
                  onClick={() => setSelectedOrderDetails(order)}
                >
                  {/* PO & Style Info */}
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-950 group-hover:text-amber-700 transition-colors">
                      {order.styleName}
                    </div>
                    <div className="text-[11px] text-stone-500 font-mono flex items-center gap-2 mt-0.5">
                      <span>{order.poNumber}</span>
                      <span>&bull;</span>
                      <span className="text-amber-700 font-bold">{order.styleCode}</span>
                    </div>
                  </td>

                  {/* Buyer */}
                  <td className="py-4 px-4 font-semibold text-stone-700">
                    {order.buyer}
                  </td>

                  {/* Qty & FOB Value */}
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-stone-950">
                      {order.orderQty?.toLocaleString()} Pcs
                    </div>
                    <div className="text-[11px] text-stone-500">
                      ${order.fobPrice?.toFixed(2)} / pc (${order.totalValue?.toLocaleString()})
                    </div>
                  </td>

                  {/* Status & Assigned Line */}
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusBadge(order.status)}`}>
                      {order.status}
                    </span>
                    <div className="text-[11px] text-stone-500 mt-1 font-semibold">
                      {order.factoryLine}
                    </div>
                  </td>

                  {/* Sampling Milestones */}
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-1.5">
                      <span title="Lab Dip" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones?.labDip ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                      <span title="Fit Sample" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones?.fitSample ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                      <span title="PP Sample" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones?.ppSample ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                      <span title="Fabric Received" className={`w-2.5 h-2.5 rounded-full ${order.samplingMilestones?.bulkFabricReceived ? 'bg-emerald-500' : 'bg-stone-300'}`} />
                    </div>
                    <span className="text-[10px] text-stone-500 font-semibold mt-1 block">
                      {order.samplingMilestones?.ppSample ? 'PP Approved' : 'Sampling Pending'}
                    </span>
                  </td>

                  {/* Progress Bars */}
                  <td className="py-4 px-4 w-36">
                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-stone-600 font-mono font-bold">
                        <span>Sew: {order.sewingProgress || 65}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-[#b45309] h-full rounded-full" 
                          style={{ width: `${order.sewingProgress || 65}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Shipment Date */}
                  <td className="py-4 px-4 font-mono text-stone-700 font-bold">
                    {order.shipmentDate}
                  </td>

                  {/* Action */}
                  <td className="py-4 px-4 text-right flex items-center justify-end gap-2">
                    {order._id && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          if (confirm(`Delete Purchase Order ${order.poNumber}?`)) {
                            deleteOrder(order._id);
                          }
                        }}
                        className="p-2 rounded-full bg-red-50 hover:bg-red-100 text-red-600 transition-colors cursor-pointer"
                        title="Delete Document from MongoDB"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedOrderDetails(order);
                      }}
                      className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4 text-stone-900" />
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
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-3xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-6 relative max-h-[90vh] overflow-y-auto font-sans">
            <button 
              onClick={() => setSelectedOrderDetails(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Title */}
            <div>
              <div className="flex items-center gap-2 text-xs font-extrabold text-amber-700 uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>GarmentsOS Tech Pack Specification</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-950">
                {selectedOrderDetails.styleName}
              </h3>
              <p className="text-xs text-stone-500 mt-1 font-mono">
                PO: {selectedOrderDetails.poNumber} | Style Code: {selectedOrderDetails.styleCode} | Buyer: {selectedOrderDetails.buyer}
              </p>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-stone-50 p-4 rounded-2xl border border-stone-200 text-xs">
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Order Quantity</span>
                <span className="font-extrabold text-stone-950 text-sm">{selectedOrderDetails.orderQty?.toLocaleString()} Pcs</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">FOB Unit Price</span>
                <span className="font-extrabold text-amber-700 text-sm">${selectedOrderDetails.fobPrice?.toFixed(2)}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Total Value</span>
                <span className="font-extrabold text-emerald-700 text-sm">${selectedOrderDetails.totalValue?.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-[10px] text-stone-500 font-bold uppercase block">Delivery Date</span>
                <span className="font-bold text-stone-800 text-xs font-mono">{selectedOrderDetails.shipmentDate}</span>
              </div>
            </div>

            {/* Bill of Materials (BOM) Table */}
            <div className="space-y-3">
              <h4 className="text-xs font-extrabold uppercase tracking-wider text-stone-900">
                Itemized Bill of Materials (BOM)
              </h4>
              <div className="overflow-hidden rounded-xl border border-stone-200">
                <table className="w-full text-left text-xs">
                  <thead className="bg-black text-white uppercase font-bold text-[10px]">
                    <tr>
                      <th className="py-2.5 px-3">Item</th>
                      <th className="py-2.5 px-3">Specification</th>
                      <th className="py-2.5 px-3">Garment Consumption</th>
                      <th className="py-2.5 px-3">Unit Cost</th>
                      <th className="py-2.5 px-3">Supplier</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-stone-200 font-medium">
                    {MOCK_TECH_PACK.bom.map((item, idx) => (
                      <tr key={idx} className="hover:bg-stone-50">
                        <td className="py-2.5 px-3 font-bold text-stone-950">{item.item}</td>
                        <td className="py-2.5 px-3 text-stone-700">{item.specification}</td>
                        <td className="py-2.5 px-3 font-mono font-bold text-amber-700">{item.consumptionPerGarment}</td>
                        <td className="py-2.5 px-3 font-mono text-stone-900">${item.unitCost.toFixed(2)}</td>
                        <td className="py-2.5 px-3 text-stone-600">{item.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => setSelectedOrderDetails(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
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

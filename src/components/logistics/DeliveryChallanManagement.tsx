'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  Plus, 
  Printer, 
  MapPin, 
  X
} from 'lucide-react';
import { DeliveryChallan } from '../../types/erp';

interface DeliveryChallanManagementProps {
  challans: DeliveryChallan[];
  searchQuery: string;
}

export const DeliveryChallanManagement: React.FC<DeliveryChallanManagementProps> = ({
  challans,
  searchQuery,
}) => {
  const [selectedChallan, setSelectedChallan] = useState<DeliveryChallan | null>(null);
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>('All');

  const filteredChallans = challans.filter(c => {
    const matchesSearch = 
      c.challanNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.gatePassNo.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.buyer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destination.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = selectedStatusFilter === 'All' || c.status === selectedStatusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      {/* Overview Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-6 rounded-2xl text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold tracking-tight">Delivery Challan & Gate Pass Management</h2>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Outward Logistics
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Generate outward delivery challans, track gate pass verifications, and record driver shipment handoffs.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button 
            onClick={() => setSelectedChallan(challans[0])}
            className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Generate Delivery Challan</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-stone-700 dark:text-stone-300 uppercase tracking-wider">Status:</span>
          {['All', 'Out for Delivery', 'Delivered', 'Draft'].map(status => (
            <button
              key={status}
              onClick={() => setSelectedStatusFilter(status)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                selectedStatusFilter === status
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="text-xs font-medium text-stone-500">
          Showing {filteredChallans.length} Challan Records
        </div>
      </div>

      {/* Delivery Challan Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200 dark:border-stone-800">
                <th className="py-3.5 px-4">Challan & Gate Pass</th>
                <th className="py-3.5 px-4">Buyer & PO</th>
                <th className="py-3.5 px-4">Dispatch Destination</th>
                <th className="py-3.5 px-4">Vehicle & Driver</th>
                <th className="py-3.5 px-4">Cartons / Qty</th>
                <th className="py-3.5 px-4">Dispatch Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60 font-medium">
              {filteredChallans.map((c) => (
                <tr key={c.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900 dark:text-white">{c.challanNo}</div>
                    <div className="text-[10px] font-mono text-amber-600 dark:text-amber-400">Pass: {c.gatePassNo}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900 dark:text-stone-100">{c.buyer}</div>
                    <div className="text-[10px] text-stone-500">{c.poNumber} ({c.styleCode})</div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300 max-w-xs truncate">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-stone-400 shrink-0" />
                      <span className="truncate">{c.destination}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300">
                    <div className="font-mono text-[11px] font-bold">{c.vehicleNo}</div>
                    <div className="text-[10px] text-stone-500">{c.driverName}</div>
                  </td>
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-stone-900 dark:text-white">
                      {c.totalQuantity.toLocaleString()} pcs
                    </div>
                    <div className="text-[10px] text-stone-500">{c.totalCartons} Cartons</div>
                  </td>
                  <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400 text-[11px]">
                    {c.dispatchDate}
                  </td>
                  <td className="py-3.5 px-4">
                    <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      c.status === 'Delivered'
                        ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                        : c.status === 'Out for Delivery'
                        ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                        : 'bg-stone-500/10 text-stone-600 dark:text-stone-400 border-stone-500/30'
                    }`}>
                      {c.status}
                    </span>
                  </td>
                  <td className="py-3.5 px-4 text-right">
                    <button 
                      onClick={() => setSelectedChallan(c)}
                      className="bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 dark:hover:bg-stone-700 text-stone-800 dark:text-stone-200 px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1 ml-auto"
                    >
                      <Printer className="w-3.5 h-3.5 text-amber-600" />
                      <span>Print Challan</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Printable Delivery Challan Modal */}
      {selectedChallan && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 space-y-6 relative max-h-[90vh] overflow-y-auto">
            <button 
              onClick={() => setSelectedChallan(null)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Official Document Header */}
            <div className="border-b border-stone-200 pb-6">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-stone-900 text-amber-400 rounded flex items-center justify-center font-bold text-xs">
                      G
                    </div>
                    <span className="font-extrabold text-xl tracking-tight text-stone-950">GarmentsOS Apparel Enterprise</span>
                  </div>
                  <p className="text-[11px] text-stone-500 mt-1">Plot 42, Sector 7, EPZ Industrial Area, Dhaka, Bangladesh</p>
                </div>
                <div className="text-right">
                  <span className="text-xs font-extrabold uppercase tracking-widest text-amber-700 block">DELIVERY CHALLAN & GATE PASS</span>
                  <span className="font-mono font-bold text-lg text-stone-900">{selectedChallan.challanNo}</span>
                  <p className="text-[11px] text-stone-500">Gate Pass: {selectedChallan.gatePassNo}</p>
                </div>
              </div>
            </div>

            {/* Consignee & Shipment Details */}
            <div className="grid grid-cols-2 gap-6 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200">
              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Buyer / Consignee</span>
                <span className="font-bold text-sm text-stone-950">{selectedChallan.buyer}</span>
                <p className="text-stone-600 mt-0.5">{selectedChallan.destination}</p>
                <p className="text-stone-500 font-mono mt-1">PO: {selectedChallan.poNumber} | Style: {selectedChallan.styleCode}</p>
              </div>

              <div>
                <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Logistics & Transport</span>
                <p className="font-mono font-bold text-stone-900">Vehicle: {selectedChallan.vehicleNo}</p>
                <p className="text-stone-600">Driver: {selectedChallan.driverName} ({selectedChallan.driverPhone})</p>
                <p className="text-stone-500 mt-1">Dispatch Date: {selectedChallan.dispatchDate}</p>
              </div>
            </div>

            {/* Itemized Goods Breakdown */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2">Itemized Goods Breakdown</h4>
              <table className="w-full text-left text-xs border border-stone-200 rounded-lg overflow-hidden">
                <thead className="bg-stone-100 text-stone-700 font-bold uppercase text-[10px]">
                  <tr>
                    <th className="py-2.5 px-3">SKU Code</th>
                    <th className="py-2.5 px-3">Description</th>
                    <th className="py-2.5 px-3 text-right">Cartons</th>
                    <th className="py-2.5 px-3 text-right">Quantity (Pcs)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {selectedChallan.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 px-3 font-mono font-semibold">{item.itemCode}</td>
                      <td className="py-2.5 px-3 text-stone-800">{item.description}</td>
                      <td className="py-2.5 px-3 text-right font-semibold">{item.cartons} CTN</td>
                      <td className="py-2.5 px-3 text-right font-bold text-stone-950">{item.quantity.toLocaleString()} pcs</td>
                    </tr>
                  ))}
                  <tr className="bg-stone-50 font-bold">
                    <td colSpan={2} className="py-2.5 px-3 text-right uppercase text-[10px] text-stone-500">Total Consignment:</td>
                    <td className="py-2.5 px-3 text-right text-stone-900">{selectedChallan.totalCartons} Cartons</td>
                    <td className="py-2.5 px-3 text-right text-amber-700 text-sm">{selectedChallan.totalQuantity.toLocaleString()} Pcs</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Signature & Seal Footer */}
            <div className="pt-8 border-t border-stone-200 grid grid-cols-3 gap-4 text-center text-xs text-stone-500">
              <div className="space-y-8">
                <div className="border-b border-stone-300 w-3/4 mx-auto" />
                <span>Prepared By (Store Lead)</span>
              </div>
              <div className="space-y-8">
                <div className="border-b border-stone-300 w-3/4 mx-auto" />
                <span>Security Officer Gate Verification</span>
              </div>
              <div className="space-y-8">
                <div className="border-b border-stone-300 w-3/4 mx-auto" />
                <span>Driver Consignment Receipt</span>
              </div>
            </div>

            {/* Print Action */}
            <div className="flex justify-end gap-3 pt-4">
              <button
                onClick={() => setSelectedChallan(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
              >
                Close
              </button>
              <button
                onClick={() => window.print()}
                className="bg-black hover:bg-stone-800 text-white px-5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-4 h-4" />
                <span>Print Document</span>
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
};

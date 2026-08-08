'use client';

import React, { useState } from 'react';
import { 
  Truck, 
  Printer,
  Plus
} from 'lucide-react';

export const DeliveryChallanManagement = ({ challans }) => {
  const [selectedChallan, setSelectedChallan] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Out for Delivery':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Delivered':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-stone-800 text-stone-400 border-stone-700';
    }
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-slate-100 flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            Delivery Challan & Factory Gate Pass Logistics Hub
          </h2>
          <p className="text-xs text-slate-400">Generate outward gate passes, track delivery vehicles, and inspect carton packing lists</p>
        </div>

        <button className="self-start sm:self-auto bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Generate New Challan</span>
        </button>
      </div>

      {/* Challans List Table */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase font-semibold text-[11px] border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Challan & Gate Pass</th>
                <th className="py-3.5 px-4">Buyer & Style</th>
                <th className="py-3.5 px-4">Cartons & Qty</th>
                <th className="py-3.5 px-4">Vehicle & Driver</th>
                <th className="py-3.5 px-4">Dispatch Date & Destination</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Print</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {challans.map((chal) => (
                <tr key={chal.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-amber-400">{chal.challanNo}</div>
                    <div className="text-[11px] text-stone-400">Gate Pass: {chal.gatePassNo}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{chal.buyer}</div>
                    <div className="text-[11px] text-stone-400 font-mono">{chal.poNumber} &bull; {chal.styleCode}</div>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-white">{chal.totalQuantity.toLocaleString()} Pcs</div>
                    <div className="text-[11px] text-stone-400">{chal.totalCartons} Cartons</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-200">{chal.vehicleNo}</div>
                    <div className="text-[11px] text-stone-400">{chal.driverName} ({chal.driverPhone})</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-stone-200">{chal.dispatchDate}</div>
                    <div className="text-[11px] text-stone-400 max-w-xs truncate">{chal.destination}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(chal.status)}`}>
                      {chal.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedChallan(chal)}
                      className="p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 transition-colors cursor-pointer"
                      title="View Formal Gate Pass"
                    >
                      <Printer className="w-4 h-4 text-amber-400" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formal Printable Delivery Challan Modal */}
      {selectedChallan && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white text-stone-900 rounded-3xl max-w-2xl w-full p-8 shadow-2xl space-y-6 relative max-h-[90vh] overflow-y-auto font-sans">
            <div className="flex justify-between items-start border-b border-stone-200 pb-4">
              <div>
                <h3 className="text-xl font-black tracking-tight text-stone-950 uppercase">
                  GarmentsOS Outward Delivery Challan
                </h3>
                <p className="text-xs text-stone-600 font-mono mt-0.5">
                  Official Gate Pass Document &bull; Factory Dispatch Copy
                </p>
              </div>
              <button
                onClick={() => setSelectedChallan(null)}
                className="text-stone-400 hover:text-stone-900 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs bg-stone-50 p-4 rounded-xl border border-stone-200 font-mono">
              <div>
                <span className="text-stone-500 font-bold uppercase block">Challan Number</span>
                <span className="font-extrabold text-stone-900">{selectedChallan.challanNo}</span>
              </div>
              <div>
                <span className="text-stone-500 font-bold uppercase block">Gate Pass Number</span>
                <span className="font-extrabold text-stone-900">{selectedChallan.gatePassNo}</span>
              </div>
              <div>
                <span className="text-stone-500 font-bold uppercase block">Buyer Name</span>
                <span className="font-bold text-stone-900">{selectedChallan.buyer}</span>
              </div>
              <div>
                <span className="text-stone-500 font-bold uppercase block">PO & Style</span>
                <span className="font-bold text-stone-900">{selectedChallan.poNumber} ({selectedChallan.styleCode})</span>
              </div>
              <div>
                <span className="text-stone-500 font-bold uppercase block">Vehicle Registration</span>
                <span className="font-bold text-stone-900">{selectedChallan.vehicleNo}</span>
              </div>
              <div>
                <span className="text-stone-500 font-bold uppercase block">Driver Info</span>
                <span className="font-bold text-stone-900">{selectedChallan.driverName}</span>
              </div>
            </div>

            {/* Carton Itemization */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-800 mb-2">
                Carton Packing List Summary
              </h4>
              <table className="w-full text-left text-xs border border-stone-200 rounded-xl overflow-hidden">
                <thead className="bg-stone-100 font-bold text-stone-700">
                  <tr>
                    <th className="p-2.5">Item Code</th>
                    <th className="p-2.5">Description</th>
                    <th className="p-2.5">Cartons</th>
                    <th className="p-2.5 text-right">Quantity</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200">
                  {selectedChallan.items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-mono font-bold text-stone-900">{item.itemCode}</td>
                      <td className="p-2.5 text-stone-700">{item.description}</td>
                      <td className="p-2.5 font-mono">{item.cartons} CTN</td>
                      <td className="p-2.5 text-right font-mono font-bold text-stone-900">{item.quantity.toLocaleString()} Pcs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => setSelectedChallan(null)}
                className="px-5 py-2 rounded-xl text-xs font-bold bg-stone-200 hover:bg-stone-300 text-stone-800 transition-colors"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

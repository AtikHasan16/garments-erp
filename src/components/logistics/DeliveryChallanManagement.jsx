'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  Truck, 
  Printer,
  Plus,
  X
} from 'lucide-react';

export const DeliveryChallanManagement = () => {
  const { challans, openChallanModal } = useERP();
  const [selectedChallan, setSelectedChallan] = useState(null);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Out for Delivery':
        return 'bg-amber-500/15 text-amber-900 border-amber-500/30';
      case 'Delivered':
        return 'bg-[#22c55e]/15 text-emerald-900 border-emerald-300';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const totalCartons = challans.reduce((sum, c) => sum + (c.totalCartons || 0), 0);
  const totalQty = challans.reduce((sum, c) => sum + (c.totalQuantity || 0), 0);

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-950 tracking-tight flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-600" />
            Delivery Challan & Gate Pass Hub (MongoDB Atlas Live)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">Generate outward gate passes, track delivery vehicles, and inspect carton packing lists</p>
        </div>

        <button 
          onClick={openChallanModal}
          className="self-start sm:self-auto bg-black hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Generate New Challan</span>
        </button>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">ACTIVE GATE PASSES</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">{challans.length} <span className="text-sm font-bold text-stone-500">Passes</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Port ICD & Air Cargo</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">CARTONS DISPATCHED</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">{totalCartons.toLocaleString()} <span className="text-sm font-bold text-stone-500">Cartons</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Export Grade Sealed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">TOTAL SHIPMENT UNITS</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">{totalQty.toLocaleString()} <span className="text-sm font-bold text-stone-500">Pcs</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Levi&apos;s, ZARA & Tommy</p>
        </div>

        <div className="p-5 rounded-2xl bg-black text-white shadow-md flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-300 uppercase tracking-wider">LOGISTICS PARTNER</span>
          <h3 className="text-3xl font-extrabold text-white tracking-tight mt-2">DHL & Port ICD</h3>
          <p className="text-xs text-stone-400 mt-1 font-semibold">MongoDB Atlas Records</p>
        </div>
      </div>

      {/* Challans List Table */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-black text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">CHALLAN & GATE PASS</th>
                <th className="py-3.5 px-4">BUYER & STYLE</th>
                <th className="py-3.5 px-4">CARTONS & QTY</th>
                <th className="py-3.5 px-4">VEHICLE & DRIVER</th>
                <th className="py-3.5 px-4">DISPATCH DATE & DESTINATION</th>
                <th className="py-3.5 px-4">STATUS</th>
                <th className="py-3.5 px-4 text-right">PRINT</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
              {challans.map((chal) => (
                <tr key={chal._id || chal.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-amber-700">{chal.challanNo}</div>
                    <div className="text-[11px] text-stone-500">Gate Pass: {chal.gatePassNo}</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-950">{chal.buyer}</div>
                    <div className="text-[11px] text-stone-500 font-mono">{chal.poNumber} &bull; {chal.styleCode}</div>
                  </td>
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-stone-950">{chal.totalQuantity?.toLocaleString()} Pcs</div>
                    <div className="text-[11px] text-stone-500">{chal.totalCartons} Cartons</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-800">{chal.vehicleNo}</div>
                    <div className="text-[11px] text-stone-500">{chal.driverName} ({chal.driverPhone})</div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="font-mono text-stone-800 font-bold">{chal.dispatchDate}</div>
                    <div className="text-[11px] text-stone-500 max-w-xs truncate">{chal.destination}</div>
                  </td>
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusBadge(chal.status)}`}>
                      {chal.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      onClick={() => setSelectedChallan(chal)}
                      className="p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-900 transition-colors cursor-pointer"
                      title="View Formal Gate Pass"
                    >
                      <Printer className="w-4 h-4" />
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
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
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
                className="p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
              >
                <X className="w-5 h-5" />
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
                <thead className="bg-black text-white font-bold uppercase text-[10px]">
                  <tr>
                    <th className="p-2.5">ITEM CODE</th>
                    <th className="p-2.5">DESCRIPTION</th>
                    <th className="p-2.5">CARTONS</th>
                    <th className="p-2.5 text-right">QUANTITY</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-200 font-medium">
                  {selectedChallan.items?.map((item, idx) => (
                    <tr key={idx}>
                      <td className="p-2.5 font-mono font-bold text-stone-900">{item.itemCode}</td>
                      <td className="p-2.5 text-stone-700">{item.description}</td>
                      <td className="p-2.5 font-mono">{item.cartons} CTN</td>
                      <td className="p-2.5 text-right font-mono font-bold text-stone-900">{item.quantity?.toLocaleString()} Pcs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-stone-200">
              <button
                onClick={() => setSelectedChallan(null)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-stone-100 hover:bg-stone-200 text-stone-800 transition-colors"
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

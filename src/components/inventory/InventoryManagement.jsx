'use client';

import React, { useState } from 'react';
import { useERP } from '../../context/ERPContext';
import { 
  Package, 
  Search, 
  Filter, 
  Plus
} from 'lucide-react';

export const InventoryManagement = () => {
  const { inventory, openInventoryModal } = useERP();
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = Array.from(new Set(inventory.map((i) => i.category)));

  const filteredItems = inventory.filter((item) => {
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'In Stock':
        return 'bg-[#22c55e]/15 text-emerald-900 border-emerald-300';
      case 'Low Stock':
        return 'bg-amber-500/15 text-amber-900 border-amber-500/30';
      case 'Critical':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-stone-100 text-stone-600 border-stone-200';
    }
  };

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  return (
    <div className="space-y-6 pb-12 bg-[#f8fafc] text-stone-900 min-h-full font-sans">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-stone-950 tracking-tight flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-600" />
            Fabric & Raw Material Inventory Ledger (MongoDB Atlas Live)
          </h2>
          <p className="text-xs text-stone-500 mt-0.5">Track fabric rolls, yarn cones, and trim stock levels with shade lot batch history</p>
        </div>

        <button 
          onClick={openInventoryModal}
          className="self-start sm:self-auto bg-black hover:bg-stone-800 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-md transition-all flex items-center gap-1.5 cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Log Fabric Arrival</span>
        </button>
      </div>

      {/* Top Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">TOTAL INVENTORY ITEMS</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">{inventory.length} <span className="text-sm font-bold text-stone-500">Items</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Fabric & Accessories</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">STOCK ALERTS</span>
          <h3 className="text-3xl font-extrabold text-amber-700 tracking-tight mt-2">{lowStockCount} <span className="text-sm font-bold text-stone-500">Low Stock</span></h3>
          <p className="text-xs text-amber-800 mt-1 font-semibold">Reorder Level Triggered</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-stone-200 shadow-sm flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-500 uppercase tracking-wider">CATEGORIES</span>
          <h3 className="text-3xl font-extrabold text-stone-950 tracking-tight mt-2">{categories.length} <span className="text-sm font-bold text-stone-500">Types</span></h3>
          <p className="text-xs text-stone-500 mt-1 font-semibold">Woven, Knit & Trims</p>
        </div>

        <div className="p-5 rounded-2xl bg-black text-white shadow-md flex flex-col justify-between">
          <span className="text-[11px] font-extrabold text-stone-300 uppercase tracking-wider">RAW INVENTORY VALUE</span>
          <h3 className="text-3xl font-extrabold text-white tracking-tight mt-2">${totalValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h3>
          <p className="text-xs text-stone-400 mt-1 font-semibold">MongoDB Atlas Collection</p>
        </div>
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
              placeholder="Search fabric, yarn, code..."
              className="w-full bg-stone-100 border border-stone-200 rounded-full pl-9 pr-4 py-2 text-xs text-stone-900 placeholder-stone-400 focus:outline-none focus:ring-2 focus:ring-amber-500/50"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs font-bold text-stone-600">
          <Filter className="w-3.5 h-3.5" />
          <span>CATEGORY:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-stone-100 border border-stone-200 rounded-xl px-3 py-1.5 text-xs font-bold text-stone-900 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Items Grid / Table */}
      <div className="rounded-2xl bg-white border border-stone-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs font-sans">
            <thead className="bg-black text-white uppercase text-[10px] font-bold tracking-wider">
              <tr>
                <th className="py-3.5 px-4">ITEM & BATCH CODE</th>
                <th className="py-3.5 px-4">CATEGORY</th>
                <th className="py-3.5 px-4">STOCK QUANTITY</th>
                <th className="py-3.5 px-4">REORDER LEVEL</th>
                <th className="py-3.5 px-4">SUPPLIER</th>
                <th className="py-3.5 px-4">LOCATION</th>
                <th className="py-3.5 px-4">STATUS</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 font-medium text-stone-800">
              {filteredItems.map((item) => (
                <tr key={item._id || item.id} className="hover:bg-stone-50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-stone-950">{item.name}</div>
                    <div className="text-[11px] text-stone-500 font-mono flex items-center gap-2 mt-0.5">
                      <span className="text-amber-700 font-bold">{item.itemCode}</span>
                      <span>&bull;</span>
                      <span>Lot: {item.shadeLot}</span>
                      <span>&bull;</span>
                      <span>Batch: {item.batchNo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-semibold text-stone-700">{item.category}</td>
                  <td className="py-4 px-4 font-mono">
                    <div className="font-bold text-stone-950 text-sm">
                      {item.quantity?.toLocaleString()} {item.unit}
                    </div>
                    <div className="text-[10px] text-stone-500">Cost: ${item.unitCost?.toFixed(2)}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-stone-600">{item.reorderLevel?.toLocaleString()} {item.unit}</td>
                  <td className="py-4 px-4 text-stone-700">{item.supplier}</td>
                  <td className="py-4 px-4 text-stone-600 font-mono">{item.location}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-3 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
                      {item.status}
                    </span>
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

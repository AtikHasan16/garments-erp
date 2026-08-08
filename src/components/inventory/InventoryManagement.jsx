'use client';

import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Plus
} from 'lucide-react';

export const InventoryManagement = ({ inventory }) => {
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
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      case 'Low Stock':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'Critical':
        return 'bg-rose-500/10 text-rose-400 border-rose-500/30';
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
            <Package className="w-5 h-5 text-amber-500" />
            Fabric & Raw Material Inventory Ledger
          </h2>
          <p className="text-xs text-slate-400">Track fabric rolls, yarn cones, and trim stock levels with shade lot batch history</p>
        </div>

        <button className="self-start sm:self-auto bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold px-4 py-2.5 rounded-xl shadow-lg transition-all flex items-center gap-1.5 cursor-pointer">
          <Plus className="w-4 h-4" />
          <span>Receive Material Roll</span>
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
              placeholder="Search fabric, yarn, code..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-9 pr-3 py-1.5 text-xs text-stone-200 placeholder-stone-500 focus:outline-none focus:border-amber-500"
            />
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-stone-400">
          <Filter className="w-3.5 h-3.5" />
          <span>Category:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-1.5 text-xs text-stone-200 focus:outline-none"
          >
            <option value="All">All Categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Inventory Items Grid / Table */}
      <div className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-stone-300">
            <thead className="bg-stone-950 text-stone-400 uppercase font-semibold text-[11px] border-b border-stone-800">
              <tr>
                <th className="py-3.5 px-4">Item & Batch Code</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Stock Quantity</th>
                <th className="py-3.5 px-4">Reorder Level</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Warehouse Location</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-800/60 font-medium">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-stone-800/40 transition-colors">
                  <td className="py-4 px-4">
                    <div className="font-bold text-white">{item.name}</div>
                    <div className="text-[11px] text-stone-400 font-mono flex items-center gap-2 mt-0.5">
                      <span className="text-amber-400">{item.itemCode}</span>
                      <span>&bull;</span>
                      <span>Lot: {item.shadeLot}</span>
                      <span>&bull;</span>
                      <span>Batch: {item.batchNo}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 font-medium text-stone-300">{item.category}</td>
                  <td className="py-4 px-4">
                    <div className="font-extrabold text-white text-sm font-mono">
                      {item.quantity.toLocaleString()} {item.unit}
                    </div>
                    <div className="text-[10px] text-stone-400">Unit Cost: ${item.unitCost.toFixed(2)}</div>
                  </td>
                  <td className="py-4 px-4 font-mono text-stone-400">{item.reorderLevel.toLocaleString()} {item.unit}</td>
                  <td className="py-4 px-4 text-stone-300">{item.supplier}</td>
                  <td className="py-4 px-4 text-stone-400 font-mono">{item.location}</td>
                  <td className="py-4 px-4">
                    <span className={`inline-block text-[10px] font-bold px-2.5 py-1 rounded-full border ${getStatusBadge(item.status)}`}>
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

'use client';

import React, { useState } from 'react';
import { 
  Package, 
  AlertTriangle
} from 'lucide-react';
import { InventoryItem } from '../../types/erp';

interface InventoryManagementProps {
  inventory: InventoryItem[];
  searchQuery: string;
  onUpdateInventory?: (newInventory: InventoryItem[]) => void;
}

export const InventoryManagement: React.FC<InventoryManagementProps> = ({
  inventory,
  searchQuery,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedStatus, setSelectedStatus] = useState<string>('All');

  const categories = ['All', 'Yarn', 'Fabric (Knit)', 'Fabric (Woven)', 'Trims & Accessories', 'Dyes & Chemicals'];
  const statuses = ['All', 'In Stock', 'Low Stock', 'Critical'];

  const filteredItems = inventory.filter((item) => {
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.itemCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.supplier.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesStatus = selectedStatus === 'All' || item.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const lowStockCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;
  const totalValuation = inventory.reduce((sum, item) => sum + (item.quantity * item.unitCost), 0);

  return (
    <div className="space-y-6">
      {/* Module Title & Quick Stats Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-stone-900 border border-stone-800 p-6 rounded-2xl text-white">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Package className="w-5 h-5 text-amber-400" />
            <h2 className="text-xl font-bold tracking-tight">Fabric & Raw Material Inventory</h2>
            <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase">
              Batch Ledger
            </span>
          </div>
          <p className="text-xs text-stone-400">
            Real-time material tracking, shade lot verification, and automated reorder threshold monitoring.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-4 py-2 bg-stone-800/80 rounded-xl border border-stone-700 text-right">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Total Stock Value</span>
            <span className="text-lg font-extrabold text-amber-400">${totalValuation.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
          </div>
          <div className="px-4 py-2 bg-stone-800/80 rounded-xl border border-stone-700 text-right">
            <span className="text-[10px] uppercase font-semibold text-stone-400 block">Stock Alerts</span>
            <span className={`text-lg font-extrabold ${lowStockCount > 0 ? 'text-amber-500' : 'text-emerald-400'}`}>
              {lowStockCount} Low Items
            </span>
          </div>
        </div>
      </div>

      {/* Warning Banner if items low in stock */}
      {lowStockCount > 0 && (
        <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 flex items-center justify-between text-amber-800 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
            <div className="text-xs">
              <span className="font-bold">Automated Reorder Alert:</span> {lowStockCount} inventory items have dropped below defined safety reorder thresholds.
            </div>
          </div>
          <button className="bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors shrink-0">
            Generate Reorder PO
          </button>
        </div>
      )}

      {/* Filter & Control Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 rounded-xl shadow-sm">
        {/* Category Tabs */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-amber-700 text-white shadow-sm'
                  : 'text-stone-600 dark:text-stone-300 hover:bg-stone-100 dark:hover:bg-stone-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-end">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-stone-500">Status:</span>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="bg-stone-100 dark:bg-stone-800 text-stone-900 dark:text-stone-100 text-xs rounded-lg px-3 py-1.5 border border-stone-300 dark:border-stone-700 focus:outline-none"
            >
              {statuses.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-stone-100 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 uppercase font-bold text-[10px] tracking-wider border-b border-stone-200 dark:border-stone-800">
                <th className="py-3.5 px-4">Item Code & Name</th>
                <th className="py-3.5 px-4">Category</th>
                <th className="py-3.5 px-4">Available Stock</th>
                <th className="py-3.5 px-4">Reorder Point</th>
                <th className="py-3.5 px-4">Unit Price</th>
                <th className="py-3.5 px-4">Supplier</th>
                <th className="py-3.5 px-4">Shade / Batch</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-200 dark:divide-stone-800/60 font-medium">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.id} className="hover:bg-stone-50 dark:hover:bg-stone-800/40 transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 dark:text-white">{item.name}</div>
                      <div className="text-[11px] font-mono text-stone-500">{item.itemCode}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 text-[11px] font-medium border border-stone-200 dark:border-stone-700">
                        {item.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-stone-900 dark:text-stone-100">
                        {item.quantity.toLocaleString()} {item.unit}
                      </div>
                      <div className="text-[10px] text-stone-500">Loc: {item.location}</div>
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400">
                      {item.reorderLevel.toLocaleString()} {item.unit}
                    </td>
                    <td className="py-3.5 px-4 font-mono font-semibold text-stone-900 dark:text-stone-200">
                      ${item.unitCost.toFixed(2)} / {item.unit}
                    </td>
                    <td className="py-3.5 px-4 text-stone-700 dark:text-stone-300">
                      {item.supplier}
                    </td>
                    <td className="py-3.5 px-4 text-stone-600 dark:text-stone-400">
                      <div className="text-[11px] font-mono">Lot: {item.shadeLot || 'LOT-882'}</div>
                      <div className="text-[10px] text-stone-500">Batch: {item.batchNo || 'B-9910'}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span className={`inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        item.status === 'In Stock'
                          ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30'
                          : item.status === 'Low Stock'
                          ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30'
                          : 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/30'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button className="text-amber-700 dark:text-amber-400 hover:underline font-semibold text-xs">
                        Adjust Stock
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="py-8 text-center text-stone-500 text-xs">
                    No raw materials match your current search and category filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

'use client';

import React, { useState } from 'react';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY 
} from '../../data/mockErpData';
import { X, Sparkles } from 'lucide-react';

export default function DashboardLayout({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');

  // New Order Modal State
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState({
    poNumber: '',
    styleCode: '',
    styleName: '',
    buyer: 'ZARA Man',
    garmentCategory: 'T-Shirt',
    orderQty: 20000,
    fobPrice: 5.50,
    shipmentDate: '2026-09-30',
    priority: 'High',
    factoryLine: 'Line 01 (Floor A)',
  });

  const lowStockAlertsCount = INITIAL_INVENTORY.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;

  const handleCreateOrder = (e) => {
    e.preventDefault();
    setIsNewOrderModalOpen(false);
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-stone-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        totalOrdersCount={INITIAL_ORDERS.length}
        lowStockAlertsCount={lowStockAlertsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">
        {/* Header Bar */}
        <Header 
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
        />

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] text-stone-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* Create New Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 relative font-sans">
            <button 
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>GarmentsOS Order Entry</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-950">Create Purchase Order</h3>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">PO Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="PO-889100"
                    value={newOrder.poNumber}
                    onChange={(e) => setNewOrder({...newOrder, poNumber: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Style Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ST-TSHIRT-99"
                    value={newOrder.styleCode}
                    onChange={(e) => setNewOrder({...newOrder, styleCode: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Style Description Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Organic Crewneck Heavy T-Shirt"
                  value={newOrder.styleName}
                  onChange={(e) => setNewOrder({...newOrder, styleName: e.target.value})}
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-semibold"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Buyer Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ZARA Man"
                    value={newOrder.buyer}
                    onChange={(e) => setNewOrder({...newOrder, buyer: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Order Qty (Pcs)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="20000"
                    value={newOrder.orderQty}
                    onChange={(e) => setNewOrder({...newOrder, orderQty: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono font-bold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">FOB Unit Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required 
                    placeholder="5.50"
                    value={newOrder.fobPrice}
                    onChange={(e) => setNewOrder({...newOrder, fobPrice: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Shipment Target Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newOrder.shipmentDate}
                    onChange={(e) => setNewOrder({...newOrder, shipmentDate: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-500/50 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors cursor-pointer"
                >
                  Save & Register PO
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

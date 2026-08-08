'use client';

import React, { useState } from 'react';
import { 
  INITIAL_ORDERS, 
  INITIAL_LINES, 
  INITIAL_INVENTORY, 
  INITIAL_DELIVERY_CHALLANS,
  INITIAL_QUALITY_AUDITS 
} from '../data/mockErpData';

import { MarketingLandingPage } from '../components/marketing/MarketingLandingPage';
import { Sidebar } from '../components/layout/Sidebar';
import { Header } from '../components/layout/Header';
import { OverviewDashboard } from '../components/dashboard/OverviewDashboard';
import { OrderManagement } from '../components/orders/OrderManagement';
import { ProductionWip } from '../components/production/ProductionWip';
import { InventoryManagement } from '../components/inventory/InventoryManagement';
import { DeliveryChallanManagement } from '../components/logistics/DeliveryChallanManagement';
import { X, Sparkles } from 'lucide-react';

export default function Home() {
  const [activeModule, setActiveModule] = useState('landing');
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [lines] = useState(INITIAL_LINES);
  const [inventory] = useState(INITIAL_INVENTORY);
  const [challans] = useState(INITIAL_DELIVERY_CHALLANS);

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

  const handleCreateOrder = (e) => {
    e.preventDefault();
    if (!newOrder.poNumber || !newOrder.styleCode || !newOrder.styleName) return;

    const created = {
      id: `ORD-2026-${100 + orders.length + 1}`,
      poNumber: newOrder.poNumber,
      styleCode: newOrder.styleCode,
      styleName: newOrder.styleName,
      buyer: newOrder.buyer || 'ZARA Man',
      garmentCategory: newOrder.garmentCategory || 'T-Shirt',
      orderQty: Number(newOrder.orderQty) || 10000,
      fobPrice: Number(newOrder.fobPrice) || 5.00,
      totalValue: (Number(newOrder.orderQty) || 10000) * (Number(newOrder.fobPrice) || 5.00),
      shipmentDate: newOrder.shipmentDate || '2026-09-30',
      status: 'Sampling',
      priority: newOrder.priority || 'Normal',
      factoryLine: newOrder.factoryLine || 'Line 01 (Floor A)',
      cuttingProgress: 0,
      sewingProgress: 0,
      finishingProgress: 0,
      samplingMilestones: {
        labDip: true,
        fitSample: false,
        ppSample: false,
        bulkFabricReceived: false,
      },
    };

    setOrders([created, ...orders]);
    setIsNewOrderModalOpen(false);
    setActiveModule('orders');
  };

  const lowStockAlertsCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;

  // Render Public Marketing Landing Page if activeModule === 'landing'
  if (activeModule === 'landing') {
    return (
      <MarketingLandingPage 
        onNavigateToErp={(module) => setActiveModule(module)} 
      />
    );
  }

  // Otherwise render full GarmentsOS ERP Application Shell
  return (
    <div className="flex h-screen bg-stone-950 text-stone-100 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        activeTab={activeModule}
        setActiveTab={(tab) => setActiveModule(tab)}
        totalOrdersCount={orders.length}
        lowStockAlertsCount={lowStockAlertsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-stone-950 overflow-hidden">
        {/* Header Bar */}
        <Header 
          activeTab={activeModule}
          onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
          onNavigateToLanding={() => setActiveModule('landing')}
        />

        {/* Dynamic Module Workspace */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#0c0a09] text-stone-200">
          <div className="max-w-7xl mx-auto">
            {activeModule === 'overview' && (
              <OverviewDashboard 
                orders={orders}
                lines={lines}
                inventory={inventory}
                audits={INITIAL_QUALITY_AUDITS}
                onNavigateToTab={(tab) => setActiveModule(tab)}
                onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
              />
            )}

            {activeModule === 'orders' && (
              <OrderManagement 
                orders={orders}
                searchQuery={searchQuery}
                onOpenNewOrderModal={() => setIsNewOrderModalOpen(true)}
              />
            )}

            {activeModule === 'production' && (
              <ProductionWip 
                lines={lines}
              />
            )}

            {activeModule === 'inventory' && (
              <InventoryManagement 
                inventory={inventory}
              />
            )}

            {activeModule === 'logistics' && (
              <DeliveryChallanManagement 
                challans={challans}
              />
            )}
          </div>
        </main>
      </div>

      {/* Create New Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-800 text-stone-100 relative">
            <button 
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-400 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>GarmentsOS Order Entry</span>
              </div>
              <h3 className="text-2xl font-extrabold text-white">Create Purchase Order</h3>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">PO Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="PO-889100"
                    value={newOrder.poNumber}
                    onChange={(e) => setNewOrder({...newOrder, poNumber: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Style Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ST-TSHIRT-99"
                    value={newOrder.styleCode}
                    onChange={(e) => setNewOrder({...newOrder, styleCode: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Style Description Name</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Organic Crewneck Heavy T-Shirt"
                  value={newOrder.styleName}
                  onChange={(e) => setNewOrder({...newOrder, styleName: e.target.value})}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Buyer Name</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="ZARA Man"
                    value={newOrder.buyer}
                    onChange={(e) => setNewOrder({...newOrder, buyer: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Order Qty (Pcs)</label>
                  <input 
                    type="number" 
                    required 
                    placeholder="20000"
                    value={newOrder.orderQty}
                    onChange={(e) => setNewOrder({...newOrder, orderQty: Number(e.target.value)})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">FOB Unit Price ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required 
                    placeholder="5.50"
                    value={newOrder.fobPrice}
                    onChange={(e) => setNewOrder({...newOrder, fobPrice: Number(e.target.value)})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 uppercase tracking-wider mb-1">Shipment Target Date</label>
                  <input 
                    type="date" 
                    required 
                    value={newOrder.shipmentDate}
                    onChange={(e) => setNewOrder({...newOrder, shipmentDate: e.target.value})}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-stone-100 focus:outline-none focus:border-amber-500 font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-stone-400 hover:text-white font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#b45309] hover:bg-[#92400e] text-white px-5 py-2 rounded-xl font-bold uppercase tracking-wider shadow-md transition-colors cursor-pointer"
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

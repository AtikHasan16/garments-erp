'use client';

import React, { useState } from 'react';
import { ActiveModule, GarmentOrder } from '../types/erp';
import { 
  INITIAL_ORDERS, 
  INITIAL_LINES, 
  INITIAL_INVENTORY, 
  INITIAL_DELIVERY_CHALLANS,
  INITIAL_QUALITY_AUDITS,
  MOCK_TECH_PACK 
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
  const [activeModule, setActiveModule] = useState<ActiveModule>('landing');
  const [orders, setOrders] = useState<GarmentOrder[]>(INITIAL_ORDERS);
  const [lines] = useState(INITIAL_LINES);
  const [inventory] = useState(INITIAL_INVENTORY);
  const [challans] = useState(INITIAL_DELIVERY_CHALLANS);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');

  // New Order Modal State
  const [isNewOrderModalOpen, setIsNewOrderModalOpen] = useState(false);
  const [newOrder, setNewOrder] = useState<Partial<GarmentOrder>>({
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

  const handleCreateOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrder.poNumber || !newOrder.styleCode || !newOrder.styleName) return;

    const created: GarmentOrder = {
      id: `ORD-2026-${100 + orders.length + 1}`,
      poNumber: newOrder.poNumber,
      styleCode: newOrder.styleCode,
      styleName: newOrder.styleName,
      buyer: newOrder.buyer || 'ZARA Man',
      garmentCategory: (newOrder.garmentCategory as GarmentOrder['garmentCategory']) || 'T-Shirt',
      orderQty: Number(newOrder.orderQty) || 10000,
      fobPrice: Number(newOrder.fobPrice) || 5.00,
      totalValue: (Number(newOrder.orderQty) || 10000) * (Number(newOrder.fobPrice) || 5.00),
      shipmentDate: newOrder.shipmentDate || '2026-09-30',
      status: 'Sampling',
      priority: (newOrder.priority as GarmentOrder['priority']) || 'Normal',
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
                orders={orders}
              />
            )}

            {activeModule === 'inventory' && (
              <InventoryManagement 
                inventory={inventory}
                searchQuery={searchQuery}
              />
            )}

            {activeModule === 'logistics' && (
              <DeliveryChallanManagement 
                challans={challans}
                searchQuery={searchQuery}
              />
            )}

            {/* Quality Fallback Tab */}
            {activeModule === 'quality' && (
              <div className="space-y-6">
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-2">
                  <h2 className="text-xl font-bold text-white">Quality & DHU Audit (AQL 2.5)</h2>
                  <p className="text-xs text-stone-400">Line inspection defect rates, major flaw logs, and pass/fail certificates.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {INITIAL_QUALITY_AUDITS.map((audit) => (
                    <div key={audit.id} className="bg-stone-900 p-5 rounded-2xl border border-stone-800 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="font-extrabold text-sm text-white">{audit.lineName}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                          {audit.status}
                        </span>
                      </div>
                      <p className="text-xs text-stone-400">Inspector: {audit.inspector} | Style: {audit.styleCode}</p>
                      <div className="text-xs font-mono font-bold text-amber-400">DHU Defect Rate: {audit.dhuRate}%</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Pack Fallback Tab */}
            {activeModule === 'techpack' && (
              <div className="space-y-6">
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-2">
                  <h2 className="text-xl font-bold text-white">Style Specification & Tech Pack BOM</h2>
                  <p className="text-xs text-stone-400">Bill of materials, fabric consumption per garment, and trim specs for {MOCK_TECH_PACK.styleName}.</p>
                </div>
                <div className="bg-stone-900 p-6 rounded-2xl border border-stone-800 space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
                    <div><span className="text-stone-400 block">Buyer</span><span className="font-bold text-white">{MOCK_TECH_PACK.buyer}</span></div>
                    <div><span className="text-stone-400 block">Fabric Type</span><span className="font-bold text-white">{MOCK_TECH_PACK.fabricType}</span></div>
                    <div><span className="text-stone-400 block">GSM</span><span className="font-bold text-white">{MOCK_TECH_PACK.gsm} gsm</span></div>
                    <div><span className="text-stone-400 block">Season</span><span className="font-bold text-white">{MOCK_TECH_PACK.season}</span></div>
                  </div>

                  <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 pt-2">Bill of Materials (BOM)</h4>
                  <table className="w-full text-left text-xs border border-stone-800 rounded-xl overflow-hidden">
                    <thead className="bg-stone-800 text-stone-300 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-2.5 px-3">Item</th>
                        <th className="py-2.5 px-3">Specification</th>
                        <th className="py-2.5 px-3">Consumption</th>
                        <th className="py-2.5 px-3">Unit Cost</th>
                        <th className="py-2.5 px-3">Supplier</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-stone-800">
                      {MOCK_TECH_PACK.bom.map((b, idx) => (
                        <tr key={idx}>
                          <td className="py-2.5 px-3 font-bold text-white">{b.item}</td>
                          <td className="py-2.5 px-3 text-stone-300">{b.specification}</td>
                          <td className="py-2.5 px-3 text-amber-400 font-mono">{b.consumptionPerGarment}</td>
                          <td className="py-2.5 px-3 font-mono">${b.unitCost.toFixed(2)}</td>
                          <td className="py-2.5 px-3 text-stone-400">{b.supplier}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        </main>
      </div>

      {/* Create New Garment Purchase Order Modal */}
      {isNewOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-stone-900 rounded-3xl max-w-xl w-full p-7 shadow-2xl border border-stone-800 text-stone-100 relative space-y-6">
            <button 
              onClick={() => setIsNewOrderModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div>
              <div className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 uppercase tracking-wider mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Merchandising Module</span>
              </div>
              <h3 className="text-xl font-extrabold text-white">Create New Garment Purchase Order</h3>
              <p className="text-xs text-stone-400">Initialize buyer PO parameters and allocate factory production line.</p>
            </div>

            <form onSubmit={handleCreateOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">PO Number</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. PO-901248"
                    value={newOrder.poNumber}
                    onChange={(e) => setNewOrder({ ...newOrder, poNumber: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Style Code</label>
                  <input 
                    type="text"
                    required
                    placeholder="e.g. ST-DENIM-105"
                    value={newOrder.styleCode}
                    onChange={(e) => setNewOrder({ ...newOrder, styleCode: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-300 mb-1">Style Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g. Relaxed Vintage Denim Jacket"
                  value={newOrder.styleName}
                  onChange={(e) => setNewOrder({ ...newOrder, styleName: e.target.value })}
                  className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Buyer Enterprise</label>
                  <select
                    value={newOrder.buyer}
                    onChange={(e) => setNewOrder({ ...newOrder, buyer: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="Levi Strauss & Co.">Levi Strauss & Co.</option>
                    <option value="ZARA Man">ZARA Man</option>
                    <option value="H&M Sport">H&M Sport</option>
                    <option value="Tommy Hilfiger">Tommy Hilfiger</option>
                    <option value="Uniqlo Global">Uniqlo Global</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Garment Category</label>
                  <select
                    value={newOrder.garmentCategory}
                    onChange={(e) => setNewOrder({ ...newOrder, garmentCategory: e.target.value as GarmentOrder['garmentCategory'] })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-amber-500"
                  >
                    <option value="T-Shirt">T-Shirt</option>
                    <option value="Denim Jeans">Denim Jeans</option>
                    <option value="Hoodie">Hoodie</option>
                    <option value="Jacket">Jacket</option>
                    <option value="Polo Shirt">Polo Shirt</option>
                    <option value="Dress">Dress</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Order Qty (Pcs)</label>
                  <input 
                    type="number"
                    value={newOrder.orderQty}
                    onChange={(e) => setNewOrder({ ...newOrder, orderQty: Number(e.target.value) })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">FOB Price ($)</label>
                  <input 
                    type="number"
                    step="0.1"
                    value={newOrder.fobPrice}
                    onChange={(e) => setNewOrder({ ...newOrder, fobPrice: Number(e.target.value) })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-300 mb-1">Shipment Target</label>
                  <input 
                    type="date"
                    value={newOrder.shipmentDate}
                    onChange={(e) => setNewOrder({ ...newOrder, shipmentDate: e.target.value })}
                    className="w-full bg-stone-800 border border-stone-700 rounded-xl px-3 py-2 text-white focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-800">
                <button
                  type="button"
                  onClick={() => setIsNewOrderModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl font-semibold text-stone-400 hover:text-white hover:bg-stone-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#b45309] hover:bg-[#92400e] text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider transition-colors shadow-md"
                >
                  Initialize Purchase Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

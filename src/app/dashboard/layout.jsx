'use client';

import React, { useState } from 'react';
import { ERPProvider, useERP } from '../../context/ERPContext';
import { Sidebar } from '../../components/layout/Sidebar';
import { Header } from '../../components/layout/Header';
import { X, Sparkles, Database } from 'lucide-react';

function DashboardContent({ children }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');

  const {
    orders,
    inventory,
    isOrderModalOpen,
    setIsOrderModalOpen,
    isInventoryModalOpen,
    setIsInventoryModalOpen,
    isChallanModalOpen,
    setIsChallanModalOpen,
    addOrder,
    addInventoryItem,
    addChallan,
    seedDatabase,
    loading
  } = useERP();

  // Create Order State
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

  // Create Inventory State
  const [newItem, setNewItem] = useState({
    itemCode: '',
    name: '',
    category: 'Fabric (Woven)',
    quantity: 5000,
    unit: 'Yds',
    reorderLevel: 1000,
    supplier: 'Pacific Denim Mills',
    unitCost: 3.20,
    location: 'Warehouse Rack A1',
    shadeLot: 'LOT-108',
    batchNo: 'BATCH-2026',
    status: 'In Stock'
  });

  // Create Challan State
  const [newChallan, setNewChallan] = useState({
    challanNo: '',
    gatePassNo: '',
    buyer: 'Global Denim Co.',
    poNumber: 'PO-889100',
    styleCode: 'GOS-102',
    vehicleNo: 'DHK-METRO-11-2090',
    driverName: 'Abdul Karim',
    driverPhone: '+880 1711-209011',
    totalCartons: 150,
    totalQuantity: 5000,
    dispatchDate: '2026-08-10',
    destination: 'Chittagong Port Sea Cargo ICD Terminal',
    status: 'Out for Delivery'
  });

  const lowStockAlertsCount = inventory.filter(i => i.status === 'Low Stock' || i.status === 'Critical').length;

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    await addOrder(newOrder);
  };

  const handleInventorySubmit = async (e) => {
    e.preventDefault();
    await addInventoryItem(newItem);
  };

  const handleChallanSubmit = async (e) => {
    e.preventDefault();
    await addChallan({
      ...newChallan,
      items: [
        {
          itemCode: newChallan.styleCode,
          description: `Garments Carton Shipment for ${newChallan.buyer}`,
          cartons: newChallan.totalCartons,
          quantity: newChallan.totalQuantity
        }
      ]
    });
  };

  return (
    <div className="flex h-screen bg-[#f8fafc] text-stone-900 font-sans overflow-hidden">
      {/* Sidebar Navigation */}
      <Sidebar 
        totalOrdersCount={orders.length}
        lowStockAlertsCount={lowStockAlertsCount}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] overflow-hidden">
        {/* Header Bar */}
        <Header 
          onOpenNewOrderModal={() => setIsOrderModalOpen(true)}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          selectedFloor={selectedFloor}
          setSelectedFloor={setSelectedFloor}
        />

        {/* Database Seeder Callout Header if database is empty */}
        {orders.length === 0 && !loading && (
          <div className="bg-amber-500/10 border-b border-amber-500/30 px-8 py-2.5 text-xs text-amber-900 flex items-center justify-between font-medium">
            <div className="flex items-center gap-2">
              <Database className="w-4 h-4 text-amber-700 animate-pulse" />
              <span>MongoDB Atlas Connected. Database is empty — click to populate initial sample enterprise records:</span>
            </div>
            <button
              onClick={seedDatabase}
              className="bg-amber-700 hover:bg-amber-800 text-white font-bold px-3 py-1 rounded-lg text-[11px] uppercase tracking-wider transition-colors cursor-pointer"
            >
              Seed Sample MongoDB Data
            </button>
          </div>
        )}

        {/* Dynamic Page Content */}
        <main className="flex-1 overflow-y-auto p-6 bg-[#f8fafc] text-stone-900">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>

      {/* 1. Create New Order Modal */}
      {isOrderModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 relative font-sans">
            <button 
              onClick={() => setIsOrderModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>MongoDB Atlas CRUD Entry</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-950">Create Purchase Order</h3>
            </div>

            <form onSubmit={handleOrderSubmit} className="space-y-4 text-xs font-sans">
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
                  onClick={() => setIsOrderModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors cursor-pointer"
                >
                  Save to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Log Fabric Arrival Inventory Modal */}
      {isInventoryModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 relative font-sans">
            <button 
              onClick={() => setIsInventoryModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>MongoDB Atlas Inventory Ledger</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-950">Log Fabric Arrival</h3>
            </div>

            <form onSubmit={handleInventorySubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Item Code</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="FAB-INDIGO-99"
                    value={newItem.itemCode}
                    onChange={(e) => setNewItem({...newItem, itemCode: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({...newItem, category: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-bold"
                  >
                    <option value="Fabric (Woven)">Fabric (Woven)</option>
                    <option value="Fabric (Knit)">Fabric (Knit)</option>
                    <option value="Yarn">Yarn</option>
                    <option value="Trims">Trims & Accessories</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Material Name & Spec</label>
                <input 
                  type="text" 
                  required 
                  placeholder="Indigo Stretch Denim 12oz (98% Cotton / 2% Elastane)"
                  value={newItem.name}
                  onChange={(e) => setNewItem({...newItem, name: e.target.value})}
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Quantity</label>
                  <input 
                    type="number" 
                    required 
                    value={newItem.quantity}
                    onChange={(e) => setNewItem({...newItem, quantity: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Unit</label>
                  <input 
                    type="text" 
                    required 
                    value={newItem.unit}
                    onChange={(e) => setNewItem({...newItem, unit: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Unit Cost ($)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    required 
                    value={newItem.unitCost}
                    onChange={(e) => setNewItem({...newItem, unitCost: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Supplier Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newItem.supplier}
                    onChange={(e) => setNewItem({...newItem, supplier: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Reorder Threshold</label>
                  <input 
                    type="number" 
                    required 
                    value={newItem.reorderLevel}
                    onChange={(e) => setNewItem({...newItem, reorderLevel: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsInventoryModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors cursor-pointer"
                >
                  Log Material to MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Generate Gate Pass Challan Modal */}
      {isChallanModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-8 shadow-2xl border border-stone-200 text-stone-900 relative font-sans">
            <button 
              onClick={() => setIsChallanModalOpen(false)}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-900 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="mb-6 space-y-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-extrabold text-amber-700 uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-amber-600" />
                <span>MongoDB Atlas Gate Pass Hub</span>
              </div>
              <h3 className="text-2xl font-extrabold text-stone-950">Generate Delivery Challan</h3>
            </div>

            <form onSubmit={handleChallanSubmit} className="space-y-4 text-xs font-sans">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Challan Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="DC-2026-90"
                    value={newChallan.challanNo}
                    onChange={(e) => setNewChallan({...newChallan, challanNo: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Gate Pass Number</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="GP-99201"
                    value={newChallan.gatePassNo}
                    onChange={(e) => setNewChallan({...newChallan, gatePassNo: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Buyer Name</label>
                  <input 
                    type="text" 
                    required 
                    value={newChallan.buyer}
                    onChange={(e) => setNewChallan({...newChallan, buyer: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">PO Number</label>
                  <input 
                    type="text" 
                    required 
                    value={newChallan.poNumber}
                    onChange={(e) => setNewChallan({...newChallan, poNumber: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Vehicle Registration</label>
                  <input 
                    type="text" 
                    required 
                    value={newChallan.vehicleNo}
                    onChange={(e) => setNewChallan({...newChallan, vehicleNo: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Driver Name & Phone</label>
                  <input 
                    type="text" 
                    required 
                    value={newChallan.driverName}
                    onChange={(e) => setNewChallan({...newChallan, driverName: e.target.value})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Total Cartons</label>
                  <input 
                    type="number" 
                    required 
                    value={newChallan.totalCartons}
                    onChange={(e) => setNewChallan({...newChallan, totalCartons: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Total Shipment Units (Pcs)</label>
                  <input 
                    type="number" 
                    required 
                    value={newChallan.totalQuantity}
                    onChange={(e) => setNewChallan({...newChallan, totalQuantity: Number(e.target.value)})}
                    className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-extrabold text-stone-700 uppercase tracking-wider mb-1">Destination Address</label>
                <input 
                  type="text" 
                  required 
                  value={newChallan.destination}
                  onChange={(e) => setNewChallan({...newChallan, destination: e.target.value})}
                  className="w-full bg-stone-100 border border-stone-200 rounded-xl px-3.5 py-2.5 text-stone-900 focus:outline-none font-semibold"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsChallanModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl text-stone-600 hover:text-stone-900 font-bold transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black hover:bg-stone-800 text-white px-6 py-2.5 rounded-xl font-bold uppercase tracking-wider text-xs shadow-md transition-colors cursor-pointer"
                >
                  Issue Gate Pass in MongoDB
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function DashboardLayout({ children }) {
  return (
    <ERPProvider>
      <DashboardContent>{children}</DashboardContent>
    </ERPProvider>
  );
}

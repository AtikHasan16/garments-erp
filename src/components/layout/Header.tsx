'use client';

import React from 'react';
import { 
  Search, 
  Plus, 
  Bell, 
  Building2, 
  Globe,
  ChevronRight
} from 'lucide-react';
import { ActiveModule } from '../../types/erp';

interface HeaderProps {
  activeTab: ActiveModule;
  onOpenNewOrderModal: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedFloor: string;
  setSelectedFloor: (floor: string) => void;
  onNavigateToLanding: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onOpenNewOrderModal,
  searchQuery,
  setSearchQuery,
  selectedFloor,
  setSelectedFloor,
  onNavigateToLanding,
}) => {
  const moduleNames: Record<ActiveModule, string> = {
    landing: 'Marketing Portal',
    overview: 'Executive Pulse & Analytics',
    orders: 'Merchandise Orders & Style Library',
    production: 'Production WIP & Line Monitoring',
    inventory: 'Fabric & Raw Stock Inventory',
    logistics: 'Delivery Challan & Gate Passes',
    quality: 'Quality & DHU Audit (AQL 2.5)',
    techpack: 'Style & Tech Pack BOM Specification',
  };

  return (
    <header className="bg-stone-900 border-b border-stone-800 px-6 py-3.5 text-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 sticky top-0 z-30 shadow-md">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold">
        <button 
          onClick={onNavigateToLanding}
          className="text-stone-400 hover:text-white transition-colors flex items-center gap-1"
        >
          <Globe className="w-3.5 h-3.5 text-amber-500" />
          <span>GarmentsOS</span>
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-600" />
        <span className="text-amber-400 font-bold">
          {moduleNames[activeTab] || 'ERP Module'}
        </span>
      </div>

      {/* Center Search & Controls */}
      <div className="flex items-center gap-3 w-full sm:w-auto">
        {/* Global Search Bar */}
        <div className="relative flex-1 sm:w-72">
          <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search PO, style code, fabric..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-800 text-stone-100 placeholder-stone-400 text-xs rounded-xl pl-9 pr-4 py-2 border border-stone-700 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500"
          />
        </div>

        {/* Floor Filter Selector */}
        <div className="hidden lg:flex items-center gap-1.5 bg-stone-800 px-3 py-1.5 rounded-xl border border-stone-700 text-xs">
          <Building2 className="w-3.5 h-3.5 text-amber-400" />
          <select
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="bg-transparent text-stone-200 text-xs focus:outline-none cursor-pointer"
          >
            <option value="All Floors" className="bg-stone-900">All Factory Floors</option>
            <option value="Floor A" className="bg-stone-900">Floor A (Denim)</option>
            <option value="Floor B" className="bg-stone-900">Floor B (Knitwear)</option>
            <option value="Floor C" className="bg-stone-900">Floor C (Outerwear)</option>
          </select>
        </div>
      </div>

      {/* Right Header Actions */}
      <div className="flex items-center gap-3">
        {/* Create Order Modal Trigger */}
        <button
          onClick={onOpenNewOrderModal}
          className="bg-[#b45309] hover:bg-[#92400e] text-white px-3.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 shadow-sm transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New PO Order</span>
        </button>

        {/* Notifications Icon */}
        <button 
          className="relative p-2 rounded-xl bg-stone-800 border border-stone-700 text-stone-300 hover:text-white transition-colors"
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-amber-500" />
        </button>

        {/* Public View Link */}
        <button
          onClick={onNavigateToLanding}
          className="hidden md:flex items-center gap-1 text-xs font-semibold text-stone-400 hover:text-stone-100 bg-stone-800 px-3 py-2 rounded-xl border border-stone-700 transition-colors"
        >
          <span>Landing Page</span>
        </button>
      </div>
    </header>
  );
};

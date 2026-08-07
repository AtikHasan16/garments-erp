'use client';

import React from 'react';
import Image from 'next/image';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Factory, 
  Package, 
  Truck, 
  ShieldCheck, 
  FileText, 
  Layers, 
  ChevronRight,
  TrendingUp,
  Globe
} from 'lucide-react';
import { ActiveModule } from '../../types/erp';

interface SidebarProps {
  activeTab: ActiveModule;
  setActiveTab: (tab: ActiveModule) => void;
  totalOrdersCount: number;
  lowStockAlertsCount: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  totalOrdersCount,
  lowStockAlertsCount,
}) => {
  const menuItems = [
    {
      id: 'overview',
      label: 'Executive Pulse',
      icon: LayoutDashboard,
      badge: null,
    },
    {
      id: 'orders',
      label: 'Merchandise Orders',
      icon: ShoppingBag,
      badge: totalOrdersCount.toString(),
      badgeColor: 'bg-amber-500/20 text-amber-400 border border-amber-500/30',
    },
    {
      id: 'production',
      label: 'Production WIP & Lines',
      icon: Factory,
      badge: 'LIVE',
      badgeColor: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-pulse',
    },
    {
      id: 'inventory',
      label: 'Fabric & Raw Stock',
      icon: Package,
      badge: lowStockAlertsCount > 0 ? `${lowStockAlertsCount} Low` : null,
      badgeColor: 'bg-rose-500/20 text-rose-400 border border-rose-500/30',
    },
    {
      id: 'logistics',
      label: 'Delivery Challans',
      icon: Truck,
      badge: 'Gate Pass',
      badgeColor: 'bg-amber-600/20 text-amber-300 border border-amber-600/30',
    },
    {
      id: 'quality',
      label: 'Quality & DHU Audit',
      icon: ShieldCheck,
      badge: 'AQL 2.5',
      badgeColor: 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30',
    },
    {
      id: 'techpack',
      label: 'Style & Tech Pack',
      icon: FileText,
      badge: 'BOM',
      badgeColor: 'bg-purple-500/20 text-purple-400 border border-purple-500/30',
    },
  ];

  return (
    <aside className="w-72 bg-stone-950 border-r border-stone-800 flex flex-col justify-between shrink-0 select-none text-stone-300">
      <div>
        {/* Brand Header */}
        <div className="p-6 border-b border-stone-800/80">
          <div className="flex items-center justify-between">
            <div 
              onClick={() => setActiveTab('landing')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-xl bg-[#b45309] text-white flex items-center justify-center font-bold shadow-md shadow-amber-950/40">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-lg tracking-tight text-white group-hover:text-amber-400 transition-colors">
                    GarmentsOS
                  </h1>
                  <span className="text-[9px] font-extrabold tracking-widest px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-400 border border-amber-500/30 uppercase">
                    ERP
                  </span>
                </div>
                <p className="text-[11px] text-stone-400">Apparel Enterprise Intelligence</p>
              </div>
            </div>
          </div>
        </div>

        {/* Factory Quick Stats Widget */}
        <div className="mx-4 my-4 p-3.5 rounded-xl bg-stone-900 border border-stone-800">
          <div className="flex items-center justify-between text-xs text-stone-400 mb-1.5">
            <span className="flex items-center gap-1 text-[11px] font-semibold">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
              Daily Line Efficiency
            </span>
            <span className="font-extrabold text-emerald-400">89.4%</span>
          </div>
          <div className="w-full bg-stone-800 h-2 rounded-full overflow-hidden">
            <div 
              className="bg-linear-to-r from-amber-600 to-emerald-400 h-full rounded-full transition-all duration-500" 
              style={{ width: '89.4%' }}
            />
          </div>
          <div className="flex justify-between text-[11px] text-stone-500 mt-2">
            <span>Target: 10,000 pcs</span>
            <span className="text-stone-300 font-medium">Actual: 8,940 pcs</span>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="px-3 space-y-1">
          <p className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-500 mb-2">
            Modules & Operations
          </p>
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id as ActiveModule)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                  isActive
                    ? 'bg-amber-600/20 text-amber-300 border border-amber-500/40 shadow-sm'
                    : 'text-stone-400 hover:text-stone-200 hover:bg-stone-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-amber-400' : 'text-stone-400 group-hover:text-stone-200'
                  }`} />
                  <span>{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full uppercase ${item.badgeColor}`}>
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="w-3.5 h-3.5 text-amber-400" />}
                </div>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Manager Profile Footer Widget */}
      <div className="p-4 border-t border-stone-800 space-y-3">
        <div className="flex items-center justify-between p-2 rounded-xl bg-stone-900 border border-stone-800/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full overflow-hidden relative border border-stone-700 bg-stone-800 shrink-0">
              <Image src="/hero-manager.png" alt="Manager Profile" width={32} height={32} className="w-full h-full object-cover" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-white">Manager</h4>
              <p className="text-[10px] text-stone-400">Factory Line A</p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('landing')}
            className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
            title="Switch to Public Marketing Site"
          >
            <Globe className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </div>
    </aside>
  );
};

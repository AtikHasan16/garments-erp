'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Factory, 
  Truck, 
  LogOut,
  Layers
} from 'lucide-react';

export const Sidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      id: 'overview',
      label: 'DASHBOARD',
      href: '/dashboard',
      icon: LayoutDashboard,
    },
    {
      id: 'orders',
      label: 'ORDERS / STYLES',
      href: '/dashboard/orders',
      icon: ShoppingBag,
    },
    {
      id: 'inventory',
      label: 'FABRIC INVENTORY',
      href: '/dashboard/inventory',
      icon: Package,
    },
    {
      id: 'production',
      label: 'PRODUCTION WIP',
      href: '/dashboard/production',
      icon: Factory,
    },
    {
      id: 'logistics',
      label: 'DELIVERY CHALLAN',
      href: '/dashboard/logistics',
      icon: Truck,
    },
  ];

  return (
    <aside className="w-64 bg-[#18181b] border-r border-stone-800/80 flex flex-col justify-between shrink-0 select-none text-stone-300">
      <div>
        {/* Brand Header */}
        <div className="p-6">
          <Link 
            href="/"
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-7 h-7 rounded-md bg-stone-900 text-amber-500 flex items-center justify-center font-bold">
              <Layers className="w-4 h-4 text-amber-500" />
            </div>
            <h1 className="font-extrabold text-lg tracking-tight text-white flex items-center gap-1.5">
              GarmentsOS <span className="text-amber-500 text-xs uppercase font-bold tracking-wider">ERP</span>
            </h1>
          </Link>
        </div>

        {/* Navigation Menu */}
        <nav className="px-4 space-y-2 mt-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/dashboard');
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-extrabold tracking-wider transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#ea580c] text-white shadow-lg shadow-orange-950/40'
                    : 'text-stone-400 hover:text-white hover:bg-stone-800/50'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-stone-400'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Manager Profile Footer Widget */}
      <div className="p-4 m-4 rounded-xl bg-stone-900/60 border border-stone-800/60 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full overflow-hidden relative border border-stone-700 bg-stone-800 shrink-0">
            <Image src="/hero-manager.png" alt="Manager Profile" width={32} height={32} className="w-full h-full object-cover" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Manager</h4>
            <p className="text-[10px] text-stone-400">Factory Line A</p>
          </div>
        </div>
        <Link
          href="/"
          className="p-1.5 rounded-lg text-stone-400 hover:text-white hover:bg-stone-800 transition-colors cursor-pointer"
          title="Exit to Public Landing Page"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </aside>
  );
};

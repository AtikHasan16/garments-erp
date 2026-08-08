'use client';

import React from 'react';
import { 
  Search, 
  Bell, 
  ChevronRight
} from 'lucide-react';

export const Header = ({
  searchQuery,
  setSearchQuery,
  onNavigateToLanding,
}) => {
  return (
    <header className="bg-[#f8fafc] border-b border-stone-200/80 px-8 py-4 text-stone-900 flex items-center justify-between gap-4 sticky top-0 z-30">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-extrabold tracking-widest text-stone-400 uppercase">
        <button 
          onClick={onNavigateToLanding}
          className="hover:text-stone-900 transition-colors cursor-pointer"
        >
          GARMENTSOS
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-stone-400" />
        <span className="text-stone-900">DASHBOARD</span>
      </div>

      {/* Center Search Bar */}
      <div className="relative w-72">
        <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          placeholder="Search Order or Style #..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-stone-100 text-stone-900 placeholder-stone-400 text-xs rounded-full pl-9 pr-4 py-2 border-none focus:outline-none focus:ring-2 focus:ring-amber-500/50"
        />
      </div>

      {/* Right Header Status & Actions */}
      <div className="flex items-center gap-4">
        {/* Factory Line Status */}
        <div className="flex items-center gap-2 text-xs font-bold text-stone-800">
          <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse" />
          <span>Factory Line A - Active</span>
        </div>

        {/* Notifications Icon */}
        <button 
          className="relative p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors cursor-pointer"
          title="System Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-600" />
        </button>
      </div>
    </header>
  );
};

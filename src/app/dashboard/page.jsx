'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { OverviewDashboard } from '../../components/dashboard/OverviewDashboard';

export default function DashboardPage() {
  const router = useRouter();

  const handleNavigateToTab = (tab) => {
    if (tab === 'orders') router.push('/dashboard/orders');
    else if (tab === 'inventory') router.push('/dashboard/inventory');
    else if (tab === 'production') router.push('/dashboard/production');
    else if (tab === 'logistics') router.push('/dashboard/logistics');
    else router.push('/dashboard');
  };

  return (
    <OverviewDashboard 
      onNavigateToTab={handleNavigateToTab}
    />
  );
}

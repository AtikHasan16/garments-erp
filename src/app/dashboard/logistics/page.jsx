'use client';

import React from 'react';
import { DeliveryChallanManagement } from '../../../components/logistics/DeliveryChallanManagement';
import { INITIAL_DELIVERY_CHALLANS } from '../../../data/mockErpData';

export default function LogisticsPage() {
  return (
    <DeliveryChallanManagement 
      challans={INITIAL_DELIVERY_CHALLANS}
    />
  );
}

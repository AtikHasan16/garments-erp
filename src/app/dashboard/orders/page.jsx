'use client';

import React from 'react';
import { OrderManagement } from '../../../components/orders/OrderManagement';
import { INITIAL_ORDERS } from '../../../data/mockErpData';

export default function OrdersPage() {
  return (
    <OrderManagement 
      orders={INITIAL_ORDERS}
    />
  );
}

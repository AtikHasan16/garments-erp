'use client';

import React from 'react';
import { InventoryManagement } from '../../../components/inventory/InventoryManagement';
import { INITIAL_INVENTORY } from '../../../data/mockErpData';

export default function InventoryPage() {
  return (
    <InventoryManagement 
      inventory={INITIAL_INVENTORY}
    />
  );
}

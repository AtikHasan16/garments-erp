'use client';

import React from 'react';
import { ProductionWip } from '../../../components/production/ProductionWip';
import { INITIAL_LINES } from '../../../data/mockErpData';

export default function ProductionPage() {
  return (
    <ProductionWip 
      lines={INITIAL_LINES}
    />
  );
}

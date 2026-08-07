export type ActiveModule = 'landing' | 'overview' | 'orders' | 'production' | 'inventory' | 'logistics' | 'quality' | 'techpack';

export type OrderStatus = 'Draft' | 'Sampling' | 'PP Approved' | 'In Cutting' | 'In Sewing' | 'Finishing' | 'Shipped' | 'Cancelled';

export type PriorityLevel = 'High' | 'Medium' | 'Normal';

export interface GarmentOrder {
  id: string;
  poNumber: string;
  styleCode: string;
  styleName: string;
  buyer: string;
  garmentCategory: 'T-Shirt' | 'Denim Jeans' | 'Hoodie' | 'Jacket' | 'Polo Shirt' | 'Dress';
  orderQty: number;
  fobPrice: number;
  totalValue: number;
  shipmentDate: string;
  status: OrderStatus;
  priority: PriorityLevel;
  factoryLine: string;
  cuttingProgress: number; // 0 - 100
  sewingProgress: number;  // 0 - 100
  finishingProgress: number; // 0 - 100
  samplingMilestones: {
    labDip: boolean;
    fitSample: boolean;
    ppSample: boolean;
    bulkFabricReceived: boolean;
  };
}

export interface ProductionLine {
  id: string;
  lineName: string;
  floor: string;
  supervisor: string;
  assignedStyle: string;
  buyer: string;
  targetOutput: number;
  actualOutput: number;
  efficiencyPercent: number;
  activeWorkers: number;
  status: 'Running' | 'Bottleneck' | 'Maintenance' | 'Idle';
  bottleneckReason?: string;
  hourlyOutput: number[];
}

export interface InventoryItem {
  id: string;
  itemCode: string;
  name: string;
  category: 'Yarn' | 'Fabric (Knit)' | 'Fabric (Woven)' | 'Trims & Accessories' | 'Dyes & Chemicals';
  quantity: number;
  unit: 'Kgs' | 'Yards' | 'Meters' | 'Pcs' | 'Gross';
  reorderLevel: number;
  supplier: string;
  unitCost: number;
  location: string;
  status: 'In Stock' | 'Low Stock' | 'Critical';
  shadeLot?: string;
  batchNo?: string;
}

export interface DeliveryChallan {
  id: string;
  challanNo: string;
  gatePassNo: string;
  buyer: string;
  poNumber: string;
  styleCode: string;
  vehicleNo: string;
  driverName: string;
  driverPhone: string;
  totalCartons: number;
  totalQuantity: number;
  dispatchDate: string;
  destination: string;
  status: 'Draft' | 'Out for Delivery' | 'Delivered' | 'Verified';
  items: {
    itemCode: string;
    description: string;
    quantity: number;
    cartons: number;
  }[];
}

export interface QualityAudit {
  id: string;
  date: string;
  lineName: string;
  styleCode: string;
  inspector: string;
  checkedQty: number;
  passedQty: number;
  rejectedQty: number;
  dhuRate: number; // Defect per Hundred Units
  majorDefects: { type: string; count: number }[];
  status: 'Passed (AQL 2.5)' | 'Conditional' | 'Failed';
}

export interface TechPackBOM {
  item: string;
  specification: string;
  consumptionPerGarment: string;
  unitCost: number;
  supplier: string;
}

export interface GarmentTechPack {
  styleCode: string;
  styleName: string;
  buyer: string;
  season: string;
  fabricType: string;
  gsm: number;
  colorways: string[];
  sizeRange: string[];
  bom: TechPackBOM[];
}


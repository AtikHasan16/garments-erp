'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  INITIAL_ORDERS, 
  INITIAL_INVENTORY, 
  INITIAL_LINES, 
  INITIAL_DELIVERY_CHALLANS 
} from '../data/mockErpData';

const ERPContext = createContext();

export const ERPProvider = ({ children }) => {
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [lines, setLines] = useState(INITIAL_LINES);
  const [challans, setChallans] = useState(INITIAL_DELIVERY_CHALLANS);
  const [loading, setLoading] = useState(true);
  const [dbError, setDbError] = useState(null);

  // Modal Open States
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [isInventoryModalOpen, setIsInventoryModalOpen] = useState(false);
  const [isChallanModalOpen, setIsChallanModalOpen] = useState(false);

  // Fetch all live data from MongoDB Atlas API endpoints
  const fetchAllData = async () => {
    try {
      setLoading(true);
      setDbError(null);

      const [ordersRes, inventoryRes, linesRes, challansRes] = await Promise.all([
        fetch('/api/orders'),
        fetch('/api/inventory'),
        fetch('/api/production'),
        fetch('/api/logistics'),
      ]);

      const ordersData = await ordersRes.json();
      const inventoryData = await inventoryRes.json();
      const linesData = await linesRes.json();
      const challansData = await challansRes.json();

      if (ordersData.success && ordersData.data.length > 0) {
        setOrders(ordersData.data);
      } else if (!ordersData.success) {
        setDbError(ordersData.error);
      }

      if (inventoryData.success && inventoryData.data.length > 0) {
        setInventory(inventoryData.data);
      }

      if (linesData.success && linesData.data.length > 0) {
        setLines(linesData.data);
      }

      if (challansData.success && challansData.data.length > 0) {
        setChallans(challansData.data);
      }

    } catch (err) {
      console.error('Failed to fetch data from MongoDB Atlas APIs:', err);
      setDbError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    const initFetch = async () => {
      try {
        const [ordersRes, inventoryRes, linesRes, challansRes] = await Promise.all([
          fetch('/api/orders'),
          fetch('/api/inventory'),
          fetch('/api/production'),
          fetch('/api/logistics'),
        ]);

        const ordersData = await ordersRes.json();
        const inventoryData = await inventoryRes.json();
        const linesData = await linesRes.json();
        const challansData = await challansRes.json();

        if (!isMounted) return;

        if (ordersData.success && ordersData.data.length > 0) {
          setOrders(ordersData.data);
        } else if (!ordersData.success) {
          setDbError(ordersData.error);
        }

        if (inventoryData.success && inventoryData.data.length > 0) {
          setInventory(inventoryData.data);
        }

        if (linesData.success && linesData.data.length > 0) {
          setLines(linesData.data);
        }

        if (challansData.success && challansData.data.length > 0) {
          setChallans(challansData.data);
        }
      } catch (err) {
        if (isMounted) setDbError(err.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    initFetch();

    return () => {
      isMounted = false;
    };
  }, []);

  // 1-Click Database Seeder
  const seedDatabase = async () => {
    try {
      setLoading(true);
      const res = await fetch('/api/seed', { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        setDbError(null);
        await fetchAllData();
        alert('MongoDB Atlas successfully seeded with enterprise data!');
      } else {
        alert('Atlas Connection Notice: ' + data.error);
        setDbError(data.error);
      }
    } catch (err) {
      alert('Atlas Connection Error: ' + err.message);
      setDbError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // CRUD Operation 1: Insert New Purchase Order (POST /api/orders)
  const addOrder = async (orderData) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderData),
      });
      const result = await res.json();
      if (result.success) {
        await fetchAllData();
        setIsOrderModalOpen(false);
        return { success: true };
      } else {
        // Fallback to local state if DB connection fails
        const newLocalOrder = {
          ...orderData,
          _id: Date.now().toString(),
          totalValue: Number(orderData.orderQty) * Number(orderData.fobPrice),
          sewingProgress: 10,
          status: 'In Sewing',
        };
        setOrders([newLocalOrder, ...orders]);
        setIsOrderModalOpen(false);
        return { success: true };
      }
    } catch {
      // Fallback to local state
      const newLocalOrder = {
        ...orderData,
        _id: Date.now().toString(),
        totalValue: Number(orderData.orderQty) * Number(orderData.fobPrice),
        sewingProgress: 10,
        status: 'In Sewing',
      };
      setOrders([newLocalOrder, ...orders]);
      setIsOrderModalOpen(false);
      return { success: true };
    }
  };

  // CRUD Operation 2: Insert New Inventory Item (POST /api/inventory)
  const addInventoryItem = async (itemData) => {
    try {
      const res = await fetch('/api/inventory', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(itemData),
      });
      const result = await res.json();
      if (result.success) {
        await fetchAllData();
        setIsInventoryModalOpen(false);
        return { success: true };
      } else {
        const newLocalItem = { ...itemData, _id: Date.now().toString() };
        setInventory([newLocalItem, ...inventory]);
        setIsInventoryModalOpen(false);
        return { success: true };
      }
    } catch {
      const newLocalItem = { ...itemData, _id: Date.now().toString() };
      setInventory([newLocalItem, ...inventory]);
      setIsInventoryModalOpen(false);
      return { success: true };
    }
  };

  // CRUD Operation 3: Insert New Delivery Challan (POST /api/logistics)
  const addChallan = async (challanData) => {
    try {
      const res = await fetch('/api/logistics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(challanData),
      });
      const result = await res.json();
      if (result.success) {
        await fetchAllData();
        setIsChallanModalOpen(false);
        return { success: true };
      } else {
        const newLocalChallan = { ...challanData, _id: Date.now().toString() };
        setChallans([newLocalChallan, ...challans]);
        setIsChallanModalOpen(false);
        return { success: true };
      }
    } catch {
      const newLocalChallan = { ...challanData, _id: Date.now().toString() };
      setChallans([newLocalChallan, ...challans]);
      setIsChallanModalOpen(false);
      return { success: true };
    }
  };

  // CRUD Operation 4: Delete PO (DELETE /api/orders)
  const deleteOrder = async (id) => {
    try {
      const res = await fetch(`/api/orders?id=${id}`, {
        method: 'DELETE',
      });
      const result = await res.json();
      if (result.success) {
        await fetchAllData();
      } else {
        setOrders(orders.filter(o => (o._id || o.id) !== id));
      }
    } catch {
      setOrders(orders.filter(o => (o._id || o.id) !== id));
    }
  };

  return (
    <ERPContext.Provider
      value={{
        orders,
        inventory,
        lines,
        challans,
        loading,
        dbError,
        fetchAllData,
        seedDatabase,
        addOrder,
        addInventoryItem,
        addChallan,
        deleteOrder,
        // Modal State Controls
        isOrderModalOpen,
        setIsOrderModalOpen,
        isInventoryModalOpen,
        setIsInventoryModalOpen,
        isChallanModalOpen,
        setIsChallanModalOpen,
        openOrderModal: () => setIsOrderModalOpen(true),
        openInventoryModal: () => setIsInventoryModalOpen(true),
        openChallanModal: () => setIsChallanModalOpen(true),
      }}
    >
      {children}
    </ERPContext.Provider>
  );
};

export const useERP = () => {
  const context = useContext(ERPContext);
  if (!context) {
    throw new Error('useERP must be used within an ERPProvider');
  }
  return context;
};

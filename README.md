# 🏭 GarmentsOS ERP — Apparel Enterprise Intelligence Platform

![Next.js](https://img.shields.io/badge/Next.js-16.3.0%20(Turbopack)-black?style=for-the-badge&logo=nextdotjs)
![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-06B6D4?style=for-the-badge&logo=tailwindcss)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb)
![JavaScript](https://img.shields.io/badge/Codebase-Raw%20JavaScript-F7DF1E?style=for-the-badge&logo=javascript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**GarmentsOS ERP** is a state-of-the-art, high-density Enterprise Resource Planning (ERP) platform purpose-built for modern garment manufacturers, textile factories, and apparel buying houses. It provides complete visibility from raw fiber procurement to finished carton export dispatches.

---

## 🌟 Key Features & Module Overview

### 📊 1. Executive Pulse Dashboard (`/dashboard`)
- **KPI Summary Cards:** Track active purchase orders, raw stock inventory volume (Kg/Yds), daily line efficiency percentage, and active export delivery units.
- **Active Buyer Orders:** Real-time order fulfillment table with progress meters, sewing line stages, and status badges (`Sewing`, `In-Cut`, `QC Pass`, `Shipped`).
- **Daily Output vs. Target Chart:** Dual-color grouped bar chart visualization comparing daily target output vs. actual line output for `LINE A`, `LINE B`, and `LINE C`.

### 🛍️ 2. Merchandise & Buyer Purchase Orders (`/dashboard/orders`)
- **Order Lifecycle Tracking:** Manage PO numbers, buyer names, FOB unit pricing ($), order quantities, and total FOB value calculations.
- **Sampling Approvals:** Track sampling milestones (**Lab Dip**, **Fit Sample**, **PP Sample**, and **Bulk Fabric In-House**).
- **Tech Pack Specification Sheet Modal:** Itemized Bill of Materials (BOM) modal inspecting thread count, zipper specs, fabric consumption per garment, and supplier details.
- **MongoDB CRUD:** Complete live creation, editing, and deletion (`DELETE /api/orders?id=...`) of buyer POs.

### 📦 3. Fabric & Raw Stock Inventory Ledger (`/dashboard/inventory`)
- **Stock Tracking:** Real-time ledger for woven fabric rolls, jersey knit rolls, yarn cones, and trim accessories.
- **Shade Lot & Batch Control:** Track shade lot IDs, batch numbers, warehouse rack locations, and unit cost breakdowns.
- **Stock Reorder Alerts:** Automated alerts for low stock items and critical reorder thresholds.
- **Material Arrival Form Modal:** Register incoming raw material shipments live to MongoDB.

### ⚙️ 4. Production Floor WIP & Line Monitoring (`/dashboard/production`)
- **Floor Line WIP Grid:** Monitor line efficiency percentages, assigned supervisors, operator counts, and active buyer styles.
- **Hourly Output Trend (pcs/hr):** High-density sparkline visualizations tracking hourly output trends (`H1` to `H8`).
- **Bottleneck Diagnostics:** Instant warning callouts highlighting thread tension issues, machine breakdowns, or line balancing delays.

### 🚚 5. Delivery Challan & Gate Pass Logistics (`/dashboard/logistics`)
- **Outward Gate Pass Generator:** Issue official factory delivery challans with driver names, vehicle registration numbers, carton counts, and shipment destinations.
- **Printable Gate Pass Copy:** Formal document modal ready for factory exit control and port customs inspection.

---

## 🛠️ Tech Stack & Architecture

| Layer | Technology |
| :--- | :--- |
| **Framework** | [Next.js 16 (App Router + Turbopack)](https://nextjs.org/) |
| **UI Core** | [React 19](https://react.dev/) (Raw JavaScript ES6+ / `.jsx`) |
| **Styling** | [TailwindCSS v4](https://tailwindcss.com/) & [Lucide Icons](https://lucide.dev/) |
| **Database** | [MongoDB Atlas](https://www.mongodb.com/atlas) (Cloud Cluster) |
| **ORM / Driver** | [Mongoose 8](https://mongoosejs.com/) & Native MongoDB Driver (Stable API v1) |
| **State & Navigation** | Context API (`ERPContext`) + Next.js App Router persistent URLs |

---

## 📁 Repository Directory Structure

```text
garments-os-erp/
├── public/                     # Static media assets & manager profile images
├── src/
│   ├── app/                    # Next.js App Router Pages & API Endpoints
│   │   ├── api/                # REST API Endpoints
│   │   │   ├── demo-request/   # POST /api/demo-request
│   │   │   ├── inventory/      # GET, POST /api/inventory
│   │   │   ├── logistics/      # GET, POST /api/logistics
│   │   │   ├── orders/         # GET, POST, DELETE /api/orders
│   │   │   ├── production/     # GET /api/production
│   │   │   └── seed/           # POST /api/seed (Database Seeder)
│   │   ├── dashboard/          # ERP Application Routes
│   │   │   ├── inventory/      # /dashboard/inventory page
│   │   │   ├── logistics/      # /dashboard/logistics page
│   │   │   ├── orders/         # /dashboard/orders page
│   │   │   ├── production/     # /dashboard/production page
│   │   │   ├── layout.jsx      # Persistent ERP Dashboard Layout Shell
│   │   │   └── page.jsx        # /dashboard overview page
│   │   ├── layout.jsx          # Root Layout
│   │   └── page.jsx            # Public Marketing Landing Page (/)
│   ├── components/             # Reusable UI Components
│   │   ├── dashboard/          # OverviewDashboard.jsx
│   │   ├── inventory/          # InventoryManagement.jsx
│   │   ├── layout/             # Sidebar.jsx & Header.jsx
│   │   ├── logistics/          # DeliveryChallanManagement.jsx
│   │   ├── marketing/          # MarketingLandingPage.jsx
│   │   ├── orders/             # OrderManagement.jsx
│   │   └── production/         # ProductionWip.jsx
│   ├── context/                # ERPContext.jsx (Central State & MongoDB Sync)
│   ├── data/                   # Initial enterprise mock dataset
│   ├── lib/                    # mongodb.js (Cached Mongoose Connection client)
│   └── models/                 # Mongoose Data Schemas (Order, Inventory, Line, Challan)
├── .env.local                  # Environment variables (MONGODB_URI)
├── jsconfig.json               # Path aliases (@/*)
├── next.config.ts              # Next.js configuration & allowedDevOrigins
└── package.json                # Project dependencies
```

---

## 🚀 Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher
- **npm** or **yarn**
- **MongoDB Atlas Cluster**: Free or paid cloud instance

### Installation Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/AtikHasan16/garments-erp.git
   cd garments-erp
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env.local` file in the root directory and add your MongoDB Atlas connection string:
   ```env
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.c56fxmg.mongodb.net/garments_os_db?retryWrites=true&w=majority
   ```

4. **Run the Development Server:**
   ```bash
   npm run dev
   ```

5. **Access the Application:**
   Open [http://localhost:3000](http://localhost:3000) in your browser.
   - Public Landing Page: `http://localhost:3000/`
   - Executive Dashboard: `http://localhost:3000/dashboard`

---

## 🔌 REST API Reference

| Endpoint | Method | Description |
| :--- | :--- | :--- |
| `/api/orders` | `GET` | Fetch all buyer purchase orders |
| `/api/orders` | `POST` | Create a new buyer purchase order in MongoDB |
| `/api/orders?id={ID}` | `DELETE` | Delete a purchase order by ID |
| `/api/inventory` | `GET` | Fetch raw stock inventory ledger |
| `/api/inventory` | `POST` | Log new fabric or yarn arrival |
| `/api/production` | `GET` | Fetch real-time line WIP efficiency |
| `/api/logistics` | `GET` | Fetch delivery challan gate passes |
| `/api/logistics` | `POST` | Issue a new outward delivery gate pass |
| `/api/seed` | `POST` | 1-Click seeder to populate MongoDB with initial sample data |

---

## 🔒 Security Note: MongoDB Atlas Network Access

Ensure your current IP address (or `0.0.0.0/0` for development) is added under **MongoDB Atlas > Security > Network Access** to permit database connections.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more details.

---

<p align="center">
  Crafted with ❤️ for Garment Manufacturing Enterprises
</p>

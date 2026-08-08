"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  Layers,
  ArrowRight,
  Play,
  Box,
  Factory,
  Truck,
  ShoppingBag,
  TrendingUp,
  User,
  CheckCircle2,
  X,
  Sparkles,
  ChevronRight,
} from "lucide-react";

export const MarketingLandingPage = ({ onNavigateToErp }) => {
  const [isDemoModalOpen, setIsDemoModalOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    factoryName: "",
    monthlyCapacity: "50,000 - 200,000 pcs",
  });

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const closeDemoModal = () => {
    setIsDemoModalOpen(false);
    setIsSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#fafaf8] text-stone-900 font-sans selection:bg-amber-500 selection:text-white flex flex-col">
      {/* Top Announcement Bar */}
      <div className="bg-stone-900 text-stone-300 text-xs py-2 px-4 flex items-center justify-between border-b border-stone-800">
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-amber-600 text-white text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full">
              v2.6 Enterprise Release
            </span>
            <span>
              GarmentsOS IoT Line Integration now live for Garment Manufacturers
            </span>
          </div>
          <button
            onClick={() => onNavigateToErp("overview")}
            className="flex items-center gap-1 text-amber-400 hover:text-amber-300 font-medium transition-colors cursor-pointer"
          >
            <span>Launch Live ERP Sandbox</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Header Navigation */}
      <header className="sticky top-0 z-40 bg-[#fafaf8]/90 backdrop-blur-md border-b border-stone-200/80 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div
            onClick={() => onNavigateToErp("landing")}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-stone-900 text-white flex items-center justify-center font-bold shadow-sm group-hover:bg-amber-600 transition-colors">
              <Layers className="w-4 h-4 text-amber-400 group-hover:text-white transition-colors" />
            </div>
            <span className="font-extrabold text-xl tracking-tight text-stone-900">
              GarmentsOS
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6 text-xs font-bold tracking-widest text-stone-600 uppercase">
            <button
              onClick={() => onNavigateToErp("overview")}
              className="bg-[#b45309] hover:bg-[#92400e] text-white px-4 py-2 rounded-full font-extrabold text-xs tracking-wider uppercase transition-all cursor-pointer shadow-md flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-200" />
              <span>ERP DASHBOARD</span>
            </button>
            <a
              href="#features"
              className="hidden md:inline-block hover:text-stone-900 transition-colors"
            >
              Features
            </a>
            <a
              href="#solutions"
              className="hidden md:inline-block hover:text-stone-900 transition-colors"
            >
              Solutions
            </a>
            <a
              href="#pricing"
              className="hidden md:inline-block hover:text-stone-900 transition-colors"
            >
              Pricing
            </a>
            <a
              href="#contact"
              className="hidden md:inline-block hover:text-stone-900 transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onNavigateToErp("overview")}
              className="flex items-center gap-1.5 text-xs font-bold text-white bg-stone-900 hover:bg-stone-800 border border-stone-700 px-4 py-2 rounded-full transition-all cursor-pointer shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Launch Dashboard Layout</span>
            </button>

            <button
              onClick={() => onNavigateToErp("overview")}
              className="hidden sm:inline-block bg-[#b45309] hover:bg-[#92400e] text-white px-4 py-2 rounded-full text-xs font-bold tracking-wider uppercase transition-all cursor-pointer shadow-sm"
            >
              ERP Dashboard
            </button>

            <button
              onClick={() => onNavigateToErp("overview")}
              className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-900 hover:bg-amber-500/30 transition-colors cursor-pointer"
              title="Go to Dashboard Layout"
            >
              <User className="w-4 h-4 text-amber-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative px-6 pt-12 pb-20 max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Hero Text Content */}
          <div className="lg:col-span-7 space-y-8">
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-stone-200/70 border border-stone-300/80 text-[11px] font-bold tracking-wider text-stone-700 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-600 animate-ping" />
              Enterprise Grade ERP
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-stone-950 tracking-tight leading-[1.1]">
              The Operating System for{" "}
              <span className="text-[#b45309] block sm:inline">Modern</span>{" "}
              <span className="text-[#b45309] block sm:inline">Garment</span>{" "}
              <span className="text-[#b45309] block">Manufacturing</span>
            </h1>

            {/* Subtitle Description */}
            <p className="text-stone-600 text-base sm:text-lg leading-relaxed max-w-xl">
              Achieve complete visibility from fiber to finished good.
              GarmentsOS provides the structural integrity and real-time
              intelligence required for high-output textile supply chains.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={() => onNavigateToErp("overview")}
                className="bg-[#b45309] hover:bg-[#92400e] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>ENTER ERP DASHBOARD</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onNavigateToErp("overview")}
                className="bg-stone-200/80 hover:bg-stone-300 text-stone-900 px-6 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase flex items-center gap-2 transition-colors cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 text-stone-800 fill-stone-800" />
                <span>Launch ERP Dashboard</span>
              </button>
            </div>

            {/* Trust Indicator */}
            <div className="pt-6 border-t border-stone-200/70 flex items-center gap-4">
              <div className="flex -space-x-2 overflow-hidden">
                <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-amber-700 items-center justify-center text-[10px] text-white font-bold">
                  JS
                </div>
                <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-stone-800 items-center justify-center text-[10px] text-white font-bold">
                  LH
                </div>
                <div className="inline-flex h-8 w-8 rounded-full ring-2 ring-white bg-emerald-700 items-center justify-center text-[10px] text-white font-bold">
                  ZM
                </div>
              </div>
              <p className="text-xs font-semibold text-stone-600">
                Trusted by{" "}
                <span className="text-stone-900 font-extrabold">
                  500+ factories
                </span>{" "}
                worldwide
              </p>
            </div>
          </div>

          {/* Right Column: Industrial Hero Photograph */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-stone-200 bg-stone-900 aspect-4/5 sm:aspect-4/3 lg:aspect-4/5">
              <Image
                src="/hero-manager.png"
                alt="GarmentsOS Factory Production Floor Manager"
                fill
                priority
                className="object-cover object-center transform hover:scale-105 transition-transform duration-700"
              />
              {/* Overlay Glass Card */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/80 backdrop-blur-md border border-stone-700/80 text-white space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    Line 02 Sewing Live Efficiency
                  </span>
                  <span className="text-xs font-bold text-emerald-400">
                    92.4%
                  </span>
                </div>
                <div className="flex justify-between text-xs text-stone-300 font-mono">
                  <span>Target: 1,200 pcs/hr</span>
                  <span className="text-white font-bold">
                    Output: 1,108 pcs
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Precision Engineered Modules Section */}
      <section
        id="features"
        className="py-20 bg-stone-100/60 border-t border-stone-200/80 px-6"
      >
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-950 tracking-tight">
              Precision Engineered Modules
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed">
              Purpose-built tools for every stage of the textile manufacturing
              lifecycle, designed for high data density and rapid interaction.
            </p>
          </div>

          {/* Module Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Module 1: Fabric & Trim Inventory */}
            <div
              onClick={() => onNavigateToErp("inventory")}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#b45309] transition-colors">
                  <Box className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b45309] transition-colors">
                  Fabric & Trim Inventory
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Real-time tracking of raw materials with automated low-stock
                  alerts and batch management.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Explore Inventory Ledger</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Module 2: Production WIP */}
            <div
              onClick={() => onNavigateToErp("production")}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#b45309] transition-colors">
                  <Factory className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b45309] transition-colors">
                  Production WIP
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Granular visibility into cutting, sewing, and finishing lines.
                  Identify bottlenecks instantly.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Monitor Floor Lines</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Module 3: Delivery Challans */}
            <div
              onClick={() => onNavigateToErp("logistics")}
              className="bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#b45309] transition-colors">
                  <Truck className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b45309] transition-colors">
                  Delivery Challans
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Automated dispatch documentation, gate pass generation, and
                  logistics partner integration.
                </p>
              </div>
              <div className="pt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Manage Gate Passes</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>

          {/* Bottom Row (2 Large Grid Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Module 4: Order Management System (Span 7) */}
            <div
              onClick={() => onNavigateToErp("orders")}
              className="md:col-span-7 bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 items-center">
                <div className="sm:col-span-7 space-y-4">
                  <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#b45309] transition-colors">
                    <ShoppingBag className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b45309] transition-colors">
                    Order Management System
                  </h3>
                  <p className="text-xs text-stone-600 leading-relaxed">
                    Centralized hub for purchase orders, sampling approvals, and
                    cost sheet generation. Connect buyer requirements directly
                    to production schedules.
                  </p>
                </div>

                {/* Embedded Mini Bar Chart Graphic */}
                <div className="sm:col-span-5 bg-stone-100 p-4 rounded-xl border border-stone-200 space-y-2">
                  <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider block">
                    PO Fulfillment Status
                  </span>
                  <div className="flex items-end gap-1.5 h-16 pt-2">
                    <div className="w-full bg-stone-300 h-6 rounded-sm" />
                    <div className="w-full bg-stone-400 h-10 rounded-sm" />
                    <div className="w-full bg-stone-500 h-7 rounded-sm" />
                    <div className="w-full bg-stone-800 h-14 rounded-sm" />
                    <div className="w-full bg-[#b45309] h-16 rounded-sm" />
                  </div>
                </div>
              </div>

              <div className="pt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>View Purchase Orders</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Module 5: Analytics & Reports (Span 5) */}
            <div
              onClick={() => onNavigateToErp("overview")}
              className="md:col-span-5 bg-white p-7 rounded-2xl border border-stone-200/90 shadow-sm hover:shadow-md hover:border-amber-500/40 transition-all cursor-pointer group flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="w-10 h-10 rounded-xl bg-stone-900 text-white flex items-center justify-center group-hover:bg-[#b45309] transition-colors">
                  <TrendingUp className="w-5 h-5 text-amber-400 group-hover:text-white transition-colors" />
                </div>
                <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#b45309] transition-colors">
                  Analytics & Reports
                </h3>
                <p className="text-xs text-stone-600 leading-relaxed">
                  Customizable dashboards for yield analysis, defect rates, and
                  operational efficiency metrics.
                </p>
              </div>

              <div className="pt-6 flex items-center text-xs font-bold text-amber-700 group-hover:text-amber-800">
                <span>Open Analytics Executive Pulse</span>
                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Banner */}
      <section
        id="contact"
        className="bg-stone-950 text-white py-20 px-6 border-t border-stone-800"
      >
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Ready to modernize your production floor?
          </h2>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Join the top-tier textile manufacturers who rely on GarmentsOS for
            uncompromising data integrity and operational scale.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-4 pt-2">
            <button
              onClick={() => onNavigateToErp("overview")}
              className="bg-[#b45309] hover:bg-[#92400e] text-white px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-all shadow-lg hover:shadow-amber-900/30 cursor-pointer"
            >
              Open ERP Dashboard
            </button>
            <button
              onClick={() => onNavigateToErp("overview")}
              className="border border-stone-700 bg-stone-900 hover:bg-stone-800 text-stone-200 px-7 py-3.5 rounded-full text-xs font-bold tracking-wider uppercase transition-colors cursor-pointer"
            >
              Launch Factory Dashboard
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#f2f2ee] border-t border-stone-300/80 py-8 px-6 text-xs text-stone-600">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded bg-stone-900 text-amber-400 flex items-center justify-center font-bold">
              <Layers className="w-3 h-3" />
            </div>
            <span className="font-semibold text-stone-800">
              GarmentsOS © 2026. All rights reserved.
            </span>
          </div>

          <div className="flex items-center gap-6 text-stone-600 font-medium">
            <a
              href="#privacy"
              className="hover:text-stone-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a href="#terms" className="hover:text-stone-900 transition-colors">
              Terms of Service
            </a>
            <a
              href="#cookies"
              className="hover:text-stone-900 transition-colors"
            >
              Cookie Settings
            </a>
          </div>
        </div>
      </footer>

      {/* Interactive Request Demo Modal */}
      {isDemoModalOpen && (
        <div className="fixed inset-0 z-50 bg-stone-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-stone-200 relative overflow-hidden animate-in fade-in zoom-in duration-200">
            <button
              onClick={closeDemoModal}
              className="absolute top-6 right-6 p-2 rounded-full text-stone-400 hover:text-stone-800 hover:bg-stone-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!isSubmitted ? (
              <div className="space-y-6">
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-700 uppercase tracking-wider mb-2">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>GarmentsOS Enterprise Demo</span>
                  </div>
                  <h3 className="text-2xl font-extrabold text-stone-950">
                    Schedule Your Custom Demo
                  </h3>
                  <p className="text-xs text-stone-600 mt-1">
                    See how GarmentsOS streamlines fabric procurement, floor
                    line WIP, and delivery challans.
                  </p>
                </div>

                <form onSubmit={handleDemoSubmit} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tariqur Rahman"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Work Email
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="tariq@textilegroup.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Factory / Enterprise Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Pacific Apparels Ltd."
                      value={formData.factoryName}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          factoryName: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1.5">
                      Monthly Garment Capacity
                    </label>
                    <select
                      value={formData.monthlyCapacity}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          monthlyCapacity: e.target.value,
                        })
                      }
                      className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-none focus:border-amber-600 focus:ring-1 focus:ring-amber-600 bg-white"
                    >
                      <option value="Under 50,000 pcs">
                        Under 50,000 pcs/month
                      </option>
                      <option value="50,000 - 200,000 pcs">
                        50,000 - 200,000 pcs/month
                      </option>
                      <option value="200,000 - 1,000,000 pcs">
                        200,000 - 1,000,000 pcs/month
                      </option>
                      <option value="1,000,000+ pcs">
                        1,000,000+ pcs/month (Enterprise)
                      </option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-[#b45309] hover:bg-[#92400e] text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase transition-colors shadow-md mt-2 cursor-pointer"
                  >
                    Submit Demo Request
                  </button>
                </form>
              </div>
            ) : (
              <div className="py-6 text-center space-y-5">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-extrabold text-stone-900">
                    Request Received!
                  </h3>
                  <p className="text-xs text-stone-600 max-w-sm mx-auto">
                    Thank you{" "}
                    <span className="font-bold text-stone-900">
                      {formData.name}
                    </span>
                    . Our technical solution team for{" "}
                    <span className="font-bold text-stone-900">
                      {formData.factoryName || "your factory"}
                    </span>{" "}
                    will reach out within 2 hours.
                  </p>
                </div>

                <div className="pt-4 space-y-3">
                  <button
                    onClick={() => {
                      closeDemoModal();
                      onNavigateToErp("overview");
                    }}
                    className="w-full bg-stone-950 hover:bg-stone-800 text-white py-3 rounded-xl text-xs font-bold tracking-wider uppercase flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <span>Launch Live ERP Sandbox Now</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

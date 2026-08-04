import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { PRODUCERS } from '../data/mockData';
import { ShieldCheck, Package, ShoppingBag, Users, Plus, Edit, Trash2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';

export const AdminPage: React.FC = () => {
  const { products, orders } = useShop();
  const [activeTab, setActiveTab] = useState<'products' | 'orders' | 'producers'>('products');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="bg-[#1A3323] text-white p-6 rounded-3xl border border-[#2B523A] shadow-xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-[#D4AF37] flex items-center gap-1">
            <ShieldCheck className="w-4 h-4" /> BioMendoza Store Management
          </span>
          <h1 className="font-serif font-bold text-2xl sm:text-3xl text-white mt-1">
            Admin Control Center
          </h1>
        </div>

        <div className="flex gap-2">
          {(['products', 'orders', 'producers'] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-xl text-xs font-bold capitalize transition-all ${
                activeTab === tab
                  ? 'bg-[#D4AF37] text-[#1A3323]'
                  : 'bg-[#284933] text-white hover:bg-[#345c41]'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-1">
          <span className="text-xs text-[#786D58] font-medium">Total Products</span>
          <div className="text-3xl font-serif font-bold text-[#1A3323]">{products.length}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-1">
          <span className="text-xs text-[#786D58] font-medium">Total Orders</span>
          <div className="text-3xl font-serif font-bold text-[#1A3323]">{orders.length}</div>
        </div>
        <div className="bg-white p-6 rounded-3xl border border-[#E3DEC3] shadow-xs space-y-1">
          <span className="text-xs text-[#786D58] font-medium">Certified Producers</span>
          <div className="text-3xl font-serif font-bold text-[#1A3323]">{PRODUCERS.length}</div>
        </div>
      </div>

      {/* Main Tab Content */}
      {activeTab === 'products' && (
        <div className="bg-white border border-[#E3DEC3] rounded-3xl p-6 shadow-xs space-y-4">
          <div className="flex justify-between items-center border-b border-[#F0ECE1] pb-4">
            <h3 className="font-serif font-bold text-xl text-[#1A3323]">Product Inventory</h3>
            <Button className="bg-[#1A3323] text-white text-xs rounded-xl h-10 flex items-center gap-1.5">
              <Plus className="w-4 h-4 text-[#D4AF37]" /> Add New Product
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#1A3323]">
              <thead className="bg-[#FAF7F0] border-b border-[#E3DEC3] uppercase text-[10px] font-bold text-[#786D58]">
                <tr>
                  <th className="p-3">Product Name</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Price</th>
                  <th className="p-3">Producer</th>
                  <th className="p-3">Stock</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F0ECE1]">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-[#FAF7F0]">
                    <td className="p-3 font-bold">{p.name}</td>
                    <td className="p-3">{p.category}</td>
                    <td className="p-3">${p.price.toLocaleString('es-AR')} ARS</td>
                    <td className="p-3">{p.producerName}</td>
                    <td className="p-3 font-semibold text-[#284933]">{p.stockCount} in stock</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="bg-white border border-[#E3DEC3] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">Recent Customer Orders</h3>
          <div className="space-y-3">
            {orders.map((o) => (
              <div key={o.id} className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] flex justify-between text-xs">
                <div>
                  <strong className="block text-[#1A3323]">{o.id} — {o.deliveryZone}</strong>
                  <span className="text-[#625846]">{o.deliveryAddress}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-[#1A3323] block">${o.totalPrice.toLocaleString('es-AR')} ARS</span>
                  <span className="text-[10px] bg-[#E2EAD8] text-[#284933] px-2 py-0.5 rounded font-bold">{o.status}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'producers' && (
        <div className="bg-white border border-[#E3DEC3] rounded-3xl p-6 shadow-xs space-y-4">
          <h3 className="font-serif font-bold text-xl text-[#1A3323]">Mendoza Producer Estates</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {PRODUCERS.map((pr) => (
              <div key={pr.id} className="p-4 bg-[#FAF7F0] rounded-2xl border border-[#E3DEC3] text-xs space-y-1">
                <h4 className="font-serif font-bold text-sm text-[#1A3323]">{pr.name}</h4>
                <p className="text-[#625846]">{pr.location}</p>
                <span className="text-[10px] text-[#284933] font-semibold">{pr.certification}</span>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
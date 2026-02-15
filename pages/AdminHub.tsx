
import React, { useState, useEffect } from 'react';
import { AgriStore } from '../services/agriStore';
import { AgriComponent, AgriScheme } from '../types';
import { Plus, Edit2, Trash2, LayoutGrid, Award, ArrowLeft, Search, Save, X, Link as LinkIcon, Camera, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AdminHub: React.FC = () => {
  const [components, setComponents] = useState<AgriComponent[]>([]);
  const [schemes, setSchemes] = useState<AgriScheme[]>([]);
  const [activeTab, setActiveTab] = useState<'COMP' | 'SCHEME'>('COMP');
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setComponents(AgriStore.getComponents());
    setSchemes(AgriStore.getSchemes());
  }, []);

  const handleDeleteComp = (id: string) => {
    if (confirm('Permanently delete this component?')) {
      AgriStore.deleteComponent(id);
      setComponents(AgriStore.getComponents());
    }
  };

  const handleDeleteScheme = (id: string) => {
    if (confirm('Permanently delete this scheme?')) {
      AgriStore.deleteScheme(id);
      setSchemes(AgriStore.getSchemes());
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12 pb-40">
      <Breadcrumbs />
      
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
           <div className="bg-slate-900 text-emerald-400 w-fit px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Administrative Mode</div>
           <h1 className="text-5xl lg:text-7xl font-black text-slate-900 serif tracking-tighter">Inventory <br/><span className="italic text-slate-400">Control.</span></h1>
        </div>
        <div className="flex bg-slate-100 p-2 rounded-[24px] border border-slate-200">
           <button 
             onClick={() => setActiveTab('COMP')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'COMP' ? 'bg-white shadow-lg text-slate-900' : 'text-slate-400'}`}
           >
             Equipments
           </button>
           <button 
             onClick={() => setActiveTab('SCHEME')}
             className={`px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'SCHEME' ? 'bg-white shadow-lg text-slate-900' : 'text-slate-400'}`}
           >
             Schemes
           </button>
        </div>
      </div>

      <div className="bg-white border-4 border-slate-50 p-10 rounded-[64px] shadow-2xl space-y-10">
         <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="relative flex-1">
               <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300" />
               <input 
                 type="text" 
                 placeholder={`Search ${activeTab === 'COMP' ? 'Equipments' : 'Schemes'}...`}
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className="w-full bg-slate-50 border-2 border-slate-100 rounded-[32px] pl-16 pr-8 py-4 outline-none focus:border-slate-900 font-bold"
               />
            </div>
            <button className="bg-slate-900 text-white px-10 py-5 rounded-[32px] font-black uppercase tracking-widest text-xs flex items-center gap-3 shadow-xl hover:bg-black transition-all">
               <Plus className="w-5 h-5" /> Create New Entry
            </button>
         </div>

         <div className="grid gap-6">
            {activeTab === 'COMP' ? (
              components.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).map(c => (
                <div key={c.id} className="p-8 border-2 border-slate-50 rounded-[40px] flex items-center justify-between group hover:border-slate-200 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-slate-50 rounded-3xl overflow-hidden shadow-inner border border-slate-100">
                        <img src={c.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900">{c.name}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
                           <span>Category: {c.category}</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full" />
                           <span>Schemes: {c.relatedSchemes.length}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteComp(c.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                   </div>
                </div>
              ))
            ) : (
              schemes.filter(s => s.schemeName.toLowerCase().includes(search.toLowerCase())).map(s => (
                <div key={s.id} className="p-8 border-2 border-slate-50 rounded-[40px] flex items-center justify-between group hover:border-slate-200 transition-all">
                   <div className="flex items-center gap-6">
                      <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 shadow-inner border border-emerald-100">
                        <Award className="w-8 h-8" />
                      </div>
                      <div>
                        <h4 className="text-xl font-black text-slate-900">{s.schemeName}</h4>
                        <div className="flex items-center gap-4 text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">
                           <span className="text-emerald-600">Subsidy: {s.subsidyPercentage}%</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full" />
                           <span>Components: {s.relatedComponentIds.length}</span>
                        </div>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:bg-slate-900 hover:text-white transition-all"><Edit2 className="w-5 h-5" /></button>
                      <button onClick={() => handleDeleteScheme(s.id)} className="p-4 bg-red-50 text-red-400 rounded-2xl hover:bg-red-600 hover:text-white transition-all"><Trash2 className="w-5 h-5" /></button>
                   </div>
                </div>
              ))
            )}
         </div>
      </div>
      
      <div className="bg-amber-50 border-4 border-amber-100 p-12 rounded-[64px] flex flex-col md:flex-row items-center gap-10">
         <div className="p-5 bg-white rounded-3xl shadow-xl text-amber-500"><AlertTriangle className="w-12 h-12" /></div>
         <div className="space-y-2">
            <h4 className="text-2xl font-black text-slate-900 serif">Administrative Warning</h4>
            <p className="text-sm font-bold text-slate-600 leading-relaxed max-w-2xl">
              All inventory updates are synced instantly to the national grid. Ensure component specifications and subsidy percentages are verified against current ICAR and Ministry circulars before publishing.
            </p>
         </div>
      </div>
    </div>
  );
};

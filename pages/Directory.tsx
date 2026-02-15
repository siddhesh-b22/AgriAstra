
import React from 'react';
import { Landmark, Phone, Mail, MapPin, Search, ArrowLeft, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Directory: React.FC = () => {
  const officials = [
    { name: 'Dr. Anand Kumar', role: 'District Agriculture Officer', dist: 'Lucknow', phone: '+91 522 223 881', email: 'dao-lko@upagri.gov.in' },
    { name: 'Shri R.P. Singh', role: 'Mandi Secretary', dist: 'Lucknow Central', phone: '+91 522 245 110', email: 'secretary@mandilko.org' },
    { name: 'Ms. Meera Devi', role: 'PM-KISAN Nodal Officer', dist: 'Uttar Pradesh', phone: '+91 11 2338 1092', email: 'pmkisan-up@nic.in' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-12">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Portal
      </Link>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight">Agri Directory</h1>
          <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Official Government Contacts & Offices</p>
        </div>
        <div className="bg-white border-2 border-slate-200 px-6 py-3 rounded-2xl flex items-center gap-3 shadow-sm w-full md:w-96">
          <Search className="w-4 h-4 text-slate-400" />
          <input type="text" placeholder="Search by District or Officer..." className="bg-transparent border-none outline-none text-sm font-bold text-slate-700 w-full" />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {[
          { label: 'Districts', count: '75', icon: <MapPin /> },
          { label: 'Mandis', count: '254', icon: <Landmark /> },
          { label: 'Nodal Officers', count: '1,240', icon: <UserCheck /> },
        ].map((stat, i) => (
          <div key={i} className="bg-slate-50 p-6 rounded-3xl border border-slate-200 flex items-center gap-6">
            <div className="bg-white p-3 rounded-xl shadow-sm text-blue-600">{stat.icon}</div>
            <div>
              <div className="text-2xl font-black text-slate-900">{stat.count}</div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 ml-2">Active Nodal Officers</h2>
        <div className="grid md:grid-cols-1 gap-4">
          {officials.map((ofc, i) => (
            <div key={i} className="bg-white border-2 border-slate-100 p-8 rounded-[40px] flex flex-col md:flex-row items-center justify-between gap-8 hover:border-blue-500 transition-all group">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                  <UserCheck className="w-8 h-8" />
                </div>
                <div>
                  <div className="text-xl font-black text-slate-900">{ofc.name}</div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-widest">{ofc.role} • {ofc.dist}</div>
                </div>
              </div>
              
              <div className="flex gap-4">
                <button className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-xs shadow-lg hover:bg-black transition-all">
                  <Phone className="w-4 h-4" /> Call
                </button>
                <button className="flex items-center gap-2 bg-white border border-slate-200 text-slate-600 px-6 py-3 rounded-xl font-bold text-xs hover:bg-slate-50 transition-all">
                  <Mail className="w-4 h-4" /> Email
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

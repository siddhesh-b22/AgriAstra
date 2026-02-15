
import React from 'react';
import { ArrowLeft, Globe, Award, Shield, Landmark, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Partners: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="text-center space-y-6">
        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tight">United for Bharat.</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs italic">A Public-Private Partnership Network</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {[
          { name: 'Ministry of Agri-Tech (MATI)', role: 'Core Regulatory & DPI Oversight', type: 'Govt' },
          { name: 'ICAR (Pusa Institute)', role: 'Agronomic Intelligence & Research', type: 'Institution' },
          { name: 'e-NAM / Agmarknet', role: 'National Market Integration', type: 'Govt' },
          { name: 'MeitY / Digital India', role: 'Security & Infrastructure Support', type: 'Govt' },
          { name: 'AgroStar / BigHaat', role: 'Last-mile Input & Logistics Partner', type: 'Private' },
          { name: 'Global Agri-Bank', role: 'Financing & Credit Accessibility', type: 'Finance' }
        ].map((p, i) => (
          <div key={i} className="bg-white border-2 border-slate-100 p-10 rounded-[48px] flex items-center justify-between hover:shadow-2xl transition-all group">
             <div className="space-y-2">
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.type}</div>
                <h3 className="text-3xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</h3>
                <p className="text-slate-500 font-bold">{p.role}</p>
             </div>
             <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300 group-hover:bg-blue-50 group-hover:text-blue-600 transition-all">
                {p.type === 'Govt' ? <Landmark /> : p.type === 'Private' ? <Zap /> : <Award />}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

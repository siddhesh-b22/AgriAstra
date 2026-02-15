
import React from 'react';
import { Globe, Users, TrendingUp, Award, Map, ArrowLeft, Landmark, Zap, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Impact: React.FC = () => {
  return (
    <div className="space-y-24 pb-24">
      {/* Hero */}
      <section className="bg-slate-900 text-white px-4 py-24 lg:py-40 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-green-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="max-w-7xl mx-auto space-y-10 relative z-10">
          <Link to="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors font-bold text-sm">
            <ArrowLeft className="w-4 h-4" /> Back to Portal
          </Link>
          <div className="space-y-6 max-w-4xl">
            <h1 className="text-6xl lg:text-9xl font-black leading-none tracking-tight">Nation-Scale <br /> Agri Intelligence.</h1>
            <p className="text-xl lg:text-3xl font-medium text-slate-400 leading-relaxed">
              Bharat Krishi OS is the unified data-layer of a nation in transition. Real-time Rural Digital Public Infrastructure.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Grid */}
      <section className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 lg:grid-cols-4 gap-8 -mt-32 relative z-20">
        {[
          { label: 'Registered Farmers', value: '142M+', icon: <Users />, sub: 'Digital Identity Ready' },
          { label: 'Procurement GMV', value: '₹140B+', icon: <TrendingUp />, sub: 'Annual Trade Vol.' },
          { label: 'Avg. Credit Score', value: '74/100', icon: <ShieldCheck />, sub: 'National Kisan Health' },
          { label: 'Subsidies Sent', value: '₹4.2T+', icon: <Award />, sub: 'Success Rate: 99.8%' }
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[56px] border-4 border-slate-100 shadow-2xl space-y-6 hover:-translate-y-2 transition-transform">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 shadow-inner">
               {React.cloneElement(stat.icon, { className: 'w-8 h-8' })}
            </div>
            <div>
              <div className="text-4xl font-black text-slate-900">{stat.value}</div>
              <div className="text-xs font-black uppercase tracking-[0.2em] text-slate-400 mt-2">{stat.label}</div>
              <div className="text-[10px] font-bold text-slate-400 mt-1">{stat.sub}</div>
            </div>
          </div>
        ))}
      </section>

      {/* Map Section Simulation */}
      <section className="max-w-7xl mx-auto px-4 space-y-16">
        <div className="text-center space-y-4">
           <h2 className="text-5xl font-black text-slate-900 tracking-tight">Real-Time Connectivity</h2>
           <p className="text-slate-500 font-bold max-w-xl mx-auto uppercase tracking-widest text-xs italic">Live Digital Public Infrastructure Heatmap</p>
        </div>
        <div className="aspect-video bg-slate-100 rounded-[80px] border-8 border-white shadow-2xl relative overflow-hidden flex items-center justify-center group">
           <Map className="w-40 h-40 text-slate-200 group-hover:scale-110 transition-transform duration-1000" />
           <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent flex items-end p-16">
             <div className="bg-white/95 backdrop-blur-md p-10 rounded-[40px] flex items-center gap-10 shadow-2xl">
                <div className="flex -space-x-4">
                  {[1,2,3,4,5].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-white bg-slate-200"></div>)}
                </div>
                <div className="font-bold text-slate-900">
                  <div className="text-2xl font-black">4,210 farmers</div>
                  <div className="text-xs font-black uppercase text-slate-400 tracking-widest">Active now in Lucknow Cluster</div>
                </div>
             </div>
           </div>
           <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-green-500 rounded-full animate-ping"></div>
           <div className="absolute top-1/2 left-1/2 w-6 h-6 bg-yellow-500 rounded-full animate-ping [animation-delay:-0.5s]"></div>
           <div className="absolute bottom-1/3 right-1/4 w-3 h-3 bg-blue-500 rounded-full animate-ping [animation-delay:-1s]"></div>
        </div>
      </section>

      {/* Partner Strip */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-16 opacity-40 hover:opacity-100 transition-all duration-700">
        <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-400">Institutional Governance & Technology Partners</h3>
        <div className="flex flex-wrap justify-center items-center gap-16 text-slate-500 font-black">
           <div className="flex items-center gap-3"><Landmark className="w-7 h-7"/> MEITY</div>
           <div className="flex items-center gap-3"><Globe className="w-7 h-7"/> WORLD AGRI BANK</div>
           <div className="flex items-center gap-3"><Award className="w-7 h-7"/> ICAR</div>
           <div className="flex items-center gap-3"><Zap className="w-7 h-7"/> DIGITAL INDIA</div>
           <div className="flex items-center gap-3"><ShieldCheck className="w-7 h-7"/> PFMS</div>
        </div>
      </section>
    </div>
  );
};

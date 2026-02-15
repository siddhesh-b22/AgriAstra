
import React, { useState } from 'react';
import { IndianRupee, TrendingUp, TrendingDown, ArrowLeft, Info, PieChart, Calculator, Zap, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { UserRole } from '../types';

export const MunafaEstimator: React.FC<{ role: UserRole }> = ({ role }) => {
  const [revenue, setRevenue] = useState(42000);
  const [seeds, setSeeds] = useState(4500);
  const [labor, setLabor] = useState(6200);
  const [transport, setTransport] = useState(2500);
  const [fertilizer, setFertilizer] = useState(3800);

  const totalCosts = seeds + labor + transport + fertilizer;
  const netProfit = revenue - totalCosts;
  const margin = (netProfit / revenue) * 100;

  const getHealthColor = () => {
    if (margin > 30) return 'text-emerald-500';
    if (margin > 15) return 'text-amber-500';
    return 'text-red-500';
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 pb-40">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-black text-xs uppercase tracking-widest">
          <ArrowLeft className="w-5 h-5" /> Back to Portal
        </Link>
        <div className="bg-emerald-50 border-2 border-emerald-100 px-6 py-3 rounded-2xl flex items-center gap-3 text-emerald-700 font-black text-xs uppercase tracking-widest shadow-sm">
          <Calculator className="w-5 h-5" /> Smart Munafa Analysis
        </div>
      </div>

      <div className="text-center space-y-6">
        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tighter serif leading-none">Profit <br/><span className="text-emerald-600 italic">Engineering.</span></h1>
        <p className="text-xl text-slate-500 font-bold max-w-xl mx-auto italic">"Advisory for 10x ROI: Predicting every rupee spent."</p>
      </div>

      <div className="grid lg:grid-cols-12 gap-12">
        {/* Left: Input Panel */}
        <div className="lg:col-span-7 space-y-10 bg-white p-12 lg:p-16 rounded-[64px] border-4 border-slate-50 shadow-2xl">
          <div className="flex items-center justify-between border-b border-slate-50 pb-8">
            <h2 className="text-3xl font-black text-slate-900 serif">Cost Parameters</h2>
            <div className="bg-slate-900 text-white px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest">Manual Override Active</div>
          </div>
          
          <div className="space-y-12">
            <div className="space-y-4">
              <div className="flex justify-between items-end">
                <label className="text-xs font-black uppercase tracking-[0.2em] text-slate-400">Total Anticipated Revenue</label>
                <div className="text-4xl font-black text-slate-900 tracking-tighter">₹{revenue.toLocaleString()}</div>
              </div>
              <input 
                type="range" min="10000" max="250000" step="1000" 
                value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
                className="w-full h-3 bg-slate-100 rounded-full appearance-none cursor-pointer accent-emerald-600"
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-10 pt-4">
              {[
                { label: 'High-Yield Seeds', val: seeds, set: setSeeds, max: 20000, color: 'accent-blue-600' },
                { label: 'Farm Labor', val: labor, set: setLabor, max: 30000, color: 'accent-purple-600' },
                { label: 'Market Logistics', val: transport, set: setTransport, max: 15000, color: 'accent-amber-600' },
                { label: 'Bio-Fertilizers', val: fertilizer, set: setFertilizer, max: 25000, color: 'accent-emerald-600' },
              ].map((cost, idx) => (
                <div key={idx} className="space-y-4 p-6 bg-slate-50 rounded-[32px] border-2 border-transparent hover:border-slate-200 transition-all">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                    <span>{cost.label}</span>
                    <span className="text-slate-900">₹{cost.val}</span>
                  </div>
                  <input 
                    type="range" min="0" max={cost.max} step="100" 
                    value={cost.val} onChange={(e) => cost.set(Number(e.target.value))}
                    className={`w-full h-2 bg-white rounded-full appearance-none cursor-pointer ${cost.color}`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-emerald-50 p-8 rounded-[40px] border-2 border-emerald-100 flex items-start gap-6 animate-pulse">
            <Zap className="w-8 h-8 flex-shrink-0 text-emerald-600" />
            <div className="space-y-2">
              <div className="text-xs font-black uppercase tracking-widest text-emerald-800">Bhavishyavani Insight</div>
              <p className="text-sm font-bold text-emerald-700 leading-relaxed">
                Shared logistics detected in your cluster (Block-A). Reducing Transport by ₹800 increases your net margin by 1.9%. <button className="underline font-black">Apply shared rate?</button>
              </p>
            </div>
          </div>
        </div>

        {/* Right: Summary Visuals */}
        <div className="lg:col-span-5 space-y-12">
          <div className="bg-slate-900 text-white p-12 lg:p-16 rounded-[64px] space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.4)] border-4 border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-bl-full"></div>
            
            <div className="space-y-2">
              <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">Net Take-Home Munafa</div>
              <div className={`text-7xl font-black tracking-tighter ${getHealthColor()}`}>₹{netProfit.toLocaleString()}</div>
            </div>

            <div className="grid grid-cols-2 gap-10 pt-10 border-t border-white/10">
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Profit Margin</div>
                <div className="text-3xl font-black serif italic">{margin.toFixed(1)}%</div>
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">Total Burn</div>
                <div className="text-3xl font-black text-red-400 tracking-tight">₹{totalCosts.toLocaleString()}</div>
              </div>
            </div>

            <div className="pt-8">
               <div className="h-4 bg-white/5 rounded-full overflow-hidden flex items-center shadow-inner">
                 <div className={`h-full ${margin > 20 ? 'bg-emerald-500' : 'bg-amber-500'} transition-all duration-1000 shadow-[0_0_20px_rgba(16,185,129,0.5)]`} style={{ width: `${margin}%` }}></div>
               </div>
               <div className="flex justify-between mt-4 text-[9px] font-black uppercase tracking-widest text-slate-500">
                 <span>0% Break-even</span>
                 <span>Target (35%+)</span>
               </div>
            </div>
          </div>

          <div className="bg-white border-4 border-slate-50 p-12 rounded-[56px] space-y-10 shadow-xl">
            <div className="flex items-center gap-4 border-b border-slate-50 pb-6">
              <div className="p-4 bg-blue-50 rounded-3xl text-blue-600 shadow-sm"><PieChart className="w-8 h-8" /></div>
              <h3 className="text-2xl font-black text-slate-900 serif">Capital Efficiency</h3>
            </div>
            
            <div className="space-y-6">
              {[
                { label: 'Input Capital', percent: ((seeds + fertilizer) / totalCosts) * 100, color: 'bg-emerald-500' },
                { label: 'Labor Ops', percent: (labor / totalCosts) * 100, color: 'bg-blue-500' },
                { label: 'Logistics Burn', percent: (transport / totalCosts) * 100, color: 'bg-amber-500' }
              ].map((bar, i) => (
                <div key={i} className="space-y-2">
                   <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                     <span>{bar.label}</span>
                     <span className="text-slate-900">{bar.percent.toFixed(0)}%</span>
                   </div>
                   <div className="h-2 bg-slate-50 rounded-full overflow-hidden">
                     <div className={`h-full ${bar.color} transition-all duration-1000 delay-300`} style={{ width: `${bar.percent}%` }}></div>
                   </div>
                </div>
              ))}
            </div>
            
            <div className="pt-4 flex flex-col gap-4">
              <button className="w-full bg-slate-900 text-white py-6 rounded-[28px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3 group">
                Download Bank Report <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </button>
              <p className="text-[10px] text-center font-bold text-slate-400 uppercase tracking-widest">Digital Certificate ISO-9001 Compliant</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

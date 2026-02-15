
import React from 'react';
import { Card } from '../components/Card';
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Globe, 
  Package, 
  Search, 
  Filter,
  ArrowUpRight,
  ArrowDownRight,
  Truck,
  ArrowRight,
  ChevronRight,
  Download,
  Calendar,
  Layers,
  MapPin,
  CheckCircle,
  Clock,
  ExternalLink,
  Zap,
  LayoutDashboard,
  ShieldCheck,
  Cpu
} from 'lucide-react';
import { UserProfile } from '../types';

export const BusinessDashboard: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 pb-40">
      {/* Personalized Greeting */}
      <div className="animate-reveal">
        <h2 className="text-3xl font-black text-slate-900 serif">Welcome, <span className="text-blue-600">{user?.firstName || 'Enterprise Admin'}</span></h2>
        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mt-2">Active Session: {user?.username}</p>
      </div>

      {/* Cinematic Header */}
      <div className="relative overflow-hidden bg-slate-900 p-12 lg:p-16 rounded-[64px] shadow-[0_50px_100px_rgba(0,0,0,0.3)] border-4 border-slate-800">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="space-y-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-3 bg-blue-600/20 px-6 py-2 rounded-full border border-blue-600/30 text-blue-400 text-[10px] font-black uppercase tracking-[0.4em]">
              <Cpu className="w-4 h-4" /> Supply Intelligence OS
            </div>
            <h1 className="text-5xl lg:text-7xl font-black text-white tracking-tighter serif leading-none">Command <br/><span className="text-blue-500 italic">Center.</span></h1>
            <p className="text-slate-400 font-bold text-xl max-w-lg">Monitoring active Mandis and registered supply nodes across the {user?.address.state || 'National'} Corridor.</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 px-8 py-4 rounded-[32px] flex items-center gap-4">
              <Search className="w-5 h-5 text-slate-500" />
              <input type="text" placeholder="Trace Supply ID..." className="bg-transparent border-none outline-none text-white font-bold text-sm w-48 placeholder:text-slate-600" />
            </div>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-5 rounded-[32px] font-black text-sm uppercase tracking-widest shadow-2xl shadow-blue-500/40 transition-all active:scale-95 flex items-center justify-center gap-3">
              <Download className="w-5 h-5" /> Export Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Ticker stats */}
      <div className="grid md:grid-cols-4 gap-6">
        {[
          { label: 'Active Supply', value: '1,420 MT', trend: '+12%', icon: <Package />, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Verified Nodes', value: '14,210', trend: '+4%', icon: <ShieldCheck />, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Sourcing Cost', value: '₹18.4/kg', trend: '-2.1%', icon: <TrendingUp />, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Quality Index', value: '92%', trend: 'Stable', icon: <Cpu />, color: 'text-purple-400', bg: 'bg-purple-500/10' },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-10 rounded-[48px] border-4 border-slate-50 shadow-xl space-y-6 hover:border-blue-600 transition-all group">
            <div className="flex items-center justify-between">
              <div className={`p-5 rounded-3xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>{stat.icon}</div>
              <div className={`text-[10px] font-black uppercase tracking-widest ${stat.trend.includes('+') ? 'text-emerald-600' : 'text-amber-600'}`}>{stat.trend}</div>
            </div>
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">{stat.label}</div>
              <div className="text-4xl font-black text-slate-900 mt-2 tracking-tighter">{stat.value}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-12 pt-8">
        {/* Market Depth Visual */}
        <div className="lg:col-span-2 space-y-12">
           <div className="flex items-center justify-between">
              <div className="space-y-1">
                <h2 className="text-4xl font-black text-slate-900 tracking-tight serif italic">Live Marketplace.</h2>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">Direct-from-Field Inventory Listings</p>
              </div>
              <div className="flex gap-3">
                 <button className="p-4 bg-slate-50 rounded-2xl border border-slate-200 hover:border-blue-600 transition-colors"><Filter className="w-5 h-5 text-slate-400" /></button>
                 <button className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">Bulk Procurement</button>
              </div>
           </div>
           
           <div className="grid gap-6">
              {[
                { farmer: 'Rajesh Verma', crop: 'Potato (Kufri Jyoti)', qty: '45 Qt', location: 'Unnao, UP', price: '₹1,420/Qt', quality: 'A++', time: '2m ago' },
                { farmer: 'Sita Devi', crop: 'Potato (Laukar)', qty: '120 Qt', location: 'Hardoi, UP', price: '₹1,380/Qt', quality: 'A-Grade', time: '14m ago' },
                { farmer: 'Mohit Singh', crop: 'Potato (Jyoti)', qty: '80 Qt', location: 'Lucknow, UP', price: '₹1,450/Qt', quality: 'A++', time: '21m ago' }
              ].map((item, i) => (
                <div key={i} className="bg-white border-2 border-slate-100 p-10 rounded-[56px] flex flex-col md:flex-row items-center justify-between gap-10 group hover:border-blue-600 transition-all hover:shadow-2xl shadow-sm relative overflow-hidden">
                   <div className="absolute top-0 left-0 w-2 h-full bg-blue-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                   <div className="flex items-center gap-8">
                      <div className="w-20 h-20 bg-slate-50 rounded-[28px] flex items-center justify-center text-slate-300 font-black text-2xl border-2 border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner">
                         {item.farmer[0]}
                      </div>
                      <div className="space-y-2">
                         <div className="flex items-center gap-3">
                           <h4 className="font-black text-slate-900 text-2xl tracking-tight">{item.farmer}</h4>
                           <div className="bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded text-[8px] font-black uppercase">Verified</div>
                         </div>
                         <div className="flex items-center gap-6 text-[10px] font-black uppercase tracking-widest text-slate-400">
                           <span className="flex items-center gap-2"><Package className="w-4 h-4" /> {item.crop}</span>
                           <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> {item.location}</span>
                         </div>
                      </div>
                   </div>
                   
                   <div className="flex items-center gap-14">
                      <div className="text-right">
                         <div className="text-3xl font-black text-slate-900">{item.price}</div>
                         <div className="text-[10px] font-black uppercase text-slate-400 tracking-widest mt-1">{item.qty} Lot Size</div>
                      </div>
                      <button className="bg-slate-900 text-white px-10 py-5 rounded-[24px] font-black text-xs uppercase tracking-[0.2em] shadow-xl group-hover:bg-blue-600 transition-all active:scale-95">
                         Submit Bid
                      </button>
                   </div>
                </div>
              ))}
           </div>
           
           <button className="w-full bg-slate-50 border-4 border-dashed border-slate-200 py-8 rounded-[40px] font-black text-slate-400 uppercase tracking-[0.3em] text-xs hover:bg-slate-100 transition-all">
              Syncing More Supply Nodes...
           </button>
        </div>

        {/* Command Sidebar */}
        <div className="space-y-8">
          <div className="bg-slate-900 rounded-[64px] p-12 text-white space-y-12 shadow-[0_50px_100px_rgba(0,0,0,0.5)] border-4 border-slate-800 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-blue-600/20 rounded-full blur-[100px]"></div>
            <div className="flex items-center justify-between relative z-10">
              <h3 className="text-2xl font-black serif">Fleet Radar</h3>
              <div className="flex items-center gap-3 bg-emerald-500/20 px-4 py-1.5 rounded-full border border-emerald-500/30">
                 <div className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-ping"></div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">Live Grid</span>
              </div>
            </div>
            
            <div className="space-y-8 relative z-10">
              {[
                { id: 'TRK-9021', route: 'LKO → DEL', status: 'In Transit', progress: 75, color: 'bg-emerald-500' },
                { id: 'TRK-4410', route: 'AGR → BOM', status: 'Loading', progress: 15, color: 'bg-blue-500' },
                { id: 'TRK-1122', route: 'KNP → HYD', status: 'Delay Alert', progress: 45, color: 'bg-red-500' }
              ].map((trk, i) => (
                <div key={i} className="space-y-4 group cursor-pointer">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-slate-500 uppercase tracking-widest group-hover:text-white transition-colors">
                       {trk.id} • {trk.route}
                    </span>
                    <span className={`text-[9px] font-black uppercase tracking-widest ${trk.status.includes('Delay') ? 'text-red-400' : 'text-blue-400'}`}>{trk.status}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden flex items-center">
                    <div className={`h-full ${trk.color} transition-all duration-1000 group-hover:brightness-125`} style={{ width: `${trk.progress}%` }}></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="pt-8 relative z-10">
              <button className="w-full bg-blue-600 hover:bg-blue-700 py-6 rounded-[32px] font-black uppercase tracking-[0.2em] text-sm shadow-2xl shadow-blue-500/40 transition-all flex items-center justify-center gap-4 group">
                 Logistics Ops Console
                 <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </div>

          <div className="bg-white border-4 border-slate-100 p-10 rounded-[56px] shadow-xl space-y-6">
             <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-50 rounded-2xl text-purple-600"><Globe className="w-6 h-6" /></div>
                <h3 className="font-black text-slate-900 text-lg uppercase tracking-tight">Export Quota</h3>
             </div>
             <div className="space-y-2">
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-400">
                   <span>Fulfillment</span>
                   <span>64%</span>
                </div>
                <div className="h-3 bg-slate-100 rounded-full overflow-hidden">
                   <div className="h-full bg-purple-600" style={{ width: '64%' }}></div>
                </div>
             </div>
             <p className="text-xs font-bold text-slate-400 leading-relaxed">
                You are currently eligible for <span className="text-slate-900">Priority Export Corridor A-1</span>. Update your ISO certifications to unlock Corridor A-2.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

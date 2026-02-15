
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  CheckCircle2, 
  AlertCircle, 
  Wrench, 
  IndianRupee, 
  Info, 
  ExternalLink, 
  Zap, 
  HelpCircle, 
  UserPlus, 
  Star, 
  ChevronDown, 
  Plus, 
  Minus, 
  ArrowRight,
  Cpu,
  ShieldCheck,
  Truck,
  MapPin,
  Clock
} from 'lucide-react';
import { AgriStore } from '../services/agriStore';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const ComponentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [component, setComponent] = useState(AgriStore.getComponentById(id || ''));
  const [activeImg, setActiveImg] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      setIsBookmarked(AgriStore.getBookmarks().includes(id));
      setComponent(AgriStore.getComponentById(id));
    }
  }, [id]);

  if (!component) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-6">
        <h2 className="text-4xl font-black text-slate-900">Registry Error.</h2>
        <Link to="/agri-hub" className="text-emerald-600 font-black uppercase tracking-widest underline">Return to Hub</Link>
      </div>
    );
  }

  const schemes = AgriStore.getSchemes();
  const linkedSchemes = schemes.filter(s => component.relatedSchemes.includes(s.id));
  const relatedComponents = AgriStore.getComponents().filter(c => component.relatedComponents.includes(c.id));

  const handleBookmark = () => {
    AgriStore.toggleBookmark(component.id);
    setIsBookmarked(!isBookmarked);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-16 pb-40">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <Breadcrumbs />
        <div className="flex gap-4">
          <button 
            onClick={handleBookmark}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border-2 ${isBookmarked ? 'bg-emerald-500 border-emerald-400 text-white' : 'bg-white border-slate-100 text-slate-400 hover:bg-slate-50'}`}
          >
            <Star className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} /> {isBookmarked ? 'Saved to Profile' : 'Bookmark Item'}
          </button>
          <button className="bg-emerald-600 text-white px-10 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl hover:bg-black transition-all">Request Dealer Callback</button>
        </div>
      </div>

      <div className="grid lg:grid-cols-12 gap-16">
        {/* Left: Interactive Media */}
        <div className="lg:col-span-5 space-y-10">
          <div className="aspect-square rounded-[80px] overflow-hidden border-8 border-white shadow-[0_50px_100px_rgba(0,0,0,0.2)] bg-slate-50 relative group">
            <img src={component.images[activeImg]} className="w-full h-full object-cover animate-reveal" alt={component.name} />
            <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md px-6 py-2 rounded-full border border-white/20 text-xs font-black uppercase text-slate-900 shadow-2xl">
               High-Res Telemetry
            </div>
          </div>
          <div className="flex gap-4 px-4 overflow-x-auto pb-4 custom-scrollbar">
            {component.images.map((img, idx) => (
              <button 
                key={idx} 
                onClick={() => setActiveImg(idx)}
                className={`w-24 h-24 shrink-0 rounded-3xl overflow-hidden border-4 transition-all ${activeImg === idx ? 'border-emerald-500 scale-110 shadow-lg' : 'border-white grayscale opacity-50 hover:grayscale-0 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-2 gap-6">
             <div className="bg-slate-900 text-white p-8 rounded-[48px] space-y-4 shadow-xl border-4 border-slate-800">
                <div className="text-[9px] font-black uppercase text-slate-500 tracking-[0.3em]">Purchase Estimate</div>
                <div className="text-4xl font-black text-emerald-400 tracking-tighter leading-none">{component.costRange.split('-')[0]}</div>
                <div className="text-[10px] font-bold text-slate-400">Post-Subsidy Pricing Available</div>
             </div>
             <div className="bg-emerald-50 border-4 border-emerald-100 p-8 rounded-[48px] space-y-4 shadow-xl">
                <div className="text-[9px] font-black uppercase text-emerald-600 tracking-[0.3em]">Hire starting from</div>
                <div className="text-4xl font-black text-emerald-700 tracking-tighter leading-none">{component.rentalPrice || 'NA'}</div>
                <div className="text-[10px] font-bold text-emerald-600">Local Custom Hire Rates</div>
             </div>
          </div>
        </div>

        {/* Right: Technical Intelligence */}
        <div className="lg:col-span-7 space-y-12">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
               <div className="bg-slate-900 text-emerald-400 px-4 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">Sovereign Tested</div>
               <div className="flex items-center gap-1.5 text-amber-500 font-black text-sm">
                  <Star className="w-4 h-4 fill-amber-500" /> {component.rating} Community Trust
               </div>
            </div>
            <h1 className="text-6xl lg:text-9xl font-black text-slate-900 tracking-tighter serif leading-[0.9]">{component.name}</h1>
            <p className="text-2xl text-slate-500 font-bold leading-relaxed italic">"{component.description}"</p>
          </div>

          {/* New Technical Parameters Grid */}
          <div className="bg-white border-2 border-slate-100 p-10 rounded-[56px] shadow-sm grid grid-cols-2 md:grid-cols-4 gap-8">
             <div className="space-y-2">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Power Class</div>
                <div className="text-lg font-black text-slate-900">{component.specs.power || 'System Unit'}</div>
             </div>
             <div className="space-y-2">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Efficiency</div>
                <div className="text-lg font-black text-slate-900">{component.specs.efficiency || 'Verified'}</div>
             </div>
             <div className="space-y-2">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Stack Tier</div>
                <div className="text-lg font-black text-emerald-600">{component.specs.techLevel}</div>
             </div>
             <div className="space-y-2">
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Reliability</div>
                <div className="text-lg font-black text-slate-900">{component.specs.durability}</div>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 pt-8">
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-emerald-600 font-black uppercase tracking-widest text-[10px]">
                <Wrench className="w-5 h-5" /> Maintenance Audit
              </div>
              <ul className="space-y-5">
                {component.maintenanceTips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="w-8 h-8 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center shrink-0 mt-1 shadow-inner group-hover:bg-emerald-500 transition-colors">
                      <ShieldCheck className="w-4 h-4 text-emerald-500 group-hover:text-white" />
                    </div>
                    <span className="text-base font-bold text-slate-600 leading-relaxed group-hover:text-slate-900 transition-colors">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <div className="flex items-center gap-4 text-red-600 font-black uppercase tracking-widest text-[10px]">
                <AlertCircle className="w-5 h-5" /> Field Vulnerabilities
              </div>
              <div className="grid grid-cols-1 gap-4">
                {component.commonProblems.map((prob, i) => (
                  <div key={i} className="p-6 bg-red-50/30 border border-red-100 rounded-3xl flex items-center gap-5 text-sm font-black text-red-900 italic">
                    <div className="w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" /> {prob}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Availability Logic */}
          <div className="bg-blue-600 text-white p-12 rounded-[56px] space-y-10 shadow-2xl relative overflow-hidden group">
             <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-bl-full group-hover:scale-110 transition-transform duration-1000"></div>
             <div className="flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
                <div className="space-y-4 text-center md:text-left">
                   <h3 className="text-4xl font-black serif">Procurement <br/> Channel.</h3>
                   <p className="text-blue-100 font-bold max-w-sm">There are <span className="text-white font-black">{component.dealersCount} verified dealers</span> within the Lucknow cluster offering this unit.</p>
                </div>
                <div className="flex flex-col gap-4 w-full md:w-auto">
                   <button className="bg-white text-blue-600 px-12 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest shadow-xl hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3">
                      Locate Dealers <MapPin className="w-5 h-5" />
                   </button>
                   <button className="bg-blue-700/50 backdrop-blur-md border border-blue-400 text-white px-12 py-5 rounded-[28px] font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all flex items-center justify-center gap-3">
                      Hire Locally <Truck className="w-5 h-5" />
                   </button>
                </div>
             </div>
          </div>

          {/* Scheme Integration */}
          {linkedSchemes.length > 0 && (
            <div className="pt-12 border-t border-slate-100 space-y-10">
               <div className="flex items-center justify-between">
                  <h2 className="text-4xl font-black text-slate-900 serif italic">Subsidy Routing.</h2>
                  <div className="bg-emerald-50 text-emerald-700 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border border-emerald-100 flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5" /> Fast-Track Active
                  </div>
               </div>
               <div className="grid gap-6">
                 {linkedSchemes.map(scheme => (
                   <Link key={scheme.id} to={`/agri-hub/scheme/${scheme.id}`} className="group bg-white p-10 rounded-[48px] border-4 border-slate-100 hover:border-emerald-600 transition-all flex flex-col md:flex-row items-center justify-between gap-10 shadow-sm hover:shadow-xl">
                      <div className="flex items-center gap-8">
                        <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-inner border border-emerald-100">
                           <Zap className="w-10 h-10 fill-current" />
                        </div>
                        <div>
                          <h4 className="text-2xl font-black text-slate-900">{scheme.schemeName}</h4>
                          <div className="flex gap-4 mt-2">
                            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest">Potential: {scheme.subsidyPercentage}% OFF</span>
                            <span className="w-1 h-1 bg-slate-200 rounded-full mt-2" />
                            <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Govt-Verified</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 bg-slate-900 text-white px-8 py-4 rounded-[24px] text-[10px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-4 transition-all duration-500">
                        Initiate Application <ArrowRight className="w-4 h-4" />
                      </div>
                   </Link>
                 ))}
               </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

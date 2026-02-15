
import React, { useState } from 'react';
import { Card } from '../components/Card';
import { Link } from 'react-router-dom';
import { 
  MOCK_MANDI_PRICES, 
  MOCK_SUBSIDIES, 
  MOCK_WEATHER, 
  MOCK_PRIORITIES,
  CROP_CALENDAR
} from '../constants';
import { 
  TrendingUp, 
  CloudSun, 
  ShieldCheck, 
  ChevronRight,
  AlertTriangle,
  CheckCircle2,
  Mic,
  ArrowRight,
  Droplets,
  Wind,
  FileText,
  Clock,
  Zap,
  Volume2,
  ArrowUpRight,
  AlertCircle,
  CalendarCheck,
  Timer,
  ChevronDown,
  Video,
  Sparkles,
  Map,
  Sprout,
  Brain,
  Landmark,
  Shield
} from 'lucide-react';
import { UserProfile } from '../types';

export const FarmerDashboard: React.FC<{ user: UserProfile | null }> = ({ user }) => {
  const [showPredictions, setShowPredictions] = useState<Record<number, boolean>>({});
  const [expandedSubsidy, setExpandedSubsidy] = useState<number | null>(null);

  const togglePrediction = (idx: number) => {
    setShowPredictions(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 space-y-12 pb-40">
      
      {/* Personalized Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 animate-reveal">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-emerald-50 rounded-full border border-emerald-100/50">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-700">OS V2.4 • Intelligence Active</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-black text-[#064E3B] tracking-tighter serif leading-none">
            Suprabhat, <br/><span className="text-slate-900">{user?.firstName || 'Kisan'}</span>.
          </h1>
          <p className="text-slate-400 font-bold uppercase tracking-[0.4em] text-[9px] pl-1">Sovereign Agri-Gateway Initialized</p>
        </div>
        
        {/* Real-time Ticker */}
        <div className="flex items-center gap-6 md:gap-12 bg-white px-6 md:px-10 py-6 rounded-[32px] border border-slate-100 shadow-sm ring-1 ring-slate-50">
          <div className="space-y-2">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Environment Telemetry</div>
            <div className="flex items-center gap-3 font-black text-slate-900 text-lg">
              <CloudSun className="w-5 h-5 text-blue-500" /> {MOCK_WEATHER.temp}°C
              <span className="hidden sm:inline text-xs font-bold text-slate-400 border-l border-slate-100 pl-3 serif italic">{MOCK_WEATHER.condition}</span>
            </div>
          </div>
          <div className="w-px h-12 bg-slate-100"></div>
          <div className="space-y-2">
            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Market Fluidity</div>
            <div className="flex items-center gap-3 font-black text-emerald-600 text-lg">
              <TrendingUp className="w-5 h-5" /> ₹1,450
              <span className="hidden sm:inline text-[10px] font-black bg-emerald-50 px-2 py-0.5 rounded-lg">+4.2%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Primary OS Controls (Hero Grid) */}
      <div className="grid lg:grid-cols-12 gap-10 items-stretch">
        <section className="lg:col-span-8 group">
          <div className="grad-forest h-full rounded-[48px] md:rounded-[64px] overflow-hidden shadow-2xl border-4 border-white/5 flex flex-col md:flex-row items-stretch hover:shadow-[0_40px_80px_-20px_rgba(6,78,59,0.3)] transition-all duration-700">
            {/* Visual Priority Accent */}
            <div className="grad-gold p-8 md:p-12 flex flex-col items-center justify-center min-w-[200px] md:min-w-[240px] text-white relative overflow-hidden">
               <div className="absolute inset-0 shimmer opacity-30"></div>
               <Zap className="w-12 h-12 md:w-16 md:h-16 mb-6 fill-white drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
               <span className="text-sm font-black uppercase tracking-[0.3em] text-center leading-tight">Action <br/> Intelligence</span>
               <div className="mt-8 text-[9px] font-black tracking-[0.5em] opacity-40 border-t border-white/20 pt-6 w-full text-center">BK-OS DEC-092</div>
            </div>
            
            <div className="flex-1 p-8 md:p-12 lg:p-16 flex flex-col md:flex-row items-center justify-between gap-12 relative">
              <div className="space-y-6 text-center md:text-left max-w-lg">
                <div className="inline-flex items-center gap-3 px-4 py-1.5 bg-red-500/10 text-red-400 text-[10px] font-black rounded-full uppercase tracking-widest border border-red-500/20">
                  <AlertCircle className="w-3.5 h-3.5" /> CRITICAL DECISION
                </div>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white leading-tight serif">
                  Target <span className="text-[#C29243] italic">Potato Block B</span> for irrigation now to mitigate <span className="underline decoration-red-500 underline-offset-8">Frost Risk</span>.
                </h2>
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-8 text-sm font-bold text-slate-400">
                  <span className="flex items-center gap-2 px-3 py-1 bg-white/5 rounded-xl border border-white/10"><Droplets className="w-4 h-4 text-blue-400" /> Optimal: 2h Depth</span>
                  <span className="hidden sm:flex items-center gap-2"><Wind className="w-4 h-4 text-slate-500" /> Wind: 12km/h SE</span>
                </div>
              </div>
              
              <div className="flex flex-col gap-5 min-w-[220px] w-full md:w-auto">
                <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-10 py-6 rounded-[32px] font-black text-xs uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(16,185,129,0.3)] transition-all active:scale-95 group">
                  Task Deployed <ArrowRight className="w-5 h-5 inline ml-2 group-hover:translate-x-2 transition-transform" />
                </button>
                <button className="bg-white/5 hover:bg-white/10 p-6 rounded-[32px] transition-all flex items-center justify-center gap-3 text-white font-black text-[10px] uppercase tracking-[0.3em] border border-white/10">
                  <Volume2 className="w-5 h-5 text-emerald-400" /> Listen Audio
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Kisan Score Widget */}
        <section className="lg:col-span-4">
          <div className="bg-white h-full border border-slate-100 rounded-[48px] md:rounded-[64px] p-8 md:p-12 flex flex-col items-center justify-between text-center shadow-2xl shadow-slate-200/50 group hover:border-emerald-600 transition-all duration-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50/50 rounded-bl-[120px] transition-transform group-hover:scale-125"></div>
            
            <div className="space-y-2 relative z-10">
              <h3 className="text-2xl font-black text-slate-900 serif italic">Kisan Sovereign Score</h3>
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Identity Health index</p>
            </div>
            
            <div className="relative w-40 h-40 md:w-52 md:h-52 my-6">
              <svg className="w-full h-full transform -rotate-90">
                <circle className="text-slate-50" strokeWidth="18" stroke="currentColor" fill="transparent" r="82" cx="104" cy="104" />
                <circle className="text-emerald-500 drop-shadow-[0_0_8px_rgba(16,185,129,0.4)]" strokeWidth="18" strokeDasharray={82 * 2 * Math.PI} strokeDashoffset={82 * 2 * Math.PI * (1 - 82 / 100)} strokeLinecap="round" stroke="currentColor" fill="transparent" r="82" cx="104" cy="104" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center animate-reveal">
                <span className="text-4xl md:text-6xl font-black text-slate-900 tracking-tighter">82</span>
                <span className="text-[10px] font-black uppercase text-emerald-600 tracking-widest mt-2 bg-emerald-50 px-3 py-1 rounded-full">Elite Tier</span>
              </div>
            </div>

            <button className="bg-slate-900 text-white px-10 py-5 rounded-[32px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-emerald-600 transition-all w-full flex items-center justify-center gap-3 shadow-xl relative z-10 active:scale-95">
              Access Credit Line <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </section>
      </div>

      {/* High-Fidelity Lifecycle Timeline */}
      <section className="bg-white border border-slate-100 p-8 md:p-12 rounded-[48px] md:rounded-[72px] shadow-2xl shadow-slate-100/50 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-500 to-transparent"></div>
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
          <div className="space-y-2">
            <h2 className="text-2xl md:text-3xl font-black text-[#064E3B] serif">Lifecycle Monitoring: <span className="text-slate-400">Potato Jyoti</span></h2>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.5em]">Deep-Field Telemetry Calibration</p>
          </div>
          <Link to="/directory" className="group flex items-center gap-3 bg-slate-50 hover:bg-[#064E3B] hover:text-white px-8 py-3 rounded-full border border-slate-200 transition-all duration-300 w-fit">
            <span className="text-[10px] font-black uppercase tracking-widest">Connect with Agronomist</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 items-center">
          {CROP_CALENDAR.map((stage, i) => (
            <div key={i} className="flex-1 w-full group relative">
              <div className={`h-1.5 rounded-full mb-8 transition-all duration-1000 ${
                stage.status === 'completed' ? 'bg-emerald-500' : stage.status === 'current' ? 'bg-emerald-500 animate-pulse' : 'bg-slate-100'
              }`}></div>
              <div className={`p-8 rounded-[40px] border transition-all duration-500 ${
                stage.status === 'current' ? 'border-emerald-500 bg-emerald-50/50 shadow-xl' : 'border-slate-50 bg-slate-50/50 group-hover:bg-white group-hover:border-slate-200'
              }`}>
                <div className="text-[9px] font-black text-slate-400 uppercase tracking-[0.3em] mb-3">{stage.duration}</div>
                <div className="text-xl font-black text-slate-900 serif leading-none">{stage.stage}</div>
                {stage.status === 'current' && (
                  <div className="mt-6 space-y-3">
                    {stage.tasks.map((t, ti) => (
                      <div key={ti} className="flex items-center gap-3 text-[11px] font-bold text-slate-600">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" /> {t}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Innovation Layer (AI Labs) */}
      <section className="grid md:grid-cols-2 gap-10">
        <Link to="/agri-video-lab" className="group bg-slate-900 p-8 md:p-12 lg:p-16 rounded-[48px] md:rounded-[72px] text-white flex flex-col justify-between min-h-[350px] md:min-h-[400px] shadow-3xl hover:scale-[1.01] transition-all duration-700 relative overflow-hidden border border-white/5">
           <div className="absolute inset-0 grad-forest opacity-80"></div>
           <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-[100px] translate-x-1/2 -translate-y-1/2"></div>
           
           <div className="flex items-center justify-between relative z-10">
              <div className="bg-white/10 backdrop-blur-xl p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-white/10 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
                <Video className="w-8 h-8 md:w-12 md:h-12 text-emerald-400" />
              </div>
              <div className="bg-emerald-500 text-white px-5 py-2 rounded-full flex items-center gap-2 shadow-xl">
                <Sparkles className="w-4 h-4 text-white animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">Neural Engine v3.1</span>
              </div>
           </div>
           
           <div className="relative z-10 space-y-4">
              <h2 className="text-4xl md:text-5xl font-black serif leading-tight tracking-tighter">Agri-Video <br/> <span className="text-emerald-500 italic">Synthesizer.</span></h2>
              <p className="text-slate-400 font-bold text-lg max-w-sm">Generate cinematic field monitoring and training sequences with Veo Intelligence.</p>
           </div>
        </Link>

        <div className="bg-white p-8 md:p-12 lg:p-16 rounded-[48px] md:rounded-[72px] flex flex-col justify-between min-h-[350px] md:min-h-[400px] shadow-2xl border border-slate-100 relative overflow-hidden group hover:border-[#C29243] transition-all duration-700">
           <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#C29243]/5 rounded-full blur-[80px] translate-y-1/2 translate-x-1/2"></div>
           
           <div className="flex items-center justify-between relative z-10">
              <div className="bg-slate-50 p-4 md:p-6 rounded-[24px] md:rounded-[32px] border border-slate-100 group-hover:bg-[#C29243] group-hover:text-white transition-all duration-500 shadow-sm">
                <Brain className="w-8 h-8 md:w-12 md:h-12" />
              </div>
              <span className="bg-[#C29243] text-white text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-[0.3em] shadow-lg">Cognitive Advisor</span>
           </div>
           
           <div className="space-y-4 relative z-10">
              <h2 className="text-4xl md:text-5xl font-black text-slate-900 serif leading-tight tracking-tighter">Predictive <br/> <span className="text-[#C29243] italic">Advisory.</span></h2>
              <p className="text-slate-500 font-bold text-lg max-w-sm">Real-time localized agronomist intelligence with native audio support.</p>
           </div>
        </div>
      </section>

      {/* Market Intelligence Grid */}
      <div className="grid lg:grid-cols-12 gap-10 pt-10">
        {/* Weather Intelligence Card */}
        <div className="lg:col-span-8 bg-white border border-slate-100 rounded-[48px] md:rounded-[72px] p-8 md:p-12 flex flex-col md:flex-row gap-10 md:gap-16 items-center shadow-2xl shadow-slate-100/50">
           <div className="space-y-10 flex-1 w-full">
             <div className="flex flex-col sm:flex-row items-center gap-8 md:gap-10">
               <div className="w-32 h-32 md:w-40 md:h-40 bg-blue-50/50 rounded-[32px] md:rounded-[48px] flex items-center justify-center border border-blue-100 shadow-inner group hover:scale-110 transition-transform duration-700">
                 <CloudSun className="w-16 h-16 md:w-24 md:h-24 text-blue-600 drop-shadow-[0_10px_10px_rgba(37,99,235,0.2)]" />
               </div>
               <div className="text-center sm:text-left">
                 <div className="flex items-baseline gap-4 justify-center sm:justify-start">
                   <span className="text-6xl md:text-8xl font-black text-slate-900 tracking-tighter">{MOCK_WEATHER.temp}°</span>
                   <span className="text-2xl md:text-4xl font-bold text-slate-400 serif italic underline decoration-blue-200 decoration-4 underline-offset-8">{MOCK_WEATHER.condition}</span>
                 </div>
                 <div className="flex flex-wrap justify-center sm:justify-start gap-6 md:gap-10 mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
                   <span className="flex items-center gap-3"><Droplets className="w-5 h-5 md:w-6 md:h-6 text-blue-400" /> Hum: {MOCK_WEATHER.humidity}</span>
                   <span className="flex items-center gap-3"><Wind className="w-5 h-5 md:w-6 md:h-6 text-slate-400" /> Gust: {MOCK_WEATHER.windSpeed}</span>
                 </div>
               </div>
             </div>
             
             <div className="p-8 md:p-10 rounded-[32px] md:rounded-[48px] border bg-amber-50/30 border-amber-100 space-y-6 relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10"><Zap className="w-16 h-16 md:w-20 md:h-20 text-amber-500" /></div>
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-ping"></div>
                  <span className="text-xs font-black uppercase tracking-[0.2em] text-amber-700">Weather Signal: {MOCK_WEATHER.alert}</span>
                </div>
                <p className="text-lg md:text-xl font-bold text-slate-700 leading-relaxed italic">"{MOCK_WEATHER.recommendation}"</p>
                <button className="bg-slate-900 text-white px-8 md:px-10 py-5 rounded-[24px] text-[10px] font-black uppercase tracking-[0.2em] hover:bg-amber-600 shadow-2xl transition-all active:scale-95 w-full sm:w-auto">
                  Expand Meteorological Insights
                </button>
             </div>
           </div>
        </div>

        {/* Priority Stack Side Widget */}
        <div className="lg:col-span-4 bg-[#064E3B] rounded-[48px] md:rounded-[72px] p-8 md:p-12 space-y-12 text-white shadow-3xl relative overflow-hidden">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(16,185,129,0.1),transparent)]"></div>
           <div className="flex items-center justify-between relative z-10">
              <h3 className="text-xs font-black uppercase tracking-[0.5em] text-emerald-500/80">Command Priority</h3>
              <div className="bg-emerald-500 w-2.5 h-2.5 rounded-full animate-pulse shadow-[0_0_15px_rgba(16,185,129,0.8)]"></div>
           </div>
           
           <div className="space-y-6 relative z-10">
             {MOCK_PRIORITIES.map(p => (
               <div key={p.id} className="bg-white/5 p-6 md:p-8 rounded-[32px] md:rounded-[40px] border border-white/10 hover:bg-white/10 cursor-pointer transition-all duration-500 group flex items-center justify-between shadow-sm">
                 <div className="flex items-center gap-4 md:gap-6">
                   <div className={`p-4 md:p-5 rounded-[20px] md:rounded-3xl backdrop-blur-md shadow-2xl ${p.priority === 'High' ? 'bg-red-500/20 text-red-400' : 'bg-white/5 text-slate-300'}`}>
                     {p.icon === 'ShieldCheck' ? <ShieldCheck className="w-6 h-6 md:w-7 md:h-7" /> : <FileText className="w-6 h-6 md:w-7 md:h-7" />}
                   </div>
                   <div>
                     <span className="text-base md:text-lg font-black text-white block tracking-tight">{p.label}</span>
                     <span className="text-[9px] font-black uppercase text-emerald-500/60 tracking-[0.3em] mt-1">Status: Pending Verification</span>
                   </div>
                 </div>
                 <ChevronRight className="w-5 h-5 md:w-6 md:h-6 text-white/20 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
               </div>
             ))}
           </div>
           
           <div className="bg-emerald-500/10 border border-emerald-500/20 p-8 rounded-[32px] md:rounded-[40px] text-center relative z-10 group hover:bg-emerald-500/20 transition-all">
              <p className="text-[10px] font-black text-emerald-400/80 uppercase tracking-[0.3em] leading-loose">
                Sovereign Stack Completion: 94% <br/> 
                <Link to="/profile" className="text-white underline decoration-emerald-500 underline-offset-4 hover:text-emerald-400 transition-colors">Audit Identity Records</Link>
              </p>
           </div>
        </div>
      </div>

      {/* Global Trade & Subsidy (Market Analysis) */}
      <div className="grid lg:grid-cols-3 gap-12 pt-12">
        <div className="lg:col-span-2 space-y-12">
           <div className="flex flex-col sm:flex-row items-center justify-between border-b border-slate-100 pb-10 gap-6">
              <h2 className="text-3xl md:text-5xl font-black text-[#064E3B] tracking-tighter serif">Mandi Bazar Intelligence.</h2>
              <Link to="/sell" className="btn-premium px-10 py-5 rounded-[32px] font-black text-[10px] uppercase tracking-[0.3em] w-full sm:w-auto text-center">Enter Marketplace</Link>
           </div>
           
           <div className="grid sm:grid-cols-2 gap-10">
             {MOCK_MANDI_PRICES.map((p, i) => (
               <Card 
                 key={i} 
                 title={p.mandi} 
                 icon={<TrendingUp className="text-emerald-600 w-8 h-8" />} 
                 className={`transition-all duration-700 ${showPredictions[i] ? 'border-emerald-500 ring-8 ring-emerald-50' : ''}`}
                 badge={p.commodity}
                 badgeColor="bg-slate-50 text-slate-900 border-slate-100"
                 footer={
                   <div className="space-y-6">
                     {showPredictions[i] ? (
                       <div className="bg-[#064E3B] p-8 md:p-10 rounded-[32px] md:rounded-[48px] text-white space-y-6 animate-in fade-in zoom-in-95 border border-emerald-500/20 shadow-3xl">
                          <div className="flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400">
                            <Zap className="w-5 h-5 fill-emerald-400" /> Neural Forecast
                          </div>
                          <div className="text-2xl md:text-3xl font-black serif italic leading-tight">Projected Signal: <br/> Hold Stock (+12d)</div>
                          <p className="text-sm font-bold text-slate-400 leading-relaxed">
                            Supply variance detected in Lucknow cluster. Predictive model suggests <span className="text-emerald-400 font-black">+₹180/q</span> gains within 12 days.
                          </p>
                          <button onClick={() => togglePrediction(i)} className="w-full text-center py-4 bg-white/5 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 hover:bg-white/10 transition-all border border-emerald-500/10">Dismiss Model</button>
                       </div>
                     ) : (
                       <button onClick={() => togglePrediction(i)} className="w-full bg-slate-50 border-2 border-dashed border-slate-200 py-6 rounded-[32px] text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-700 transition-all group">
                         <Brain className="w-5 h-5 inline mr-2 group-hover:scale-110 transition-transform" /> Calculate AI Prediction
                       </button>
                     )}
                   </div>
                 }
               >
                 <div className="space-y-10">
                   <div className="flex items-baseline gap-3">
                     <span className="text-5xl md:text-7xl font-black text-slate-900 tracking-tighter tabular-nums">₹{p.price}</span>
                     <span className="text-xl md:text-2xl font-bold text-slate-400 serif italic">/{p.unit}</span>
                   </div>
                   <div className="flex items-center justify-between text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] border-t border-slate-50 pt-8">
                     <span className="flex items-center gap-3"><Clock className="w-5 h-5 opacity-40" /> {p.lastSync}</span>
                     <span className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-lg">Vol: {p.volume}</span>
                   </div>
                 </div>
               </Card>
             ))}
           </div>
        </div>

        {/* Governance & Benefits Panel */}
        <div className="space-y-12">
          <h2 className="text-3xl md:text-4xl font-black text-[#064E3B] tracking-tighter serif italic">Sovereign Benefits.</h2>
          <div className="space-y-8">
            {MOCK_SUBSIDIES.map((s, i) => {
              const isStuck = s.status === 'Pending';
              const progressPercentage = (s.timeline.filter(t => t.completed).length / s.timeline.length) * 100;
              const isExpanded = expandedSubsidy === i;
              
              return (
                <div key={i} className={`bg-white border p-8 md:p-12 rounded-[48px] md:rounded-[64px] space-y-10 shadow-2xl transition-all duration-500 ${isStuck ? 'border-amber-200 ring-8 ring-amber-50/30' : 'border-slate-100'}`}>
                  <div className="flex items-center gap-6 md:gap-8">
                    <div className={`p-5 md:p-6 rounded-[24px] md:rounded-[32px] shadow-2xl ${s.status === 'Disbursed' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                      <Landmark className="w-8 h-8 md:w-10 md:h-10" />
                    </div>
                    <div>
                      <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight serif">{s.schemeName}</h3>
                      <div className="text-3xl md:text-4xl font-black text-slate-900 mt-2 tracking-tighter">{s.amount}</div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                      <span>Stack Disbursal Audit</span>
                      <span className={isStuck ? 'text-amber-600' : 'text-emerald-600'}>{progressPercentage.toFixed(0)}%</span>
                    </div>
                    <div className="h-3 bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      <div 
                        className={`h-full transition-all duration-1000 ease-out shadow-[0_0_10px_rgba(16,185,129,0.3)] ${isStuck ? 'bg-amber-400' : 'bg-emerald-500'}`} 
                        style={{ width: `${progressPercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <button 
                    onClick={() => setExpandedSubsidy(isExpanded ? null : i)}
                    className="w-full flex items-center justify-between p-6 bg-slate-50 hover:bg-slate-100 rounded-[32px] text-[10px] font-black uppercase tracking-[0.3em] text-slate-500 transition-all border border-slate-100"
                  >
                    {isExpanded ? 'Collapse Audit Logs' : 'Trace Disbursal Steps'}
                    <ChevronDown className={`w-5 h-5 transition-transform duration-500 ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>

                  {isExpanded && (
                    <div className="space-y-10 relative ml-4 pt-4 animate-in slide-in-from-top-4">
                      <div className="absolute left-[15px] top-10 bottom-10 w-0.5 bg-slate-100"></div>
                      {s.timeline.map((step, idx) => (
                        <div key={idx} className="flex items-start gap-10 relative">
                          <div className={`z-10 w-8 h-8 rounded-full border-4 flex items-center justify-center transition-all duration-700 bg-white shadow-sm ${
                            step.completed ? 'border-emerald-500 text-emerald-500 scale-110' : 'border-slate-200 text-slate-300'
                          }`}>
                            <CheckCircle2 className="w-5 h-5" />
                          </div>
                          <div className="flex-1 pb-4">
                            <div className="flex items-center justify-between">
                              <span className={`text-base font-black tracking-tight ${step.completed ? 'text-slate-900' : 'text-slate-400'}`}>{step.step}</span>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{step.date}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

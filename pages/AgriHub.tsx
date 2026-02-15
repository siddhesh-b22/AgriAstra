
import React, { useState, useMemo, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Tractor, 
  Droplets, 
  Zap, 
  Sprout, 
  ChevronRight, 
  Award, 
  SearchX, 
  SlidersHorizontal, 
  Star, 
  MapPin, 
  BarChart2, 
  X,
  Scale,
  Clock,
  TrendingUp,
  TrendingDown,
  ChevronDown,
  ShoppingCart,
  MessageSquare,
  ShieldCheck,
  Brain,
  Info,
  Layers,
  // Fix: Added missing ArrowRight import
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AgriStore } from '../services/agriStore';
import { AgriComponent } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const AgriHub: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedState, setSelectedState] = useState('Uttar Pradesh');
  const [maxPrice, setMaxPrice] = useState<number>(1000000);
  const [showFilters, setShowFilters] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const categories = [
    { id: 'All', icon: <Layers className="w-4 h-4" /> },
    { id: 'Machinery', icon: <Tractor className="w-4 h-4" /> },
    { id: 'Irrigation', icon: <Droplets className="w-4 h-4" /> },
    { id: 'Seeds', icon: <Sprout className="w-4 h-4" /> },
    { id: 'Fertilizer', icon: <Zap className="w-4 h-4" /> },
    { id: 'Organic', icon: <Sprout className="w-4 h-4" /> }
  ];

  const states = ['Uttar Pradesh', 'Punjab', 'Haryana', 'Maharashtra', 'Madhya Pradesh', 'Tamil Nadu'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setBookmarks(AgriStore.getBookmarks());
      setIsLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, []);

  const components = AgriStore.getComponents();
  const schemes = AgriStore.getSchemes();

  const filteredComponents = useMemo(() => {
    return components.filter(c => {
      const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || 
                          c.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory = activeCategory === 'All' || c.category === activeCategory;
      const matchesState = c.availableInStates.includes('National') || c.availableInStates.includes(selectedState);
      const matchesPrice = c.basePrice <= maxPrice;

      return matchesSearch && matchesCategory && matchesState && matchesPrice;
    });
  }, [search, activeCategory, selectedState, maxPrice, components]);

  const toggleBookmark = (e: React.MouseEvent, id: string) => {
    e.preventDefault();
    setBookmarks(AgriStore.toggleBookmark(id));
  };

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center space-y-8">
        <div className="w-20 h-20 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <h2 className="text-xl font-black text-slate-400 uppercase tracking-widest">Initializing National Marketplace...</h2>
      </div>
    );
  }

  return (
    <div className="bg-[#FDFDFC] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 py-10 space-y-12 pb-40">
        <Breadcrumbs />

        {/* Dynamic Header & Region Selector */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 bg-white p-10 rounded-[48px] border-2 border-slate-50 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-bl-full"></div>
           <div className="space-y-4 relative z-10">
              <div className="inline-flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-full border border-emerald-100 text-emerald-700 font-black text-[10px] uppercase tracking-widest">
                <Award className="w-4 h-4" /> Sovereign Marketplace v3.0
              </div>
              <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter serif leading-none">Agri <br/><span className="text-emerald-600 italic underline decoration-emerald-200 underline-offset-8">Astra Hub.</span></h1>
              <p className="text-xl text-slate-500 font-bold max-w-xl">Direct procurement, verified subsidies, and AI-led price discovery for the Bharat farmer.</p>
           </div>
           
           <div className="space-y-4 min-w-[300px]">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Current Delivery Region</label>
              <div className="relative group">
                <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-500" />
                <select 
                  value={selectedState} 
                  onChange={(e) => setSelectedState(e.target.value)}
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-[28px] pl-16 pr-8 py-5 outline-none focus:border-emerald-500 font-black text-slate-800 appearance-none shadow-inner"
                >
                  {states.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              </div>
              <div className="flex items-center gap-2 text-[9px] font-black text-emerald-600 uppercase tracking-widest ml-4">
                 <ShieldCheck className="w-3.5 h-3.5" /> Local Subsidies Active
              </div>
           </div>
        </div>

        {/* Master Toolbar */}
        <div className="flex flex-col md:flex-row gap-6 items-center sticky top-24 z-40">
           <div className="flex-1 relative w-full">
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 w-6 h-6" />
              <input 
                type="text" 
                placeholder="Search tractors, hybrid seeds, organic urea..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white border-4 border-slate-50 rounded-[32px] pl-16 pr-8 py-5 outline-none focus:border-emerald-500 font-bold text-lg shadow-2xl"
              />
           </div>
           <div className="flex gap-4 w-full md:w-auto">
              <button 
                onClick={() => setShowFilters(!showFilters)}
                className={`flex-1 md:flex-none flex items-center justify-center gap-3 px-10 py-5 rounded-[32px] font-black text-xs uppercase tracking-widest transition-all ${showFilters ? 'bg-emerald-600 text-white shadow-xl' : 'bg-white border-4 border-slate-50 text-slate-400 shadow-xl'}`}
              >
                <SlidersHorizontal className="w-5 h-5" /> Filters
              </button>
              <Link to="/cart" className="bg-slate-900 text-white px-8 py-5 rounded-[32px] shadow-2xl flex items-center justify-center gap-3 active:scale-95 transition-all">
                <ShoppingCart className="w-6 h-6" />
              </Link>
           </div>
        </div>

        {/* Main Content Layout */}
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Sidebar Categories */}
          <aside className="lg:w-72 space-y-8">
            <div className="bg-white p-8 rounded-[40px] border-2 border-slate-50 shadow-sm space-y-6">
              <h3 className="text-xs font-black uppercase tracking-[0.4em] text-slate-400 px-2">Market Segments</h3>
              <div className="flex flex-col gap-2">
                {categories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`flex items-center gap-4 px-6 py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
                      activeCategory === cat.id ? 'bg-emerald-600 text-white shadow-lg' : 'bg-slate-50 text-slate-500 hover:bg-slate-100'
                    }`}
                  >
                    {cat.icon} {cat.id}
                  </button>
                ))}
              </div>
            </div>

            {showFilters && (
              <div className="bg-white p-8 rounded-[40px] border-2 border-slate-50 shadow-sm space-y-8 animate-in slide-in-from-left-4">
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <label className="text-[9px] font-black uppercase text-slate-400">Budget Max</label>
                    <span className="text-[10px] font-black">₹{(maxPrice/1000).toFixed(0)}k</span>
                  </div>
                  <input type="range" min="1000" max="1000000" step="5000" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-emerald-500 h-1" />
                </div>
              </div>
            )}

            <div className="bg-slate-900 text-white p-8 rounded-[40px] shadow-2xl relative overflow-hidden">
               <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/10 rounded-bl-full"></div>
               <h4 className="text-lg font-black serif italic relative z-10">Bhavishyavani.</h4>
               <p className="text-[11px] text-slate-400 font-bold mt-2 relative z-10">AI predicts machinery costs will rise by 4.2% next month in {selectedState}. Procurement recommended now.</p>
            </div>
          </aside>

          {/* Product Grid */}
          <div className="flex-1 space-y-12">
            {filteredComponents.length > 0 ? (
              <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
                {filteredComponents.map((item) => {
                  const relatedScheme = schemes.find(s => item.relatedSchemes.includes(s.id));
                  return (
                    <div 
                      key={item.id} 
                      className="group bg-white border-2 border-slate-100 rounded-[56px] overflow-hidden flex flex-col hover:border-emerald-500 hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] transition-all duration-500 relative"
                    >
                      {/* Price Trend Sparkline */}
                      <div className="absolute top-6 left-6 z-10">
                        <div className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-xl border border-white/20 flex items-center gap-2 shadow-sm">
                          <TrendingUp className="w-3 h-3 text-emerald-500" />
                          <svg className="w-10 h-4 overflow-visible">
                            <path 
                              d={`M 0 ${20 - item.aiInsights.priceTrend[0]/5} L 8 ${20 - item.aiInsights.priceTrend[1]/5} L 16 ${20 - item.aiInsights.priceTrend[2]/5} L 24 ${20 - item.aiInsights.priceTrend[3]/5} L 32 ${20 - item.aiInsights.priceTrend[4]/5}`}
                              fill="none" stroke="#10b981" strokeWidth="2" strokeLinecap="round"
                            />
                          </svg>
                        </div>
                      </div>

                      {/* Header Actions */}
                      <div className="absolute top-6 right-6 z-10">
                        <button 
                          onClick={(e) => toggleBookmark(e, item.id)}
                          className={`p-3 rounded-2xl backdrop-blur-md border transition-all ${bookmarks.includes(item.id) ? 'bg-emerald-500 border-emerald-400 text-white shadow-lg' : 'bg-white/80 border-white/20 text-slate-400 hover:text-emerald-500'}`}
                        >
                          <Star className={`w-5 h-5 ${bookmarks.includes(item.id) ? 'fill-white' : ''}`} />
                        </button>
                      </div>

                      {/* Image Area */}
                      <div className="h-64 overflow-hidden relative bg-slate-50">
                        <img src={item.images[0]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" alt={item.name} />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <div className="absolute bottom-6 left-6 flex flex-wrap gap-2">
                          <span className="bg-white/90 backdrop-blur-md px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest text-slate-900 border border-white/20">
                            {item.subCategory}
                          </span>
                          {relatedScheme && (
                            <div className="bg-emerald-500 text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest flex items-center gap-1.5 shadow-xl animate-pulse">
                              <Award className="w-3 h-3" /> {relatedScheme.subsidyPercentage}% OFF
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Content Area */}
                      <div className="p-10 flex-1 flex flex-col space-y-6">
                        <div className="space-y-2">
                          <h3 className="text-2xl font-black text-slate-900 serif leading-tight truncate">{item.name}</h3>
                          <div className="flex items-center gap-4">
                             <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                               <Star className="w-3.5 h-3.5 fill-current" /> {item.rating}
                             </div>
                             <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1">
                               <MapPin className="w-3 h-3" /> {item.dealersCount} Near
                             </div>
                             <div className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded-md ${item.availability === 'In Stock' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                                {item.availability}
                             </div>
                          </div>
                        </div>

                        {/* Price Intelligence */}
                        <div className="bg-slate-50 p-6 rounded-[32px] border border-slate-100 relative overflow-hidden">
                           <div className="flex items-baseline gap-2">
                              <span className="text-3xl font-black text-slate-900 tracking-tighter">₹{item.basePrice.toLocaleString()}</span>
                              <span className="text-[10px] font-bold text-slate-400 uppercase">Estimates</span>
                           </div>
                           <p className="text-[9px] font-black text-emerald-600 uppercase tracking-widest mt-2 flex items-center gap-1.5">
                              <Brain className="w-3 h-3" /> Forecast: {item.aiInsights.demandForecast} Demand
                           </p>
                        </div>

                        {/* Marketplace Actions */}
                        <div className="grid grid-cols-2 gap-4">
                           <Link to={`/agri-hub/component/${item.id}`} className="bg-slate-900 text-white py-5 rounded-[24px] font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-emerald-600 transition-all">
                             Audit Specs <ChevronRight className="w-3.5 h-3.5" />
                           </Link>
                           <button className="bg-white border-2 border-slate-100 text-slate-900 py-5 rounded-[24px] font-black text-[9px] uppercase tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                             Add to Cart <ShoppingCart className="w-3.5 h-3.5" />
                           </button>
                        </div>

                        {/* Scheme Routing CTA */}
                        {relatedScheme && (
                           <div className="pt-6 border-t border-slate-50 flex items-center justify-between">
                              <div className="space-y-0.5">
                                 <div className="text-[8px] font-black uppercase text-slate-400">{relatedScheme.schemeName}</div>
                                 <div className="text-[10px] font-black text-emerald-700">Apply for DBT Link</div>
                              </div>
                              <button className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl hover:bg-emerald-600 hover:text-white transition-all">
                                 <ArrowRight className="w-5 h-5" />
                              </button>
                           </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="bg-slate-50 border-4 border-dashed border-slate-200 py-32 rounded-[64px] text-center space-y-6">
                <div className="w-24 h-24 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-200 shadow-sm">
                  <SearchX className="w-12 h-12" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-2xl font-black text-slate-900">Stack Unavailable.</h3>
                  <p className="text-slate-400 font-bold max-w-xs mx-auto">No inventory matching your filters is available in {selectedState}.</p>
                </div>
                <button onClick={() => { setSearch(''); setActiveCategory('All'); setMaxPrice(1000000); }} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl">
                  Reset Command
                </button>
              </div>
            )}

            {/* Bottom Support Banner */}
            <div className="bg-white border-4 border-slate-50 p-12 rounded-[64px] flex flex-col md:flex-row items-center justify-between gap-12 shadow-sm">
               <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-blue-50 rounded-[28px] flex items-center justify-center text-blue-600">
                     <MessageSquare className="w-10 h-10" />
                  </div>
                  <div className="space-y-1 text-center md:text-left">
                     <h4 className="text-2xl font-black text-slate-900 serif">Bulk Enterprise Bidding.</h4>
                     <p className="text-sm font-bold text-slate-500">Need machines for a full FPO or Village Co-op? Start a reverse auction.</p>
                  </div>
               </div>
               <button className="bg-slate-900 text-white px-12 py-5 rounded-[28px] font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95">Initialize Bid</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

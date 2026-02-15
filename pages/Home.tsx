
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Minus, 
  Target, 
  Globe, 
  Sparkles, 
  CloudRain, 
  TrendingUp, 
  Layers, 
  Sprout, 
  BarChart, 
  ShieldCheck,
  Zap,
  Scale,
  Shield,
  Cpu,
  Database,
  ArrowUpRight,
  Wind,
  Droplets
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Home: React.FC = () => {
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [featureIndex, setFeatureIndex] = useState(0);
  const { t } = useLanguage();
  const carouselRef = useRef<HTMLDivElement>(null);

  const slides = [
    {
      title: "Precision Drone Monitoring",
      desc: "Native AI models identifying crop stress and water levels across 12,000 districts with 94% accuracy.",
      img: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=2000",
      tag: "Futuristic"
    },
    {
      title: "Traditional Roots, Digital Future",
      desc: "Empowering 140M+ farmers with the Sovereign Agri-Stack for direct market access and fair pricing.",
      img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=2000",
      tag: "Authentic"
    },
    {
      title: "Climate-Resilient Systems",
      desc: "Using satellite thermal data to predict monsoon patterns and optimize sowing schedules for small-hold farmers.",
      img: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?auto=format&fit=crop&q=80&w=2000",
      tag: "Intelligence"
    }
  ];

  const features = [
    { title: "Climate Adaptive", icon: <CloudRain />, desc: "Adjust sowing patterns based on real-time micro-climate shifts." },
    { title: "Supply Forecaster", icon: <TrendingUp />, desc: "Predict market saturation before harvesting your crop." },
    { title: "Carbon Monitor", icon: <Globe />, desc: "Earn carbon credits through sustainable soil management." },
    { title: "Multi-Source Feed", icon: <Layers />, desc: "Aggregate data from IoT, satellite, and government records." },
    { title: "Field Telemetry", icon: <Sprout />, desc: "Plot-level moisture and nutrient tracking via low-cost sensors." },
    { title: "BI Dashboards", icon: <BarChart />, desc: "Enterprise-grade visualization for cooperatives and FPOs." },
    { title: "Mandi Pulse", icon: <Scale />, desc: "Price discovery from 1000+ local markets at your fingertips." },
    { title: "Governance Bridge", icon: <Shield />, desc: "Seamless access to PM-KISAN and other sovereign benefits." }
  ];

  const faqs = [
    {
      q: "What makes AgriAstra different from other platforms?",
      a: "AgriAstra is a sovereign digital public infrastructure. We combine indigenous ICAR knowledge with native AI models, ensuring data stays with the farmers while delivering enterprise-grade yield predictions."
    },
    {
      q: "How accurate are your AI models?",
      a: "Our multi-modal models leverage near real-time field data, satellite imagery, and localized weather patterns to achieve 90%+ accuracy in yield and pest detection."
    },
    {
      q: "Can the platform be customized for my regional language?",
      a: "Yes, the portal is built on a vernacular-first architecture, supporting 22 official Indian languages via text and low-latency audio interaction."
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => setCurrentSlide(s => (s + 1) % slides.length), 8000);
    return () => clearInterval(timer);
  }, []);

  // Simple scroll reveal logic
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const nextFeature = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
    }
  };

  const prevFeature = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.offsetWidth / 3;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-white min-h-screen text-slate-900 overflow-x-hidden">
      {/* 1. HERO SECTION */}
      <section className="relative bg-[#004d40] text-white pt-24 pb-32 lg:pt-40 lg:pb-56 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00c853]/10 rounded-full blur-[120px]"></div>
        
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center relative z-10">
          <div className="space-y-10">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#00c853]/20 border border-[#00c853]/30 rounded-full text-[#00c853] text-[11px] font-black uppercase tracking-[0.2em] animate-reveal [animation-delay:0.1s]">
              <Cpu className="w-3.5 h-3.5" /> {t('hero_tag')}
            </div>
            <h1 className="text-6xl lg:text-8xl font-black leading-[0.95] tracking-tighter serif animate-reveal [animation-delay:0.2s]">
              The Digital <br /> 
              Sovereignty of <br />
              <span className="text-[#00c853] italic">Indian Agriculture.</span>
            </h1>
            <p className="text-xl text-slate-300 font-medium max-w-xl leading-relaxed animate-reveal [animation-delay:0.3s]">
              Experience the power of AgriAstra. A unified AI-driven operating system converting raw field data into measurable prosperity for 140 million farmers.
            </p>
            <div className="flex flex-wrap items-center gap-6 pt-4 animate-reveal [animation-delay:0.4s]">
              <Link to="/login" className="px-12 py-6 bg-[#00c853] hover:bg-emerald-400 text-[#004d40] rounded-full font-black text-sm uppercase tracking-widest shadow-2xl transition-all flex items-center gap-3 active:scale-95">
                {t('connect_with_us')} <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
          
          <div className="hidden lg:block relative animate-reveal [animation-delay:0.5s]">
            <div className="relative z-10 rounded-[64px] border-8 border-white/5 overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] aspect-square lg:aspect-video group animate-float">
              <img 
                src="https://images.unsplash.com/photo-1593113598332-cd288d649433?auto=format&fit=crop&q=80&w=1200" 
                alt="AgriAstra Dashboard" 
                className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#004d40]/80 to-transparent"></div>
              <div className="absolute bottom-10 left-10 right-10 flex items-center justify-between">
                <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-4 rounded-3xl border border-white/10">
                  <div className="w-2 h-2 bg-[#00c853] rounded-full animate-ping"></div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-white">Live Regional Pulse</span>
                </div>
                <div className="bg-[#00c853] text-[#004d40] px-6 py-2 rounded-2xl text-[10px] font-black uppercase tracking-widest">
                  94.2% Optimization
                </div>
              </div>
            </div>
            {/* Secondary Floating Elements */}
            <div className="absolute -bottom-10 -left-10 bg-white p-6 rounded-[32px] shadow-2xl text-slate-900 space-y-2 animate-float [animation-delay:1s] z-20 hidden xl:block">
              <div className="flex items-center gap-2 text-[#00c853] font-black text-sm"><TrendingUp className="w-4 h-4" /> +18.4% Yield</div>
              <div className="text-[9px] font-black uppercase tracking-widest text-slate-400">Projected Q4 Surplus</div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. BRANDS SECTION */}
      <div className="py-24 bg-white border-b border-slate-100 overflow-hidden reveal">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">Trusted by Global & Local Institutions</span>
          </div>
          <div className="flex animate-marquee items-center gap-32 whitespace-nowrap opacity-20 grayscale hover:grayscale-0 transition-all">
             {['PepsiCo', 'Walmart', 'Simplot', 'Aon', 'Rainforest Alliance', 'MeitY', 'ICAR', 'PFMS', 'Digital India'].map((b, i) => (
               <span key={i} className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">{b}</span>
             ))}
             {['PepsiCo', 'Walmart', 'Simplot', 'Aon', 'Rainforest Alliance', 'MeitY', 'ICAR', 'PFMS', 'Digital India'].map((b, i) => (
               <span key={i+'copy'} className="text-4xl font-black text-slate-900 italic uppercase tracking-tighter">{b}</span>
             ))}
          </div>
        </div>
      </div>

      {/* 3. INTELLIGENCE TRIO */}
      <section className="py-32 bg-slate-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#00c853]/5 rounded-full blur-[150px] translate-x-1/2 -translate-y-1/2"></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center space-y-4 mb-24 reveal">
            <h2 className="text-5xl lg:text-7xl font-black text-[#004d40] serif tracking-tight">Sovereign Intelligence.</h2>
            <p className="text-slate-500 font-bold max-w-2xl mx-auto text-lg leading-relaxed">
              Converting raw multi-source datasets into measurable economic outcomes for the next billion.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            {[
              { title: "Plot Level Intelligence", icon: <Target />, desc: "Hyper-localized forecasts on yield, crop stage, health, and water stress using neural field analysis." },
              { title: "Regional Intelligence", icon: <Globe />, desc: "District-level AI models that analyze soil health and weather anomalies for supply chain resilience." },
              { title: "AgriAstra Sage", icon: <Sparkles />, desc: "Real-time GenAI decision platform simplifying complex agronomic dilemmas for every stakeholder." }
            ].map((item, i) => (
              <div key={i} className="bg-white/80 backdrop-blur-xl p-12 rounded-[56px] border border-slate-200 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full reveal [animation-delay:0.1s]">
                <div className="w-16 h-16 rounded-[24px] bg-emerald-50 text-[#00c853] flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#00c853] group-hover:text-white transition-all shadow-inner">
                  {/* Fixed type error by casting icon to React.ReactElement<any> */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
                </div>
                <h3 className="text-2xl font-black text-[#004d40] mb-4 serif">{item.title}</h3>
                <p className="text-slate-500 font-bold leading-relaxed mb-8 flex-grow">{item.desc}</p>
                <button className="flex items-center gap-2 text-[#00c853] font-black uppercase text-[10px] tracking-widest hover:gap-4 transition-all pt-6 border-t border-slate-100">
                  Explore Solution <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NEW: KEY FEATURES CAROUSEL */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 reveal">
            <div className="space-y-4">
              <h2 className="text-5xl lg:text-7xl font-black text-[#004d40] serif tracking-tight">Platform Capabilities.</h2>
              <p className="text-slate-500 font-bold max-w-xl text-lg">High-precision tools engineered for the modern agricultural corridor.</p>
            </div>
            <div className="flex gap-4">
              <button onClick={prevFeature} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 active:scale-95"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={nextFeature} className="w-14 h-14 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all text-slate-400 hover:text-slate-900 active:scale-95"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>

          <div 
            ref={carouselRef}
            className="flex gap-8 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-12"
          >
            {features.map((f, i) => (
              <div 
                key={i} 
                className="min-w-[320px] md:min-w-[420px] snap-start bg-slate-50 hover:bg-[#064E3B] p-12 rounded-[56px] border border-slate-100 transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-8 opacity-0 group-hover:opacity-10 transition-opacity">
                   {/* Fixed type error by casting icon to React.ReactElement<any> */}
                   {React.cloneElement(f.icon as React.ReactElement<any>, { className: 'w-48 h-48 text-white' })}
                </div>
                <div className="w-20 h-20 rounded-[28px] bg-white text-[#004d40] flex items-center justify-center mb-10 shadow-sm group-hover:scale-110 group-hover:rotate-6 transition-all">
                  {/* Fixed type error by casting icon to React.ReactElement<any> */}
                  {React.cloneElement(f.icon as React.ReactElement<any>, { className: 'w-10 h-10' })}
                </div>
                <div className="space-y-4 relative z-10">
                  <h4 className="text-3xl font-black serif text-[#004d40] group-hover:text-white transition-colors">{f.title}</h4>
                  <p className="text-slate-500 font-bold leading-relaxed group-hover:text-slate-300 transition-colors">{f.desc}</p>
                </div>
                <div className="mt-12 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 relative z-10">
                   <button className="flex items-center gap-2 text-[#00c853] font-black uppercase text-[10px] tracking-widest">
                     Technical Spec <ArrowUpRight className="w-4 h-4" />
                   </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. AUTHENTIC CASE STUDY CAROUSEL */}
      <section className="py-32 bg-slate-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-16 reveal">
            <div className="space-y-2">
              <h2 className="text-5xl font-black text-[#004d40] serif tracking-tight">Impact Stories.</h2>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400">Field-Tested AI Across the Subcontinent</p>
            </div>
            <div className="flex gap-4">
              <button onClick={() => setCurrentSlide(s => (s - 1 + slides.length) % slides.length)} className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95"><ChevronLeft className="w-6 h-6" /></button>
              <button onClick={() => setCurrentSlide(s => (s + 1) % slides.length)} className="w-16 h-16 rounded-full border border-slate-200 flex items-center justify-center hover:bg-slate-50 transition-all shadow-sm active:scale-95"><ChevronRight className="w-6 h-6" /></button>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[80px] aspect-[16/9] lg:aspect-[21/9] bg-slate-900 shadow-2xl border-[16px] border-white ring-1 ring-slate-100 reveal">
            {slides.map((slide, idx) => (
              <div key={idx} className={`absolute inset-0 transition-all duration-1000 ease-in-out ${idx === currentSlide ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-110 z-0'}`}>
                <img src={slide.img} className="w-full h-full object-cover opacity-60" alt={slide.title} />
                <div className="absolute inset-0 bg-gradient-to-r from-[#004d40] via-[#004d40]/40 to-transparent flex items-center p-16 lg:p-32">
                  <div className="max-w-2xl space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full border border-white/20 text-white text-[10px] font-black uppercase tracking-widest">
                       <Database className="w-3.5 h-3.5" /> Verified Outcome
                    </div>
                    <h3 className="text-5xl lg:text-7xl font-black text-white leading-[0.9] serif">{slide.title}</h3>
                    <p className="text-2xl text-slate-300 font-medium leading-relaxed italic">"{slide.desc}"</p>
                    <button className="bg-white text-[#004d40] px-12 py-5 rounded-full font-black uppercase text-xs tracking-widest flex items-center gap-4 hover:scale-105 transition-all shadow-2xl active:scale-95">
                      View Case Study <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="text-center mb-20 space-y-4 reveal">
            <h2 className="text-5xl font-black text-[#004d40] serif tracking-tight">Clarification Desk.</h2>
            <p className="text-slate-400 font-black uppercase tracking-widest text-[10px]">Technical Specifications & Portal Usage</p>
          </div>
          <div className="space-y-6">
            {faqs.map((faq, i) => (
              <div key={i} className={`border border-slate-100 rounded-[40px] overflow-hidden transition-all reveal [animation-delay:${i*0.1}s] ${activeFaq === i ? 'bg-slate-50 ring-4 ring-[#00c853]/5 shadow-2xl' : 'hover:bg-slate-50/50'}`}>
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-10 text-left transition-colors"
                >
                  <span className="text-xl font-black text-slate-800">{faq.q}</span>
                  {activeFaq === i ? <Minus className="w-6 h-6 text-[#00c853]" /> : <Plus className="w-6 h-6 text-slate-300" />}
                </button>
                {activeFaq === i && (
                  <div className="px-10 pb-10 animate-in fade-in slide-in-from-top-4">
                    <p className="text-lg text-slate-600 font-bold leading-relaxed border-t border-slate-200 pt-8">{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOTTOM CTA */}
      <section className="py-32 bg-[#004d40] text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#ffffff_1px,_transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center justify-between gap-16 text-center lg:text-left relative z-10">
          <div className="space-y-6 reveal">
            <h2 className="text-6xl lg:text-8xl font-black leading-none tracking-tighter serif">Unlock Prosperity <br /> <span className="text-[#00c853]">with Intelligence.</span></h2>
            <p className="text-2xl text-slate-400 font-bold">Power your agri-business with AgriAstra today.</p>
          </div>
          <Link to="/login" className="px-16 py-8 bg-[#00c853] text-[#004d40] rounded-full font-black uppercase text-sm tracking-widest shadow-[0_30px_60px_rgba(0,200,83,0.3)] hover:scale-105 transition-all flex items-center gap-4 active:scale-95 reveal">
            Initialize Gateway <ArrowRight className="w-6 h-6" />
          </Link>
        </div>
      </section>
    </div>
  );
};

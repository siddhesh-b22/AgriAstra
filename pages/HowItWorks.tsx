
import React from 'react';
/* Added Landmark to the imports from lucide-react */
import { ArrowLeft, Layers, ShieldCheck, Zap, Globe, Server, Database, BrainCircuit, Landmark } from 'lucide-react';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Portal
      </Link>

      <div className="text-center space-y-6">
        <h1 className="text-6xl lg:text-9xl font-black text-slate-900 tracking-tight leading-none">One Stack. <br/> Total Agri-OS.</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto uppercase tracking-widest text-xs italic">Understanding the RISP Architecture</p>
      </div>

      <div className="space-y-12">
        {[
          { 
            title: '01. Identity Layer', 
            icon: <ShieldCheck />, 
            desc: 'Secure Aadhaar-based authentication linked to the National Land Records Database (Bhulekh).',
            details: ['Aadhaar Vault', 'Digital KCC (Kisan Credit Card)', 'Verified Registry']
          },
          { 
            title: '02. Intelligence Layer', 
            icon: <BrainCircuit />, 
            desc: 'AI-driven decision engine processing real-time satellite, market, and weather feeds.',
            details: ['Aaj Ka Karya Engine', 'Bhavishyavani Prices', 'Predictive Pest Models']
          },
          { 
            title: '03. Interaction Layer', 
            icon: <Zap />, 
            desc: 'Multi-modal communication via voice, vernacular UI, and SMS for non-smartphone users.',
            details: ['Smart Advisor Chat', 'Voice Commands', 'Vernacular Templates']
          },
          { 
            title: '04. Integration Layer', 
            icon: <Server />, 
            desc: 'API Bridges to G2C services, private marketplaces, and logistics networks.',
            details: ['PFMS Payments', 'Agmarknet API', 'Kisan Rath Logistics']
          }
        ].map((layer, i) => (
          <div key={i} className="bg-white border-4 border-slate-100 p-12 rounded-[64px] flex flex-col lg:flex-row items-center gap-12 group hover:shadow-2xl transition-all">
             <div className="w-32 h-32 bg-slate-900 rounded-[40px] flex items-center justify-center text-white shrink-0 shadow-2xl group-hover:scale-110 transition-transform">
                {/* Fixed: cast to React.ReactElement<any> for cloneElement compatibility */}
                {React.cloneElement(layer.icon as React.ReactElement<any>, { className: 'w-16 h-16' })}
             </div>
             <div className="flex-1 space-y-6 text-center lg:text-left">
                <div className="space-y-2">
                   <h3 className="text-3xl font-black text-slate-900">{layer.title}</h3>
                   <p className="text-xl text-slate-500 font-bold leading-relaxed">{layer.desc}</p>
                </div>
                <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                   {layer.details.map((d, di) => (
                     <span key={di} className="px-5 py-2 bg-slate-50 rounded-full text-xs font-black uppercase tracking-widest text-slate-400 border border-slate-100">
                       {d}
                     </span>
                   ))}
                </div>
             </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900 text-white p-16 rounded-[80px] text-center space-y-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-green-500/10 to-transparent"></div>
        <h2 className="text-4xl lg:text-6xl font-black tracking-tight relative z-10">Data Sovereignty First.</h2>
        <p className="text-xl text-slate-400 font-bold max-w-2xl mx-auto relative z-10 leading-relaxed">
          Bharat Krishi OS is a sovereign digital public infrastructure. All citizen data is encrypted and remains under national control as per the DPDP Act 2023.
        </p>
        <div className="flex flex-wrap justify-center gap-8 relative z-10 opacity-50 grayscale hover:grayscale-0 transition-all">
           <Landmark className="w-12 h-12" />
           <Database className="w-12 h-12" />
           <ShieldCheck className="w-12 h-12" />
           <Globe className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

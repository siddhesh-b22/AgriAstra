
import React from 'react';
import { ArrowLeft, Zap, Shield, Globe, Users, TrendingUp, Landmark, Database } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Features: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-24 space-y-24">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </Link>

      <div className="text-center space-y-6">
        <h1 className="text-6xl lg:text-8xl font-black text-slate-900 tracking-tight leading-none">The Future of <br/> Indian Agri-Tech.</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Bharat Krishi OS is built on the Rural Intelligence & Sustainability Platform (RISP) framework.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-12">
        {[
          { title: 'Decision Intelligence', desc: 'Synthesizing weather, market, and crop data into actionable daily tasks.', icon: <Zap /> },
          { title: 'DPI Infrastructure', desc: 'Secure, Aadhaar-linked identity and direct benefit transfer (DBT) routing.', icon: <Shield /> },
          { title: 'Mandi-Sync Bazar', desc: 'Real-time Agmarknet and e-NAM integration for transparent price discovery.', icon: <Landmark /> },
          { title: 'Supply Chain Vision', desc: 'Live fleet tracking and regional procurement analytics for businesses.', icon: <TrendingUp /> },
          { title: 'Vernacular First', desc: 'Fully navigable via voice and local languages for maximum rural inclusivity.', icon: <Globe /> },
          { title: 'Open Data Bridge', desc: 'Standardized APIs for ICAR journals, private tech, and logistics providers.', icon: <Database /> }
        ].map((f, i) => (
          <div key={i} className="bg-white p-12 rounded-[56px] border-2 border-slate-100 shadow-sm space-y-6 group hover:border-green-500 transition-all">
            <div className="w-16 h-16 bg-slate-50 rounded-3xl flex items-center justify-center text-slate-900 shadow-inner group-hover:bg-green-600 group-hover:text-white transition-all">
               {/* Fixed type error by casting f.icon to React.ReactElement<any> */}
               {React.cloneElement(f.icon as React.ReactElement<any>, { className: 'w-8 h-8' })}
            </div>
            <h3 className="text-2xl font-black text-slate-900">{f.title}</h3>
            <p className="text-slate-500 font-bold leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

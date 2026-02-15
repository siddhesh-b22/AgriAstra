
import React from 'react';
import { useParams, Link } from 'react-router-dom';
// Added Zap to imports
import { ArrowLeft, CheckCircle2, FileText, Globe, Phone, ListChecks, HelpCircle, MousePointer2, ShieldCheck, Clock, Download, Zap } from 'lucide-react';
import { AgriStore } from '../services/agriStore';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const SchemeDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const scheme = AgriStore.getSchemeById(id || '');

  if (!scheme) {
    return <div className="p-20 text-center font-black">National Scheme Registry Failure.</div>;
  }

  const relatedComponents = AgriStore.getComponents().filter(c => scheme.relatedComponentIds.includes(c.id));

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16 pb-40">
      <Breadcrumbs />

      <div className="text-center space-y-8 animate-reveal">
        <div className="flex justify-center">
           <div className="w-32 h-32 bg-emerald-50 rounded-[48px] flex items-center justify-center text-emerald-600 border-4 border-white shadow-2xl ring-1 ring-emerald-100">
              <ShieldCheck className="w-16 h-16" />
           </div>
        </div>
        <div className="space-y-4">
           <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tighter serif leading-tight max-w-4xl mx-auto">{scheme.schemeName}</h1>
           <div className="inline-flex items-center gap-4 bg-slate-900 text-white px-10 py-4 rounded-3xl text-2xl font-black tracking-tighter shadow-2xl">
             <Zap className="w-6 h-6 fill-yellow-400 text-yellow-400" /> Fixed Subsidy: {scheme.subsidyPercentage}%
           </div>
        </div>
        <p className="text-xl text-slate-500 font-bold max-w-2xl mx-auto leading-relaxed italic">"{scheme.description}"</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Eligibility & Documents */}
        <div className="space-y-10">
           <div className="bg-white border-2 border-slate-100 p-10 rounded-[56px] space-y-8 shadow-sm">
              <div className="flex items-center gap-4 text-blue-600 font-black uppercase tracking-widest text-[10px]">
                <ListChecks className="w-5 h-5" /> Eligibility Audit
              </div>
              <ul className="space-y-4">
                {scheme.eligibility.map((el, i) => (
                  <li key={i} className="flex items-center gap-4 font-bold text-slate-700">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" /> {el}
                  </li>
                ))}
              </ul>
           </div>

           <div className="bg-slate-50 p-10 rounded-[56px] space-y-8">
              <div className="flex items-center gap-4 text-slate-500 font-black uppercase tracking-widest text-[10px]">
                <FileText className="w-5 h-5" /> Required Documentation
              </div>
              <div className="grid grid-cols-1 gap-4">
                {scheme.requiredDocuments.map((doc, i) => (
                  <div key={i} className="bg-white px-6 py-4 rounded-2xl flex items-center justify-between group cursor-help border border-slate-100">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full" />
                      <span className="font-black text-slate-900 text-sm">{doc}</span>
                    </div>
                    <Download className="w-4 h-4 text-slate-200 group-hover:text-blue-500 transition-colors" />
                  </div>
                ))}
              </div>
           </div>
        </div>

        {/* Process & Contact */}
        <div className="space-y-10">
           <div className="bg-emerald-600 text-white p-12 rounded-[56px] space-y-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/5 rounded-tl-full group-hover:scale-110 transition-transform duration-700"></div>
              <div className="flex items-center gap-3 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/20">
                <Clock className="w-4 h-4" />
                <span className="text-[9px] font-black uppercase tracking-widest">Active Verification Window</span>
              </div>
              <h3 className="text-4xl font-black serif leading-tight">Digital <br/> Portal Link.</h3>
              <p className="text-emerald-100 font-bold leading-relaxed text-lg italic">"{scheme.applicationProcess}"</p>
              <div className="pt-4 flex flex-col gap-4">
                <a href={scheme.officialLink} target="_blank" className="w-full bg-white text-emerald-700 py-6 rounded-[28px] font-black uppercase tracking-widest text-sm flex items-center justify-center gap-3 shadow-xl active:scale-95 transition-all">
                  Access Official Portal <Globe className="w-5 h-5" />
                </a>
                {scheme.contactDetails && (
                   <div className="flex items-center justify-center gap-3 text-emerald-100 font-black text-[10px] uppercase tracking-widest pt-4 opacity-70 hover:opacity-100 transition-opacity">
                     <Phone className="w-4 h-4" /> Regional Helpline: {scheme.contactDetails}
                   </div>
                )}
              </div>
           </div>

           <div className="bg-white border-2 border-slate-100 p-10 rounded-[56px] space-y-8 shadow-sm">
              <h3 className="text-xl font-black serif text-slate-900">Covered Components</h3>
              <div className="grid grid-cols-2 gap-4">
                 {relatedComponents.map(comp => (
                   <Link key={comp.id} to={`/agri-hub/component/${comp.id}`} className="bg-slate-50 p-4 rounded-2xl flex items-center gap-4 group hover:bg-emerald-50 transition-colors border border-transparent hover:border-emerald-200">
                      <div className="w-12 h-12 rounded-xl overflow-hidden shadow-inner shrink-0">
                        <img src={comp.images[0]} className="w-full h-full object-cover" />
                      </div>
                      <span className="text-[10px] font-black uppercase text-slate-900 leading-tight group-hover:text-emerald-700">{comp.name}</span>
                   </Link>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

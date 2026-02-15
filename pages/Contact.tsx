
import React from 'react';
import { Phone, Mail, MapPin, Globe, ArrowLeft, MessageSquare, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Contact: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12 space-y-16">
      <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Back to Portal
      </Link>

      <div className="text-center space-y-6">
        <h1 className="text-5xl lg:text-7xl font-black text-slate-900 tracking-tight">Help Center</h1>
        <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
          Need assistance with your Kisan ID, Subsidies, or Market Bidding? Our specialized desk is ready to help.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-slate-900 text-white p-12 rounded-[56px] space-y-12 shadow-2xl">
          <div className="space-y-4">
            <h2 className="text-3xl font-black">Central Helpline</h2>
            <div className="flex items-center gap-6 p-6 bg-white/5 rounded-3xl border border-white/10">
               <div className="p-4 bg-green-500 rounded-2xl"><Phone className="w-8 h-8 text-white" /></div>
               <div>
                 <div className="text-2xl font-black tracking-tighter">1800-115-555</div>
                 <div className="text-xs font-black uppercase text-slate-400 tracking-widest">Toll Free • 24/7 Available</div>
               </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-blue-400 mt-1" />
              <div>
                <div className="font-black text-lg">Support Email</div>
                <div className="text-slate-400 font-medium">help@krishios.gov.in</div>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-red-400 mt-1" />
              <div>
                <div className="font-black text-lg">Headquarters</div>
                <div className="text-slate-400 font-medium">Krishi Bhawan, Janpath, New Delhi, India 110001</div>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-8 bg-white border-2 border-slate-100 p-12 rounded-[56px] shadow-sm">
          <h2 className="text-3xl font-black text-slate-900">Send Message</h2>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
               <input type="text" placeholder="Full Name" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold" />
               <input type="text" placeholder="Aadhaar ID (Opt)" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold" />
            </div>
            <input type="email" placeholder="Email Address" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold" />
            <textarea rows={4} placeholder="Your Message" className="w-full bg-slate-50 p-4 rounded-xl border border-slate-200 outline-none focus:border-blue-600 transition-all font-bold resize-none"></textarea>
            <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all">
              Submit Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

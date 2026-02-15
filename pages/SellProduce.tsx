
import React, { useState } from 'react';
/* Added ArrowRight to the imports from lucide-react */
import { ArrowLeft, Package, CheckCircle, IndianRupee, Truck, ShieldCheck, Scale, Info, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const SellProduce: React.FC = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    crop: 'Potato (Kufri Jyoti)',
    quantity: '',
    quality: 'A-Grade',
    mandi: 'Lucknow Central'
  });

  const handleNext = () => setStep(prev => prev + 1);

  if (step === 3) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-10">
        <div className="w-24 h-24 bg-green-100 rounded-[32px] flex items-center justify-center text-green-600 mx-auto border-4 border-white shadow-2xl">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-4">
          <h1 className="text-5xl font-black text-slate-900 tracking-tight">Bid Published</h1>
          <p className="text-slate-500 font-bold text-lg">Inventory ID: <span className="text-blue-600">BK-INV-8812</span></p>
          <div className="bg-slate-50 p-6 rounded-[32px] border-2 border-slate-100 max-w-sm mx-auto space-y-2">
            <div className="flex justify-between text-sm font-bold"><span>Commodity:</span> <span>{formData.crop}</span></div>
            <div className="flex justify-between text-sm font-bold"><span>Lot Size:</span> <span>{formData.quantity} Quintals</span></div>
            <div className="flex justify-between text-sm font-bold"><span>Quality:</span> <span className="text-green-600">Certified {formData.quality}</span></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
          <Link to="/dashboard" className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black text-sm shadow-xl">Dashboard</Link>
          <button className="bg-white border-2 border-slate-100 text-slate-900 px-10 py-5 rounded-2xl font-black text-sm hover:bg-slate-50">Track e-NAM Bids</button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <Link to="/dashboard" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
        <ArrowLeft className="w-4 h-4" /> Cancel Listing
      </Link>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">Digital Inventory Listing</h1>
          <p className="text-slate-500 font-bold uppercase tracking-widest text-xs italic">Step {step} of 2: {step === 1 ? 'Produce Details' : 'Pickup & Logistics'}</p>
        </div>
        <div className="flex gap-2">
          {[1, 2].map(i => (
            <div key={i} className={`h-2 w-12 rounded-full ${step >= i ? 'bg-blue-600' : 'bg-slate-200'}`}></div>
          ))}
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-8 bg-white border-2 border-slate-100 p-10 rounded-[48px] shadow-sm">
          {step === 1 ? (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Commodity Type</label>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 font-bold flex items-center gap-4">
                  <Package className="w-5 h-5 text-blue-600" /> {formData.crop}
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Quantity (Quintals)</label>
                  <div className="relative">
                    <Scale className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input 
                      type="number" 
                      placeholder="e.g. 50"
                      value={formData.quantity}
                      onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                      className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-12 pr-6 py-4 outline-none focus:border-blue-600 transition-all font-bold"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Quality Grade</label>
                  <select 
                    value={formData.quality}
                    onChange={(e) => setFormData({...formData, quality: e.target.value})}
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none focus:border-blue-600 transition-all font-bold appearance-none"
                  >
                    <option>A-Grade (Best)</option>
                    <option>B-Grade (Avg)</option>
                    <option>C-Grade (Processing)</option>
                  </select>
                </div>
              </div>

              <div className="bg-blue-50 p-6 rounded-3xl border border-blue-100 flex items-start gap-4">
                <Info className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                <p className="text-xs font-bold text-blue-800 leading-relaxed">
                  Notice: Your produce quality is subject to physical verification at the Mandi warehouse. Digital certificate issued upon arrival.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-8 animate-in slide-in-from-right-4">
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400 ml-4">Primary Mandi</label>
                <input 
                  type="text" 
                  value={formData.mandi}
                  readOnly
                  className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-6 py-4 outline-none font-bold text-slate-400"
                />
              </div>

              <div className="p-8 border-2 border-slate-100 rounded-[32px] bg-slate-50 space-y-6">
                <h3 className="text-lg font-black text-slate-900 flex items-center gap-2">
                  <Truck className="w-5 h-5 text-green-600" /> Logistics Support
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <button className="p-4 bg-white rounded-2xl border-2 border-blue-600 text-blue-600 font-black text-xs uppercase tracking-widest shadow-lg">
                    Self Transport
                  </button>
                  <button className="p-4 bg-white rounded-2xl border-2 border-slate-100 text-slate-400 font-black text-xs uppercase tracking-widest hover:border-slate-300">
                    Find Truck
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="pt-6 border-t border-slate-100 flex justify-between items-center">
            {step > 1 && (
              <button onClick={() => setStep(step - 1)} className="text-slate-400 font-black uppercase tracking-widest text-xs hover:text-slate-900">
                Previous
              </button>
            )}
            <button 
              onClick={step === 2 ? handleNext : handleNext}
              disabled={step === 1 && !formData.quantity}
              className="bg-slate-900 text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-sm shadow-xl ml-auto flex items-center gap-3 disabled:bg-slate-200"
            >
              {step === 2 ? 'Confirm & List Inventory' : 'Next Step'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 text-white p-10 rounded-[48px] space-y-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-bl-full"></div>
              <h3 className="text-xl font-black">Verified Seller</h3>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-green-400" /> Aadhaar Linked
                 </div>
                 <div className="flex items-center gap-4 text-xs font-bold text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-green-400" /> Bank (DBT) Ready
                 </div>
              </div>
              <div className="pt-6 border-t border-white/10 space-y-2">
                 <div className="text-[10px] font-black uppercase tracking-widest text-slate-500">Estimated Price Range</div>
                 <div className="text-2xl font-black text-yellow-500">₹{formData.quantity ? (Number(formData.quantity) * 1450).toLocaleString() : '0'} - ₹{formData.quantity ? (Number(formData.quantity) * 1550).toLocaleString() : '0'}</div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, Smartphone, ArrowRight, Loader2, AlertCircle, CheckCircle } from 'lucide-react';
import { AgriStore } from '../services/agriStore';
import { UserProfile } from '../types';

interface SimpleRegisterProps {
  onRegister: (user: UserProfile) => void;
}

export const SimpleRegister: React.FC<SimpleRegisterProps> = ({ onRegister }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    
    if (formData.name.trim().length < 2) {
      setError("Please enter your full name.");
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Please enter a valid 10-digit mobile number.");
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1200));

    const response = AgriStore.registerUser(formData.name, formData.mobile);

    if (response.success && response.user) {
      setSuccess(response.message);
      onRegister(response.user);
      setTimeout(() => navigate('/dashboard'), 1000);
    } else {
      setError(response.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-[48px] shadow-2xl border-4 border-white p-10 space-y-10 animate-reveal">
        <div className="text-center space-y-3">
          <div className="w-20 h-20 bg-emerald-50 rounded-3xl flex items-center justify-center text-emerald-600 mx-auto shadow-inner">
            <User className="w-10 h-10" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 serif tracking-tight">Kisan Registry.</h1>
          <p className="text-slate-500 font-bold">Secure your Sovereign Agri ID.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="full-name" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Full Name</label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input id="full-name" required type="text" placeholder="E.g. Rajesh Kumar" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 transition-all" />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="mobile-number" className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-4">Mobile Number</label>
            <div className="relative">
              <Smartphone className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input id="mobile-number" required type="text" maxLength={10} placeholder="10 digit mobile" value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value.replace(/\D/g, '')})} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl pl-14 pr-6 py-4 outline-none focus:border-emerald-500 font-bold text-slate-700 tracking-widest transition-all" />
            </div>
          </div>

          {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase border border-red-100 animate-in fade-in zoom-in-95"><AlertCircle className="w-5 h-5" />{error}</div>}
          {success && <div className="bg-emerald-50 text-emerald-600 p-4 rounded-2xl flex items-center gap-3 text-xs font-black uppercase border border-emerald-100 animate-in fade-in zoom-in-95"><CheckCircle className="w-5 h-5" />{success}</div>}

          <button type="submit" disabled={isLoading || !!success} className="w-full bg-slate-900 hover:bg-emerald-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 disabled:bg-slate-200">
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Join Digital Stack'}
          </button>
        </form>
        <p className="text-[10px] text-slate-400 text-center font-bold uppercase tracking-widest leading-relaxed">Secured by MeitY Certified Gateway v2.4</p>
      </div>
    </div>
  );
};

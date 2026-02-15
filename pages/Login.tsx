
import React, { useState } from 'react';
import { UserProfile, UserRole } from '../types';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  Smartphone,
  User,
  AlertCircle,
  Loader2,
  LogIn,
  UserPlus,
  ShieldCheck,
  Tractor,
  Building2,
  CheckCircle2
} from 'lucide-react';
import { AgriStore } from '../services/agriStore';

interface LoginProps {
  onLogin: (profile: UserProfile) => void;
}

type AuthMode = 'LOGIN' | 'SIGNUP';

export const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [mode, setMode] = useState<AuthMode>('LOGIN');
  const [role, setRole] = useState<UserRole>(UserRole.FARMER);
  const [formData, setFormData] = useState({ name: '', mobile: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setError(null);
  };

  const validate = () => {
    if (mode === 'SIGNUP' && !formData.name.trim()) {
      setError("Full name is required for registration.");
      return false;
    }
    if (!/^\d{10}$/.test(formData.mobile)) {
      setError("Mobile number must be a valid 10-digit Indian number.");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsLoading(true);
    await new Promise(r => setTimeout(r, 1200));

    if (mode === 'SIGNUP') {
      const result = AgriStore.registerUser(formData.name, formData.mobile, role);
      if (result.success && result.user) {
        onLogin(result.user);
        navigate('/dashboard');
      } else {
        setError(result.message);
      }
    } else {
      const result = AgriStore.login(formData.mobile);
      if (result.success && result.user) {
        onLogin(result.user);
        navigate('/dashboard');
      } else {
        setError("This mobile number is not registered on the AgriAstra stack.");
      }
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-[90vh] flex flex-col items-center justify-center px-4 bg-white relative overflow-hidden py-16">
      <div className="absolute inset-0 bg-grid-premium opacity-[0.03] pointer-events-none"></div>
      
      <div className="max-w-xl w-full z-10 space-y-12 animate-reveal">
        <div className="text-center space-y-6">
          <div className="flex bg-slate-50 p-2 rounded-[24px] shadow-inner mx-auto border border-slate-200 w-fit">
            <button 
              onClick={() => { setMode('LOGIN'); setError(null); }} 
              className={`flex items-center gap-3 px-10 py-4 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${mode === 'LOGIN' ? 'bg-white shadow-xl text-slate-900 ring-1 ring-slate-100' : 'text-slate-400'}`}
            >
              <LogIn className="w-4 h-4" /> Secure Login
            </button>
            <button 
              onClick={() => { setMode('SIGNUP'); setError(null); }} 
              className={`flex items-center gap-3 px-10 py-4 rounded-[18px] text-[11px] font-black uppercase tracking-widest transition-all duration-300 ${mode === 'SIGNUP' ? 'bg-white shadow-xl text-slate-900 ring-1 ring-slate-100' : 'text-slate-400'}`}
            >
              <UserPlus className="w-4 h-4" /> Join Registry
            </button>
          </div>

          <div className="space-y-4">
            <h1 className="text-6xl lg:text-7xl font-black text-[#064E3B] tracking-tighter serif leading-tight">
              {mode === 'LOGIN' ? 'Agri Gateway.' : 'Kisan Identity.'}
            </h1>
            <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-[10px] max-w-sm mx-auto leading-relaxed">
              {mode === 'LOGIN' ? 'Resume your agricultural command session' : 'Initialize your sovereign kisan profile on the national stack'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="premium-card p-10 md:p-14 rounded-[64px] space-y-10 bg-white/80 backdrop-blur-md border-4 border-slate-50">
          
          {mode === 'SIGNUP' && (
            <div className="space-y-6">
              <label className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 ml-4">Select Your Operational Mode</label>
              <div className="grid grid-cols-2 gap-4">
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.FARMER)}
                  className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${role === UserRole.FARMER ? 'border-emerald-500 bg-emerald-50 text-emerald-900' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                >
                  <Tractor className={`w-8 h-8 ${role === UserRole.FARMER ? 'text-emerald-600' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Farmer Mode</span>
                  {role === UserRole.FARMER && <CheckCircle2 className="w-4 h-4 text-emerald-600" />}
                </button>
                <button 
                  type="button"
                  onClick={() => setRole(UserRole.BUSINESS)}
                  className={`flex flex-col items-center gap-4 p-6 rounded-3xl border-2 transition-all ${role === UserRole.BUSINESS ? 'border-blue-500 bg-blue-50 text-blue-900' : 'border-slate-100 bg-slate-50 text-slate-400'}`}
                >
                  <Building2 className={`w-8 h-8 ${role === UserRole.BUSINESS ? 'text-blue-600' : 'text-slate-300'}`} />
                  <span className="text-[10px] font-black uppercase tracking-widest">Business Mode</span>
                  {role === UserRole.BUSINESS && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                </button>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Full Identity Name</label>
                <div className="relative group">
                  <User className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
                  <input 
                    name="name"
                    type="text" 
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Ramesh Kumar Patel"
                    className="w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] pl-16 pr-6 py-5 outline-none focus:border-emerald-500 focus:bg-white font-bold text-slate-700 transition-all shadow-inner"
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-4">Mobile Registration Number</label>
            <div className="relative group">
              <Smartphone className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-emerald-500 transition-colors" />
              <input 
                name="mobile"
                type="text" 
                maxLength={10}
                value={formData.mobile}
                onChange={(e) => {
                  const val = e.target.value.replace(/\D/g, '');
                  setFormData({...formData, mobile: val});
                  setError(null);
                }}
                placeholder="10 Digit Sovereign ID"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[24px] pl-16 pr-6 py-5 outline-none focus:border-emerald-500 focus:bg-white font-bold text-slate-700 tracking-[0.2em] transition-all shadow-inner"
              />
            </div>
          </div>

          {error && (
            <div className="p-6 bg-red-50 text-red-600 rounded-[24px] flex items-center gap-4 text-[10px] font-black uppercase tracking-widest border border-red-100 animate-in fade-in zoom-in-95">
              <AlertCircle className="w-5 h-5 flex-shrink-0" /> {error}
            </div>
          )}

          <button 
            type="submit" 
            disabled={isLoading}
            className={`w-full py-7 rounded-[32px] font-black uppercase tracking-[0.3em] text-xs flex items-center justify-center gap-4 transition-all active:scale-95 disabled:bg-slate-200 shadow-2xl ${mode === 'LOGIN' ? 'bg-slate-900 text-white hover:bg-emerald-600' : 'bg-emerald-600 text-white hover:bg-slate-900'}`}
          >
            {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : mode === 'LOGIN' ? 'Initiate Session' : 'Register Identity'}
            {!isLoading && <ArrowRight className="w-6 h-6" />}
          </button>

          <div className="pt-6 flex flex-col items-center gap-4">
             <div className="flex items-center gap-3 text-emerald-600">
               <ShieldCheck className="w-4 h-4" />
               <span className="text-[9px] font-black uppercase tracking-[0.2em]">End-to-End Encryption Verified</span>
             </div>
             {mode === 'LOGIN' && (
               <button type="button" onClick={() => setMode('SIGNUP')} className="text-[9px] font-black uppercase tracking-widest text-slate-400 hover:text-slate-900 transition-colors">
                 Don't have an ID? <span className="underline">Request Access</span>
               </button>
             )}
          </div>
        </form>

        <p className="text-[10px] text-slate-300 text-center font-bold uppercase tracking-[0.4em] leading-relaxed">
          National Agricultural Digital Infrastructure<br/>
          DPDP Compliant Gateway v3.1.2
        </p>
      </div>
    </div>
  );
};

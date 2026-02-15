
import React from 'react';
import { ShieldCheck, LogOut, LayoutDashboard, Award, ArrowRight, User } from 'lucide-react';
import { UserProfile } from '../types';
import { Link } from 'react-router-dom';

interface SimpleProfileProps {
  user: UserProfile;
  onLogout: () => void;
}

export const SimpleProfile: React.FC<SimpleProfileProps> = ({ user, onLogout }) => {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 py-20">
      <div className="max-w-2xl w-full text-center space-y-12 animate-reveal">
        <div className="flex justify-center">
          <div className="w-32 h-32 bg-emerald-50 rounded-[48px] flex items-center justify-center text-emerald-600 border-4 border-white shadow-2xl relative">
             <User className="w-16 h-16" />
             <div className="absolute -bottom-2 -right-2 bg-slate-900 text-white p-2 rounded-xl shadow-lg">
                <ShieldCheck className="w-5 h-5" />
             </div>
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-6xl lg:text-8xl font-black text-slate-900 serif tracking-tighter leading-none">
            Welcome, <br/>
            <span className="text-emerald-600 italic">{user.firstName}.</span>
          </h1>
          <p className="text-xl text-slate-500 font-bold max-w-lg mx-auto">
            Your AgriAstra profile is active. Start exploring high-yield insights.
          </p>
        </div>

        <div className="bg-slate-50 rounded-[48px] p-10 border-2 border-slate-100 grid md:grid-cols-2 gap-8 text-left shadow-sm">
           <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Identity ID</div>
              <div className="text-xl font-black text-slate-900 tracking-widest truncate">{user.id}</div>
           </div>
           <div>
              <div className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Registered Mobile</div>
              <div className="text-xl font-black text-slate-900">+91 {user.phone}</div>
           </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
           <Link to="/dashboard" className="bg-slate-900 text-white px-12 py-6 rounded-[32px] font-black uppercase tracking-widest text-xs shadow-2xl hover:bg-emerald-600 transition-all flex items-center gap-3 group">
              <LayoutDashboard className="w-5 h-5" />
              Go to Dashboard
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
           </Link>
           <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-black uppercase tracking-widest text-xs transition-colors"
           >
              <LogOut className="w-5 h-5" /> Sign Out
           </button>
        </div>
      </div>
    </div>
  );
};

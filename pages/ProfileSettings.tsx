
import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  User, 
  ShieldCheck, 
  CheckCircle, 
  Download, 
  Trash2, 
  ShieldAlert, 
  Smartphone, 
  AtSign, 
  Calendar, 
  Globe,
  Edit3,
  Save,
  X,
  Loader2
} from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { UserProfile } from '../types';
import { AgriStore } from '../services/agriStore';

export const ProfileSettings: React.FC = () => {
  const [userSession, setUserSession] = useState<UserProfile | null>(null);
  const [showRevokeConfirm, setShowRevokeConfirm] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    gender: ''
  });

  useEffect(() => {
    const session = AgriStore.getSession();
    if (session) {
      setUserSession(session);
      setFormData({
        firstName: session.firstName || '',
        lastName: session.lastName || '',
        dateOfBirth: session.dateOfBirth || '',
        gender: session.gender || ''
      });
    }
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    if (!userSession) return;
    setIsSaving(true);
    
    // Simulate Sovereign Sync delay
    await new Promise(r => setTimeout(r, 1000));

    const updatedUser: UserProfile = {
      ...userSession,
      firstName: formData.firstName,
      lastName: formData.lastName,
      dateOfBirth: formData.dateOfBirth,
      gender: formData.gender,
      updatedAt: new Date().toISOString()
    };

    AgriStore.setSession(updatedUser);
    setUserSession(updatedUser);
    setIsEditing(false);
    setIsSaving(false);
  };

  const handleDownloadId = () => {
    if (!userSession) return;
    const content = `AGRIASTRA IDENTITY v2.4\nID: ${userSession.id}\nNAME: ${userSession.firstName} ${userSession.lastName}\nPHONE: +91 ${userSession.phone}\nSTATUS: VERIFIED`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Sovereign_ID_${userSession.id}.txt`;
    link.click();
  };

  const handleRevokeConsent = () => {
    AgriStore.clearSession();
    window.location.href = '/';
  };

  if (!userSession) return (
    <div className="p-20 text-center flex flex-col items-center gap-4">
      <Loader2 className="w-10 h-10 text-emerald-600 animate-spin" />
      <span className="font-black text-[10px] uppercase tracking-widest text-slate-400">Authenticating Sovereign Identity...</span>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto px-6 py-12 space-y-12 pb-32">
      <Link to="/dashboard" className="flex items-center gap-2 text-slate-400 hover:text-slate-900 transition-colors font-black text-[10px] uppercase tracking-widest">
        <ArrowLeft className="w-4 h-4" /> Return to Dashboard
      </Link>

      <div className="flex flex-col md:flex-row items-center gap-12 animate-reveal">
        <div className="w-44 h-44 bg-slate-900 rounded-[56px] flex items-center justify-center text-white font-black text-7xl shadow-3xl border-8 border-white ring-1 ring-slate-100 relative overflow-hidden group">
           {userSession.profileImage ? <img src={userSession.profileImage} className="w-full h-full object-cover" /> : userSession.firstName[0]}
           <div className="absolute inset-0 bg-gradient-to-t from-emerald-500/20 to-transparent opacity-50"></div>
        </div>
        <div className="space-y-6 text-center md:text-left">
           <div className="flex flex-wrap items-center gap-4 justify-center md:justify-start">
              <h1 className="text-6xl font-black text-slate-900 tracking-tight serif leading-tight">
                {userSession.firstName} {userSession.lastName}
              </h1>
              <span className="bg-emerald-50 text-emerald-700 px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 border border-emerald-100 shadow-sm">
                 <CheckCircle className="w-4 h-4" /> Verified Stack
              </span>
           </div>
           <div className="flex flex-wrap justify-center md:justify-start gap-8 text-[11px] font-black uppercase tracking-widest text-slate-400">
             <span className="flex items-center gap-3"><Smartphone className="w-4 h-4 text-emerald-500" /> +91 {userSession.phone}</span>
             <span className="flex items-center gap-3"><Globe className="w-4 h-4 text-slate-300" /> {userSession.address.state}</span>
           </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className={`premium-card p-10 md:p-12 rounded-[56px] space-y-10 transition-all duration-500 border-2 ${isEditing ? 'border-emerald-500 shadow-emerald-50 ring-4 ring-emerald-50/50' : 'border-slate-50'}`}>
          <div className="flex items-center justify-between border-b border-slate-50 pb-8">
            <h3 className="text-3xl font-black text-slate-900 serif">Identity Audit</h3>
            {!isEditing ? (
              <button onClick={() => setIsEditing(true)} className="flex items-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                <Edit3 className="w-3.5 h-3.5" /> Edit
              </button>
            ) : (
              <div className="flex gap-3">
                <button onClick={() => setIsEditing(false)} className="p-3 text-slate-400 hover:text-red-500 transition-colors"><X className="w-6 h-6" /></button>
                <button onClick={handleSave} disabled={isSaving} className="flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest shadow-2xl">
                  {isSaving ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Save className="w-3.5 h-3.5" />} Save
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">First Name</label>
              <input name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} disabled={!isEditing} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 font-bold text-slate-800 disabled:opacity-50" />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Last Name</label>
              <input name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} disabled={!isEditing} className="w-full bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 outline-none focus:border-emerald-500 font-bold text-slate-800 disabled:opacity-50" />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-2">Registered Mobile</label>
            <div className="bg-slate-50 border-2 border-slate-100 rounded-2xl px-5 py-4 font-bold text-slate-400 cursor-not-allowed">+91 {userSession.phone} (System Locked)</div>
          </div>
        </div>

        <div className="space-y-10">
          <div className="bg-[#064E3B] text-white p-12 rounded-[56px] space-y-10 shadow-3xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-400/10 rounded-bl-[120px]"></div>
             <h3 className="text-3xl font-black serif italic border-b border-white/10 pb-8">Security Stack</h3>
             <div className="p-6 bg-white/5 rounded-3xl border border-white/10 space-y-4">
                <div className="flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-amber-400" />
                  <span className="text-[10px] font-black uppercase tracking-widest">DPDP Compliance</span>
                </div>
                <p className="text-[11px] text-slate-400 font-bold leading-relaxed">Data encrypted per National Digital Identity standards. Audit trail active.</p>
             </div>
          </div>

          <div className="flex gap-6">
             <button onClick={handleDownloadId} className="flex-1 bg-white border-2 border-slate-100 p-8 rounded-[40px] flex flex-col items-center gap-4 hover:border-emerald-500 transition-all group">
                <Download className="w-8 h-8 text-slate-300 group-hover:text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Export ID</span>
             </button>
             <button onClick={() => setShowRevokeConfirm(true)} className="flex-1 bg-white border-2 border-slate-100 p-8 rounded-[40px] flex flex-col items-center gap-4 hover:border-red-500 transition-all group">
                <Trash2 className="w-8 h-8 text-slate-300 group-hover:text-red-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Purge Data</span>
             </button>
          </div>
        </div>
      </div>

      {showRevokeConfirm && (
        <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-6">
           <div className="bg-white p-12 rounded-[64px] max-w-lg w-full space-y-8 shadow-3xl text-center animate-in zoom-in-95">
              <ShieldAlert className="w-16 h-16 text-red-600 mx-auto" />
              <h3 className="text-4xl font-black text-slate-900 serif">Revoke Stack?</h3>
              <p className="text-slate-500 font-bold leading-relaxed">This permanently deletes your digital identity and transaction history.</p>
              <div className="flex flex-col gap-4">
                <button onClick={handleRevokeConsent} className="w-full bg-red-600 text-white py-6 rounded-3xl font-black uppercase tracking-widest text-xs">Purge Permanently</button>
                <button onClick={() => setShowRevokeConfirm(false)} className="w-full bg-slate-50 text-slate-400 py-6 rounded-3xl font-black uppercase tracking-widest text-xs">Cancel</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

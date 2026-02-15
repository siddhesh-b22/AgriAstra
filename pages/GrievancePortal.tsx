
import React, { useState, useEffect } from 'react';
import { ShieldCheck, MessageSquare, AlertCircle, ArrowLeft, Send, CheckCircle, Clock, History, PlusCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Grievance {
  id: string;
  type: string;
  subject: string;
  description: string;
  status: 'Pending' | 'In-Review' | 'Resolved';
  date: string;
}

export const GrievancePortal: React.FC = () => {
  const [view, setView] = useState<'form' | 'history'>('form');
  const [submitted, setSubmitted] = useState(false);
  const [type, setType] = useState('Subsidy');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [grievances, setGrievances] = useState<Grievance[]>([]);
  const [lastId, setLastId] = useState('');

  useEffect(() => {
    const saved = localStorage.getItem('bharat_krishi_grievances');
    if (saved) setGrievances(JSON.parse(saved));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subject.trim() || !description.trim()) return;

    const newId = `BK-G${Math.floor(Math.random() * 90000) + 10000}`;
    const newGrievance: Grievance = {
      id: newId,
      type,
      subject,
      description,
      status: 'Pending',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };

    const updated = [newGrievance, ...grievances];
    setGrievances(updated);
    localStorage.setItem('bharat_krishi_grievances', JSON.stringify(updated));
    setLastId(newId);
    setSubmitted(true);
    
    // Reset form
    setSubject('');
    setDescription('');
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center space-y-8 animate-reveal">
        <div className="w-24 h-24 bg-green-100 rounded-[32px] flex items-center justify-center text-green-600 mx-auto border-4 border-white shadow-xl">
          <CheckCircle className="w-12 h-12" />
        </div>
        <div className="space-y-2">
          <h1 className="text-4xl font-black text-slate-900 tracking-tight serif">Complaint Filed Successfully</h1>
          <p className="text-slate-500 font-bold">Your Grievance ID is <span className="text-blue-600 font-black">{lastId}</span></p>
        </div>
        <p className="text-slate-600 leading-relaxed max-w-sm mx-auto font-medium">
          An Agri-Officer will review your dispute within 7 working days. You will receive an SMS alert on your registered mobile number.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={() => setSubmitted(false)} className="bg-slate-900 text-white px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl transition-all active:scale-95">
            Lodge Another
          </button>
          <button onClick={() => { setSubmitted(false); setView('history'); }} className="bg-white border-2 border-slate-100 text-slate-600 px-10 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-slate-50 transition-all">
            View History
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <div className="flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-black text-xs uppercase tracking-widest">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <button 
          onClick={() => setView(view === 'form' ? 'history' : 'form')}
          className="flex items-center gap-2 bg-blue-50 text-blue-600 px-6 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest border border-blue-100 hover:bg-blue-100 transition-all"
        >
          {view === 'form' ? <><History className="w-4 h-4" /> View History</> : <><PlusCircle className="w-4 h-4" /> Lodge Complaint</>}
        </button>
      </div>

      <div className="space-y-2 text-center md:text-left">
        <h1 className="text-5xl font-black text-slate-900 tracking-tight serif">{view === 'form' ? 'Help Desk' : 'Grievance History'}</h1>
        <p className="text-slate-400 font-black uppercase tracking-[0.3em] text-[10px] italic">Official Dispute Management (DPI-Link)</p>
      </div>

      {view === 'form' ? (
        <div className="bg-white border-2 border-slate-100 rounded-[48px] p-8 md:p-12 shadow-2xl space-y-10 animate-in slide-in-from-bottom-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {['Subsidy', 'Market', 'Logistics', 'Identity'].map((t) => (
              <button 
                key={t}
                onClick={() => setType(t)}
                className={`p-6 rounded-3xl border-2 transition-all font-black text-[10px] uppercase tracking-widest ${
                  type === t ? 'border-red-600 bg-red-50 text-red-700 shadow-lg' : 'border-slate-50 bg-slate-50 text-slate-400 hover:border-slate-200'
                }`}
              >
                {t} Dispute
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Subject / Issue Title</label>
              <input 
                required
                type="text" 
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g. PM-KISAN 14th Installment delayed"
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[32px] px-8 py-5 outline-none focus:border-red-600 transition-all font-bold text-slate-800"
              />
            </div>

            <div className="space-y-3">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 ml-6">Detailed Description</label>
              <textarea 
                required
                rows={5}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Please provide details including dates and specific concerns..."
                className="w-full bg-slate-50 border-2 border-slate-100 rounded-[40px] px-8 py-6 outline-none focus:border-red-600 transition-all font-bold text-slate-800 resize-none"
              ></textarea>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-[40px] flex items-center gap-6 border-4 border-slate-800">
              <div className="p-4 bg-white/10 rounded-2xl"><ShieldCheck className="w-8 h-8 text-green-400" /></div>
              <div>
                <div className="text-sm font-black uppercase tracking-widest">Sovereign Protection Active</div>
                <div className="text-[10px] text-slate-400 font-bold mt-1">This complaint is cryptographically linked to your profile.</div>
              </div>
            </div>

            <button 
              type="submit"
              className="w-full bg-red-600 hover:bg-black text-white py-7 rounded-[40px] font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-red-500/20 transition-all flex items-center justify-center gap-4 group active:scale-95"
            >
              Lodge Official Complaint
              <Send className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
          </form>
        </div>
      ) : (
        <div className="space-y-6 animate-in fade-in">
          {grievances.length === 0 ? (
            <div className="bg-slate-50 border-4 border-dashed border-slate-200 p-20 rounded-[48px] text-center space-y-4">
              <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto text-slate-300 shadow-sm">
                <MessageSquare className="w-10 h-10" />
              </div>
              <p className="text-slate-400 font-black uppercase tracking-widest text-xs">No records found on the stack.</p>
            </div>
          ) : (
            grievances.map((g) => (
              <div key={g.id} className="bg-white border-2 border-slate-100 p-8 rounded-[48px] flex flex-col md:flex-row items-center justify-between gap-8 hover:shadow-xl transition-all group">
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-900 shadow-inner group-hover:bg-slate-900 group-hover:text-white transition-all">
                    <AlertCircle className="w-8 h-8" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-xl font-black text-slate-900 serif">{g.subject}</h3>
                      <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest ${
                        g.status === 'Resolved' ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'
                      }`}>
                        {g.status}
                      </span>
                    </div>
                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">
                      ID: {g.id} • {g.type} • {g.date}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <button className="px-6 py-3 bg-slate-50 text-slate-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-100 transition-colors">
                    View Logs
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      <div className="text-center">
        <p className="text-[10px] text-slate-400 font-bold max-w-lg mx-auto leading-relaxed px-6">
          NOTICE: Under the DPDP Act 2023, every grievance is a priority document. Misleading information may lead to audit flags on your sovereign identity.
        </p>
      </div>
    </div>
  );
};

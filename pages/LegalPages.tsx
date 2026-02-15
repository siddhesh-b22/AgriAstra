
import React from 'react';
import { ShieldCheck, Lock, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const LegalLayout: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="max-w-4xl mx-auto px-4 py-24 space-y-12">
    <Link to="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors font-bold text-sm">
      <ArrowLeft className="w-4 h-4" /> Back to Home
    </Link>
    <div className="space-y-4 text-center md:text-left">
      <h1 className="text-5xl font-black text-slate-900 tracking-tight">{title}</h1>
      <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Last Updated: October 2026 • DPI Standard 1.2</p>
    </div>
    <div className="bg-white border-2 border-slate-100 p-10 md:p-16 rounded-[64px] shadow-sm prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:font-medium prose-p:text-slate-600 prose-p:leading-relaxed">
      {children}
    </div>
  </div>
);

export const PrivacyPolicy: React.FC = () => (
  <LegalLayout title="Privacy Policy">
    <h3>1. Data Sovereignty</h3>
    <p>Bharat Krishi OS (Powered by RISP) adheres strictly to the Digital Personal Data Protection (DPDP) Act. All farmer and business data is stored within sovereign Indian servers and is used exclusively for agricultural optimization and direct benefit transfers.</p>
    <h3>2. Aadhaar Information</h3>
    <p>Aadhaar data is used only for identity verification and direct subsidy routing. We do not store biometric data. Verification is performed through secure, government-approved API bridges.</p>
    <h3>3. Data Sharing</h3>
    <p>Anonymized market data may be shared with ICAR for research. Your personally identifiable information (PII) is never shared with private third parties without explicit, one-time consent via the "Kisan Consent" portal.</p>
    <h3>4. User Rights</h3>
    <p>Every user has the right to "Forget my Identity," which will purge their PII from our active databases, subject to regulatory audit requirements for historical transactions.</p>
  </LegalLayout>
);

export const Terms: React.FC = () => (
  <LegalLayout title="Terms of Service">
    <h3>1. Eligibility</h3>
    <p>Use of the Bharat Krishi OS is limited to verified Indian farmers (holding KCC or Land Records) and registered Indian agri-businesses with a valid GSTIN/PAN.</p>
    <h3>2. Bidding & Transactions</h3>
    <p>All bids placed on the Mandi Bazar section are legally binding. Failure to honor a bid may result in temporary suspension from the National e-NAM network.</p>
    <h3>3. Advisory Disclaimer</h3>
    <p>While the "Smart Advisor AI" uses Gemini-class processing and ICAR journals, final agricultural decisions (pesticide use, sowing dates) are the responsibility of the farmer. Bharat Krishi OS acts as an intelligence layer, not a direct agricultural insurance provider.</p>
    <h3>4. Grievance Redressal</h3>
    <p>Disputes regarding subsidy disbursal must be channeled through the official Grievance Portal. Decisions of the District Agriculture Officer are final under the current DPI framework.</p>
  </LegalLayout>
);

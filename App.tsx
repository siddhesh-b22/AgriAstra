
import React, { useState, useEffect, Suspense } from 'react';
import { HashRouter as Router, Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { Globe, Zap, AlertCircle } from 'lucide-react';
import { UserRole, UserProfile } from './types';
import { Header } from './components/Header';
import { SmartAdvisor } from './components/SmartAdvisor';
import { Home } from './pages/Home';
import { Login } from './pages/Login';
import { FarmerDashboard } from './pages/FarmerDashboard';
import { BusinessDashboard } from './pages/BusinessDashboard';
import { GrievancePortal } from './pages/GrievancePortal';
import { Directory } from './pages/Directory';
import { MunafaEstimator } from './pages/MunafaEstimator';
import { Contact } from './pages/Contact';
import { SellProduce } from './pages/SellProduce';
import { Impact } from './pages/Impact';
import { PrivacyPolicy, Terms } from './pages/LegalPages';
import { Features } from './pages/Features';
import { Partners } from './pages/Partners';
import { HowItWorks } from './pages/HowItWorks';
import { ProfileSettings } from './pages/ProfileSettings';
import { AgriVideoLab } from './pages/AgriVideoLab';
import { AgriHub } from './pages/AgriHub';
import { ComponentDetail } from './pages/ComponentDetail';
import { SchemeDetail } from './pages/SchemeDetail';
import { AdminHub } from './pages/AdminHub';
import { SimpleRegister } from './pages/SimpleRegister';
import { SimpleProfile } from './pages/SimpleProfile';
import { LanguageProvider } from './context/LanguageContext';
import { AgriStore } from './services/agriStore';

// Error Boundary Fallback Component
const ErrorFallback = () => (
  <div className="h-screen flex flex-col items-center justify-center bg-slate-50 p-6 text-center">
    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
    <h2 className="text-2xl font-black text-slate-900 serif">System Intervention Required.</h2>
    <p className="text-slate-500 mt-2">The Digital Stack encountered an unexpected error.</p>
    <button onClick={() => window.location.reload()} className="mt-6 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold">Restart OS</button>
  </div>
);

const AppContent: React.FC = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [isInitializing, setIsInitializing] = useState(true);
  const location = useLocation();

  useEffect(() => {
    // 1. Boot Data Registry
    AgriStore.init();
    
    // 2. Restore Session
    const session = AgriStore.getSession();
    setUser(session);
    
    setIsInitializing(false);
  }, []);

  const handleLogin = (profile: UserProfile) => {
    setUser(profile);
    AgriStore.setSession(profile);
  };

  const handleLogout = () => {
    setUser(null);
    AgriStore.clearSession();
  };

  useEffect(() => {
    const titles: Record<string, string> = {
      '/': 'AgriAstra | National Agri Portal',
      '/login': 'Portal Login | AgriAstra',
      '/dashboard': 'Dashboard | AgriAstra',
      '/agri-hub': 'AgriHub Marketplace | AgriAstra'
    };
    document.title = titles[location.pathname] || 'AgriAstra OS';
    window.scrollTo(0, 0);
  }, [location]);

  if (isInitializing) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#FDFDFC]">
        <div className="flex flex-col items-center gap-6">
          <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          <div className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-800 animate-pulse">Initializing Sovereign Grid...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFC]">
      <Header user={user} onLogout={handleLogout} />
      
      <main className="flex-grow pt-[80px]">
        <Suspense fallback={<div className="p-20 text-center font-black">Loading Stack...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={!user ? <Login onLogin={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route path="/register-simple" element={!user ? <SimpleRegister onRegister={handleLogin} /> : <Navigate to="/dashboard" />} />
            <Route path="/dashboard" element={
              user?.role === UserRole.FARMER 
                ? <FarmerDashboard user={user} /> 
                : user?.role === UserRole.BUSINESS 
                  ? <BusinessDashboard user={user} />
                  : <Navigate to="/login" />
            } />
            <Route path="/grievance" element={<GrievancePortal />} />
            <Route path="/directory" element={<Directory />} />
            <Route path="/munafa" element={<MunafaEstimator role={user?.role || UserRole.GUEST} />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/sell" element={user?.role === UserRole.FARMER ? <SellProduce /> : <Navigate to="/login" />} />
            <Route path="/impact" element={<Impact />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/features" element={<Features />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/profile" element={user ? <ProfileSettings /> : <Navigate to="/login" />} />
            <Route path="/agri-video-lab" element={<AgriVideoLab />} />
            <Route path="/agri-hub" element={<AgriHub />} />
            <Route path="/agri-hub/admin" element={<AdminHub />} />
            <Route path="/agri-hub/component/:id" element={<ComponentDetail />} />
            <Route path="/agri-hub/scheme/:id" element={<SchemeDetail />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </main>

      <SmartAdvisor />

      <footer className="bg-[#004d40] text-white py-24 px-8 mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="space-y-8">
              <div className="text-3xl font-black tracking-tighter">Agri<span className="text-[#00c853]">Astra</span></div>
              <p className="text-slate-400 font-medium leading-relaxed">Empowering India's agricultural backbone with high-precision digital intelligence.</p>
              <div className="flex items-center gap-6">
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00c853] transition-all cursor-pointer"><Globe className="w-5 h-5" /></div>
                 <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-[#00c853] transition-all cursor-pointer"><Zap className="w-5 h-5" /></div>
              </div>
            </div>
            
            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Products</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><Link to="/features" className="hover:text-[#00c853] transition-colors">Agri Intelligence</Link></li>
                <li><Link to="/agri-hub" className="hover:text-[#00c853] transition-colors">Equipment Hub</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Company</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><Link to="/partners" className="hover:text-[#00c853] transition-colors">Partners</Link></li>
                <li><Link to="/impact" className="hover:text-[#00c853] transition-colors">National Impact</Link></li>
              </ul>
            </div>

            <div className="space-y-6">
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-500">Legal</h4>
              <ul className="space-y-4 text-sm font-bold text-slate-300">
                <li><Link to="/privacy" className="hover:text-[#00c853] transition-colors">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:text-[#00c853] transition-colors">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
             <div>© 2026 AgriAstra. Ministry of Agri-Tech Infrastructure.</div>
             <div className="flex items-center gap-8"><span>DPDP Compliant</span><span>ISO 27001 Certified</span></div>
          </div>
        </div>
      </footer>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Router>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </Router>
  );
};

export default App;

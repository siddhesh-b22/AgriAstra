
import React, { useState, useEffect } from 'react';
import { UserRole, UserProfile } from '../types';
import { 
  LogOut, 
  Menu, 
  ChevronDown, 
  User, 
  Database, 
  Globe,
  Bell,
  Tractor,
  Building2,
  ShieldCheck,
  X,
  Home,
  LayoutDashboard,
  ShoppingCart,
  Info,
  Settings,
  HelpCircle,
  TrendingUp,
  Map
} from 'lucide-react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useLanguage, Language } from '../context/LanguageContext';

interface HeaderProps {
  user: UserProfile | null;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const languages: Language[] = ['English', 'Hindi', 'Marathi', 'Tamil', 'Telugu', 'Bengali', 'Kannada'];

  // Close sidebar on route change
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location]);

  // Lock scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isSidebarOpen]);

  const handleLogoutClick = () => {
    onLogout();
    navigate('/');
    setIsSidebarOpen(false);
  };

  const getRoleColor = (role: UserRole | undefined) => {
    if (role === UserRole.FARMER) return 'emerald';
    if (role === UserRole.BUSINESS) return 'blue';
    return 'slate';
  };

  const roleColor = getRoleColor(user?.role);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-[100] glass-surface border-b border-slate-200/50 px-6 md:px-12 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center gap-14">
            <Link to="/" className="flex items-center gap-3 group">
               <div className="text-2xl font-black tracking-tighter text-[#064E3B] flex items-center gap-1">
                 Agri<span className="text-emerald-500 italic">Astra</span>
                 <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse ml-1"></div>
               </div>
            </Link>
            
            <div className="hidden lg:flex items-center gap-10 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
              {user ? (
                <>
                  <Link to="/dashboard" className={`transition-all relative hover:text-[#064E3B] ${location.pathname === '/dashboard' ? 'text-emerald-600 after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2px] after:bg-emerald-500' : ''}`}>
                    {t('dashboard')}
                  </Link>
                  <Link to="/agri-hub" className={`transition-all hover:text-[#064E3B] ${location.pathname.startsWith('/agri-hub') ? 'text-emerald-600' : ''}`}>Marketplace</Link>
                  {user.role === UserRole.FARMER ? (
                    <>
                      <Link to="/sell" className="hover:text-[#064E3B] transition-all">Sell Produce</Link>
                      <Link to="/munafa" className="hover:text-[#064E3B] transition-all">Munafa</Link>
                    </>
                  ) : (
                    <>
                      <Link to="/directory" className="hover:text-[#064E3B] transition-all">Directory</Link>
                      <Link to="/impact" className="hover:text-[#064E3B] transition-all">Impact</Link>
                    </>
                  )}
                </>
              ) : (
                <>
                  <Link to="/agri-hub" className="hover:text-[#064E3B] transition-all">Agri Hub</Link>
                  <Link to="/features" className="hover:text-[#064E3B] transition-all">Solutions</Link>
                  <Link to="/impact" className="hover:text-[#064E3B] transition-all">National Radar</Link>
                </>
              )}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4 md:gap-6">
            
            {/* Role Context Chip (Visible on Desktop) */}
            {user && (
              <div className={`hidden sm:flex items-center gap-3 px-5 py-2.5 rounded-full border-2 transition-all ${user.role === UserRole.FARMER ? 'bg-emerald-50 border-emerald-100 text-emerald-700 shadow-sm' : 'bg-blue-50 border-blue-100 text-blue-700 shadow-sm'}`}>
                {user.role === UserRole.FARMER ? <Tractor className="w-4 h-4" /> : <Building2 className="w-4 h-4" />}
                <span className="text-[9px] font-black uppercase tracking-widest whitespace-nowrap">
                  {user.role === UserRole.FARMER ? 'Kisan Mode Active' : 'Enterprise Mode Active'}
                </span>
                <div className="w-1 h-1 rounded-full bg-current opacity-30 mx-1"></div>
                <ShieldCheck className="w-3.5 h-3.5 opacity-50" />
              </div>
            )}

            <div className="hidden md:flex items-center gap-4">
               <div className="relative">
                 <button 
                  onClick={() => setIsLangOpen(!isLangOpen)}
                  className="flex items-center gap-2 bg-slate-50 border border-slate-200 px-5 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest text-slate-600 hover:border-emerald-500 transition-all"
                >
                  <Globe className="w-3.5 h-3.5" />
                  {language}
                  <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} />
                </button>
                {isLangOpen && (
                  <div className="absolute top-full right-0 mt-3 w-56 bg-white border border-slate-100 shadow-2xl rounded-[24px] py-3 overflow-hidden animate-in fade-in slide-in-from-top-2 z-[110]">
                    {languages.map((lang) => (
                      <button
                        key={lang}
                        onClick={() => { setLanguage(lang); setIsLangOpen(false); }}
                        className={`w-full text-left px-6 py-2.5 text-[10px] font-black uppercase tracking-widest transition-all ${language === lang ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:bg-slate-50'}`}
                      >
                        {lang}
                      </button>
                    ))}
                  </div>
                )}
               </div>
            </div>

            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center gap-3 pl-4 md:pl-5 border-l border-slate-200 group"
                >
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center overflow-hidden border-2 border-white shadow-lg ring-1 ring-slate-200 group-hover:scale-105 transition-transform duration-300 ${user.role === UserRole.FARMER ? 'bg-[#064E3B]' : 'bg-blue-900'}`}>
                    {user.profileImage ? (
                      <img src={user.profileImage} className="w-full h-full object-cover" alt="Profile" />
                    ) : (
                      <span className="text-white text-xs font-black">{user.firstName[0]}</span>
                    )}
                  </div>
                  <ChevronDown className={`hidden md:block w-4 h-4 text-slate-400 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`} />
                </button>

                {isProfileOpen && (
                  <div className="absolute top-full right-0 mt-5 w-72 bg-white border border-slate-100 shadow-2xl rounded-[32px] p-4 space-y-1 animate-in fade-in slide-in-from-top-3 z-[110]">
                    <div className="p-5 border-b border-slate-50 mb-2">
                       <div className="text-[11px] font-black text-slate-900 leading-tight truncate">{user.firstName} {user.lastName}</div>
                       <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Sovereign ID: {user.id}</div>
                    </div>
                    <Link to="/profile" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <User className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Account Audit</span>
                    </Link>
                    <Link to="/grievance" onClick={() => setIsProfileOpen(false)} className="flex items-center gap-4 p-4 hover:bg-slate-50 rounded-2xl transition-all group">
                      <div className="p-2.5 bg-slate-50 rounded-xl group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-700">Dispute Center</span>
                    </Link>
                    <button 
                      onClick={handleLogoutClick}
                      className="w-full flex items-center gap-4 p-4 hover:bg-red-50 text-red-600 rounded-2xl transition-all border-t border-slate-50 mt-2"
                    >
                      <div className="p-2.5 bg-red-50 rounded-xl">
                        <LogOut className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-black uppercase tracking-widest">End Session</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="hidden sm:flex btn-premium px-10 py-3.5 rounded-full font-black text-[10px] uppercase tracking-[0.2em]">
                {t('login_signup')}
              </Link>
            )}

            <button 
              className="lg:hidden p-3 bg-slate-50 hover:bg-slate-100 text-slate-900 rounded-2xl transition-all" 
              onClick={() => setIsSidebarOpen(true)}
              aria-label="Open Sidebar"
            >
               <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </nav>

      {/* MOBILE SIDEBAR DRAWER (Professional Collapsible) */}
      <div 
        className={`fixed inset-0 z-[200] lg:hidden transition-all duration-500 ${isSidebarOpen ? 'visible' : 'invisible'}`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-slate-900/60 backdrop-blur-md transition-opacity duration-500 ${isSidebarOpen ? 'opacity-100' : 'opacity-0'}`} 
          onClick={() => setIsSidebarOpen(false)}
        />
        
        {/* Sidebar Panel */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] flex flex-col transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}`}
        >
          {/* Sidebar Header */}
          <div className="p-8 flex items-center justify-between border-b border-slate-50">
            <div className="text-xl font-black text-[#064E3B] flex items-center gap-2">
              Agri<span className="text-emerald-500 italic">Astra</span>
            </div>
            <button 
              onClick={() => setIsSidebarOpen(false)} 
              className="p-3 bg-slate-50 hover:bg-slate-100 rounded-2xl transition-colors"
            >
              <X className="w-6 h-6 text-slate-900" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
            
            {/* User Profile Summary & Mode Indicator */}
            {user ? (
              <div className="space-y-6">
                <div className="p-6 bg-slate-50 rounded-[32px] border border-slate-100">
                  <div className="flex items-center gap-4 mb-6">
                     <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-white font-black text-xl shadow-xl ${user.role === UserRole.FARMER ? 'bg-[#064E3B]' : 'bg-blue-900'}`}>
                       {user.firstName[0]}
                     </div>
                     <div>
                       <div className="text-sm font-black text-slate-900 leading-tight">{user.firstName} {user.lastName}</div>
                       <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-1">Sovereign Identity Active</div>
                     </div>
                  </div>
                  
                  {/* Mode Indicator - Clearly visible in sidebar as requested */}
                  <div className={`flex items-center gap-3 p-4 rounded-2xl border ${user.role === UserRole.FARMER ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700' : 'bg-blue-500/10 border-blue-500/20 text-blue-700'}`}>
                     {user.role === UserRole.FARMER ? <Tractor className="w-5 h-5" /> : <Building2 className="w-5 h-5" />}
                     <div className="flex-1">
                        <div className="text-[8px] font-black uppercase tracking-widest opacity-60">Operating Mode</div>
                        <div className="text-[10px] font-black uppercase tracking-widest">{user.role} INTERFACE</div>
                     </div>
                     <ShieldCheck className="w-4 h-4 opacity-40" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-8 bg-emerald-50 rounded-[32px] border border-emerald-100 text-center space-y-6">
                <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center mx-auto shadow-sm">
                  <User className="w-8 h-8 text-emerald-600" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-lg font-black text-slate-900 serif">Not Signed In.</h4>
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Join the National Agri-Stack</p>
                </div>
                <Link to="/login" className="block w-full bg-slate-900 text-white py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] shadow-xl">Initiate Gateway</Link>
              </div>
            )}

            {/* Main Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">Command Terminal</h4>
              <div className="grid gap-2">
                <Link to="/" className={`flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${location.pathname === '/' ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Home className="w-5 h-5" /> Home
                </Link>
                {user && (
                  <Link to="/dashboard" className={`flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${location.pathname === '/dashboard' ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <LayoutDashboard className="w-5 h-5" /> Dashboard
                  </Link>
                )}
                <Link to="/agri-hub" className={`flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${location.pathname.startsWith('/agri-hub') ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <ShoppingCart className="w-5 h-5" /> Marketplace
                </Link>
                <Link to="/impact" className={`flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${location.pathname === '/impact' ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'}`}>
                  <Info className="w-5 h-5" /> Impact Radar
                </Link>
                {user && user.role === UserRole.FARMER && (
                   <Link to="/munafa" className={`flex items-center gap-4 p-5 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${location.pathname === '/munafa' ? 'bg-emerald-500 text-white shadow-xl' : 'text-slate-600 hover:bg-slate-50'}`}>
                    <TrendingUp className="w-5 h-5" /> Munafa Engine
                  </Link>
                )}
              </div>
            </div>

            {/* Language Selection Grid (Integrated into Sidebar) */}
            <div className="pt-6 border-t border-slate-50">
               <div className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4 mb-6">Localized Interface</div>
               <div className="grid grid-cols-2 gap-3">
                  {languages.map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setLanguage(lang)}
                      className={`py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest border transition-all ${language === lang ? 'bg-emerald-600 border-emerald-500 text-white shadow-lg' : 'bg-slate-50 border-slate-100 text-slate-500 hover:bg-slate-100'}`}
                    >
                      {lang}
                    </button>
                  ))}
               </div>
            </div>

            {/* Support & Legal (Integrated into Sidebar) */}
            <div className="space-y-4">
              <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400 ml-4">System Support</h4>
              <div className="grid gap-2">
                 <Link to="/grievance" className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors">
                    <Database className="w-5 h-5" /> Dispute Center
                 </Link>
                 <Link to="/terms" className="flex items-center gap-4 p-5 bg-slate-50 rounded-2xl font-black text-[11px] uppercase tracking-widest text-slate-600 hover:bg-slate-100 transition-colors">
                    <ShieldCheck className="w-5 h-5" /> Stack Compliance
                 </Link>
              </div>
            </div>
          </div>

          {/* Sidebar Footer (Logout Session) */}
          {user && (
            <div className="p-8 border-t border-slate-50 bg-slate-50/50">
              <button 
                onClick={handleLogoutClick}
                className="w-full bg-red-50 text-red-600 py-5 rounded-[24px] font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all"
              >
                <LogOut className="w-5 h-5" /> Terminate Session
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Spacing for fixed header */}
      <div className="h-[80px]"></div>
    </>
  );
};

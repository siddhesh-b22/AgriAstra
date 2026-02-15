
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  const getLabel = (path: string) => {
    switch (path) {
      case 'agri-hub': return 'Agri Hub';
      case 'component': return 'Equipment';
      case 'scheme': return 'Schemes';
      case 'admin': return 'Admin Panel';
      default: return path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, ' ');
    }
  };

  return (
    <nav className="flex mb-8 animate-reveal" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-400">
        <li className="flex items-center">
          <Link to="/" className="hover:text-slate-900 transition-colors flex items-center gap-1.5">
            <Home className="w-3 h-3" /> Home
          </Link>
        </li>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          const isLast = index === pathnames.length - 1;

          // Skip showing the dynamic ID as a breadcrumb if we want cleaner navigation
          if (name.length > 20) return null; 

          return (
            <li key={name} className="flex items-center">
              <ChevronRight className="w-3 h-3 mx-1 text-slate-300" />
              {isLast ? (
                <span className="text-slate-900">{getLabel(name)}</span>
              ) : (
                <Link to={routeTo} className="hover:text-slate-900 transition-colors">
                  {getLabel(name)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

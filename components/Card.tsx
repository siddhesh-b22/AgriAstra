
import React from 'react';

interface CardProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  footer?: React.ReactNode;
  badge?: string;
  badgeColor?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ 
  title, 
  icon, 
  children, 
  className = '', 
  footer, 
  badge, 
  badgeColor = 'bg-slate-50 text-slate-500 border-slate-100',
  onClick 
}) => {
  return (
    <div 
      onClick={onClick}
      className={`group relative p-8 border border-slate-100 bg-white rounded-[32px] shadow-sm transition-all duration-500 hover:shadow-2xl hover:shadow-slate-200/50 hover:-translate-y-1 flex flex-col justify-between h-full ${className}`}
    >
      <div>
        <div className="flex items-start justify-between mb-8">
          <div className="flex gap-5">
            <div className="p-4 rounded-2xl bg-white shadow-sm border border-slate-100 group-hover:scale-110 transition-transform duration-500 flex items-center justify-center">
              {icon}
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900 leading-tight serif">{title}</h3>
              {badge && (
                <span className={`inline-flex mt-2 px-3 py-1 text-[9px] font-black uppercase tracking-widest rounded-lg border ${badgeColor}`}>
                  {badge}
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="text-slate-500 font-medium text-sm leading-relaxed">
          {children}
        </div>
      </div>
      {footer && (
        <div className="mt-8 pt-6 border-t border-slate-50">
          {footer}
        </div>
      )}
    </div>
  );
};

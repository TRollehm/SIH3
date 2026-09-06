import React from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth, getInitials } from '../../context/AuthContext';

export interface Breadcrumb {
  label: string;
  href?: string;
}

interface TopBarProps {
  breadcrumbs: Breadcrumb[];
  onMenuToggle?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({ breadcrumbs, onMenuToggle }) => {
  const { user } = useAuth();
  const initials = getInitials(user?.name);

  return (
    <header className="h-14 bg-white border-b border-border flex items-center justify-between px-4 lg:px-6 z-30 sticky top-0">
      <div className="flex items-center gap-4">
        {onMenuToggle && (
          <button 
            onClick={onMenuToggle}
            className="lg:hidden p-2 -ml-2 text-text-secondary hover:bg-surface rounded-md focus:outline-none"
          >
            <Menu className="h-5 w-5" />
          </button>
        )}
        
        <nav className="flex items-center text-sm font-medium text-text-secondary whitespace-nowrap overflow-x-auto no-scrollbar">
          {breadcrumbs.map((crumb, index) => {
            const isLast = index === breadcrumbs.length - 1;
            
            return (
              <React.Fragment key={index}>
                {index > 0 && <span className="mx-2 text-border">/</span>}
                {isLast || !crumb.href ? (
                  <span className="text-text-primary">{crumb.label}</span>
                ) : (
                  <Link to={crumb.href} className="hover:text-text-primary transition-colors">
                    {crumb.label}
                  </Link>
                )}
              </React.Fragment>
            );
          })}
        </nav>
      </div>

      <div className="flex items-center gap-2">
        <Link 
          to="/app/settings" 
          title="User Profile & Preferences"
          className="ml-2 h-8 w-8 rounded-full bg-olive-500 hover:bg-olive-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
        >
          <span className="text-sm font-semibold text-white">{initials}</span>
        </Link>
      </div>
    </header>
  );
};

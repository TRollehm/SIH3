import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Scan, 
  LayoutDashboard, 
  Plus, 
  FileText, 
  Bookmark, 
  Clock, 
  Settings, 
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth, getInitials } from '../../context/AuthContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed, onToggle }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navGroups = [
    {
      items: [
        { label: 'Overview', icon: LayoutDashboard, href: '/app' },
        { label: 'New Analysis', icon: Plus, href: '/app/new-analysis' },
        { label: 'My Analyses', icon: FileText, href: '/app/my-analyses' },
      ]
    },
    {
      label: 'Workspace',
      items: [
        { label: 'Saved Standards', icon: Bookmark, href: '/app/saved' },
        { label: 'Recent Documents', icon: Clock, href: '/app/recent' },
      ]
    }
  ];

  const bottomItems = [
    { label: 'Settings', icon: Settings, href: '/app/settings' },
    { label: 'Help & Support', icon: HelpCircle, href: '/app/help' },
  ];

  const isActive = (href: string) => {
    if (href === '/app') return location.pathname === href;
    if (href === '#') return false;
    return location.pathname.startsWith(href);
  };

  return (
    <aside 
      className={cn(
        "relative h-full bg-white border-r border-border flex flex-col transition-all duration-300 z-40 select-none",
        collapsed ? "w-16" : "w-60"
      )}
    >
      {/* Attached Edge Collapse/Expand Button */}
      <button 
        type="button"
        onClick={onToggle}
        title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        className="absolute -right-3.5 top-18 z-50 flex items-center justify-center w-7 h-7 bg-white border border-border rounded-full shadow-xs hover:bg-olive-50 hover:border-olive-300 text-text-secondary hover:text-text-primary transition-colors focus:outline-none"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Brand logo - clicking always returns to the public landing page */}
      <div className="h-14 flex items-center px-4 border-b border-border bg-white z-10 shrink-0">
        <Link 
          to="/" 
          className="flex items-center gap-2 overflow-hidden group focus:outline-none"
          title="Dr. Standards — Return to Homepage"
        >
          <div className="w-8 h-8 rounded-lg bg-olive-500 group-hover:bg-olive-600 transition-colors flex items-center justify-center shrink-0 text-white shadow-xs">
            <Scan className="h-5 w-5" />
          </div>
          {!collapsed && (
            <span className="font-semibold text-lg text-text-primary group-hover:text-olive-700 transition-colors whitespace-nowrap tracking-tight">
              Dr. Standards
            </span>
          )}
        </Link>
      </div>

      {/* Main navigation list with balanced spacing */}
      <div className="flex-1 overflow-y-auto py-5 flex flex-col justify-between">
        <div className="space-y-6">
          {navGroups.map((group, idx) => (
            <div key={idx} className="px-2">
              {!collapsed && group.label && (
                <div className="px-3 mb-2 text-[11px] font-semibold text-text-secondary uppercase tracking-wider">
                  {group.label}
                </div>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.label}
                      to={item.href}
                      title={collapsed ? item.label : undefined}
                      className={cn(
                        "flex items-center px-3 py-2 rounded-md text-sm transition-colors",
                        active 
                          ? "bg-olive-50 text-olive-700 border-l-2 border-olive-500 font-medium" 
                          : "text-text-secondary hover:bg-olive-50/70 hover:text-text-primary border-l-2 border-transparent",
                        collapsed && "justify-center px-0 mx-2"
                      )}
                    >
                      <item.icon className={cn("h-[18px] w-[18px] shrink-0", !collapsed && "mr-3", active ? "text-olive-500" : "text-text-secondary")} />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom items */}
        <div className="px-2 pt-4 border-t border-border/50">
          <div className="space-y-1">
            {bottomItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                title={collapsed ? item.label : undefined}
                className={cn(
                  "flex items-center px-3 py-2 rounded-md text-sm transition-colors text-text-secondary hover:bg-olive-50/70 hover:text-text-primary border-l-2 border-transparent",
                  collapsed && "justify-center px-0 mx-2"
                )}
              >
                <item.icon className={cn("h-[18px] w-[18px] shrink-0", !collapsed && "mr-3")} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* User profile & Logout */}
      <div className={cn("border-t border-border p-3 flex items-center justify-between bg-white shrink-0", collapsed && "justify-center")}>
        <Link 
          to="/app/settings" 
          className={cn("flex items-center gap-3 overflow-hidden group hover:opacity-80 transition-opacity", collapsed && "justify-center")}
          title="Account Settings"
        >
          <div className="h-8 w-8 rounded-full bg-olive-100 flex items-center justify-center shrink-0">
            <span className="text-sm font-semibold text-olive-700">
              {getInitials(user?.name)}
            </span>
          </div>
          {!collapsed && (
            <div className="overflow-hidden">
              <div className="text-sm font-medium text-text-primary truncate">
                {user?.name || 'Officer'}
              </div>
              <div className="text-xs text-text-secondary truncate">
                {user?.role || 'Procurement Officer'}
              </div>
            </div>
          )}
        </Link>

        {!collapsed && (
          <button 
            type="button"
            onClick={handleLogout}
            title="Sign Out"
            className="p-1.5 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-md transition-colors focus:outline-none"
          >
            <LogOut className="h-4 w-4" />
          </button>
        )}
      </div>
    </aside>
  );
};

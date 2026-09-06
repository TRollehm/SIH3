import React, { useState, useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar, type Breadcrumb } from './TopBar';

function getBreadcrumbs(pathname: string): Breadcrumb[] {
  if (pathname === '/app') return [{ label: 'Overview' }];
  if (pathname.startsWith('/app/new-analysis')) return [{ label: 'Workspace', href: '/app' }, { label: 'New Analysis' }];
  if (pathname.startsWith('/app/my-analyses')) return [{ label: 'My Analyses' }];
  if (pathname.startsWith('/app/standard/')) {
    return [{ label: 'Analysis Results', href: '/app/results/analysis-001' }, { label: 'Standard Details' }];
  }
  if (pathname.startsWith('/app/results/')) return [{ label: 'Workspace', href: '/app' }, { label: 'Analysis Results' }];
  if (pathname.startsWith('/app/settings')) return [{ label: 'Settings' }];
  if (pathname.startsWith('/app/saved')) return [{ label: 'Saved Standards' }];
  if (pathname.startsWith('/app/recent')) return [{ label: 'Recent Documents' }];
  
  return [{ label: 'Dashboard' }];
}

export const DashboardLayout: React.FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const breadcrumbs = getBreadcrumbs(location.pathname);

  return (
    <div className="min-h-screen bg-background flex">
      {/* Mobile overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar - desktop and mobile */}
      <div 
        className={`fixed inset-y-0 left-0 z-40 transform transition-transform duration-300 lg:translate-x-0 ${
          mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'lg:w-16' : 'lg:w-60'}`}
      >
        <Sidebar 
          collapsed={sidebarCollapsed} 
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} 
        />
      </div>

      {/* Main content area */}
      <div 
        className={`flex-1 flex flex-col min-h-screen transition-all duration-300 w-full ${
          sidebarCollapsed ? 'lg:ml-16' : 'lg:ml-60'
        }`}
      >
        <TopBar 
          breadcrumbs={breadcrumbs} 
          onMenuToggle={() => setMobileMenuOpen(true)} 
        />
        <main className="flex-1 p-4 md:p-6 lg:p-8 overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

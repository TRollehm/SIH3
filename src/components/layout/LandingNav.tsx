import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Scan, Menu, X } from 'lucide-react';
import { useAuth, getInitials } from '../../context/AuthContext';

export const Logo: React.FC = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-olive-500 flex items-center justify-center shrink-0 text-white shadow-xs">
      <Scan className="h-5 w-5" />
    </div>
    <span className="font-semibold text-lg text-text-primary tracking-tight">Dr. Standards</span>
  </div>
);

export const LandingNav: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();

  const initials = getInitials(user?.name);

  return (
    <nav className="sticky top-0 z-50 w-full bg-white border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" title="Dr. Standards — Return to Homepage">
              <Logo />
            </Link>
          </div>
          
          <div className="hidden md:flex space-x-8">
            <Link to="/product" className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium">Product</Link>
            <Link to="/how-it-works" className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium">How it works</Link>
            <Link to="/about" className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium">About</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <Link 
                to="/app/settings" 
                title={`Logged in as ${user?.name || 'User'} — Profile & Settings`}
                className="h-8 w-8 rounded-full bg-olive-500 hover:bg-olive-600 transition-colors flex items-center justify-center shrink-0 cursor-pointer shadow-xs"
              >
                <span className="text-sm font-semibold text-white">{initials}</span>
              </Link>
            ) : (
              <Link to="/login" className="text-text-secondary hover:text-text-primary px-3 py-2 text-sm font-medium">
                Sign In
              </Link>
            )}
            <Link to="/app/new-analysis" className="bg-olive-500 hover:bg-olive-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors">
              Start Analysis
            </Link>
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-text-secondary hover:text-text-primary p-2 focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link to="/product" className="block text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-base font-medium">Product</Link>
            <Link to="/how-it-works" className="block text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-base font-medium">How it works</Link>
            <Link to="/about" className="block text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-base font-medium">About</Link>
            {isAuthenticated ? (
              <Link
                to="/app/settings"
                className="flex items-center gap-3 px-3 py-2 rounded-md text-base font-medium text-text-primary hover:bg-olive-50"
              >
                <div className="h-7 w-7 rounded-full bg-olive-500 flex items-center justify-center shrink-0">
                  <span className="text-xs font-semibold text-white">{initials}</span>
                </div>
                <span>{user?.name || 'Account Settings'}</span>
              </Link>
            ) : (
              <Link to="/login" className="block text-text-secondary hover:text-text-primary px-3 py-2 rounded-md text-base font-medium">
                Sign In
              </Link>
            )}
            <Link to="/app/new-analysis" className="block w-full text-center mt-4 bg-olive-500 hover:bg-olive-600 text-white px-4 py-2 rounded-md text-base font-medium">
              Start Analysis
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};


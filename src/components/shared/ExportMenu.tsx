import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Sheet, Copy } from 'lucide-react';

interface ExportMenuProps {
  onExport: (format: 'pdf' | 'excel' | 'clipboard') => void;
}

export const ExportMenu: React.FC<ExportMenuProps> = ({ onExport }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleExport = (format: 'pdf' | 'excel' | 'clipboard') => {
    onExport(format);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left" ref={menuRef}>
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-border shadow-sm px-4 py-2 bg-white text-sm font-medium text-text-primary hover:bg-olive-50 hover:text-olive-700 hover:border-olive-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-500 transition-colors"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Download className="mr-2 h-4 w-4" aria-hidden="true" />
          Export Analysis
        </button>
      </div>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
          <div className="py-1" role="none">
            <button
              onClick={() => handleExport('pdf')}
              className="group flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-olive-50 hover:text-olive-700"
              role="menuitem"
              tabIndex={-1}
            >
              <FileText className="mr-3 h-4 w-4 text-text-secondary group-hover:text-olive-600" aria-hidden="true" />
              Export as PDF
            </button>
            <button
              onClick={() => handleExport('excel')}
              className="group flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-olive-50 hover:text-olive-700"
              role="menuitem"
              tabIndex={-1}
            >
              <Sheet className="mr-3 h-4 w-4 text-text-secondary group-hover:text-olive-600" aria-hidden="true" />
              Export as Excel
            </button>
            <button
              onClick={() => handleExport('clipboard')}
              className="group flex items-center w-full px-4 py-2 text-sm text-text-primary hover:bg-olive-50 hover:text-olive-700"
              role="menuitem"
              tabIndex={-1}
            >
              <Copy className="mr-3 h-4 w-4 text-text-secondary group-hover:text-olive-600" aria-hidden="true" />
              Copy to Clipboard
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Badge } from '../components/ui/Badge';
import { StatusBadge } from '../components/shared/StatusBadge';
import { standards, standardCategories } from '../data/mockData';
import {
  Search, BookOpen, Zap, Wrench, Building2, Apple,
  Shirt, FlaskConical, ShoppingBag, Cpu, ShieldCheck, Leaf
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<any>> = {
  Zap, Wrench, Building2, Apple, Shirt, FlaskConical, ShoppingBag, Cpu, ShieldCheck, Leaf
};

export const StandardsLibrary: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredStandards = useMemo(() => {
    return standards.filter((std) => {
      const matchesSearch = 
        std.number.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        std.category.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory ? std.category === selectedCategory : true;

      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-text">Standards Library</h1>
        <p className="text-text-secondary mt-1">Browse and search Indian Standards</p>
      </div>

      <div className="mt-6">
        <div className="relative w-full">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-text-secondary" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-4 py-3 text-lg border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-olive-500 focus:border-olive-500 transition-colors"
            placeholder="Search IS number, title, product or category…"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-lg font-semibold text-text mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {standardCategories.map((cat) => {
            const Icon = iconMap[cat.icon] || BookOpen;
            const isActive = selectedCategory === cat.name;
            return (
              <div
                key={cat.name}
                onClick={() => setSelectedCategory(isActive ? null : cat.name)}
                className={`bg-background border rounded-lg p-4 cursor-pointer transition-all hover:shadow-sm flex flex-col items-center text-center ${
                  isActive ? 'border-olive-500 ring-1 ring-olive-500' : 'border-border hover:border-olive-300'
                }`}
              >
                <div className="w-12 h-12 bg-olive-50 rounded-full flex items-center justify-center mb-3">
                  <Icon className="w-6 h-6 text-olive-600" />
                </div>
                <span className="font-medium text-text text-sm mb-1">{cat.name}</span>
                <span className="text-xs text-text-secondary">{cat.count} standards</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-between items-end mb-4">
          <h2 className="text-lg font-semibold text-text">All Standards</h2>
          <span className="text-sm text-text-secondary">{filteredStandards.length} standards</span>
        </div>
        
        <div className="bg-background border border-border rounded-lg overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead className="bg-background border-b border-border text-xs uppercase font-medium text-text-secondary">
              <tr>
                <th className="py-3 px-4 w-32">Standard</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4 w-40">Category</th>
                <th className="py-3 px-4 w-24">Edition</th>
                <th className="py-3 px-4 w-32">Status</th>
                <th className="py-3 px-4 w-24 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {filteredStandards.map((std) => (
                <tr key={std.id} className="border-b border-border hover:bg-olive-50/30 transition-colors">
                  <td className="py-3 px-4 font-mono font-medium text-text whitespace-nowrap">
                    {std.number}
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-medium text-text mb-0.5">{std.title}</div>
                    <div className="text-xs text-text-secondary truncate max-w-md" title={std.description}>
                      {std.description}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <Badge variant="secondary">{std.category}</Badge>
                  </td>
                  <td className="py-3 px-4 text-text-secondary">
                    {std.latestEdition}
                  </td>
                  <td className="py-3 px-4">
                    <StatusBadge status={std.status} />
                  </td>
                  <td className="py-3 px-4 text-right">
                    <Link to={`/app/standard/${std.id}`} className="text-olive-600 hover:text-olive-700 font-medium inline-flex items-center gap-1">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredStandards.length === 0 && (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-text-secondary">
                    No standards found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

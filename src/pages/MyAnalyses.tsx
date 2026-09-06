import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Plus, FileText, Trash2, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { SearchBar } from '../components/shared/SearchBar';
import { EmptyState } from '../components/shared/EmptyState';
import { analysisHistory } from '../data/mockData';

export const MyAnalyses: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-text">My Analyses</h1>
          <p className="text-text-secondary mt-1">Review and manage your past standard analyses</p>
        </div>
        <Link to="/app/new-analysis">
          <Button variant="primary" icon={<Plus className="w-5 h-5" />}>
            New Analysis
          </Button>
        </Link>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-6">
        <div className="flex w-full sm:w-auto items-center gap-3">
          <div className="w-full sm:w-80">
            <SearchBar placeholder="Search analyses..." value={searchQuery} onChange={setSearchQuery} />
          </div>
          <Button variant="secondary" className="px-3" icon={<Filter className="w-5 h-5" />} />
        </div>
        <div className="text-sm font-medium text-text-secondary whitespace-nowrap">
          {analysisHistory.length} analyses
        </div>
      </div>

      <div className="mt-4">
        <div className="hidden md:block bg-background border border-border rounded-lg overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead className="bg-background border-b border-border text-sm font-medium text-text-secondary">
              <tr>
                <th className="py-3 px-4">Document</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Standards Found</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {analysisHistory.map((item) => (
                <tr key={item.id} className="border-b border-border hover:bg-olive-50/50 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-text-secondary" />
                      <span className="font-medium text-text">{item.title}</span>
                    </div>
                  </td>
                  <td className="py-4 px-4 text-text-secondary">{item.category}</td>
                  <td className="py-4 px-4 text-text-secondary">{item.standardsFound} standards</td>
                  <td className="py-4 px-4 text-text-secondary">{item.date}</td>
                  <td className="py-4 px-4">
                    <Badge
                      variant={
                        item.status === 'Completed' ? 'success' :
                        item.status === 'Processing' ? 'warning' : 'danger'
                      }
                    >
                      {item.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Link to={`/app/results/${item.id}`} className="text-olive-600 hover:text-olive-700 font-medium px-2 py-1 rounded">
                        View
                      </Link>
                      <button className="p-2 text-text-secondary hover:text-red-600 hover:bg-red-50 rounded-md transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {analysisHistory.length === 0 && (
            <div className="py-12">
              <EmptyState 
                icon={<FileText className="w-12 h-12" />}
                title="No analyses found" 
                description="You haven't run any standard analyses yet."
              />
            </div>
          )}
        </div>

        {/* Mobile View */}
        <div className="block md:hidden space-y-4">
          {analysisHistory.map((item) => (
            <div key={item.id} className="bg-background border border-border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-text-secondary" />
                  <span className="font-medium text-text">{item.title}</span>
                </div>
                <Badge
                  variant={
                    item.status === 'Completed' ? 'success' :
                    item.status === 'Processing' ? 'warning' : 'danger'
                  }
                >
                  {item.status}
                </Badge>
              </div>
              <div className="grid grid-cols-2 gap-y-2 text-sm mb-4">
                <div className="text-text-secondary">Category:</div>
                <div className="text-right">{item.category}</div>
                <div className="text-text-secondary">Found:</div>
                <div className="text-right">{item.standardsFound} standards</div>
                <div className="text-text-secondary">Date:</div>
                <div className="text-right">{item.date}</div>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-border">
                <button className="text-text-secondary hover:text-red-600 p-1">
                  <Trash2 className="w-5 h-5" />
                </button>
                <Link to={`/app/results/${item.id}`}>
                  <Button variant="secondary" className="w-full text-sm">
                    View Results
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

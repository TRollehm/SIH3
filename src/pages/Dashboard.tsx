import { Link } from 'react-router-dom';
import {
  Plus, FileText, TrendingUp, BookOpen,
  ArrowRight, BarChart3
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Card, CardContent } from '../components/ui/Card';
import { StatCard } from '../components/shared/StatCard';
import { analysisHistory } from '../data/mockData';
import { useAuth } from '../context/AuthContext';

export const Dashboard = () => {
  const { user } = useAuth();
  const recentAnalyses = analysisHistory?.slice(0, 3) || [];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Overview</h1>
          <p className="text-text-secondary mt-1">Welcome back, {user?.name ? user.name.split(' ')[0] : 'Officer'}</p>
        </div>
        <Link to="/app/new-analysis">
          <Button className="bg-olive-600 hover:bg-olive-700 text-white shadow-sm flex items-center">
            <Plus className="w-4 h-4 mr-2" />
            New Analysis
          </Button>
        </Link>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <StatCard
          label="Total Analyses"
          value="24"
          icon={<FileText className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          label="Standards Identified"
          value="156"
          icon={<BookOpen className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          label="Avg. Relevance"
          value="92%"
          icon={<TrendingUp className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          label="This Month"
          value="6"
          icon={<BarChart3 className="w-5 h-5 text-olive-600" />}
        />
      </div>

      {/* Quick Actions */}
      <div className="mt-8 space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Link to="/app/new-analysis" className="block group">
            <Card className="h-full border border-gray-200 transition-all duration-200 hover:border-olive-300 hover:shadow-xs">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center text-olive-600">
                    <FileText className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-olive-500 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">New Standards Analysis</h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                  Analyze a specification or tender document for applicable Indian Standards
                </p>
              </CardContent>
            </Card>
          </Link>

          <Link to="/app/my-analyses" className="block group">
            <Card className="h-full border border-gray-200 transition-all duration-200 hover:border-olive-300 hover:shadow-xs">
              <CardContent className="p-5 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-olive-50 flex items-center justify-center text-olive-600">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-olive-500 transition-colors" />
                </div>
                <h3 className="font-medium text-gray-900 mb-1">View My Analyses</h3>
                <p className="text-sm text-text-secondary line-clamp-2">
                  Review and export past specification analysis reports
                </p>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>

      {/* Recent Analyses */}
      <div className="mt-8 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Recent Analyses</h2>
          <Link to="/app/my-analyses" className="text-sm font-medium text-olive-600 hover:text-olive-700">
            View All
          </Link>
        </div>
        <Card>
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left border-collapse">
              <thead className="bg-gray-50 text-gray-600 font-medium border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">Document</th>
                  <th className="px-6 py-4 whitespace-nowrap">Category</th>
                  <th className="px-6 py-4 whitespace-nowrap">Standards Found</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                  <th className="px-6 py-4 whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 whitespace-nowrap text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {recentAnalyses.length > 0 ? (
                  recentAnalyses.map((analysis: any) => (
                    <tr key={analysis.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 font-medium text-gray-900">
                        {analysis.documentName}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {analysis.category}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {analysis.standardsFound}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {analysis.date}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                          analysis.status === 'Completed' ? 'bg-olive-50 text-olive-700 border-olive-200' :
                          analysis.status === 'Processing' ? 'bg-amber-50 text-amber-700 border-amber-200' :
                          'bg-red-50 text-red-700 border-red-200'
                        }`}>
                          {analysis.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link to={`/app/results/${analysis.id}`} className="font-medium text-olive-600 hover:text-olive-700">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                      No recent analyses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
};

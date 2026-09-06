import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  FileText, BarChart3, GitBranch, ShieldCheck, ArrowLeft, Lightbulb,
  ExternalLink, Plus, CheckCircle2, AlertTriangle, XCircle
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { Tabs } from '../components/ui/Tabs';
import { StatCard } from '../components/shared/StatCard';
import { SearchBar } from '../components/shared/SearchBar';
import { RelevanceBadge } from '../components/shared/RelevanceBadge';
import { StatusBadge } from '../components/shared/StatusBadge';
import { ExportMenu } from '../components/shared/ExportMenu';

import { mockAnalysisResult } from '../data/mockData';

const filterTabs = [
  { id: 'All', label: 'All' },
  { id: 'Highly Relevant', label: 'Highly Relevant' },
  { id: 'Allied', label: 'Allied' },
  { id: 'Normative Reference', label: 'Normative Reference' },
  { id: 'Test Method', label: 'Test Method' },
  { id: 'Safety', label: 'Safety' },
  { id: 'Installation', label: 'Installation' },
  { id: 'Certification', label: 'Certification' },
];

export function AnalysisResults() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('All');
  const [sortOption, setSortOption] = useState('Relevance');

  const filteredRecommendations = useMemo(() => {
    let results = mockAnalysisResult.recommendations;

    // Filter by tab
    if (activeFilter === 'Highly Relevant') {
      results = results.filter(r => r.relevanceScore >= 90);
    } else if (activeFilter !== 'All') {
      results = results.filter(r => r.relevanceType === activeFilter);
    }

    // Filter by search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      results = results.filter(r =>
        r.standard.id.toLowerCase().includes(q) ||
        r.standard.title.toLowerCase().includes(q) ||
        r.standard.description.toLowerCase().includes(q)
      );
    }

    // Sort
    results = [...results].sort((a, b) => {
      if (sortOption === 'Relevance') {
        return b.relevanceScore - a.relevanceScore;
      } else if (sortOption === 'Standard Number') {
        return a.standard.id.localeCompare(b.standard.id);
      } else if (sortOption === 'Latest Version') {
        // basic sort, assumes latestEdition is a string like "2023"
        return (b.standard.latestEdition || '').localeCompare(a.standard.latestEdition || '');
      }
      return 0;
    });

    return results;
  }, [searchQuery, activeFilter, sortOption]);

  return (
    <div className="w-full max-w-7xl mx-auto pb-12">
      {/* 1. Header Row */}
      <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
        <div>
          <Link to="/app/new-analysis" className="text-sm text-text-secondary hover:text-olive-500 inline-flex items-center gap-1">
            <ArrowLeft className="w-4 h-4" /> Back to Workspace
          </Link>
          <h1 className="text-2xl font-semibold mt-2 text-text-primary">Recommended Indian Standards</h1>
          <p className="text-text-secondary mt-1">{mockAnalysisResult.summary}</p>
        </div>
        <div className="flex items-center gap-2">
          <ExportMenu onExport={(format) => console.log('Export:', format)} />
          <Button variant="primary" icon={<Plus className="w-4 h-4" />}>
            Add to Specification
          </Button>
        </div>
      </div>

      {/* 2. Statistics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        <StatCard
          value={mockAnalysisResult.totalStandards}
          label="Standards Identified"
          icon={<FileText className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          value={mockAnalysisResult.highRelevance}
          label="High Relevance"
          icon={<BarChart3 className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          value={mockAnalysisResult.alliedStandards}
          label="Allied Standards"
          icon={<GitBranch className="w-5 h-5 text-olive-600" />}
        />
        <StatCard
          value={mockAnalysisResult.certificationRequirements}
          label="Certification Requirements"
          icon={<ShieldCheck className="w-5 h-5 text-olive-600" />}
        />
      </div>

      {/* 3. AI Analysis Summary Panel */}
      <Card className="mt-6 bg-olive-50 border-olive-100">
        <CardContent className="p-4 flex gap-4">
          <div className="flex-shrink-0 mt-1">
            <Lightbulb className="w-6 h-6 text-olive-500" />
          </div>
          <div>
            <h3 className="font-medium text-text-primary mb-1">Analysis Summary</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              {mockAnalysisResult.aiExplanation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 4. Filters & Search Row */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div className="w-full sm:max-w-md">
            <SearchBar
              placeholder="Search standards..."
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-secondary whitespace-nowrap">Sort by:</span>
            <select
              value={sortOption}
              onChange={(e) => setSortOption(e.target.value)}
              className="px-3 py-2 border border-border rounded-md bg-background text-sm text-text-primary focus:outline-none focus:ring-1 focus:ring-olive-500"
            >
              <option value="Relevance">Relevance</option>
              <option value="Standard Number">Standard Number</option>
              <option value="Latest Version">Latest Version</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto pb-1">
          <Tabs
            tabs={filterTabs}
            activeTab={activeFilter}
            onChange={setActiveFilter}
          />
        </div>
      </div>

      {/* 5. Standards Table/List */}
      <div className="mt-4">
        {/* Desktop Table */}
        <div className="hidden md:block bg-background rounded-lg border border-border overflow-hidden">
          <table className="w-full text-left text-sm border-collapse">
            <thead className="bg-surface sticky top-0 border-b border-border text-text-secondary font-medium">
              <tr>
                <th className="py-3 px-4 w-48 font-medium">Standard</th>
                <th className="py-3 px-4 font-medium">Title</th>
                <th className="py-3 px-4 font-medium">Relevance</th>
                <th className="py-3 px-4 font-medium">Latest Version</th>
                <th className="py-3 px-4 font-medium">Status</th>
                <th className="py-3 px-4 font-medium">Certification</th>
                <th className="py-3 px-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredRecommendations.map((rec) => (
                <tr key={rec.standard.id} className="hover:bg-olive-50/50 transition-colors group">
                  <td className="py-3.5 px-4 align-top">
                    <div className="font-mono font-medium text-text-primary mb-1">
                      {rec.standard.id}
                    </div>
                    <Badge variant="secondary" size="sm">{rec.relevanceType}</Badge>
                  </td>
                  <td className="py-3.5 px-4 align-top max-w-md">
                    <div className="font-medium text-text-primary mb-1">{rec.standard.title}</div>
                    <div className="text-xs text-text-secondary truncate">{rec.standard.description}</div>
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    <RelevanceBadge score={rec.relevanceScore} />
                  </td>
                  <td className="py-3.5 px-4 align-top text-text-secondary">
                    {rec.standard.latestEdition}
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    <StatusBadge status={rec.standard.status} />
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    {rec.standard.certification.bisApplicable ? (
                      <Badge variant="default" size="sm">BIS</Badge>
                    ) : (
                      <span className="text-text-muted">—</span>
                    )}
                  </td>
                  <td className="py-3.5 px-4 align-top">
                    <Link
                      to={`/app/standard/${encodeURIComponent(rec.standard.id)}`}
                      className="inline-flex items-center gap-1 text-olive-600 hover:text-olive-700 font-medium text-sm"
                    >
                      View <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredRecommendations.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-text-secondary">
                    No standards match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="md:hidden flex flex-col gap-3">
          {filteredRecommendations.map((rec) => (
            <Card key={rec.standard.id}>
              <CardContent className="p-4 flex flex-col gap-3">
                <div className="flex justify-between items-start gap-2">
                  <div>
                    <div className="font-mono font-medium text-text-primary mb-1">{rec.standard.id}</div>
                    <Badge variant="secondary" size="sm">{rec.relevanceType}</Badge>
                  </div>
                  <RelevanceBadge score={rec.relevanceScore} />
                </div>
                <div>
                  <div className="font-medium text-text-primary mb-1">{rec.standard.title}</div>
                  <div className="text-xs text-text-secondary line-clamp-2">{rec.standard.description}</div>
                </div>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-1">
                  <div className="flex items-center gap-1 text-sm">
                    <span className="text-text-muted">Status:</span>
                    <StatusBadge status={rec.standard.status} />
                  </div>
                  {rec.standard.certification.bisApplicable && (
                    <Badge variant="default" size="sm">BIS Required</Badge>
                  )}
                </div>
                <div className="mt-2 pt-3 border-t border-border">
                  <Link
                    to={`/app/standard/${encodeURIComponent(rec.standard.id)}`}
                    className="flex justify-center items-center gap-2 text-olive-600 font-medium py-1 w-full"
                  >
                    View Details <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
          {filteredRecommendations.length === 0 && (
            <div className="py-8 text-center text-text-secondary bg-background rounded-lg border border-border">
              No standards match the selected filters.
            </div>
          )}
        </div>

        <div className="mt-3 text-sm text-text-secondary">
          Showing {filteredRecommendations.length} of {mockAnalysisResult.recommendations.length} standards
        </div>
      </div>

      {/* 6. Procurement Checklist Section */}
      <div className="mt-10">
        <h2 className="text-xl font-semibold text-text-primary">Procurement Specification Checklist</h2>
        <p className="text-text-secondary mb-4">Verify your procurement specification is complete</p>

        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-border">
              {mockAnalysisResult.procurementChecklist.map((item, idx) => (
                <div key={idx} className="p-4 flex items-start gap-3">
                  <div className="mt-0.5">
                    {item.status === 'pass' && <CheckCircle2 className="w-5 h-5 text-olive-500" />}
                    {item.status === 'warning' && <AlertTriangle className="w-5 h-5 text-amber-500" />}
                    {item.status === 'fail' && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                  <div>
                    <div className="font-medium text-text-primary">{item.label}</div>
                    {item.detail && (
                      <div className="text-xs text-text-secondary mt-1">{item.detail}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-3 mt-4">
          <Button variant="primary">Add Recommendations to Specification</Button>
          <Button variant="secondary">Export Analysis</Button>
        </div>
      </div>

      {/* 7. Certification Section */}
      {mockAnalysisResult.certifications && mockAnalysisResult.certifications.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-text-primary mb-4">Applicable Certification Requirements</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {mockAnalysisResult.certifications.map((cert, idx) => (
              <Card key={idx}>
                <CardContent className="p-4 flex flex-col h-full">
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <h3 className="font-medium text-text-primary">{cert.name}</h3>
                    {cert.status === 'Applicable' && <Badge variant="default">Applicable</Badge>}
                    {cert.status === 'Not Applicable' && <Badge variant="secondary">N/A</Badge>}
                    {cert.status === 'Potentially Applicable' && <Badge variant="warning">Potential</Badge>}
                  </div>
                  <p className="text-sm text-text-secondary mt-auto pt-2 border-t border-border/50">
                    {cert.reason}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

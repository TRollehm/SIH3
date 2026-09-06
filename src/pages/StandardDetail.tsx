import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft, BookOpen, FileText, Shield, Wrench, AlertCircle,
  CheckCircle2, ExternalLink, Bookmark, Lightbulb, Calendar, Layers
} from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Card, CardContent } from '../components/ui/Card';
import { StatusBadge } from '../components/shared/StatusBadge';
import { standards, mockAnalysisResult } from '../data/mockData';

export const StandardDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [activeTab, setActiveTab] = useState('overview');

  const standard = standards.find(s => s.id === id);

  if (!standard) {
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <AlertCircle className="w-12 h-12 text-gray-400 mb-4" />
        <h2 className="text-xl font-medium mb-2">Standard Not Found</h2>
        <p className="text-text-secondary mb-4">The standard you are looking for does not exist or has been removed.</p>
        <Link to="/app/results/analysis-001">
          <Button>Back to Results</Button>
        </Link>
      </div>
    );
  }

  const recommendation = mockAnalysisResult?.recommendations?.find(
    (r: any) => r.standardId === id
  );

  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'requirements', label: 'Key Requirements' },
    { id: 'references', label: 'Normative References' },
    { id: 'amendments', label: 'Amendments' },
    { id: 'certification', label: 'Certification' },
    { id: 'procurement', label: 'Procurement Guidance' }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div>
        <Link to="/app/results/analysis-001" className="inline-flex items-center text-sm font-medium text-olive-600 hover:text-olive-700 mb-4 transition-colors">
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Results
        </Link>
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold font-mono text-gray-900 mb-2">
              {standard.number || 'IS Number'}
            </h1>
            <p className="text-xl text-text-secondary mb-4">
              {standard.title}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={standard.status} />
              <div className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-olive-50 text-olive-700 border border-olive-200 flex items-center">
                <Calendar className="w-3 h-3 mr-1" />
                Edition {standard.latestEdition || standard.yearOfPublication}
              </div>
              <Badge variant="outline" className="flex items-center gap-1">
                <Layers className="w-3 h-3" />
                {standard.category}
              </Badge>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Button variant="secondary" className="text-gray-700">
              <Bookmark className="w-4 h-4 mr-2" />
              Save Standard
            </Button>
            <Button className="bg-olive-600 hover:bg-olive-700 text-white">
              Add to Specification
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-gray-200 overflow-x-auto">
        <nav className="flex gap-6 min-w-max" aria-label="Tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors
                ${activeTab === tab.id
                  ? 'border-olive-500 text-olive-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }
              `}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      <div className="space-y-8">
        {/* Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-medium mb-3 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-olive-600" />
                  Scope
                </h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  {standard.scope || standard.description || 'No scope information available.'}
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 pt-6 border-t border-gray-100">
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Standard Number</span>
                    <span className="font-mono text-gray-900">{standard.number}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Year of Pub.</span>
                    <span className="text-gray-900">{standard.yearOfPublication}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Status</span>
                    <span className="text-gray-900 capitalize">{standard.status?.toLowerCase() || 'N/A'}</span>
                  </div>
                  <div>
                    <span className="block text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Latest Edition</span>
                    <span className="text-gray-900">{standard.latestEdition || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {recommendation && (
              <Card className="bg-olive-50 border-olive-100 shadow-sm">
                <CardContent className="p-6">
                  <h3 className="text-lg font-medium text-olive-900 mb-3 flex items-center gap-2">
                    <Lightbulb className="w-5 h-5 text-olive-600" />
                    Why This Standard Was Recommended
                  </h3>
                  <p className="text-olive-800 mb-4">{recommendation.matchReason}</p>
                  
                  <div className="flex flex-wrap items-center gap-4">
                    {recommendation.matchedKeywords && (
                      <div className="flex flex-wrap gap-2">
                        {recommendation.matchedKeywords.map((kw: string, i: number) => (
                          <span key={i} className="px-2 py-1 bg-olive-100 text-olive-700 rounded-md text-xs font-medium border border-olive-200">
                            {kw}
                          </span>
                        ))}
                      </div>
                    )}
                    {recommendation.relevanceScore && (
                      <div className="ml-auto text-sm font-medium text-olive-700 bg-white px-3 py-1 rounded-full border border-olive-200">
                        {recommendation.relevanceScore}% Match
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )}

        {/* Key Requirements */}
        {activeTab === 'requirements' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-olive-600" />
                Key Requirements
              </h3>
              {standard.keyRequirements?.length > 0 ? (
                <ul className="space-y-3">
                  {standard.keyRequirements.map((req: string, i: number) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-olive-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700">{req}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No key requirements listed for this standard.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Normative References */}
        {activeTab === 'references' && (
          <Card>
            <CardContent className="p-0">
              <div className="p-6 border-b border-gray-100">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <FileText className="w-5 h-5 text-olive-600" />
                  Normative References
                </h3>
              </div>
              <div className="divide-y divide-gray-100">
                {standard.normativeReferences?.length > 0 ? (
                  standard.normativeReferences.map((refString: string, i: number) => {
                    // Simple mock matching
                    const refStandard = standards.find(s => s.number === refString || refString.includes(s.number));
                    
                    if (refStandard) {
                      return (
                        <div key={i} className="p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-gray-50 transition-colors">
                          <div>
                            <Link to={`/app/standard/${refStandard.id}`} className="font-mono font-medium text-olive-600 hover:underline flex items-center gap-1">
                              {refStandard.number}
                              <ExternalLink className="w-3 h-3" />
                            </Link>
                            <p className="text-sm text-gray-900 mt-1">{refStandard.title}</p>
                            <p className="text-xs text-gray-500 mt-1">Required for comprehensive compliance</p>
                          </div>
                          <Link to={`/app/standard/${refStandard.id}`}>
                            <Button variant="secondary" size="sm">View Details</Button>
                          </Link>
                        </div>
                      );
                    }
                    
                    return (
                      <div key={i} className="p-6">
                        <span className="font-mono font-medium text-gray-700">{refString}</span>
                        <p className="text-sm text-gray-400 mt-1 italic">Details not available in local database</p>
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-gray-500 italic">No normative references listed.</div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Amendments */}
        {activeTab === 'amendments' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Wrench className="w-5 h-5 text-olive-600" />
                Amendments
              </h3>
              {standard.amendments?.length > 0 ? (
                <div className="relative border-l-2 border-olive-100 ml-3 space-y-8 pb-4">
                  {standard.amendments.map((amendment: any, i: number) => (
                    <div key={i} className="relative pl-6">
                      <div className="absolute -left-1.5 top-1.5 w-3 h-3 bg-olive-500 rounded-full ring-4 ring-white" />
                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-900">Amendment No. {amendment.number}</span>
                          <span className="text-xs text-gray-500 bg-white px-2 py-0.5 rounded border border-gray-200">
                            Year {amendment.year}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{amendment.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No amendments have been issued for this edition.</p>
              )}
            </CardContent>
          </Card>
        )}

        {/* Certification */}
        {activeTab === 'certification' && (
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-olive-600" />
                Certification Requirements
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { key: 'bisProductCertification', label: 'BIS Product Certification' },
                  { key: 'crs', label: 'CRS (Compulsory Reg.)' },
                  { key: 'hallmarking', label: 'Hallmarking' }
                ].map((certType) => {
                  const certData = standard.certification?.[certType.key as keyof typeof standard.certification] as any;
                  const isApplicable = certData?.applicable;
                  
                  return (
                    <div key={certType.key} className="bg-gray-50 p-5 rounded-lg border border-gray-100">
                      <h4 className="font-medium text-gray-900 mb-3">{certType.label}</h4>
                      <div className="mb-3">
                        {isApplicable ? (
                          <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">Applicable</Badge>
                        ) : (
                          <Badge variant="secondary" className="bg-gray-200 text-gray-700 hover:bg-gray-200">Not Applicable</Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">
                        {certData?.explanation || (isApplicable ? 'Mandatory for products under this standard.' : 'Not required for this category.')}
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Procurement Guidance */}
        {activeTab === 'procurement' && (
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <Bookmark className="w-5 h-5 text-olive-600" />
                  Procurement Guidance
                </h3>
                <Button className="bg-olive-600 hover:bg-olive-700 text-white shrink-0">
                  Add to Specification
                </Button>
              </div>
              
              {standard.procurementGuidance?.length > 0 ? (
                <ul className="space-y-4">
                  {standard.procurementGuidance.map((guide: string, i: number) => (
                    <li key={i} className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <CheckCircle2 className="w-5 h-5 text-olive-500 shrink-0 mt-0.5" />
                      <span className="text-gray-700 text-sm leading-relaxed">{guide}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 italic">No specific procurement guidance available for this standard.</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

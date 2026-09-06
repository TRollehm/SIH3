export interface Standard {
  id: string;
  number: string;
  partNumber?: string;
  title: string;
  description: string;
  scope: string;
  category: StandardCategory;
  status: 'Current' | 'Superseded' | 'Withdrawn';
  latestEdition: string;
  yearOfPublication: number;
  amendments: Amendment[];
  normativeReferences: string[];
  certification: CertificationInfo;
  keyRequirements: string[];
  procurementGuidance: string[];
}

export interface Amendment {
  number: string;
  year: number | string;
  description: string;
}

export interface CertificationInfo {
  bisApplicable: boolean;
  crsApplicable: boolean;
  hallmarkingApplicable: boolean;
  details: string;
}

export type StandardCategory =
  | 'Electrical'
  | 'Mechanical'
  | 'Construction'
  | 'Food'
  | 'Textiles'
  | 'Chemicals'
  | 'Consumer Products'
  | 'IT & Electronics'
  | 'Safety'
  | 'Environment';

export interface RecommendedStandard {
  standard: Standard;
  relevanceScore: number;
  relevanceType: 'Primary' | 'Allied' | 'Normative Reference' | 'Test Method' | 'Safety' | 'Installation';
  matchReason: string;
  matchedKeywords: string[];
}

export interface AnalysisInput {
  mode: 'describe' | 'upload';
  description?: string;
  fileName?: string;
  fileSize?: number;
  filePages?: number;
  category?: string;
  sector?: string;
  intendedUse?: string;
  language?: string;
}

export interface AnalysisResult {
  id: string;
  input: AnalysisInput;
  summary: string;
  aiExplanation: string;
  recommendations: RecommendedStandard[];
  totalStandards: number;
  highRelevance: number;
  alliedStandards: number;
  certificationRequirements: number;
  procurementChecklist: ProcurementCheckItem[];
  certifications: CertificationResult[];
  createdAt: string;
  status: 'Processing' | 'Completed' | 'Failed';
}

export interface ProcurementCheckItem {
  label: string;
  status: 'pass' | 'warning' | 'fail';
  detail: string;
}

export interface CertificationResult {
  name: string;
  status: 'Applicable' | 'Potentially Applicable' | 'Not Applicable' | 'Not Identified';
  reason: string;
}

export interface AnalysisHistoryItem {
  id: string;
  title: string;
  category: string;
  standardsFound: number;
  date: string;
  status: 'Completed' | 'Processing' | 'Failed';
}

export interface AnalysisStep {
  label: string;
  status: 'completed' | 'active' | 'pending';
}

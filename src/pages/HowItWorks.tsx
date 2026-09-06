import React from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from '../components/layout/LandingNav';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  FileUp, 
  Cpu, 
  CheckSquare, 
  FileText, 
  ArrowRight, 
  CheckCircle2 
} from 'lucide-react';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      step: '01',
      title: 'Upload or Describe the Procurement Need',
      desc: 'Enter plain language product specifications (e.g., "50 kVA three-phase oil immersed distribution transformer for 11 kV system") or upload tender schedules (PDF, DOCX, TXT).',
      detail: 'Our parser extracts technical attributes such as ratings, temperature thresholds, operating environments, and mechanical constraints.',
      icon: <FileUp className="w-6 h-6 text-olive-600" />
    },
    {
      step: '02',
      title: 'Deep AI Semantic Matching & BIS Database Search',
      desc: 'The engine translates your requirements against the Bureau of Indian Standards library without relying on exact wording or rigid tags.',
      detail: 'Eliminates keyword gaps by recognizing industrial terminology, Indian standard numbering systems, and domain-specific acronyms.',
      icon: <Cpu className="w-6 h-6 text-olive-600" />
    },
    {
      step: '03',
      title: 'Normative References & Amendment Verification',
      desc: 'Primary standards pull along their entire normative dependency graph: testing criteria, dimensional guidelines, and fire/safety codes.',
      detail: 'Automatically cross-checks whether referenced codes are superseded, withdrawn, or have active amendments applicable as of 2026.',
      icon: <CheckSquare className="w-6 h-6 text-olive-600" />
    },
    {
      step: '04',
      title: 'Statutory Certification Verification & Tender Export',
      desc: 'Generates an actionable procurement checklist with mandatory BIS ISI mark flags, CRS scope checks, and direct tender clause export.',
      detail: 'Export clear specification tables directly to PDF or Excel, or copy verbatim clauses for GeM (Government e-Marketplace) and NIC tenders.',
      icon: <FileText className="w-6 h-6 text-olive-600" />
    }
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-50 text-olive-700 border border-olive-200 uppercase tracking-wider">
            Operational Workflow
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            How Dr. Standards Streamlines Standards Compliance
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            From raw tender drafts to verified Indian Standards in four intuitive, automated steps.
          </p>
        </div>

        {/* Workflow steps */}
        <div className="space-y-8 max-w-4xl mx-auto mb-16">
          {steps.map((item, idx) => (
            <Card key={idx} className="p-6 sm:p-8 bg-white border border-border transition-all hover:border-olive-300">
              <div className="flex flex-col sm:flex-row gap-6 items-start">
                <div className="flex sm:flex-col items-center gap-3 shrink-0">
                  <div className="w-12 h-12 rounded-xl bg-olive-50 border border-olive-200 flex items-center justify-center">
                    {item.icon}
                  </div>
                  <span className="font-mono text-xs font-bold text-olive-600 bg-olive-50 px-2 py-0.5 rounded">
                    STEP {item.step}
                  </span>
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-text-primary mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-text-secondary leading-relaxed mb-3">
                    {item.desc}
                  </p>
                  <div className="bg-background rounded-md p-3 text-xs text-text-secondary border border-border flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-olive-600 shrink-0 mt-0.5" />
                    <span>{item.detail}</span>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-2xl font-bold text-text-primary mb-6 text-center">Frequently Asked Questions</h2>
          <div className="space-y-4">
            <Card className="p-5 bg-white border border-border">
              <h4 className="font-semibold text-text-primary text-sm mb-1">Does Dr. Standards access live Bureau of Indian Standards (BIS) gazette notifications?</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Yes, our knowledge repository continuously cross-references published BIS standards, Quality Control Orders (QCOs) issued by line ministries, and Bureau gazette amendments.
              </p>
            </Card>
            <Card className="p-5 bg-white border border-border">
              <h4 className="font-semibold text-text-primary text-sm mb-1">Can this output be pasted directly into GeM (Government e-Marketplace) tenders?</h4>
              <p className="text-xs text-text-secondary leading-relaxed">
                Yes. The results include a dedicated "Procurement Specification Checklist" and clause exporter formatted specifically for GeM tender creation.
              </p>
            </Card>
          </div>
        </div>

        {/* CTA banner */}
        <div className="text-center bg-white border border-border rounded-xl p-8 max-w-2xl mx-auto shadow-xs">
          <h3 className="text-xl font-bold text-text-primary">Ready to verify your procurement specification?</h3>
          <p className="mt-2 text-sm text-text-secondary">Run an analysis in under two minutes with zero sign-up friction.</p>
          <div className="mt-6">
            <Link to="/app/new-analysis">
              <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
                <span>Start Specification Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-border py-8 text-center text-xs text-text-secondary">
        <p>© 2026 Dr. Standards — AI-Powered Indian Standards Intelligence. Built for Public & Enterprise Procurement.</p>
      </footer>
    </div>
  );
};

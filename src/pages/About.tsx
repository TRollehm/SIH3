import React from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from '../components/layout/LandingNav';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  Building2, 
  Award, 
  FileCheck2, 
  Scale, 
  BookOpenCheck 
} from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-50 text-olive-700 border border-olive-200 uppercase tracking-wider">
            Mission & Governance
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            Elevating Indian Procurement through Precision Standardization
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Dr. Standards was conceived to modernize how government departments, Public Sector Undertakings (PSUs), and industry stakeholders discover, align with, and enforce Indian Standards.
          </p>
        </div>

        {/* Core Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <Scale className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Statutory Compliance</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Enabling full adherence to Ministry Quality Control Orders (QCOs) and Bureau of Indian Standards mandates across capital goods and civil infrastructure.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <FileCheck2 className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Tender Dispute Prevention</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Vague or outdated specifications lead to supplier disqualifications and litigation. Dr. Standards ensures unambiguous, up-to-date standard numbers.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Quality by Design</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Fosters national manufacturing self-reliance (Atmanirbhar Bharat) by aligning domestic procurement directly with rigorous national benchmarks.
            </p>
          </Card>
        </div>

        {/* Department Alignment */}
        <div className="bg-white border border-border rounded-xl p-8 mb-16">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Building2 className="w-5 h-5 text-olive-600" />
            Serving Public & Private Procurement Bodies
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
            <div className="p-4 rounded-lg bg-background border border-border">
              <h4 className="font-semibold text-text-primary mb-1">Central Ministries</h4>
              <p className="text-xs text-text-secondary">Railways, Power, Defence, Road Transport & Highways, Petroleum.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <h4 className="font-semibold text-text-primary mb-1">State PSUs & DISCOMs</h4>
              <p className="text-xs text-text-secondary">Electricity boards, municipal corporations, public works departments.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <h4 className="font-semibold text-text-primary mb-1">Tender Committees</h4>
              <p className="text-xs text-text-secondary">Technical evaluation boards, CAG audit review committees, GeM authorities.</p>
            </div>
            <div className="p-4 rounded-lg bg-background border border-border">
              <h4 className="font-semibold text-text-primary mb-1">EPC Contractors</h4>
              <p className="text-xs text-text-secondary">Engineering procurement firms ensuring supply chain standard conformance.</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/app/new-analysis">
            <Button variant="primary" size="lg" className="inline-flex items-center gap-2">
              <BookOpenCheck className="w-4 h-4" />
              <span>Start Standards Analysis</span>
            </Button>
          </Link>
        </div>
      </main>

      <footer className="bg-white border-t border-border py-8 text-center text-xs text-text-secondary">
        <p>© 2026 Dr. Standards — AI-Powered Indian Standards Intelligence. Built for Public & Enterprise Procurement.</p>
      </footer>
    </div>
  );
};

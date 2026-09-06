import React from 'react';
import { Link } from 'react-router-dom';
import { LandingNav } from '../components/layout/LandingNav';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { 
  Sparkles, 
  GitFork, 
  ShieldCheck, 
  ArrowRight,
  Database
} from 'lucide-react';

export const Product: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <LandingNav />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-olive-50 text-olive-700 border border-olive-200 uppercase tracking-wider">
            Architecture & Capabilities
          </span>
          <h1 className="mt-4 text-3xl sm:text-4xl font-bold text-text-primary tracking-tight">
            An Enterprise Indian Standards Engine Built for Modern Tendering
          </h1>
          <p className="mt-4 text-lg text-text-secondary leading-relaxed">
            Dr. Standards closes the gap between complex procurement clauses and Bureau of Indian Standards (BIS) technical codes, ensuring high compliance and audit readiness.
          </p>
          <div className="mt-6 flex justify-center gap-4">
            <Link to="/app/new-analysis">
              <Button variant="primary" size="lg" className="flex items-center gap-2">
                <span>Try Recommendation Engine</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary" size="lg">
                View Workflow
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Semantic Specification Analysis</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Interprets technical intent, parameters (voltages, tolerances, material grades, duty cycles) beyond superficial keyword searches.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <GitFork className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Normative & Allied Reference Graph</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Traces mandatory nested standards such as testing procedures, bush dimensions, insulating materials, and fire safety ratings.
            </p>
          </Card>

          <Card className="p-6 bg-white border border-border">
            <div className="w-10 h-10 rounded-lg bg-olive-50 border border-olive-200 flex items-center justify-center text-olive-600 mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-semibold text-text-primary mb-2">Statutory Certification Audits</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Determines whether items fall under BIS Mandatory Certification (Scheme I / ISI Mark), CRS (MeitY), or Hallmarking orders.
            </p>
          </Card>
        </div>

        {/* Technical Specification Matrix */}
        <div className="bg-white border border-border rounded-xl p-8 mb-16 shadow-xs">
          <h2 className="text-xl font-semibold text-text-primary mb-6 flex items-center gap-2">
            <Database className="w-5 h-5 text-olive-600" />
            Technical Capability Matrix
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-background text-text-secondary border-b border-border">
                <tr>
                  <th className="py-3 px-4 font-medium">Capability</th>
                  <th className="py-3 px-4 font-medium">Conventional Keyword Search</th>
                  <th className="py-3 px-4 font-medium text-olive-700">Dr. Standards Intelligent Engine</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                <tr>
                  <td className="py-3.5 px-4 font-medium text-text-primary">Contextual Matching</td>
                  <td className="py-3.5 px-4 text-text-secondary">Strict string matching (misses synonyms)</td>
                  <td className="py-3.5 px-4 text-olive-700 font-medium">Understands electrical, civil, and mechanical context</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-text-primary">Amendments & Editions</td>
                  <td className="py-3.5 px-4 text-text-secondary">Often returns outdated/superseded standards</td>
                  <td className="py-3.5 px-4 text-olive-700 font-medium">Flags active edition and latest published amendments</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-text-primary">Normative Reference Trees</td>
                  <td className="py-3.5 px-4 text-text-secondary">Manual cross-referencing required</td>
                  <td className="py-3.5 px-4 text-olive-700 font-medium">Automatic allied standard identification & hierarchy</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 font-medium text-text-primary">Tender Export Formats</td>
                  <td className="py-3.5 px-4 text-text-secondary">None / manual copy-paste</td>
                  <td className="py-3.5 px-4 text-olive-700 font-medium">Direct export into tender clauses (PDF, Excel, Clipboard)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="rounded-xl bg-olive-700 text-white p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-bold">Ready to integrate Dr. Standards into your procurement cycle?</h3>
            <p className="mt-2 text-olive-100 max-w-xl text-sm">
              Reduce technical specification errors, eliminate tender disputes, and enforce statutory standards seamlessly.
            </p>
          </div>
          <Link to="/app/new-analysis" className="shrink-0">
            <Button variant="secondary" size="lg" className="bg-white text-olive-800 hover:bg-olive-50 border-none font-medium">
              Start Free Analysis
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

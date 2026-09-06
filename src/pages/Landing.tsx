import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  GitBranch, 
  RefreshCw, 
  ShieldCheck, 
  ArrowRight, 
  Upload, 
  Search, 
  ListChecks, 
  CheckCircle2 
} from 'lucide-react';
import { Button } from '../components/ui/Button';
import { LandingNav } from '../components/layout/LandingNav';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      <LandingNav />

      {/* Hero Section */}
      <section className="flex-grow pt-24 pb-16 lg:pt-36 lg:pb-28 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto w-full flex flex-col items-center text-center">
          <div className="inline-flex items-center px-3 py-1 rounded-full bg-olive-50 border border-olive-100 mb-6">
            <span className="text-xs font-semibold text-olive-700 tracking-wide uppercase">
              AI-Powered Indian Standards Intelligence
            </span>
          </div>
          <h1 className="text-4xl lg:text-5xl font-semibold text-text-primary leading-tight tracking-tight mb-6">
            Identify the right Indian Standards for every procurement specification.
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mb-8">
            Analyze product descriptions, technical specifications and tender documents to discover applicable Indian Standards, allied references, amendments and certification requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/app/new-analysis">
              <Button size="lg" className="w-full sm:w-auto flex items-center justify-center gap-2">
                Analyze a Specification
                <ArrowRight size={18} />
              </Button>
            </Link>
            <Link to="/how-it-works">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto flex items-center justify-center">
                How It Works
              </Button>
            </Link>
          </div>
      </section>

      {/* Capabilities Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-lg border border-border shadow-sm flex flex-col">
            <div className="h-10 w-10 rounded-md bg-olive-50 flex items-center justify-center mb-4">
              <Brain className="text-olive-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2">Semantic Recommendation</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Understands specifications beyond simple keyword matching.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm flex flex-col">
            <div className="h-10 w-10 rounded-md bg-olive-50 flex items-center justify-center mb-4">
              <GitBranch className="text-olive-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2">Allied Standards</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Finds normative references, test methods, safety and installation standards.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm flex flex-col">
            <div className="h-10 w-10 rounded-md bg-olive-50 flex items-center justify-center mb-4">
              <RefreshCw className="text-olive-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2">Latest Versions</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Highlights current editions and amendments.
            </p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-border shadow-sm flex flex-col">
            <div className="h-10 w-10 rounded-md bg-olive-50 flex items-center justify-center mb-4">
              <ShieldCheck className="text-olive-600" size={20} />
            </div>
            <h3 className="text-base font-semibold text-text-primary mb-2">Certification Requirements</h3>
            <p className="text-sm text-text-secondary leading-relaxed">
              Identifies applicable BIS certification, CRS, Hallmarking and other requirements.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-white border-t border-border py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto w-full">
          <h2 className="text-2xl font-semibold text-text-primary mb-4 text-center">How it works</h2>
          <p className="text-text-secondary text-center mb-14 max-w-xl mx-auto">From specification to standards — in four simple steps.</p>
          
          <div className="relative">
            {/* Connector line on desktop */}
            <div className="hidden lg:block absolute top-10 left-[calc(12.5%+24px)] right-[calc(12.5%+24px)] h-px bg-olive-200"></div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-6">
              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-2xl bg-olive-50 border border-olive-100 flex items-center justify-center mb-5 shadow-sm">
                  <Upload className="text-olive-600" size={28} />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-olive-600 text-white text-xs font-bold flex items-center justify-center shadow">1</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1.5">Upload or Describe</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Paste text, upload documents, or describe your product specifications.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-2xl bg-olive-50 border border-olive-100 flex items-center justify-center mb-5 shadow-sm">
                  <Search className="text-olive-600" size={28} />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-olive-600 text-white text-xs font-bold flex items-center justify-center shadow">2</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1.5">AI Analyzes Requirements</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Our AI engine parses your input and identifies relevant technical criteria.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-2xl bg-olive-50 border border-olive-100 flex items-center justify-center mb-5 shadow-sm">
                  <ListChecks className="text-olive-600" size={28} />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-olive-600 text-white text-xs font-bold flex items-center justify-center shadow">3</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1.5">Standards are Matched</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Applicable Indian Standards, amendments, and allied references are surfaced.</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative h-20 w-20 rounded-2xl bg-olive-50 border border-olive-100 flex items-center justify-center mb-5 shadow-sm">
                  <CheckCircle2 className="text-olive-600" size={28} />
                  <span className="absolute -top-2 -right-2 h-7 w-7 rounded-full bg-olive-600 text-white text-xs font-bold flex items-center justify-center shadow">4</span>
                </div>
                <h3 className="font-semibold text-text-primary mb-1.5">Review & Add to Specification</h3>
                <p className="text-sm text-text-secondary leading-relaxed">Export your results and integrate standards into your procurement documents.</p>
              </div>
            </div>
          </div>
        </div>
      </section>




      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-semibold text-text-primary mb-4">
            Start identifying the right standards today.
          </h2>
          <p className="text-text-secondary mb-8">
            Sign up and start analyzing your specifications in minutes.
          </p>
          <Link to="/app/new-analysis">
            <Button size="lg" className="px-8">
              Start Analysis
            </Button>
          </Link>
        </div>
      </section>

    </div>
  );
};

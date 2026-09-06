import React from 'react';
import { Link } from 'react-router-dom';
import {
  Upload,
  Search,
  ListChecks,
  CheckCircle2,
  Mail,
  ExternalLink,
  MessageCircle,
  BookOpen,
  ShieldCheck,
  HelpCircle,
} from 'lucide-react';

export const HelpSupport: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-text-primary tracking-tight">
          Help & Support
        </h1>
        <p className="mt-1 text-sm text-text-secondary">
          Learn how Dr. Standards works and get help with your analysis workflow.
        </p>
      </div>

      {/* How It Works */}
      <section className="bg-white border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-olive-500" />
          How It Works
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { step: '01', icon: Upload, title: 'Upload or Describe', desc: 'Provide a product description or upload a technical specification / tender document.' },
            { step: '02', icon: Search, title: 'AI Analyzes', desc: 'Our AI engine parses and understands your requirements semantically.' },
            { step: '03', icon: ListChecks, title: 'Standards Matched', desc: 'Relevant Indian Standards, allied references, and amendments are identified.' },
            { step: '04', icon: CheckCircle2, title: 'Review & Use', desc: 'Review recommendations, certification needs, and add to your procurement specification.' },
          ].map((item) => (
            <div key={item.step} className="flex flex-col">
              <div className="flex items-center gap-3 mb-3">
                <div className="h-9 w-9 rounded-full bg-olive-50 border border-olive-100 flex items-center justify-center shrink-0 text-olive-600 font-mono text-xs font-semibold">
                  {item.step}
                </div>
                <item.icon className="h-5 w-5 text-olive-500" />
              </div>
              <h3 className="text-sm font-semibold text-text-primary mb-1">{item.title}</h3>
              <p className="text-xs text-text-secondary leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-white border border-border rounded-xl p-6">
        <h2 className="text-lg font-semibold text-text-primary mb-5 flex items-center gap-2">
          <HelpCircle className="h-5 w-5 text-olive-500" />
          Frequently Asked Questions
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What types of documents can I upload?',
              a: 'You can upload PDF or text-based tender documents, product specifications, and technical requirement sheets. The AI will extract relevant details automatically.',
            },
            {
              q: 'How accurate are the recommendations?',
              a: 'Dr. Standards uses semantic matching to identify relevant Indian Standards. Each recommendation includes a relevance score. We recommend verifying critical standards against the latest BIS catalog.',
            },
            {
              q: 'Can I use Dr. Standards for any product category?',
              a: 'Yes. The system covers Electrical, Mechanical, Construction, Food, Textiles, Chemicals, Consumer Products, IT & Electronics, Safety, and Environment categories.',
            },
            {
              q: 'How do I know if a standard requires BIS certification?',
              a: 'Each recommended standard includes certification details — BIS, CRS, Hallmarking applicability — in the analysis results under the Certifications tab.',
            },
            {
              q: 'Is my data secure?',
              a: 'Yes. Uploaded documents are processed in-session and are not stored permanently. Your analysis history is stored locally in your browser for your convenience.',
            },
          ].map((faq, idx) => (
            <details key={idx} className="group border border-border rounded-lg">
              <summary className="flex items-center justify-between cursor-pointer px-4 py-3 text-sm font-medium text-text-primary hover:bg-olive-50/50 rounded-lg transition-colors">
                {faq.q}
                <span className="ml-2 text-text-secondary group-open:rotate-180 transition-transform text-xs">▼</span>
              </summary>
              <p className="px-4 pb-3 text-sm text-text-secondary leading-relaxed">{faq.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Quick Links & Contact */}
      <div className="grid sm:grid-cols-2 gap-6">
        <section className="bg-white border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-olive-500" />
            Quick Links
          </h2>
          <div className="space-y-2">
            <Link
              to="/app/new-analysis"
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-olive-700 hover:bg-olive-50 rounded-md transition-colors"
            >
              <Search className="h-4 w-4" />
              Start a New Analysis
            </Link>
            <Link
              to="/app/my-analyses"
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-olive-700 hover:bg-olive-50 rounded-md transition-colors"
            >
              <ListChecks className="h-4 w-4" />
              View My Analyses
            </Link>
            <a
              href="/how-it-works"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 py-2 text-sm text-text-secondary hover:text-olive-700 hover:bg-olive-50 rounded-md transition-colors"
            >
              <ExternalLink className="h-4 w-4" />
              Full Product Guide (new tab)
            </a>
          </div>
        </section>

        <section className="bg-white border border-border rounded-xl p-6">
          <h2 className="text-lg font-semibold text-text-primary mb-4 flex items-center gap-2">
            <MessageCircle className="h-5 w-5 text-olive-500" />
            Contact Support
          </h2>
          <p className="text-sm text-text-secondary mb-4 leading-relaxed">
            Need further assistance? Reach out to our support team.
          </p>
          <div className="space-y-2">
            <a
              href="mailto:support@drstandards.gov.in"
              className="flex items-center gap-2 px-3 py-2 text-sm text-olive-700 hover:bg-olive-50 rounded-md transition-colors"
            >
              <Mail className="h-4 w-4" />
              support@drstandards.gov.in
            </a>
          </div>
          <p className="mt-4 text-xs text-text-secondary">
            Support hours: Monday – Friday, 9:00 AM – 6:00 PM IST
          </p>
        </section>
      </div>
    </div>
  );
};

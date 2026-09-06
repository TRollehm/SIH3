import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, FileText, Upload } from 'lucide-react';

import { Button } from '../components/ui/Button';
import { Textarea } from '../components/ui/Textarea';
import { Input } from '../components/ui/Input';
import { Select } from '../components/ui/Select';
import { Tabs } from '../components/ui/Tabs';
import { Card } from '../components/ui/Card';
import { FileUpload } from '../components/shared/FileUpload';
import { ProgressTimeline } from '../components/shared/ProgressTimeline';

import { analysisSteps } from '../data/mockData';
import type { AnalysisStep } from '../types';

type ViewState = 'input' | 'processing' | 'completed';

export const NewAnalysis: React.FC = () => {
  const navigate = useNavigate();
  const [viewState, setViewState] = useState<ViewState>('input');
  const [activeTab, setActiveTab] = useState<'text' | 'file'>('text');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  
  // Progress state
  const [, setCurrentStepIndex] = useState(1);
  const [currentSteps, setCurrentSteps] = useState<AnalysisStep[]>([]);

  // Tab definitions
  const tabs = [
    { id: 'text', label: 'Describe Product', icon: <FileText className="w-4 h-4" /> },
    { id: 'file', label: 'Upload Document', icon: <Upload className="w-4 h-4" /> }
  ];

  // Options for select inputs
  const categoryOptions = [
    { value: 'general', label: 'General' },
    { value: 'electrical', label: 'Electrical Equipment' },
    { value: 'mechanical', label: 'Mechanical Equipment' },
    { value: 'construction', label: 'Construction Materials' },
    { value: 'it', label: 'IT & Electronics' },
    { value: 'food', label: 'Food & Agriculture' },
    { value: 'textiles', label: 'Textiles' },
    { value: 'chemicals', label: 'Chemicals' },
    { value: 'consumer', label: 'Consumer Products' },
    { value: 'safety', label: 'Safety Equipment' }
  ];

  const industryOptions = [
    { value: 'central', label: 'Central Government' },
    { value: 'state', label: 'State Government' },
    { value: 'psu', label: 'PSU' },
    { value: 'defense', label: 'Defense' },
    { value: 'railways', label: 'Railways' },
    { value: 'municipal', label: 'Municipal' },
    { value: 'private', label: 'Private Sector' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'hi', label: 'Hindi' }
  ];

  const handleStartAnalysis = () => {
    setViewState('processing');
    
    // Initialize steps for timeline
    const initializedSteps = analysisSteps.map((step, idx) => ({
      ...step,
      status: idx === 0 ? 'completed' : idx === 1 ? 'active' : 'pending'
    })) as AnalysisStep[];
    
    setCurrentSteps(initializedSteps);
    setCurrentStepIndex(1);
  };

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    
    if (viewState === 'processing') {
      interval = setInterval(() => {
        setCurrentStepIndex((prev) => {
          const nextIndex = prev + 1;
          
          if (nextIndex > analysisSteps.length) {
            clearInterval(interval);
            setTimeout(() => setViewState('completed'), 500);
            return prev;
          }
          
          // Update steps array based on new index
          setCurrentSteps((prevSteps) => 
            prevSteps.map((step, idx) => ({
              ...step,
              status: idx < nextIndex ? 'completed' : idx === nextIndex ? 'active' : 'pending'
            }))
          );
          
          return nextIndex;
        });
      }, 1500);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [viewState]);

  useEffect(() => {
    if (viewState === 'completed') {
      navigate('/app/results/analysis-001');
    }
  }, [viewState, navigate]);

  return (
    <div className="w-full max-w-4xl mx-auto py-8 px-4 transition-all duration-300">
      {viewState === 'input' && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h1 className="text-2xl font-semibold text-text-primary">New Standards Analysis</h1>
          <p className="text-text-secondary mt-1">
            Describe what you are procuring and we'll identify the standards you should consider.
          </p>
          
          <div className="mt-6">
            <Tabs 
              tabs={tabs} 
              activeTab={activeTab} 
              onChange={(id) => setActiveTab(id as 'text' | 'file')} 
            />
          </div>

          <div className="mt-6">
            {activeTab === 'text' ? (
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-text-primary">
                    Product or Specification Description
                  </label>
                  <Textarea 
                    rows={8}
                    placeholder="Example: Procurement of 50 kVA three-phase oil immersed distribution transformers for a 11 kV electrical distribution system…"
                    className="w-full"
                  />
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <FileUpload 
                  onFileSelect={(file) => setSelectedFile(file)} 
                  selectedFile={selectedFile}
                  onRemove={() => setSelectedFile(null)}
                />
              </div>
            )}

            {/* Optional Details - Shared across both tabs */}
            <div className="mt-6 border-t border-border pt-6">
              <h3 className="text-sm font-medium text-text-secondary mb-4">Optional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Select 
                  label="Procurement Category"
                  options={categoryOptions}
                />
                <Select 
                  label="Industry / Sector"
                  options={industryOptions}
                />
                <Input 
                  label="Intended Use"
                  placeholder="e.g., Urban distribution network"
                />
                <Select 
                  label="Language"
                  options={languageOptions}
                  defaultValue="en"
                />
              </div>
              <p className="mt-4 text-sm text-text-secondary italic">
                You can write your specification in natural language. Dr. Standards analyzes technical meaning, not just keywords.
              </p>
            </div>

            <div className="mt-8">
              <Button 
                variant="primary"
                className="w-full md:w-auto bg-olive-500 hover:bg-olive-600 text-white"
                onClick={handleStartAnalysis}
                disabled={activeTab === 'file' && !selectedFile}
              >
                <Sparkles className="w-4 h-4 mr-2" />
                {activeTab === 'text' ? 'Find Applicable Standards' : 'Analyze Document'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {viewState === 'processing' && (
        <div className="animate-in fade-in zoom-in-95 duration-500 pt-12">
          <Card className="max-w-lg mx-auto p-8 shadow-md">
            <h2 className="text-xl font-semibold text-text-primary mb-6 text-center">
              Analyzing your specification…
            </h2>
            <div className="py-4">
              <ProgressTimeline steps={currentSteps} />
            </div>
          </Card>
          <p className="text-sm text-text-secondary text-center mt-6 max-w-lg mx-auto">
            Analysis may take a few moments depending on document complexity.
          </p>
        </div>
      )}
    </div>
  );
};

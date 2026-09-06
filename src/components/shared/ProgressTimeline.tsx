import React from 'react';
import { CheckCircle2, Circle } from 'lucide-react';
import type { AnalysisStep } from '../../types';

interface ProgressTimelineProps {
  steps: AnalysisStep[];
}

export const ProgressTimeline: React.FC<ProgressTimelineProps> = ({ steps }) => {
  return (
    <div className="flex flex-col space-y-4">
      {steps.map((step, index) => {
        const isLast = index === steps.length - 1;
        
        return (
          <div key={index} className="relative flex items-start">
            {!isLast && (
              <div 
                className="absolute left-3 top-7 bottom-[-16px] w-0.5 bg-gray-200" 
                aria-hidden="true"
              />
            )}
            <div className="relative flex items-center justify-center flex-shrink-0 w-6 h-6 mr-3">
              {step.status === 'completed' ? (
                <CheckCircle2 className="w-6 h-6 text-olive-500" />
              ) : step.status === 'active' ? (
                <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 border-olive-500">
                  <div className="w-2 h-2 rounded-full bg-olive-500 animate-pulse" />
                </div>
              ) : (
                <Circle className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className={`mt-0.5 ${
              step.status === 'completed' ? 'text-olive-700' :
              step.status === 'active' ? 'text-text-primary font-medium' :
              'text-text-secondary'
            }`}>
              {step.label}
            </div>
          </div>
        );
      })}
    </div>
  );
};

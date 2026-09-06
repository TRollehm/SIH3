import React from 'react';

interface RelevanceBadgeProps {
  score: number;
}

export const RelevanceBadge: React.FC<RelevanceBadgeProps> = ({ score }) => {
  let colorClasses = '';
  
  if (score >= 90) {
    colorClasses = 'bg-olive-500 text-white';
  } else if (score >= 75) {
    colorClasses = 'bg-olive-50 text-olive-700';
  } else if (score >= 60) {
    colorClasses = 'bg-amber-50 text-amber-700';
  } else {
    colorClasses = 'bg-gray-100 text-gray-600';
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClasses}`}>
      {score}% Match
    </span>
  );
};

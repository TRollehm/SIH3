import React from 'react';

interface StatusBadgeProps {
  status: 'Current' | 'Superseded' | 'Withdrawn';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  let bgClass = '';
  let textClass = '';
  let dotClass = '';

  switch (status) {
    case 'Current':
      bgClass = 'bg-olive-50';
      textClass = 'text-olive-700';
      dotClass = 'bg-olive-500';
      break;
    case 'Superseded':
      bgClass = 'bg-amber-50';
      textClass = 'text-amber-700';
      dotClass = 'bg-amber-500';
      break;
    case 'Withdrawn':
      bgClass = 'bg-red-50';
      textClass = 'text-red-700';
      dotClass = 'bg-red-500';
      break;
  }

  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${bgClass} ${textClass}`}>
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${dotClass}`} aria-hidden="true"></span>
      {status}
    </span>
  );
};

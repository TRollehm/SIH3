import type { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  icon?: ReactNode;
}

export const StatCard: React.FC<StatCardProps> = ({ value, label, icon }) => {
  return (
    <div className="bg-white rounded-lg border border-border p-4 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <div className="text-2xl font-semibold text-text-primary">{value}</div>
        {icon && <div className="text-olive-600">{icon}</div>}
      </div>
      <div className="mt-1 text-sm text-text-secondary">{label}</div>
    </div>
  );
};

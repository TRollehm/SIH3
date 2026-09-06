import React from 'react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface BadgeProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'size'> {
  variant?: 'default' | 'secondary' | 'success' | 'warning' | 'danger' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className, variant = 'default', size, ...props }, ref) => {
    const variants = {
      default: 'bg-olive-100 text-olive-700 border-transparent',
      secondary: 'bg-gray-100 text-gray-700 border-transparent',
      success: 'bg-green-100 text-green-700 border-transparent',
      warning: 'bg-amber-100 text-amber-700 border-transparent',
      danger: 'bg-red-100 text-red-700 border-transparent',
      outline: 'text-text-primary border-border bg-transparent',
    };

    return (
      <div
        ref={ref}
        className={cn(
          'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-olive-500 focus:ring-offset-2',
          variants[variant],
          className
        )}
        {...props}
      />
    );
  }
);

Badge.displayName = 'Badge';

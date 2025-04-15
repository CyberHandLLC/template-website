import React, { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface SectionHeadingProps {
  title: ReactNode;
  subtitle?: ReactNode;
  align?: 'left' | 'center' | 'right';
  className?: string;
  titleClassName?: string;
  subtitleClassName?: string;
}

/**
 * Reusable section heading with title and optional subtitle
 */
export function SectionHeading({
  title,
  subtitle,
  align = 'center',
  className = '',
  titleClassName = '',
  subtitleClassName = ''
}: SectionHeadingProps) {
  const alignmentClasses = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right'
  };

  return (
    <div className={cn('mb-8', alignmentClasses[align], className)}>
      <h2 className={cn('text-3xl sm:text-4xl font-bold text-sky-400', titleClassName)}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={cn('mt-4 text-lg text-gray-300', subtitleClassName)}>
          {subtitle}
        </p>
      )}
    </div>
  );
}

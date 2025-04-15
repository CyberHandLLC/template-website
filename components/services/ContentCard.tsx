import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type ContentCardProps = {
  children: ReactNode;
  className?: string;
};

export function ContentCard({ children, className }: ContentCardProps) {
  return (
    <div className={cn("mb-8 p-6 bg-white/10 backdrop-blur-sm rounded-lg shadow-lg", className)}>
      {children}
    </div>
  );
}

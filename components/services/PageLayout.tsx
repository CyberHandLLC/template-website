import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type PageLayoutProps = {
  children: ReactNode;
  title: ReactNode;
  subtitle?: ReactNode;
  className?: string;
};

export function PageLayout({ children, title, subtitle, className }: PageLayoutProps) {
  return (
    <div className="min-h-screen p-8">
      <div className={cn("max-w-5xl mx-auto", className)}>
        <h1 className="text-4xl font-bold mb-6 text-sky-400 text-center">{title}</h1>
        {subtitle && <p className="text-lg mb-6 text-center">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}

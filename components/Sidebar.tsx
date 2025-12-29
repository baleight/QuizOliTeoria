import React, { useEffect, useState } from 'react';
import { Question } from '../types';
import { ThemeToggle } from './ThemeToggle';

interface SidebarProps {
  questions: Question[];
  totalCount: number;
  onNavigate: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ questions, totalCount, onNavigate }) => {
  const [activeSlug, setActiveSlug] = useState<string>('');

  // Setup Intersection Observer to highlight active question
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSlug(entry.target.id);
          }
        });
      },
      { rootMargin: '-20% 0px -60% 0px' } 
    );

    questions.forEach((q) => {
      const el = document.getElementById(q.slug);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [questions]);

  return (
    <aside className="flex flex-col h-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border-r border-slate-200 dark:border-slate-800 shadow-xl lg:shadow-none">
      <div className="p-6 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-xl font-bold bg-gradient-to-r from-accent to-purple-600 bg-clip-text text-transparent">
            📚 Quiz Studio
          </h1>
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-2">
           <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-accent/10 text-accent dark:text-accent-light border border-accent/20">
            {totalCount} domande
          </span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="flex flex-col space-y-1">
          {questions.map((q) => (
            <a
              key={q.id}
              href={`#${q.slug}`}
              onClick={onNavigate}
              className={`
                block px-3 py-2 rounded-lg text-sm transition-all duration-200 truncate
                ${activeSlug === q.slug 
                  ? 'bg-accent/10 text-accent font-semibold translate-x-1 border-l-2 border-accent' 
                  : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200'
                }
              `}
              title={q.title}
            >
              <span className="opacity-50 mr-2 font-mono text-xs">{q.number}.</span>
              {q.title}
            </a>
          ))}
        </div>
      </nav>
      
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 text-xs text-center text-slate-400">
        Domande Sito OLI &copy; {new Date().getFullYear()}
      </div>
    </aside>
  );
};
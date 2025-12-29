import React from 'react';

interface ControlsBarProps {
  questionsOnly: boolean;
  onToggleQuestionsOnly: () => void;
  onExpandAll: () => void;
  onCollapseAll: () => void;
}

export const ControlsBar: React.FC<ControlsBarProps> = ({
  questionsOnly,
  onToggleQuestionsOnly,
  onExpandAll,
  onCollapseAll,
}) => {
  return (
    <div className="flex items-center gap-2 bg-white dark:bg-slate-800 p-1.5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm">
      <button
        onClick={onToggleQuestionsOnly}
        className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-all
          ${questionsOnly 
            ? 'bg-accent text-white shadow-md' 
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
          }
        `}
      >
        Solo domande
      </button>
      
      <div className="w-px h-4 bg-slate-200 dark:bg-slate-700 mx-1" />
      
      <button
        onClick={onExpandAll}
        disabled={questionsOnly}
        className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
      >
        Espandi tutte
      </button>
      
      <button
        onClick={onCollapseAll}
        className="px-3 py-1.5 text-xs font-medium rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
      >
        Chiudi tutte
      </button>
    </div>
  );
};
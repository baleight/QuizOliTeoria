import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import remarkGfm from 'remark-gfm';
import rehypeKatex from 'rehype-katex';
import { Question } from '../types';

interface QuestionCardProps {
  question: Question;
  questionsOnly: boolean;
  expandSignal: number;
  collapseSignal: number;
}

export const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  questionsOnly, 
  expandSignal, 
  collapseSignal 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showToast, setShowToast] = useState(false);

  // Handle global signals
  useEffect(() => {
    if (questionsOnly) setIsOpen(false);
  }, [questionsOnly]);

  useEffect(() => {
    if (expandSignal > 0 && !questionsOnly) setIsOpen(true);
  }, [expandSignal, questionsOnly]);

  useEffect(() => {
    if (collapseSignal > 0) setIsOpen(false);
  }, [collapseSignal]);

  const handleCopyLink = () => {
    const url = `${window.location.origin}${window.location.pathname}#${question.slug}`;
    navigator.clipboard.writeText(url);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const katexOptions = {
    strict: false,
    trust: true,
    output: 'html' // Forces HTML output to avoid MathML duplication issues
  };

  // Custom components for Markdown to ensure numbering and tables look good
  const markdownComponents = {
    // Force ordered lists to show numbers (decimal)
    ol: ({node, ...props}: any) => (
      <ol className="list-decimal list-outside ml-5 space-y-2 marker:font-bold marker:text-slate-600 dark:marker:text-slate-400" {...props} />
    ),
    // Add spacing to list items
    li: ({node, ...props}: any) => (
      <li className="pl-2" {...props} />
    ),
    // Handle tables with overflow wrapper
    table: ({node, ...props}: any) => (
      <div className="overflow-x-auto my-6 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700" {...props} />
      </div>
    )
  };

  return (
    <article 
      id={question.slug} 
      className="group relative bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 hover:shadow-lg dark:hover:shadow-slate-900/50 hover:-translate-y-0.5 transition-all duration-300 overflow-hidden"
    >
      {/* Header */}
      <header className="px-6 py-5 border-b border-slate-100 dark:border-slate-700/50 flex gap-4 items-start bg-slate-50/50 dark:bg-slate-800/50">
        <span className="flex-shrink-0 flex items-center justify-center px-3 py-1.5 rounded-lg bg-accent/10 text-accent dark:text-accent-light font-mono text-sm font-bold mt-0.5 whitespace-nowrap">
          Domanda {question.number}
        </span>
        
        <div className="flex-1">
          <h3 className="text-lg font-serif font-bold text-slate-900 dark:text-slate-100 leading-snug">
             <ReactMarkdown 
               remarkPlugins={[remarkMath, remarkGfm]} 
               rehypePlugins={[[rehypeKatex, katexOptions]]}
               disallowedElements={['p']}
               unwrapDisallowed={true}
             >
               {question.title}
             </ReactMarkdown>
          </h3>
        </div>

        <button 
          onClick={handleCopyLink}
          className="flex-shrink-0 p-2 text-slate-400 hover:text-accent hover:bg-accent/10 rounded-full transition-colors relative"
          title="Copia link diretto"
        >
          🔗
          {showToast && (
            <span className="absolute -top-8 -right-2 bg-slate-800 text-white text-xs py-1 px-2 rounded shadow-lg whitespace-nowrap animate-fade-in-up">
              Link copiato!
            </span>
          )}
        </button>
      </header>
      
      {/* Question Content */}
      <div className="px-6 py-6 prose prose-slate dark:prose-invert max-w-none prose-p:leading-relaxed prose-headings:font-serif prose-li:marker:text-slate-400 dark:prose-li:marker:text-slate-600">
        <ReactMarkdown 
          remarkPlugins={[remarkMath, remarkGfm]} 
          rehypePlugins={[[rehypeKatex, katexOptions]]}
          components={markdownComponents}
        >
          {question.rawQuestion}
        </ReactMarkdown>
      </div>

      {/* Solution Section */}
      {question.rawSolution && (
        <div className="border-t border-slate-100 dark:border-slate-700/50">
          {!isOpen ? (
            <button
              onClick={() => !questionsOnly && setIsOpen(true)}
              disabled={questionsOnly}
              className={`w-full px-6 py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors
                ${questionsOnly 
                  ? 'bg-slate-100 dark:bg-slate-900/50 text-slate-400 cursor-not-allowed'
                  : 'bg-slate-50 dark:bg-slate-800/80 text-accent hover:bg-accent/5'
                }
              `}
            >
              {questionsOnly ? 'Soluzioni nascoste' : 'Mostra soluzione'}
            </button>
          ) : (
            <div className="animate-in slide-in-from-top-2 duration-300">
              <div className="px-6 py-6 bg-slate-50/80 dark:bg-slate-800/80 border-t border-slate-200 dark:border-slate-700">
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-accent dark:text-accent-light uppercase tracking-wider flex items-center gap-2">
                    <span>📝</span> Soluzione e Spiegazione
                  </h4>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 text-xs underline"
                  >
                    Nascondi
                  </button>
                </div>
                <div className="prose prose-sm prose-slate dark:prose-invert max-w-none prose-p:text-slate-700 dark:prose-p:text-slate-300">
                  <ReactMarkdown 
                    remarkPlugins={[remarkMath, remarkGfm]} 
                    rehypePlugins={[[rehypeKatex, katexOptions]]}
                    components={{
                        ...markdownComponents,
                        table: ({node, ...props}: any) => (
                        <div className="overflow-x-auto my-4 border border-slate-300 dark:border-slate-600 rounded">
                          <table className="min-w-full divide-y divide-slate-300 dark:divide-slate-600" {...props} />
                        </div>
                      )
                    }}
                  >
                    {question.rawSolution}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </article>
  );
};
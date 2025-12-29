import React, { useState, useEffect, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { QuestionCard } from './components/QuestionCard';
import { ControlsBar } from './components/ControlsBar';
import { SearchBar } from './components/SearchBar';
import { parseQuestions } from './lib/parser';
import { SAMPLE_MARKDOWN } from './data/questions';
import { Question } from './types';

const App: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [filteredQuestions, setFilteredQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [questionsOnly, setQuestionsOnly] = useState(false);
  const [expandAllSignal, setExpandAllSignal] = useState<number>(0);
  const [collapseAllSignal, setCollapseAllSignal] = useState<number>(0);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Initial Data Load
  useEffect(() => {
    const loadData = async () => {
      // Simulate async parsing
      const { questions: parsedQuestions } = parseQuestions(SAMPLE_MARKDOWN);
      setQuestions(parsedQuestions);
      setFilteredQuestions(parsedQuestions);
      setLoading(false);
    };
    loadData();
  }, []);

  // Filter Logic
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredQuestions(questions);
      return;
    }

    const normalizedQuery = searchQuery.toLowerCase().trim();
    const filtered = questions.filter(q => {
      const searchable = [
        q.title,
        q.rawQuestion,
        q.rawSolution
      ].join(' ').toLowerCase();
      return searchable.includes(normalizedQuery);
    });
    setFilteredQuestions(filtered);
  }, [searchQuery, questions]);

  // Handle Hash Navigation on Load
  useEffect(() => {
    if (!loading && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
      }
    }
  }, [loading]);

  const handleToggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div className="flex min-h-screen relative font-sans">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-[300px] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:h-screen lg:shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <Sidebar 
          questions={questions} 
          totalCount={questions.length} 
          onNavigate={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 py-8 lg:px-12">
        <div className="flex flex-col gap-8">
          
          {/* Header & Controls */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 sticky top-0 z-30 bg-primary-50/90 dark:bg-primary-900/90 backdrop-blur-md py-4 -mx-4 px-4 border-b border-primary-200 dark:border-primary-800 lg:static lg:bg-transparent lg:border-none lg:p-0">
            <div className="flex items-center gap-4 lg:hidden">
              <button 
                onClick={handleToggleSidebar}
                className="p-2 rounded-lg bg-accent text-white shadow-lg shadow-accent/30 hover:bg-accent-hover transition-colors"
              >
                ☰
              </button>
              <h1 className="text-lg font-bold">Quiz OLI</h1>
            </div>

            <div className="w-full md:w-auto flex-1 md:max-w-md">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>

            <ControlsBar 
              questionsOnly={questionsOnly}
              onToggleQuestionsOnly={() => setQuestionsOnly(prev => !prev)}
              onExpandAll={() => setExpandAllSignal(Date.now())}
              onCollapseAll={() => setCollapseAllSignal(Date.now())}
            />
          </header>

          {/* Questions List */}
          <div className="flex flex-col gap-6 pb-20">
            {loading ? (
              <div className="text-center py-20 text-slate-500 animate-pulse">
                Caricamento domande...
              </div>
            ) : filteredQuestions.length === 0 ? (
              <div className="text-center py-20 text-slate-500">
                Nessuna domanda trovata per "{searchQuery}"
              </div>
            ) : (
              filteredQuestions.map(q => (
                <QuestionCard 
                  key={q.id}
                  question={q}
                  questionsOnly={questionsOnly}
                  expandSignal={expandAllSignal}
                  collapseSignal={collapseAllSignal}
                />
              ))
            )}
          </div>
        </div>
      </main>

      {/* Mobile Menu Toggle (Fixed bottom right for ease of access if needed, but header button is better) */}
    </div>
  );
};

export default App;
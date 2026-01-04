
import React, { useState, useEffect } from 'react';
import ProblemDescription from '../components/Playground/ProblemDescription';
import CodeEditor from '../components/Playground/CodeEditor';
import { ChevronRight, List, Columns, Loader2, Search } from 'lucide-react';
import { Problem } from '../types';
import { api } from '../services/api';

const Playground: React.FC = () => {
  const [problems, setProblems] = useState<Problem[]>([]);
  const [selectedProblemId, setSelectedProblemId] = useState<string | null>(null);
  const [language, setLanguage] = useState('javascript');
  const [isListExpanded, setIsListExpanded] = useState(true);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const loadProblems = async () => {
      setLoading(true);
      try {
        const data = await api.problems.list();
        setProblems(data);
        if (data.length > 0) {
          const firstId = data[0].id || (data[0] as any)._id;
          setSelectedProblemId(firstId);
        }
      } catch (err) {
        console.error("Failed to load problems:", err);
      } finally {
        setLoading(false);
      }
    };
    loadProblems();
  }, []);

  const filteredProblems = problems.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const activeProblem = problems.find(p => (p.id || (p as any)._id) === selectedProblemId);

  const handleRun = (code: string) => {
    // In a real startup, this would send code to a Lambda/Sandbox
    console.log("Running code:", code);
  };

  const handleSubmit = async (code: string) => {
    if (!selectedProblemId) return;
    try {
      await api.problems.submit(selectedProblemId, code);
      const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2013/2013-preview.mp3');
      audio.play().catch(() => {});
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="h-full flex flex-col items-center justify-center bg-gray-50">
        <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
        <p className="text-gray-500 font-medium animate-pulse">Initializing IDE Environment...</p>
      </div>
    );
  }

  return (
    <div className="h-full flex overflow-hidden">
      {/* Problem Sidebar */}
      <div className={`${isListExpanded ? 'w-80' : 'w-16'} bg-white border-r border-gray-200 flex flex-col transition-all duration-300 relative z-10 shadow-lg`}>
        <div className="h-14 flex items-center justify-between px-4 border-b border-gray-100 bg-gray-50/50">
          {isListExpanded && <span className="font-bold text-gray-800 uppercase tracking-widest text-[10px]">Challenge Explorer</span>}
          <button onClick={() => setIsListExpanded(!isListExpanded)} className="p-1.5 hover:bg-gray-200 rounded-md text-gray-600 transition-colors">
            {isListExpanded ? <List size={18} /> : <Columns size={18} />}
          </button>
        </div>

        {isListExpanded && (
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
              <input 
                type="text"
                placeholder="Find problem..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-gray-100 border-none rounded-lg text-xs outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto hide-scrollbar">
          {filteredProblems.map(p => {
            const id = p.id || (p as any)._id;
            const isActive = selectedProblemId === id;
            return (
              <button
                key={id}
                onClick={() => setSelectedProblemId(id)}
                className={`w-full text-left p-4 border-b border-gray-50 transition-all flex items-center justify-between group ${isActive ? 'bg-indigo-50 border-r-4 border-r-indigo-600' : 'hover:bg-gray-50'}`}
              >
                <div className="flex flex-col min-w-0">
                  {isListExpanded ? (
                    <>
                      <span className={`text-sm font-bold truncate ${isActive ? 'text-indigo-700' : 'text-gray-700'}`}>{p.title}</span>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className={`text-[9px] font-black uppercase ${p.difficulty === 'Easy' ? 'text-emerald-600' : p.difficulty === 'Medium' ? 'text-amber-600' : 'text-rose-600'}`}>{p.difficulty}</span>
                        <span className="text-[9px] text-gray-400 font-medium tracking-tight truncate max-w-[100px]">{p.category}</span>
                      </div>
                    </>
                  ) : (
                    <span className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-bold transition-all ${isActive ? 'bg-indigo-600 text-white shadow-md' : 'bg-gray-100 text-gray-400 group-hover:bg-gray-200'}`}>{id.toString().slice(-1)}</span>
                  )}
                </div>
                {isListExpanded && <ChevronRight size={14} className={`transition-transform ${isActive ? 'text-indigo-600 translate-x-1' : 'text-gray-300'}`} />}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 overflow-hidden bg-white">
        {activeProblem ? (
          <>
            <div className="overflow-hidden">
              <ProblemDescription problem={activeProblem} />
            </div>
            <div className="overflow-hidden border-l border-gray-200">
              <CodeEditor 
                problemTitle={activeProblem.title}
                initialCode={activeProblem.starterCode[language] || activeProblem.starterCode['javascript']} 
                language={language}
                onLanguageChange={setLanguage}
                onRun={handleRun}
                onSubmit={handleSubmit}
              />
            </div>
          </>
        ) : (
          <div className="col-span-2 flex flex-col items-center justify-center text-gray-400 space-y-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <Search size={48} className="text-gray-200" />
            </div>
            <p className="font-medium">Select a challenge from the list to begin</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Playground;

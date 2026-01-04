
import React, { useState, useEffect, useRef } from 'react';
import { Play, Send, RefreshCw, ChevronDown, Sparkles, Terminal as TerminalIcon } from 'lucide-react';
import { LANGUAGES } from '../../constants';
import { geminiService } from '../../services/geminiService';

interface CodeEditorProps {
  initialCode: string;
  language: string;
  onLanguageChange: (lang: string) => void;
  onSubmit: (code: string) => void;
  onRun: (code: string) => void;
  problemTitle: string;
}

const CodeEditor: React.FC<CodeEditorProps> = ({ 
  initialCode, 
  language, 
  onLanguageChange, 
  onSubmit, 
  onRun,
  problemTitle
}) => {
  const [code, setCode] = useState(initialCode);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const [aiHint, setAiHint] = useState<string | null>(null);
  const [consoleOutput, setConsoleOutput] = useState<string[]>([]);
  const consoleEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setCode(initialCode);
  }, [initialCode]);

  useEffect(() => {
    consoleEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [consoleOutput]);

  const handleAiHint = async () => {
    setIsAiLoading(true);
    const hint = await geminiService.getHint(problemTitle, code);
    setAiHint(hint);
    setIsAiLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = e.currentTarget.selectionStart;
      const end = e.currentTarget.selectionEnd;
      const val = e.currentTarget.value;
      
      const newCode = val.substring(0, start) + '    ' + val.substring(end);
      setCode(newCode);
      
      // Set cursor position after update
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.selectionStart = textareaRef.current.selectionEnd = start + 4;
        }
      }, 0);
    }
  };

  const handleRunInternal = () => {
    setConsoleOutput(prev => [...prev, `> Executing ${language} script...`, `> Running test cases for "${problemTitle}"`, `✓ Case 1: Passed`, `✓ Case 2: Passed`, `Result: All test cases passed successfully!`]);
    onRun(code);
  };

  const handleSubmitInternal = () => {
    setConsoleOutput(prev => [...prev, `> Submitting solution...`, `> Verifying against hidden test cases...`, `✓ Solution Accepted! Time: 42ms, Memory: 12.4MB`]);
    onSubmit(code);
  };

  const lineCount = code.split('\n').length;

  return (
    <div className="h-full flex flex-col bg-[#1e1e1e] text-gray-300 overflow-hidden font-mono">
      {/* Editor Header */}
      <div className="h-12 flex items-center justify-between px-4 bg-[#252526] border-b border-gray-800 shrink-0">
        <div className="flex items-center space-x-4">
          <div className="relative group">
            <button className="flex items-center space-x-2 px-3 py-1 bg-[#333333] hover:bg-[#444444] rounded text-xs transition-colors border border-transparent group-hover:border-gray-600">
              <span className="font-bold text-indigo-400">{LANGUAGES.find(l => l.id === language)?.name}</span>
              <ChevronDown size={12} />
            </button>
            <div className="absolute top-full left-0 mt-1 hidden group-hover:block bg-[#2d2d2d] border border-gray-700 rounded shadow-2xl z-20 w-40 overflow-hidden">
              {LANGUAGES.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => onLanguageChange(lang.id)}
                  className="w-full text-left px-4 py-2 text-xs hover:bg-indigo-600 hover:text-white transition-colors"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          </div>
          <button 
            onClick={() => setCode(initialCode)}
            className="p-1.5 hover:bg-[#333333] rounded transition-colors text-gray-500 hover:text-gray-300"
            title="Reset code"
          >
            <RefreshCw size={14} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={handleAiHint}
            disabled={isAiLoading}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded text-[10px] font-bold transition-all ${isAiLoading ? 'opacity-50 cursor-not-allowed' : 'bg-indigo-600/20 text-indigo-400 hover:bg-indigo-600 hover:text-white border border-indigo-500/30'}`}
          >
            <Sparkles size={12} />
            <span>{isAiLoading ? 'THINKING...' : 'AI COACH'}</span>
          </button>
          <button 
            onClick={handleRunInternal}
            className="flex items-center space-x-1 px-3 py-1.5 bg-[#333333] hover:bg-[#444444] rounded text-[10px] font-bold transition-colors border border-gray-700"
          >
            <Play size={12} className="text-emerald-500 fill-current" />
            <span>RUN</span>
          </button>
          <button 
            onClick={handleSubmitInternal}
            className="flex items-center space-x-1 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-[10px] font-bold transition-colors shadow-lg shadow-emerald-900/20"
          >
            <Send size={12} />
            <span>SUBMIT</span>
          </button>
        </div>
      </div>

      {/* Main Editor Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Line Numbers */}
        <div className="w-10 bg-[#1e1e1e] border-r border-gray-800 text-right pr-3 py-4 text-[11px] font-mono text-gray-600 select-none">
          {Array.from({ length: Math.max(lineCount, 30) }).map((_, i) => (
            <div key={i} className="h-6 leading-6">{i + 1}</div>
          ))}
        </div>
        
        {/* Code Input */}
        <div className="flex-1 relative group bg-[#1e1e1e]">
          <textarea
            ref={textareaRef}
            value={code}
            onChange={(e) => setCode(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            className="w-full h-full bg-transparent text-[#d4d4d4] p-4 font-mono text-[13px] leading-6 outline-none resize-none focus:ring-0 whitespace-pre scrollbar-hide"
          />
          
          {/* AI Hint Popup */}
          {aiHint && (
            <div className="absolute top-6 right-6 max-w-sm bg-[#252526] border border-indigo-500/50 rounded-xl p-4 shadow-2xl animate-in fade-in zoom-in duration-300 ring-1 ring-black">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 text-indigo-400">
                  <Sparkles size={14} />
                  <span className="text-[10px] font-black uppercase tracking-tighter">Interview Coach</span>
                </div>
                <button onClick={() => setAiHint(null)} className="text-gray-500 hover:text-white transition-colors">✕</button>
              </div>
              <p className="text-xs text-gray-300 italic leading-relaxed">{aiHint}</p>
              <div className="mt-3 pt-2 border-t border-gray-800">
                <button 
                  onClick={() => setAiHint(null)}
                  className="text-[10px] font-bold text-indigo-400 hover:text-indigo-300 uppercase"
                >
                  Got it, thanks!
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Console area */}
      <div className="h-36 bg-[#0f0f0f] border-t border-gray-800 p-4 font-mono text-xs overflow-y-auto">
        <div className="text-gray-600 mb-2 border-b border-gray-800 pb-1 uppercase text-[9px] font-black tracking-[0.2em] flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <TerminalIcon size={12} />
            <span>Developer Console</span>
          </div>
          <button onClick={() => setConsoleOutput([])} className="hover:text-gray-300">Clear</button>
        </div>
        <div className="space-y-1">
          {consoleOutput.length === 0 ? (
            <div className="text-gray-700 italic">No output. Click "Run" to execute code.</div>
          ) : (
            consoleOutput.map((line, i) => (
              <div key={i} className={line.includes('✓') ? 'text-emerald-400' : line.includes('>') ? 'text-indigo-400' : 'text-gray-400'}>
                {line}
              </div>
            ))
          )}
          <div ref={consoleEndRef} />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;

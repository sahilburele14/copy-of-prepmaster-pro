
import React, { useState } from 'react';
import { MCQQuestion as MCQType } from '../../types';
import { CheckCircle2, XCircle, ChevronRight, Info, Sparkles, Loader2 } from 'lucide-react';
import { geminiService } from '../../services/geminiService';

interface MCQQuestionProps {
  question: MCQType;
  index: number;
  onNext?: () => void;
}

const MCQQuestion: React.FC<MCQQuestionProps> = ({ question, index, onNext }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [loadingAi, setLoadingAi] = useState(false);

  const handleOptionSelect = (idx: number) => {
    if (isAnswered) return;
    setSelectedOption(idx);
    setIsAnswered(true);
  };

  const fetchAiExplanation = async () => {
    setLoadingAi(true);
    try {
      const explanation = await geminiService.getExplanation(
        question.question, 
        question.options[question.correctAnswer]
      );
      setAiExplanation(explanation);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingAi(false);
    }
  };

  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md max-w-4xl mx-auto w-full mb-8">
      <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">Question {index + 1}</span>
        <div className="flex space-x-2">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-rose-400"></div>
        </div>
      </div>
      
      <div className="p-6 md:p-8">
        <h2 className="text-xl font-medium text-gray-900 mb-8 leading-relaxed">
          {question.question}
        </h2>

        <div className="space-y-3">
          {question.options.map((option, idx) => {
            let stateClass = 'border-gray-200 hover:border-indigo-400 hover:bg-indigo-50';
            let icon = null;

            if (isAnswered) {
              if (idx === question.correctAnswer) {
                stateClass = 'border-emerald-500 bg-emerald-50 text-emerald-900 ring-1 ring-emerald-500';
                icon = <CheckCircle2 size={20} className="text-emerald-500" />;
              } else if (idx === selectedOption) {
                stateClass = 'border-rose-500 bg-rose-50 text-rose-900 ring-1 ring-rose-500';
                icon = <XCircle size={20} className="text-rose-500" />;
              } else {
                stateClass = 'border-gray-200 opacity-60';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleOptionSelect(idx)}
                disabled={isAnswered}
                className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all group ${stateClass}`}
              >
                <div className="flex items-center space-x-4">
                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold text-sm shrink-0 transition-colors ${isAnswered ? 'invisible' : 'group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600 border-gray-300 text-gray-500'}`}>
                    {String.fromCharCode(65 + idx)}
                  </div>
                  <span className="text-lg">{option}</span>
                </div>
                {icon}
              </button>
            );
          })}
        </div>

        {isAnswered && (
          <div className="mt-8 animate-in fade-in slide-in-from-top-4 duration-500">
            <div className={`p-5 rounded-xl border ${isCorrect ? 'bg-emerald-50 border-emerald-200' : 'bg-rose-50 border-rose-200'} mb-6`}>
              <div className="flex items-start space-x-3">
                <Info size={20} className={isCorrect ? 'text-emerald-600' : 'text-rose-600'} />
                <div className="flex-1">
                  <h4 className={`font-bold text-sm uppercase tracking-wider mb-1 ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                    Key Explanation
                  </h4>
                  <p className="text-gray-700 text-sm leading-relaxed">{question.explanation}</p>
                  
                  {aiExplanation && (
                    <div className="mt-4 pt-4 border-t border-indigo-100">
                      <div className="flex items-center space-x-2 text-indigo-600 mb-1">
                        <Sparkles size={14} />
                        <span className="text-[10px] font-black uppercase tracking-widest">AI Deep Dive</span>
                      </div>
                      <p className="text-gray-600 text-xs italic leading-relaxed">{aiExplanation}</p>
                    </div>
                  )}

                  {!aiExplanation && (
                    <button 
                      onClick={fetchAiExplanation}
                      disabled={loadingAi}
                      className="mt-3 text-[10px] font-bold text-indigo-600 hover:text-indigo-800 flex items-center space-x-1 uppercase tracking-wider"
                    >
                      {loadingAi ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
                      <span>{loadingAi ? 'Thinking...' : 'Ask AI for deeper explanation'}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="flex justify-end">
              <button 
                onClick={() => {
                  setSelectedOption(null);
                  setIsAnswered(false);
                  setAiExplanation(null);
                  onNext?.();
                }}
                className="flex items-center space-x-2 px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-semibold transition-all shadow-md active:scale-95"
              >
                <span>Continue</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MCQQuestion;

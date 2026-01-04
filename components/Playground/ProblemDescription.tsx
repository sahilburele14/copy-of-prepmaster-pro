
import React from 'react';
import { Problem } from '../../types';
import { CheckCircle2, AlertCircle } from 'lucide-react';

interface ProblemDescriptionProps {
  problem: Problem;
}

const ProblemDescription: React.FC<ProblemDescriptionProps> = ({ problem }) => {
  const difficultyColor = {
    'Easy': 'text-emerald-600 bg-emerald-50',
    'Medium': 'text-amber-600 bg-amber-50',
    'Hard': 'text-rose-600 bg-rose-50'
  }[problem.difficulty];

  return (
    <div className="h-full overflow-y-auto p-6 bg-white border-r border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-900">{problem.id}. {problem.title}</h1>
      </div>
      
      <div className="flex items-center space-x-3 mb-6">
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${difficultyColor}`}>
          {problem.difficulty}
        </span>
        <span className="text-gray-400 text-xs px-2.5 py-0.5 bg-gray-100 rounded-full">
          {problem.category}
        </span>
      </div>

      <div className="prose prose-sm max-w-none text-gray-700 leading-relaxed mb-8">
        <p>{problem.description}</p>
      </div>

      <div className="space-y-6">
        {problem.examples.map((example, index) => (
          <div key={index} className="space-y-2">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Example {index + 1}</h3>
            <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 font-mono text-sm">
              <div className="flex mb-1">
                <span className="text-gray-400 w-16 select-none">Input:</span>
                <span className="text-gray-800">{example.input}</span>
              </div>
              <div className="flex mb-1">
                <span className="text-gray-400 w-16 select-none">Output:</span>
                <span className="text-gray-800">{example.output}</span>
              </div>
              {example.explanation && (
                <div className="flex mt-2 pt-2 border-t border-gray-200 italic text-gray-500">
                  <span className="w-16">Explain:</span>
                  <span>{example.explanation}</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider flex items-center space-x-2">
          <AlertCircle size={16} className="text-gray-400" />
          <span>Constraints</span>
        </h3>
        <ul className="space-y-2">
          {problem.constraints.map((constraint, index) => (
            <li key={index} className="flex items-start space-x-2 text-sm text-gray-600 bg-gray-50 p-2 rounded border-l-4 border-gray-300">
              <span className="font-mono">{constraint}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProblemDescription;

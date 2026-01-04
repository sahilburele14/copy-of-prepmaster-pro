
import React, { useState, useEffect } from 'react';
import { TOPICS } from '../constants';
import MCQQuestion from '../components/MCQ/MCQQuestion';
import { Search, Filter, BookOpen, Trophy, ArrowLeft, Loader2 } from 'lucide-react';
import { MCQQuestion as MCQType } from '../types';
import { api } from '../services/api';

const MCQHub: React.FC = () => {
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<MCQType[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (selectedTopicId) {
      const loadMCQs = async () => {
        setLoading(true);
        try {
          const data = await api.mcqs.listByTopic(selectedTopicId);
          setQuestions(data);
          setCurrentQuestionIndex(0);
        } catch (err) {
          console.error("Error loading MCQs:", err);
        } finally {
          setLoading(false);
        }
      };
      loadMCQs();
    }
  }, [selectedTopicId]);

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("Topic completed! Returning to topics list.");
      setSelectedTopicId(null);
      setCurrentQuestionIndex(0);
      setQuestions([]);
    }
  };

  if (selectedTopicId) {
    const topic = TOPICS.find(t => t.id === selectedTopicId);
    
    if (loading) {
      return (
        <div className="h-full flex flex-col items-center justify-center bg-gray-50">
          <Loader2 className="animate-spin text-indigo-600 mb-4" size={48} />
          <p className="text-gray-500 font-medium animate-pulse">Fetching {topic?.name} questions...</p>
        </div>
      );
    }

    return (
      <div className="h-full bg-gray-50 overflow-y-auto pb-20">
        <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-gray-200 z-10 px-6 py-4 mb-8">
          <div className="max-w-4xl mx-auto flex items-center justify-between">
            <button 
              onClick={() => setSelectedTopicId(null)}
              className="flex items-center space-x-2 text-gray-500 hover:text-indigo-600 transition-colors"
            >
              <ArrowLeft size={20} />
              <span className="font-medium">Back to Topics</span>
            </button>
            <div className="flex flex-col items-center">
              <h2 className="text-lg font-bold text-gray-900">{topic?.name}</h2>
              <p className="text-xs text-gray-500 font-semibold tracking-widest uppercase">
                {questions.length > 0 ? `Question ${currentQuestionIndex + 1} of ${questions.length}` : 'No questions found'}
              </p>
            </div>
            <div className="w-10 h-10 rounded-full bg-indigo-50 border border-indigo-100 flex items-center justify-center text-indigo-700 font-bold">
              {questions.length > 0 ? Math.round(((currentQuestionIndex) / questions.length) * 100) : 0}%
            </div>
          </div>
          {questions.length > 0 && (
            <div className="max-w-4xl mx-auto h-1 bg-gray-100 mt-4 rounded-full overflow-hidden">
              <div 
                className="h-full bg-indigo-600 transition-all duration-500 ease-out"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          )}
        </div>

        <div className="px-6">
          {questions.length > 0 ? (
            <MCQQuestion 
              question={questions[currentQuestionIndex]} 
              index={currentQuestionIndex}
              onNext={handleNext}
            />
          ) : (
            <div className="max-w-4xl mx-auto text-center py-20 bg-white rounded-3xl border border-dashed border-gray-300">
              <BookOpen size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-bold text-gray-900">No questions available yet</h3>
              <p className="text-gray-500 mt-2">We are currently adding content to this topic. Check back soon!</p>
              <button 
                onClick={() => setSelectedTopicId(null)}
                className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-xl font-bold"
              >
                Explore other topics
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  const filteredTopics = TOPICS.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-8 max-w-7xl mx-auto overflow-y-auto h-full pb-24">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Topic-wise MCQs</h1>
          <p className="text-gray-500 mt-2">Strengthen your concepts with handpicked questions from IndiaBIX database.</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Search topics..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 bg-white border border-gray-200 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl text-sm outline-none w-64 shadow-sm transition-all"
            />
          </div>
          <button className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm">
            <Filter size={20} className="text-gray-500" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredTopics.map((topic) => (
          <div 
            key={topic.id}
            onClick={() => {
              setSelectedTopicId(topic.id);
            }}
            className="group bg-white p-6 rounded-2xl border border-gray-200 hover:border-indigo-500 hover:shadow-xl hover:shadow-indigo-50 transition-all cursor-pointer flex flex-col items-center text-center relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Trophy size={20} className="text-amber-500" />
            </div>
            <div className="w-16 h-16 bg-gray-50 rounded-2xl flex items-center justify-center text-4xl mb-4 transition-transform group-hover:scale-110 group-hover:bg-indigo-50 duration-300">
              {topic.icon}
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">{topic.name}</h3>
            <p className="text-sm text-gray-500 font-medium mb-6">{topic.count} Questions</p>
            <button className="w-full py-2.5 bg-gray-900 text-white rounded-xl font-bold opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg shadow-gray-200">
              Start Practice
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MCQHub;

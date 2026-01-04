
import React from 'react';
import { Target, Code2, BookOpen, Trophy, Clock, ArrowRight } from 'lucide-react';

interface DashboardProps {
  onStartCoding: () => void;
  onStartMCQ: () => void;
}

const Dashboard: React.FC<DashboardProps> = ({ onStartCoding, onStartMCQ }) => {
  const stats = [
    { label: 'Problems Solved', value: '24', icon: <Target className="text-indigo-600" />, sub: 'Top 15%' },
    { label: 'MCQ Accuracy', value: '88%', icon: <BookOpen className="text-emerald-600" />, sub: '+5% last week' },
    { label: 'Coding Points', value: '1,240', icon: <Code2 className="text-amber-600" />, sub: 'Gold Badge' },
    { label: 'Rank', value: '#432', icon: <Trophy className="text-rose-600" />, sub: 'of 12k users' },
  ];

  return (
    <div className="p-8 max-w-7xl mx-auto overflow-y-auto h-full">
      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900">Welcome back, Jayant!</h1>
        <p className="text-gray-500 mt-1">Ready to ace your next technical interview?</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 transition-transform hover:-translate-y-1">
            <div className="flex items-start justify-between mb-4">
              <div className="p-2 bg-gray-50 rounded-lg">{stat.icon}</div>
              <span className="text-xs font-bold text-gray-400 uppercase">{stat.label}</span>
            </div>
            <div className="flex items-baseline space-x-2">
              <span className="text-3xl font-bold text-gray-900">{stat.value}</span>
              <span className="text-xs text-gray-500 font-medium">{stat.sub}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-gradient-to-br from-indigo-600 to-violet-700 rounded-3xl p-8 text-white relative overflow-hidden shadow-xl shadow-indigo-200">
            <div className="relative z-10">
              <h2 className="text-2xl font-bold mb-4">Ready for a coding challenge?</h2>
              <p className="text-indigo-100 mb-8 max-w-md">Practice data structures and algorithms with our integrated playground. Mock interviews starting every hour.</p>
              <button 
                onClick={onStartCoding}
                className="bg-white text-indigo-700 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-colors flex items-center space-x-2"
              >
                <span>Go to Playground</span>
                <ArrowRight size={18} />
              </button>
            </div>
            <div className="absolute right-[-40px] bottom-[-40px] opacity-10">
              <Code2 size={240} />
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-xl font-bold text-gray-900">Recommended Topics</h3>
              <button className="text-indigo-600 font-semibold text-sm hover:underline">View all</button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Dynamic Programming', count: '12 new', color: 'bg-emerald-500' },
                { title: 'System Design', count: '5 new', color: 'bg-indigo-500' },
                { title: 'Operating Systems', count: '24 new', color: 'bg-amber-500' },
                { title: 'Microservices', count: '8 new', color: 'bg-rose-500' },
              ].map((topic, i) => (
                <div key={i} className="flex items-center space-x-4 p-4 rounded-2xl bg-gray-50 border border-gray-100 hover:border-indigo-200 transition-colors cursor-pointer group">
                  <div className={`w-3 h-3 rounded-full ${topic.color}`}></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-gray-900 text-sm group-hover:text-indigo-600 transition-colors">{topic.title}</h4>
                    <p className="text-xs text-gray-500">{topic.count} questions</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-indigo-400" />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-8">
          <div className="bg-white rounded-3xl border border-gray-200 p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center space-x-2">
              <Clock size={20} className="text-gray-400" />
              <span>Recent Activity</span>
            </h3>
            <div className="space-y-6">
              {[
                { type: 'Solved Problem', name: 'Two Sum', time: '2 hours ago', icon: <Target size={14} className="text-emerald-600" />, bg: 'bg-emerald-50' },
                { type: 'Quiz Finished', name: 'Java Basics', time: '5 hours ago', icon: <BookOpen size={14} className="text-indigo-600" />, bg: 'bg-indigo-50' },
                { type: 'Solved Problem', name: 'Merge Lists', time: 'Yesterday', icon: <Target size={14} className="text-emerald-600" />, bg: 'bg-emerald-50' },
              ].map((activity, i) => (
                <div key={i} className="flex items-start space-x-4">
                  <div className={`p-2 rounded-lg ${activity.bg}`}>{activity.icon}</div>
                  <div>
                    <h5 className="font-bold text-gray-900 text-sm">{activity.name}</h5>
                    <p className="text-xs text-gray-500">{activity.type} • {activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="w-full mt-8 py-3 rounded-xl border border-gray-200 text-sm font-bold text-gray-600 hover:bg-gray-50 transition-colors">
              Full Activity History
            </button>
          </div>

          <div className="bg-amber-50 rounded-3xl border border-amber-100 p-8 border-dashed">
            <h3 className="text-lg font-bold text-amber-900 mb-2">Practice Mode</h3>
            <p className="text-amber-700 text-sm mb-6">Test your speed with aptitude questions from IndiaBIX database.</p>
            <button 
              onClick={onStartMCQ}
              className="w-full py-3 bg-amber-600 text-white rounded-xl font-bold hover:bg-amber-700 transition-colors shadow-lg shadow-amber-200"
            >
              Start MCQ Session
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

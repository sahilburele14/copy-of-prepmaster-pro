
import React from 'react';
import { Search, Bell, User, LayoutGrid, Terminal } from 'lucide-react';

interface NavbarProps {
  onNavigate: (page: 'dashboard' | 'playground' | 'mcq') => void;
  activePage: string;
}

const Navbar: React.FC<NavbarProps> = ({ onNavigate, activePage }) => {
  return (
    <nav className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-8">
        <div 
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => onNavigate('dashboard')}
        >
          <div className="bg-indigo-600 p-1.5 rounded-lg text-white">
            <Terminal size={20} />
          </div>
          <span className="text-xl font-bold tracking-tight text-gray-900">PrepMaster<span className="text-indigo-600">Pro</span></span>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <button 
            onClick={() => onNavigate('dashboard')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'dashboard' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Dashboard
          </button>
          <button 
            onClick={() => onNavigate('playground')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'playground' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            Playground
          </button>
          <button 
            onClick={() => onNavigate('mcq')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activePage === 'mcq' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-600 hover:bg-gray-50'}`}
          >
            MCQs
          </button>
        </div>
      </div>

      <div className="flex items-center space-x-4">
        <div className="relative hidden lg:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search problems..." 
            className="pl-10 pr-4 py-1.5 bg-gray-100 border-transparent focus:bg-white focus:border-indigo-500 rounded-full text-sm outline-none w-64 transition-all"
          />
        </div>
        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-full">
          <Bell size={20} />
        </button>
        <button className="flex items-center space-x-2 p-1 hover:bg-gray-100 rounded-full border border-gray-200">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            JD
          </div>
          <User size={18} className="text-gray-500 mr-1" />
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

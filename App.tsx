
import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import Playground from './pages/Playground';
import MCQHub from './pages/MCQHub';
import Login from './pages/Login';
import { AuthState, User } from './types';
import { api } from './services/api';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'playground' | 'mcq'>('dashboard');
  const [auth, setAuth] = useState<AuthState>({
    user: null,
    token: localStorage.getItem('auth_token'),
    isAuthenticated: false
  });
  const [isRegistering, setIsRegistering] = useState(false);

  // Simple auth check on load
  useEffect(() => {
    if (auth.token && !auth.user) {
      // In a real app, fetch /me profile
      setAuth(prev => ({ ...prev, isAuthenticated: true, user: { id: '1', name: 'Jayant', email: 'jayant@dev.com', solvedProblems: [], points: 1200 } }));
    }
  }, [auth.token]);

  const handleLogin = async (credentials: any) => {
    // API Call: const data = await api.auth.login(credentials);
    const mockToken = 'jwt_token_xyz';
    localStorage.setItem('auth_token', mockToken);
    setAuth({
      token: mockToken,
      isAuthenticated: true,
      user: { id: '1', name: 'Jayant Dev', email: credentials.email, solvedProblems: [], points: 1250 }
    });
  };

  const handleLogout = () => {
    localStorage.removeItem('auth_token');
    setAuth({ user: null, token: null, isAuthenticated: false });
  };

  if (!auth.isAuthenticated) {
    return <Login onLogin={handleLogin} onSwitchToRegister={() => setIsRegistering(true)} />;
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
      <Navbar 
        onNavigate={setCurrentPage} 
        activePage={currentPage} 
      />
      
      <main className="flex-1 overflow-hidden relative">
        <div className={`absolute inset-0 transition-all duration-300 transform ${currentPage === 'dashboard' ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0 pointer-events-none'}`}>
          <Dashboard onStartCoding={() => setCurrentPage('playground')} onStartMCQ={() => setCurrentPage('mcq')} />
        </div>

        <div className={`absolute inset-0 transition-all duration-300 transform ${currentPage === 'playground' ? 'translate-x-0 opacity-100' : (currentPage === 'dashboard' ? 'translate-x-full' : '-translate-x-full') + ' opacity-0 pointer-events-none'}`}>
          <Playground />
        </div>

        <div className={`absolute inset-0 transition-all duration-300 transform ${currentPage === 'mcq' ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0 pointer-events-none'}`}>
          <MCQHub />
        </div>
      </main>
      
      <footer className="h-8 bg-white border-t border-gray-200 flex items-center justify-between px-6 text-[10px] font-bold text-gray-400 uppercase tracking-widest z-50">
        <div className="flex items-center space-x-4">
          <span className="flex items-center space-x-1">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
            <span>API Online</span>
          </span>
          <span>v2.0.0-fullstack</span>
        </div>
        <div className="flex items-center space-x-4">
          <button onClick={handleLogout} className="hover:text-red-500 transition-colors">Sign Out</button>
          <span>Connected as <span className="text-indigo-600">{auth.user?.name}</span></span>
        </div>
      </footer>
    </div>
  );
};

export default App;

'use client';

import ActionButtons from '@/components/ActionButtons';
import AdminPanel from '@/components/AdminPanel';
import { AuthProvider, useAuth } from '@/components/AuthContext';
import Header from '@/components/Header';
import Loading from '@/components/Loading';
import UserProfile from '@/components/UserProfile';
import UserStats from '@/components/UserStats';
import { initializeTelegramWebApp } from '@/utils/telegram';
import { useEffect, useState } from 'react';

// Main app component
const AppContent = () => {
  const { user, loading, error, login, joinChannel } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [token, setToken] = useState<string>('');

  // Handle Telegram WebApp initialization
  useEffect(() => {
    // Simulate a short loading screen first
    const timer = setTimeout(() => {
      setIsLoading(false);

      // Initialize Telegram WebApp features
      initializeTelegramWebApp();

      // Check if we're in Telegram WebApp environment
      if (window.Telegram?.WebApp) {
        const initData = window.Telegram.WebApp.initData;

        if (initData) {
          login(initData);
        }
      } else {
        // For development/testing outside of Telegram
        console.log('Not running in Telegram WebApp environment');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [login]);

  // Update token when user changes
  useEffect(() => {
    if (user) {
      const storedToken = localStorage.getItem('token');
      if (storedToken) {
        setToken(storedToken);
        // Verify token validity
        fetch('/api/user', {
          headers: {
            'Authorization': `Bearer ${storedToken}`
          }
        }).catch(() => {
          localStorage.removeItem('token');
          setToken('');
        });
      }
    }
  }, [user]);

  const handleJoinChannel = async () => {
    if (user?.isAdmin) {
      setShowAdminPanel(true);
    } else {
      await joinChannel();
    }
  };

  if (isLoading) {
    return <Loading onLoadComplete={() => setIsLoading(false)} />;
  }

  if (loading && !user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading user data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center p-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-6 text-center max-w-md">
          <svg className="w-12 h-12 text-red-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-red-400 text-lg font-medium">Error</p>
          <p className="text-gray-300 mt-2">{error}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black flex justify-center items-center p-4">
        <div className="bg-gray-800/50 border border-gray-600/30 rounded-2xl p-6 text-center max-w-md backdrop-blur-sm">
          <svg className="w-12 h-12 text-gray-400 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <p className="text-white text-lg font-medium">Not authorized</p>
          <p className="text-gray-400 mt-2">Please access this app through Telegram</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 80px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 50px)"
      }}>
      
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black/80 to-transparent backdrop-blur-sm pt-[env(safe-area-inset-top, 0px)]">
        <Header user={user} />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-2xl mx-auto px-4 space-y-6">
        {/* User Profile Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <UserProfile user={user} />
        </div>

        {/* User Stats Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 overflow-hidden">
          <UserStats user={user} />
        </div>

        {/* Action Buttons Card */}
        <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-700/50 p-6">
          <ActionButtons user={user} onJoinChannel={handleJoinChannel} isAdmin={user.isAdmin} />
        </div>
      </div>

      {/* Admin Panel Modal */}
      {showAdminPanel && (
        <AdminPanel
          token={token}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
};

// Page component wrapped with AuthProvider
export default function Home() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
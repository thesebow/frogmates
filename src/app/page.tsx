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
    return <div className="p-4 flex justify-center items-center min-h-screen bg-black text-white">Loading user data...</div>;
  }

  if (error) {
    return <div className="p-4 flex justify-center items-center min-h-screen bg-black text-white">Error: {error}</div>;
  }

  if (!user) {
    return <div className="p-4 flex justify-center items-center min-h-screen bg-black text-white">Not authorized</div>;
  }

  return (
    <div className="relative min-h-screen text-white"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 80px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 50px)"
      }}>
      <div className="fixed top-0 left-0 right-0 z-10 bg-gradient-to-b from-black to-transparent pt-[env(safe-area-inset-top, 0px)]">
        <Header user={user} />
      </div>
      <div className="max-w-2xl mx-auto space-y-8">
        <div className="bg-[#1C1C1E]/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <UserProfile user={user} />
        </div>
        <div className="bg-[#1C1C1E]/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <UserStats user={user} />
        </div>
        <div className="bg-[#1C1C1E]/80 backdrop-blur-md rounded-2xl p-6 shadow-xl">
          <ActionButtons user={user} onJoinChannel={handleJoinChannel} isAdmin={user.isAdmin} />
        </div>
      </div>

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
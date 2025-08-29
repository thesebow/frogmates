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
      const storedToken = localStorage.getItem('token') || '';
      setToken(storedToken);
      console.log('Token updated:', storedToken);
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
    <div className="bg-black min-h-screen text-white pb-6 px-4"
      style={{
        paddingTop: "calc(env(safe-area-inset-top, 0px) + 100px)",
        paddingBottom: "calc(env(safe-area-inset-bottom, 0px) + 50px)"
      }}>
      <Header user={user} />
      <div className="mt-4">
        <UserProfile user={user} />
      </div>
      <div className="mt-6">
        <UserStats user={user} />
      </div>
      <div className="mt-4">
        <ActionButtons user={user} onJoinChannel={handleJoinChannel} isAdmin={user.isAdmin} />
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
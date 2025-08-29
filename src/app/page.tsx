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
    <div className="bg-black min-h-screen p-4 text-white">
      <Header user={user} />
      <UserProfile user={user} />
      <UserStats user={user} />
      <ActionButtons user={user} onJoinChannel={handleJoinChannel} isAdmin={user.isAdmin} />

      {showAdminPanel && (
        <AdminPanel
          token={localStorage.getItem('token') || ''}
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

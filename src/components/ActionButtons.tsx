'use client';

import { UserData } from '@/types';
import { getReferralLink } from '@/utils';
import { useState } from 'react';

interface ActionButtonsProps {
  user: UserData;
  onJoinChannel: () => Promise<void>;
  isAdmin: boolean;
}

const ActionButtons = ({ user, onJoinChannel, isAdmin }: ActionButtonsProps) => {
  const [showCopiedMessage, setShowCopiedMessage] = useState(false);

  const copyReferralLink = () => {
    const link = getReferralLink(user.specialId);
    navigator.clipboard.writeText(link);
    setShowCopiedMessage(true);
    setTimeout(() => setShowCopiedMessage(false), 2000);
  };

  const shareReferralLink = () => {
    const link = getReferralLink(user.specialId);

    // Use Telegram WebApp functionality if available
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup({
        title: 'Share referral link',
        message: 'Invite friends using your referral link:',
        buttons: [
          { type: 'default', text: 'Copy Link', id: 'copy' },
          { type: 'close', text: 'Close' }
        ]
      }, (buttonId) => {
        if (buttonId === 'copy') {
          navigator.clipboard.writeText(link);
        }
      });
    } else {
      // Fallback for when Telegram WebApp is not available
      navigator.share({
        title: 'Join Frogmates',
        text: 'Join Frogmates using my referral link!',
        url: link
      }).catch(() => {
        navigator.clipboard.writeText(link);
        alert('Link copied to clipboard!');
      });
    }
  };

  return (
    <div className="space-y-4">
      {/* Invite Friends Button */}
      <div className="relative">
        <button
          onClick={shareReferralLink}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
            </svg>
            <span>Invite friends</span>
          </div>
        </button>

        {/* Copy Button */}
        <button
          onClick={copyReferralLink}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm text-white p-3 rounded-xl transition-all duration-300 border border-white/20"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>

          {/* Copied Message */}
          {showCopiedMessage && (
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-3 py-2 rounded-lg text-sm font-medium shadow-lg">
              <div className="flex items-center space-x-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Copied!</span>
              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-green-500"></div>
            </div>
          )}
        </button>
      </div>

      {/* Admin Dashboard / Join Community Button */}
      <button
        onClick={onJoinChannel}
        className={`w-full py-4 px-6 rounded-2xl font-bold text-lg transition-all duration-300 transform hover:scale-[1.02] ${isAdmin
            ? 'bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white shadow-lg hover:shadow-xl'
            : user.joinedChannel
              ? 'bg-gray-800/50 text-gray-400 border border-gray-600/30'
              : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white shadow-lg hover:shadow-xl'
          }`}
        disabled={user.joinedChannel && !isAdmin}
      >
        <div className="flex items-center justify-center space-x-3">
          {isAdmin ? (
            <>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span>Admin Dashboard</span>
            </>
          ) : user.joinedChannel ? (
            <>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Already Joined</span>
            </>
          ) : (
            <>
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>Join the community</span>
            </>
          )}
        </div>
      </button>

      {/* Test Admin Panel Button (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <button
          onClick={onJoinChannel}
          className="w-full py-3 px-6 rounded-2xl font-bold text-lg bg-gradient-to-r from-red-500 to-orange-600 hover:from-red-600 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02]"
        >
          <div className="flex items-center justify-center space-x-3">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span>Test Admin Panel (Dev)</span>
          </div>
        </button>
      )}

      {/* Referral Link Display */}
      <div className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-4 rounded-2xl border border-gray-600/30">
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <p className="text-gray-400 text-sm font-medium mb-1">Your Referral Link</p>
            <p className="text-white text-sm font-mono break-all">{getReferralLink(user.specialId)}</p>
          </div>
          <button
            onClick={copyReferralLink}
            className="ml-3 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 p-2 rounded-xl transition-all duration-300 border border-blue-500/30"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionButtons;
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
    <div className="space-y-3">
      <div className="flex space-x-2">
        <button
          onClick={shareReferralLink}
          className="flex-1 bg-white text-black py-3 px-4 rounded-lg font-bold"
        >
          Invite friends
        </button>
        <button
          onClick={copyReferralLink}
          className="bg-white text-black p-3 rounded-lg relative"
        >
          <div
            className="w-6 h-6 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/o7tt3XjoxmayWSzO48DYVowPaprsK1GmIk4VwZBFUJFm5JggPj.svg)' }}
          />
          {showCopiedMessage && (
            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded px-2 py-1">
              <p className="text-white text-xs">Copied!</p>
            </div>
          )}
        </button>
      </div>

      <button
        onClick={onJoinChannel}
        className={`w-full py-3 px-4 rounded-lg font-bold ${user.joinedChannel ? 'bg-[#2C2C2E] text-gray-400' : 'bg-[#2C2C2E] text-white'}`}
        disabled={user.joinedChannel}
      >
        {isAdmin ? 'Admin dashboard' : 'Join the community'}
      </button>
    </div>
  );
};

export default ActionButtons;
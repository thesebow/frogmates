'use client';

import { UserData } from '@/types';

interface HeaderProps {
  user: UserData;
}

const Header = ({ user }: HeaderProps) => {
  const handleStarsClick = () => {
    // Show "Coming Soon" message
    if (window.Telegram?.WebApp?.showPopup) {
      window.Telegram.WebApp.showPopup({
        title: 'Coming Soon',
        message: 'This feature will be available soon!',
        buttons: [{ type: 'close', text: 'Close' }]
      });
    } else {
      alert('Coming soon!');
    }
  };

  return (
    <div className="flex justify-between items-center p-4" 
         style={{ marginTop: 'env(safe-area-inset-top)' }}>
      
      {/* Referrals Badge */}
      <div className="bg-gradient-to-r from-blue-500/20 to-blue-600/20 backdrop-blur-sm py-3 px-4 rounded-2xl border border-blue-500/30 flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-blue-300 text-xs font-medium">Friends</p>
          <p className="text-white text-lg font-bold">{user.referrals}</p>
        </div>
      </div>

      {/* Stars Badge */}
      <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 backdrop-blur-sm py-3 px-4 rounded-2xl border border-yellow-500/30 flex items-center space-x-2">
        <div className="w-6 h-6 bg-gradient-to-br from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center">
          <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
        <div className="text-center">
          <p className="text-yellow-300 text-xs font-medium">Stars</p>
          <p className="text-white text-lg font-bold">{user.stars}</p>
        </div>
        <button 
          onClick={handleStarsClick}
          className="ml-2 w-6 h-6 bg-gradient-to-br from-purple-500/20 to-pink-500/20 hover:from-purple-500/30 hover:to-pink-500/30 rounded-lg flex items-center justify-center transition-all duration-300 border border-purple-500/30"
        >
          <svg className="w-3 h-3 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Header;
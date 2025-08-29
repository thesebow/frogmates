'use client';

import { UserData } from '@/types';

interface HeaderProps {
  user: UserData;
}

const Header = ({ user }: HeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6 px-2">
      <div className="flex items-center space-x-2 bg-[#2C2C2E] py-2 px-3 rounded-full">
        <div
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/zjPOE4sHJEZEGjuzvP5sW5mPpdjKNKCV1FUwa2nGsrNb7kktLX.svg)' }}
        />
        <span className="text-white text-sm font-medium">{user.referrals}</span>
      </div>

      <div className="flex items-center space-x-2 bg-[#2C2C2E] py-2 px-3 rounded-full">
        <div
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/VedHPcXTgTncZvsQYysQb9X0qC6u710ZrJMffmc0bnHnVlzXGV.svg)' }}
        />
        <span className="text-white text-sm font-medium">{user.stars}</span>
        <button>
          <div
            className="w-5 h-5 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/6cBM92TnbC6jtw1pFTgeV9nu4cP2mvLUgKx8KVBbe1LRInBeMY.svg)' }}
            onClick={() => {
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
            }}
          />
        </button>
      </div>
    </div>
  );
};

export default Header;
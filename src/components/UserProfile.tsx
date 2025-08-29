'use client';

import { UserData } from '@/types';
import TonConnectUI from './TonConnectUI';

interface UserProfileProps {
  user: UserData;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center mb-6">
      <div className="relative mb-2">
        <img 
          src={user.photoUrl || 'https://via.placeholder.com/80'} 
          alt={user.firstName} 
          className="w-20 h-20 rounded-full object-cover border-2 border-gray-800"
        />
        {user.isAdmin && (
          <div 
            className="absolute top-0 right-0 w-6 h-6 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/eGxI16XtAJ02UUoYKrL1SThPpSjmFImAHiKAXfG8ueqMLlj7Yr.svg)' }}
          />
        )}
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-70 rounded-full px-2 py-1 text-xs">
          <span className="text-white font-medium">ID {user.specialId}</span>
        </div>
      </div>
      
      <div className="flex items-center space-x-1 mb-4 mt-4">
        <h1 className="text-white text-xl font-bold">{user.firstName}</h1>
        {user.isVerified && (
          <div 
            className="w-5 h-5 bg-no-repeat bg-center bg-contain"
            style={{ backgroundImage: 'url(https://cdn.frogmates.suno.uz/uploads/frogmates/home-page/dpZi3RW1x3aVmnJP7lkjoDusBp0RLTxTTcozpDhEoZ6aH84z4n.svg)' }}
          />
        )}
      </div>
      
      <TonConnectUI />
    </div>
  );
};

export default UserProfile;
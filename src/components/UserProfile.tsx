'use client';

import { UserData } from '@/types';
import TonConnectUI from './TonConnectUI';

interface UserProfileProps {
  user: UserData;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-6">
      <div className="relative">
        {user.photoUrl ? (
          <img
            src={user.photoUrl}
            alt={user.firstName}
            className="w-24 h-24 rounded-full ring-4 ring-blue-500/20 shadow-xl"
          />
        ) : (
          <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-bold shadow-xl">
            {user.firstName.charAt(0)}
          </div>
        )}
        <div className="absolute -bottom-2 -right-2 flex space-x-1">
          {user.isVerified && (
            <span className="bg-blue-500 text-white p-1.5 rounded-full shadow-lg">
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </span>
          )}
          {user.isPremium && (
            <span className="bg-yellow-500 text-white p-1.5 rounded-full shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </span>
          )}
          {user.isAdmin && (
            <span className="bg-purple-500 text-white p-1.5 rounded-full shadow-lg">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 2a1 1 0 00-.707.293l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4A1 1 0 0010 2zm0 2.414l2.586 2.586L10 9.586 7.414 7 10 4.414zM4 11a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </div>
      </div>
      <div className="text-center sm:text-left">
        <h2 className="text-2xl font-bold tracking-tight">{user.firstName} {user.lastName || ''}</h2>
        <p className="text-blue-400 font-medium">@{user.username || 'no_username'}</p>
        <p className="text-gray-400 text-sm mt-1">ID: {user.specialId}</p>
      </div>
    </div>
  );
  );
};

export default UserProfile;
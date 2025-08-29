'use client';

import { UserData } from '@/types';

interface UserProfileProps {
  user: UserData;
}

const UserProfile = ({ user }: UserProfileProps) => {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-3xl"></div>
      
      <div className="relative flex flex-col items-center sm:flex-row sm:items-start space-y-6 sm:space-y-0 sm:space-x-8 p-8">
        {/* Profile Picture */}
        <div className="relative">
          <div className="relative">
            {user.photoUrl ? (
              <img
                src={user.photoUrl}
                alt={user.firstName}
                className="w-28 h-28 rounded-3xl ring-4 ring-blue-500/30 shadow-2xl object-cover"
              />
            ) : (
              <div className="w-28 h-28 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-600 rounded-3xl flex items-center justify-center text-4xl font-bold text-white shadow-2xl">
                {user.firstName.charAt(0)}
              </div>
            )}
            
            {/* Status badges */}
            <div className="absolute -bottom-2 -right-2 flex space-x-2">
              {user.isVerified && (
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white p-2 rounded-xl shadow-lg border-2 border-white/20">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              )}
              {user.isPremium && (
                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white p-2 rounded-xl shadow-lg border-2 border-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              )}
              {user.isAdmin && (
                <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white p-2 rounded-xl shadow-lg border-2 border-white/20">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 2a1 1 0 00-.707.293l-4 4a1 1 0 000 1.414l4 4a1 1 0 001.414 0l4-4a1 1 0 000-1.414l-4-4A1 1 0 0010 2zm0 2.414l2.586 2.586L10 9.586 7.414 7 10 4.414zM4 11a1 1 0 100 2h12a1 1 0 100-2H4z" clipRule="evenodd" />
                  </svg>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="text-center sm:text-left flex-1">
          <div className="mb-4">
            <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-2">
              {user.firstName} {user.lastName || ''}
            </h2>
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-3">
              <span className="text-blue-400 font-semibold text-lg">@{user.username || 'no_username'}</span>
              <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
              <span className="text-gray-400 font-medium">ID: {user.specialId}</span>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gradient-to-r from-blue-500/10 to-blue-600/10 backdrop-blur-sm p-4 rounded-2xl border border-blue-500/20">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-blue-300 text-sm font-medium">Referrals</span>
              </div>
              <p className="text-white text-2xl font-bold">{user.referrals}</p>
            </div>
            
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 backdrop-blur-sm p-4 rounded-2xl border border-yellow-500/20">
              <div className="flex items-center space-x-2 mb-1">
                <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-300 text-sm font-medium">Stars</span>
              </div>
              <p className="text-white text-2xl font-bold">{user.stars}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
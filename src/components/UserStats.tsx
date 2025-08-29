'use client';

import { UserData } from '@/types';

interface UserStatsProps {
  user: UserData;
}

const UserStats = ({ user }: UserStatsProps) => {
  return (
    <div className="relative">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-blue-500/5 to-purple-500/5 rounded-3xl"></div>
      
      <div className="relative p-8">
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-white mb-3 flex items-center space-x-2">
            <svg className="w-6 h-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>Earning from friends</span>
          </h2>
          <p className="text-gray-300 text-lg leading-relaxed">
            Earn bonuses <span className="text-green-400 font-semibold">for each friend you invite</span> and a{' '}
            <span className="text-blue-400 font-semibold">share</span> of their earnings.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm rounded-2xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-400/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-blue-600 opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
                <span className="text-blue-300 text-sm font-medium">My Friends</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.referrals}</p>
            </div>
            <div className="absolute bottom-3 right-3 text-blue-500/20 group-hover:text-blue-500/30 transition-colors">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-sm rounded-2xl p-6 border border-yellow-500/20 relative overflow-hidden group hover:border-yellow-400/40 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity" />
            <div className="relative z-10">
              <div className="flex items-center space-x-2 mb-3">
                <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span className="text-yellow-300 text-sm font-medium">Total Earned</span>
              </div>
              <p className="text-3xl font-bold text-white">{user.stars}</p>
            </div>
            <div className="absolute bottom-3 right-3 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors">
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <span className="text-gray-300 text-sm font-medium">Referral Progress</span>
            <span className="text-blue-400 text-sm font-medium">{user.referrals}/10 friends</span>
          </div>
          <div className="w-full bg-gray-800/50 rounded-full h-3 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full transition-all duration-500"
              style={{ width: `${Math.min((user.referrals / 10) * 100, 100)}%` }}
            ></div>
          </div>
        </div>

        {/* Friends List */}
        <div className="space-y-4 max-h-[300px] overflow-y-auto">
          {user.referredUsers && user.referredUsers.length > 0 ? (
            user.referredUsers.map((friend, index) => (
              <div key={friend.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm rounded-2xl p-4 border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                <div className="flex items-center space-x-4">
                  <div className="relative">
                    {friend.photoUrl ? (
                      <img 
                        src={friend.photoUrl} 
                        alt={friend.firstName} 
                        className="w-12 h-12 rounded-2xl object-cover border-2 border-gray-600/30" 
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold border-2 border-gray-600/30">
                        {friend.firstName.charAt(0)}
                      </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-500 rounded-full border-2 border-gray-800 flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-white font-semibold">{friend.firstName} {friend.lastName || ''}</p>
                      <div className="flex items-center space-x-1 bg-green-500/20 text-green-400 px-2 py-1 rounded-lg">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                        <span className="text-xs font-medium">+5</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-700/50 rounded-full h-2 overflow-hidden">
                      <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-full rounded-full" style={{ width: '30%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-3xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <p className="text-gray-400 text-lg font-medium mb-2">No friends invited yet</p>
              <p className="text-gray-500 text-sm">Share your referral link to earn stars!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserStats;
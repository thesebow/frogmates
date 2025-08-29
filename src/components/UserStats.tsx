'use client';

import { UserData } from '@/types';

interface UserStatsProps {
  user: UserData;
}

const UserStats = ({ user }: UserStatsProps) => {
  return (
    <div className="bg-[#1C1C1E] rounded-lg p-6 mb-4">
      <h2 className="text-white text-xl font-bold mb-2">Earning from friends</h2>
      <p className="text-gray-400 mb-4">
        Earn bonuses <span className="text-white font-medium">for each friend you invite</span> and a{' '}
        <span className="text-white font-medium">share</span> of their earnings.
      </p>

      <div className="flex justify-between mb-6">
        <div className="bg-[#2C2C2E] px-4 py-2 rounded-lg">
          <p className="text-gray-400 text-sm">My friends: <span className="text-white">{user.referrals}</span></p>
        </div>
          return (
    <div className="grid grid-cols-2 gap-6">
      <div className="bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-xl p-6 border border-blue-500/20 relative overflow-hidden group hover:border-blue-500/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-500 opacity-0 group-hover:opacity-5 transition-opacity" />
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium mb-2">Total Referrals</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            {user.referrals}
          </p>
        </div>
        <div className="absolute bottom-3 right-3 text-blue-500/20 group-hover:text-blue-500/30 transition-colors">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
      <div className="bg-gradient-to-br from-yellow-500/10 to-orange-500/10 rounded-xl p-6 border border-yellow-500/20 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
        <div className="absolute inset-0 bg-gradient-to-br from-yellow-500 to-orange-500 opacity-0 group-hover:opacity-5 transition-opacity" />
        <div className="relative z-10">
          <p className="text-gray-400 text-sm font-medium mb-2">Total Stars</p>
          <p className="text-3xl font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
            {user.stars}
          </p>
        </div>
        <div className="absolute bottom-3 right-3 text-yellow-500/20 group-hover:text-yellow-500/30 transition-colors">
          <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </div>
      </div>
    </div>
  );
      </div>

      <div className="space-y-4 max-h-[200px] overflow-y-auto">
        {user.referredUsers && user.referredUsers.length > 0 ? (
          user.referredUsers.map((friend, index) => (
            <div key={friend.id} className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gray-700 rounded-full overflow-hidden flex-shrink-0">
                {friend.photoUrl ? (
                  <img src={friend.photoUrl} alt={friend.firstName} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white font-bold">
                    {friend.firstName.charAt(0)}
                  </div>
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-white text-sm font-medium">{friend.firstName} {friend.lastName || ''}</p>
                  <p className="text-green-400 text-xs font-medium">+5 ⭐</p>
                </div>
                <div className="h-2 bg-gray-700 rounded-full mt-1 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '30%' }}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center text-gray-400 py-2">
            No friends invited yet. Share your referral link to earn stars!
          </div>
        )}
      </div>
    </div>
  );
};

export default UserStats;
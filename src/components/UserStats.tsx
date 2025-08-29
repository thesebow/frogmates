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
        <div className="bg-[#2C2C2E] px-4 py-2 rounded-lg">
          <p className="text-gray-400 text-sm">Total earned: <span className="text-white">{user.stars}</span></p>
        </div>
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
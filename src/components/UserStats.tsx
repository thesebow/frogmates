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
      
      <div className="space-y-4">
        {Array.from({ length: Math.min(3, user.referrals || 1) }).map((_, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gray-600 rounded-full"></div>
            <div className="flex-1 h-4 bg-gray-700 rounded-lg"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserStats;
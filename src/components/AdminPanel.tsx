'use client';

import { UserData } from '@/types';
import { useEffect, useState } from 'react';

interface AdminPanelProps {
  token: string;
  onClose: () => void;
}

interface AdminStats {
  totalUsers: number;
  verifiedUsers: number;
  premiumUsers: number;
  blockedUsers: number;
  cheaters: number;
  bots: number;
  activeUsers: number;
  honestUsers: number;
}

const AdminPanel = ({ token, onClose }: AdminPanelProps) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Check if token exists
    if (!token || token.length === 0) {
      setError('No authentication token provided');
      setLoading(false);
      return;
    }

    fetchStats();
    fetchUsers();
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [filter, page, search]);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Try to parse the error for better debugging
        let errorMessage = `Failed to fetch admin stats: ${response.status} ${response.statusText}`;
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
            errorMessage += ` - ${errorData.error || errorText}`;
          } catch (e) {
            errorMessage += ` - ${errorText}`;
          }
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setStats(data.statistics);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch admin stats');
      console.error('Admin stats error:', error);
    }
  };

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await fetch(`/api/admin/users?page=${page}&filter=${filter}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        const errorText = await response.text();

        // Try to parse the error for better debugging
        let errorMessage = `Failed to fetch users: ${response.status} ${response.statusText}`;
        if (errorText) {
          try {
            const errorData = JSON.parse(errorText);
            errorMessage += ` - ${errorData.error || errorText}`;
          } catch (e) {
            errorMessage += ` - ${errorText}`;
          }
        }

        throw new Error(errorMessage);
      }

      const data = await response.json();
      setUsers(data.users);
      setTotalPages(data.pagination.pages);
    } catch (error: any) {
      setError(error.message || 'Failed to fetch users');
      console.error('Admin users error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId: string, action: string) => {
    try {
      const response = await fetch('/api/admin/user-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId, action }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform action');
      }

      // Refresh data
      fetchUsers();
      fetchStats();
    } catch (error: any) {
      setError(error.message || 'Failed to perform action');
      console.error('Admin action error:', error);
    }
  };

  const handleBulkAction = async (action: string) => {
    try {
      const response = await fetch('/api/admin/bulk-action', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error('Failed to perform bulk action');
      }

      // Refresh data
      fetchUsers();
      fetchStats();
    } catch (error: any) {
      setError(error.message || 'Failed to perform bulk action');
      console.error('Admin bulk action error:', error);
    }
  };

  if (!stats) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
        <div className="bg-[#1C1C1E] rounded-lg p-4 w-full max-w-lg mx-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-white text-xl font-bold">Admin Dashboard</h2>
            <button onClick={onClose} className="text-white">
              ✕
            </button>
          </div>
          <div className="flex flex-col items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white mb-4"></div>
            <p className="text-white">Loading admin data...</p>
            {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <div className="bg-[#1C1C1E] rounded-lg p-4 w-full max-h-[90vh] overflow-y-auto mx-4 my-2">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-[#1C1C1E] z-10 py-2">
          <h2 className="text-white text-xl font-bold">Admin Dashboard</h2>
          <button
            onClick={onClose}
            className="text-white bg-[#2C2C2E] h-8 w-8 rounded-full flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {error && (
          <div className="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-4">
            <p className="text-red-500">{error}</p>
          </div>
        )}

        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3">Statistics</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Total Users</p>
              <p className="text-white font-bold">{stats.totalUsers}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Active Users</p>
              <p className="text-white font-bold">{stats.activeUsers}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Premium Users</p>
              <p className="text-white font-bold">{stats.premiumUsers}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Verified Users</p>
              <p className="text-white font-bold">{stats.verifiedUsers}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Cheaters</p>
              <p className="text-white font-bold">{stats.cheaters}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Bots</p>
              <p className="text-white font-bold">{stats.bots}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Blocked Users</p>
              <p className="text-white font-bold">{stats.blockedUsers}</p>
            </div>
            <div className="bg-[#2C2C2E] p-3 rounded-lg">
              <p className="text-gray-400 text-sm">Honest Users</p>
              <p className="text-white font-bold">{stats.honestUsers}</p>
            </div>
          </div>
        </div>

        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3">Users</h3>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mb-4">
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="Search users..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-[#2C2C2E] text-white px-3 py-2 rounded-lg text-sm w-40 sm:w-60"
              />
              <select
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-[#2C2C2E] text-white px-3 py-2 rounded-lg text-sm"
              >
                <option value="all">All</option>
                <option value="premium">Premium</option>
                <option value="verified">Verified</option>
                <option value="blocked">Blocked</option>
                <option value="cheaters">Cheaters</option>
                <option value="bots">Bots</option>
                <option value="honest">Honest</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-white">Loading users...</p>
          ) : (
            <>
              <div className="space-y-4">
                {users.map((user) => (
                  <div key={user.id} className="bg-[#2C2C2E] p-3 rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        {user.photoUrl ? (
                          <img
                            src={user.photoUrl}
                            alt={user.firstName}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        ) : (
                          <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white">
                            {user.firstName.charAt(0)}
                          </div>
                        )}
                        <div>
                          <div className="flex items-center space-x-1">
                            <p className="text-white font-medium">{user.firstName} {user.lastName || ''}</p>
                            {user.isVerified && <span className="text-blue-500 text-xs">✓</span>}
                            {user.isPremium && <span className="text-yellow-500 text-xs">⭐</span>}
                            {user.isAdmin && <span className="text-purple-500 text-xs">👑</span>}
                          </div>
                          <p className="text-gray-400 text-xs">@{user.username || 'no_username'} • ID: {user.specialId}</p>
                          <p className="text-gray-400 text-xs">Referrals: {user.referrals} • Stars: {user.stars}</p>
                          {user.ipAddress && <p className="text-gray-400 text-xs">IP: {user.ipAddress}</p>}
                        </div>
                      </div>
                      <div className="flex items-center space-x-1">
                        {user.isBlocked ? (
                          <button
                            onClick={() => handleUserAction(user.id, 'unblock')}
                            className="bg-green-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Unblock
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(user.id, 'block')}
                            className="bg-red-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Block
                          </button>
                        )}

                        {user.isVerified ? (
                          <button
                            onClick={() => handleUserAction(user.id, 'unverify')}
                            className="bg-yellow-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Unverify
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(user.id, 'verify')}
                            className="bg-blue-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Verify
                          </button>
                        )}

                        {user.isCheater ? (
                          <button
                            onClick={() => handleUserAction(user.id, 'unmark-as-cheater')}
                            className="bg-green-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Not Cheater
                          </button>
                        ) : (
                          <button
                            onClick={() => handleUserAction(user.id, 'mark-as-cheater')}
                            className="bg-orange-500 text-white py-1 px-2 rounded text-xs"
                          >
                            Cheater
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {totalPages > 1 && (
                <div className="flex justify-center space-x-2 mt-4">
                  <button
                    onClick={() => setPage(page > 1 ? page - 1 : 1)}
                    className="bg-[#2C2C2E] text-white px-3 py-1 rounded"
                  >
                    Previous
                  </button>
                  <span className="text-white px-3 py-1">
                    Page {page} of {totalPages}
                  </span>
                  <button
                    onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                    className="bg-[#2C2C2E] text-white px-3 py-1 rounded"
                  >
                    Next
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        <div className="mb-6">
          <h3 className="text-white text-lg font-bold mb-3">Bulk Actions</h3>
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleBulkAction('verify-all')}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm"
            >
              Verify All
            </button>
            <button
              onClick={() => handleBulkAction('unverify-all')}
              className="bg-yellow-500 text-white px-3 py-1 rounded text-sm"
            >
              Unverify All
            </button>
            <button
              onClick={() => handleBulkAction('block-all')}
              className="bg-red-500 text-white px-3 py-1 rounded text-sm"
            >
              Block All
            </button>
            <button
              onClick={() => handleBulkAction('unblock-all')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              Unblock All
            </button>
            <button
              onClick={() => handleBulkAction('reset-referrals')}
              className="bg-purple-500 text-white px-3 py-1 rounded text-sm"
            >
              Reset All Referrals
            </button>
            <button
              onClick={() => handleBulkAction('reset-stars')}
              className="bg-indigo-500 text-white px-3 py-1 rounded text-sm"
            >
              Reset All Stars
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
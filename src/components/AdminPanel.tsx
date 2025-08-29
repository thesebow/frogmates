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
    if (!token || token.length === 0) {
      setError('Authentication token is missing. Please refresh the page.');
      setLoading(false);
      return;
    }

    fetchStats();
    fetchUsers();
  }, [token]);

  useEffect(() => {
    if (token) {
      fetchUsers();
    }
  }, [filter, page, search, token]);

  const fetchStats = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin/stats', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please refresh the page.');
        }
        throw new Error(`Failed to fetch stats: ${response.status}`);
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
      setError(null);

      const response = await fetch(`/api/admin/users?page=${page}&filter=${filter}&search=${search}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Authentication failed. Please refresh the page.');
        }
        throw new Error(`Failed to fetch users: ${response.status}`);
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

      fetchUsers();
      fetchStats();
    } catch (error: any) {
      setError(error.message || 'Failed to perform action');
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

      fetchUsers();
      fetchStats();
    } catch (error: any) {
      setError(error.message || 'Failed to perform bulk action');
    }
  };

  // Loading state with beautiful design
  if (loading || !stats) {
    return (
      <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl z-50 flex items-center justify-center">
        <div className="bg-gradient-to-br from-gray-900/90 to-gray-800/90 backdrop-blur-2xl rounded-3xl p-8 w-full max-w-md mx-4 shadow-2xl border border-gray-700/50">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Admin Dashboard
            </h2>
            <button
              onClick={onClose}
              className="bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 rounded-full p-3 backdrop-blur-sm border border-gray-600/30"
            >
              <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center py-12">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-blue-500/20 rounded-full animate-spin">
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-blue-500 rounded-full animate-spin"></div>
              </div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-purple-500/20 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-transparent border-t-purple-500 rounded-full animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
              </div>
            </div>

            <p className="text-gray-300 text-lg font-medium mb-2">Loading admin data...</p>
            <p className="text-gray-500 text-sm">Please wait while we fetch your dashboard</p>

            {error && (
              <div className="mt-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
                <div className="flex items-center space-x-2">
                  <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-400 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-black via-gray-900 to-black backdrop-blur-xl z-50 flex items-center justify-center p-4">
      <div className="bg-gradient-to-br from-gray-900/95 to-gray-800/95 backdrop-blur-2xl rounded-3xl w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl border border-gray-700/50">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-700/50 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-white text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Admin Dashboard
              </h2>
              <p className="text-gray-400 text-sm">Manage your community</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 rounded-xl p-3 backdrop-blur-sm border border-gray-600/30"
          >
            <svg className="w-6 h-6 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto max-h-[calc(95vh-80px)] p-6">
          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-2xl backdrop-blur-sm">
              <div className="flex items-center space-x-3">
                <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-red-400 font-medium">{error}</p>
              </div>
            </div>
          )}

          {/* Statistics Cards */}
          <div className="mb-8">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center space-x-2">
              <svg className="w-6 h-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <span>Statistics Overview</span>
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/10 backdrop-blur-sm p-6 rounded-2xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-blue-300 text-sm font-medium">Total Users</p>
                  <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <p className="text-white text-3xl font-bold">{stats.totalUsers.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-br from-green-500/10 to-green-600/10 backdrop-blur-sm p-6 rounded-2xl border border-green-500/20 hover:border-green-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-green-300 text-sm font-medium">Active Users</p>
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-white text-3xl font-bold">{stats.activeUsers.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/10 backdrop-blur-sm p-6 rounded-2xl border border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-purple-300 text-sm font-medium">Premium Users</p>
                  <svg className="w-5 h-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                  </svg>
                </div>
                <p className="text-white text-3xl font-bold">{stats.premiumUsers.toLocaleString()}</p>
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 backdrop-blur-sm p-6 rounded-2xl border border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-yellow-300 text-sm font-medium">Verified Users</p>
                  <svg className="w-5 h-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-white text-3xl font-bold">{stats.verifiedUsers.toLocaleString()}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
              <div className="bg-gradient-to-br from-red-500/10 to-red-600/10 backdrop-blur-sm p-4 rounded-2xl border border-red-500/20">
                <p className="text-red-300 text-sm font-medium mb-1">Blocked Users</p>
                <p className="text-white text-2xl font-bold">{stats.blockedUsers}</p>
              </div>
              <div className="bg-gradient-to-br from-orange-500/10 to-orange-600/10 backdrop-blur-sm p-4 rounded-2xl border border-orange-500/20">
                <p className="text-orange-300 text-sm font-medium mb-1">Cheaters</p>
                <p className="text-white text-2xl font-bold">{stats.cheaters}</p>
              </div>
              <div className="bg-gradient-to-br from-gray-500/10 to-gray-600/10 backdrop-blur-sm p-4 rounded-2xl border border-gray-500/20">
                <p className="text-gray-300 text-sm font-medium mb-1">Bots</p>
                <p className="text-white text-2xl font-bold">{stats.bots}</p>
              </div>
              <div className="bg-gradient-to-br from-emerald-500/10 to-emerald-600/10 backdrop-blur-sm p-4 rounded-2xl border border-emerald-500/20">
                <p className="text-emerald-300 text-sm font-medium mb-1">Honest Users</p>
                <p className="text-white text-2xl font-bold">{stats.honestUsers}</p>
              </div>
            </div>
          </div>

          {/* Users Section */}
          <div className="mb-8">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center space-x-2">
              <svg className="w-6 h-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span>User Management</span>
            </h3>

            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0 lg:space-x-4 mb-6">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 w-full lg:w-auto">
                <div className="relative">
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <input
                    type="text"
                    placeholder="Search users..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="bg-gray-800/50 text-white pl-10 pr-4 py-3 rounded-2xl text-sm w-full sm:w-80 border border-gray-600/30 focus:border-blue-500/50 focus:outline-none transition-all duration-300 backdrop-blur-sm"
                  />
                </div>
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="bg-gray-800/50 text-white px-4 py-3 rounded-2xl text-sm border border-gray-600/30 focus:border-blue-500/50 focus:outline-none transition-all duration-300 cursor-pointer backdrop-blur-sm"
                >
                  <option value="all">All Users</option>
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
              <div className="flex items-center justify-center py-12">
                <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <span className="ml-3 text-gray-400">Loading users...</span>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="bg-gradient-to-r from-gray-800/50 to-gray-700/50 backdrop-blur-sm p-6 rounded-2xl border border-gray-600/30 hover:border-gray-500/50 transition-all duration-300">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center space-x-4">
                          {user.photoUrl ? (
                            <img
                              src={user.photoUrl}
                              alt={user.firstName}
                              className="w-12 h-12 rounded-2xl object-cover border-2 border-gray-600/30"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center text-white font-bold text-lg border-2 border-gray-600/30">
                              {user.firstName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <div className="flex items-center space-x-2 mb-1">
                              <p className="text-white font-semibold text-lg">{user.firstName} {user.lastName || ''}</p>
                              {user.isVerified && (
                                <span className="bg-blue-500/20 text-blue-400 px-2 py-1 rounded-lg text-xs font-medium">
                                  ✓ Verified
                                </span>
                              )}
                              {user.isPremium && (
                                <span className="bg-yellow-500/20 text-yellow-400 px-2 py-1 rounded-lg text-xs font-medium">
                                  ⭐ Premium
                                </span>
                              )}
                              {user.isAdmin && (
                                <span className="bg-purple-500/20 text-purple-400 px-2 py-1 rounded-lg text-xs font-medium">
                                  👑 Admin
                                </span>
                              )}
                            </div>
                            <p className="text-gray-400 text-sm mb-1">@{user.username || 'no_username'} • ID: {user.specialId}</p>
                            <p className="text-gray-400 text-sm">Referrals: {user.referrals} • Stars: {user.stars}</p>
                            {user.ipAddress && <p className="text-gray-500 text-xs">IP: {user.ipAddress}</p>}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {user.isBlocked ? (
                            <button
                              onClick={() => handleUserAction(user.id, 'unblock')}
                              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-green-500/30"
                            >
                              Unblock
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user.id, 'block')}
                              className="bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-red-500/30"
                            >
                              Block
                            </button>
                          )}

                          {user.isVerified ? (
                            <button
                              onClick={() => handleUserAction(user.id, 'unverify')}
                              className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-yellow-500/30"
                            >
                              Unverify
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user.id, 'verify')}
                              className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-blue-500/30"
                            >
                              Verify
                            </button>
                          )}

                          {user.isCheater ? (
                            <button
                              onClick={() => handleUserAction(user.id, 'unmark-as-cheater')}
                              className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-green-500/30"
                            >
                              Not Cheater
                            </button>
                          ) : (
                            <button
                              onClick={() => handleUserAction(user.id, 'mark-as-cheater')}
                              className="bg-orange-500/20 text-orange-400 hover:bg-orange-500/30 transition-all duration-300 py-2 px-3 rounded-xl text-xs font-medium border border-orange-500/30"
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
                  <div className="flex justify-center space-x-2 mt-8">
                    <button
                      onClick={() => setPage(page > 1 ? page - 1 : 1)}
                      disabled={page === 1}
                      className="bg-gray-800/50 text-white px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30"
                    >
                      Previous
                    </button>
                    <span className="text-white px-4 py-2 bg-gray-800/50 rounded-xl border border-gray-600/30">
                      Page {page} of {totalPages}
                    </span>
                    <button
                      onClick={() => setPage(page < totalPages ? page + 1 : totalPages)}
                      disabled={page === totalPages}
                      className="bg-gray-800/50 text-white px-4 py-2 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-700/50 transition-all duration-300 border border-gray-600/30"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Bulk Actions */}
          <div className="mb-6">
            <h3 className="text-white text-xl font-bold mb-6 flex items-center space-x-2">
              <svg className="w-6 h-6 text-indigo-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              <span>Bulk Actions</span>
            </h3>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => handleBulkAction('verify-all')}
                className="bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-blue-500/30"
              >
                Verify All
              </button>
              <button
                onClick={() => handleBulkAction('unverify-all')}
                className="bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-yellow-500/30"
              >
                Unverify All
              </button>
              <button
                onClick={() => handleBulkAction('block-all')}
                className="bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-red-500/30"
              >
                Block All
              </button>
              <button
                onClick={() => handleBulkAction('unblock-all')}
                className="bg-green-500/20 text-green-400 hover:bg-green-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-green-500/30"
              >
                Unblock All
              </button>
              <button
                onClick={() => handleBulkAction('reset-referrals')}
                className="bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-purple-500/30"
              >
                Reset Referrals
              </button>
              <button
                onClick={() => handleBulkAction('reset-stars')}
                className="bg-indigo-500/20 text-indigo-400 hover:bg-indigo-500/30 transition-all duration-300 px-4 py-2 rounded-xl text-sm font-medium border border-indigo-500/30"
              >
                Reset Stars
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
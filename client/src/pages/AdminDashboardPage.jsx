import React, { useState, useEffect } from 'react';
import { adminService } from '../services';

const AdminDashboardPage = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [activeTab, setActiveTab] = useState('stats');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdminData();
  }, []);

  const fetchAdminData = async () => {
    try {
      setLoading(true);
      const [statsRes, usersRes, postsRes, donationsRes] = await Promise.all([
        adminService.getStats(),
        adminService.getUsers(),
        adminService.getPosts(),
        adminService.getDonations()
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data.users);
      setPosts(postsRes.data.posts);
      setDonations(donationsRes.data.donations);
    } catch (error) {
      console.error('Error fetching admin data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await adminService.deleteUser(userId);
        setUsers(users.filter(u => u._id !== userId));
      } catch (error) {
        alert('Error deleting user');
      }
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure?')) {
      try {
        await adminService.deletePost(postId);
        setPosts(posts.filter(p => p._id !== postId));
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

  if (loading) return <div className="container py-12 text-center">Loading...</div>;

  return (
    <div className="container py-12">
      <h1 className="section-title">Admin Dashboard</h1>

      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="card">
            <p className="text-gray-600 text-sm">Total Users</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalUsers}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Total Posts</p>
            <p className="text-3xl font-bold text-blue-600">{stats.totalPosts}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Total Donated</p>
            <p className="text-3xl font-bold text-blue-600">${stats.totalAmount}</p>
          </div>
          <div className="card">
            <p className="text-gray-600 text-sm">Completed</p>
            <p className="text-3xl font-bold text-blue-600">{stats.completedPosts}</p>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-b mb-8">
        <button
          onClick={() => setActiveTab('users')}
          className={`px-4 py-2 font-bold border-b-2 ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          Users ({users.length})
        </button>
        <button
          onClick={() => setActiveTab('posts')}
          className={`px-4 py-2 font-bold border-b-2 ${activeTab === 'posts' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          Posts ({posts.length})
        </button>
        <button
          onClick={() => setActiveTab('donations')}
          className={`px-4 py-2 font-bold border-b-2 ${activeTab === 'donations' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-600'}`}
        >
          Donations ({donations.length})
        </button>
      </div>

      {/* Users Tab */}
      {activeTab === 'users' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Role</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id} className="border-b">
                  <td className="p-3">{user.name}</td>
                  <td className="p-3">{user.email}</td>
                  <td className="p-3 capitalize">{user.role}</td>
                  <td className="p-3">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="btn btn-danger text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Posts Tab */}
      {activeTab === 'posts' && (
        <div className="space-y-4">
          {posts.map(post => (
            <div key={post._id} className="card flex justify-between">
              <div>
                <h3 className="font-bold">{post.title}</h3>
                <p className="text-sm text-gray-600">By {post.createdBy?.name}</p>
                <p className="text-sm">${post.collectedAmount} / ${post.requiredAmount}</p>
              </div>
              <button
                onClick={() => handleDeletePost(post._id)}
                className="btn btn-danger"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Donations Tab */}
      {activeTab === 'donations' && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">Donor</th>
                <th className="p-3 text-left">Post</th>
                <th className="p-3 text-left">Amount</th>
                <th className="p-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(donation => (
                <tr key={donation._id} className="border-b">
                  <td className="p-3">{donation.donorId?.name}</td>
                  <td className="p-3">{donation.postId?.title}</td>
                  <td className="p-3">${donation.amount}</td>
                  <td className="p-3">{new Date(donation.date).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboardPage;

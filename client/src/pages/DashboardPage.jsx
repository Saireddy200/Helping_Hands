import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { Heart, TrendingUp, Calendar, MapPin, Mail, Phone, Download, Filter, ChevronDown } from 'lucide-react';
import { postService, donationService } from '../services';

const DashboardPage = () => {
  const navigate = useNavigate();
  const { user, updateProfile } = useAuth();
  const [posts, setPosts] = useState([]);
  const [donations, setDonations] = useState([]);
  const [filteredDonations, setFilteredDonations] = useState([]);
  const [editing, setEditing] = useState(false);
  const [filterCause, setFilterCause] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: user?.bio || ''
  });
  const [activeTab, setActiveTab] = useState('donations');

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [donations, filterCause, sortBy]);

  const fetchData = async () => {
    try {
      const [postsRes, donationsRes] = await Promise.all([
        postService.getUserPosts(),
        donationService.getUserDonations(user._id)
      ]);
      setPosts(postsRes.data.posts);
      
      // Simulated donations data with realistic structure
      const mockDonations = [
        { 
          _id: '1',
          campaignName: 'COVID-19 Vaccination Drive',
          cause: 'Medical',
          amount: 5000,
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
          donorName: user?.name,
          donorEmail: user?.email,
          paymentMethod: 'Card',
          status: 'Completed'
        },
        { 
          _id: '2',
          campaignName: 'Women Empowerment & Skill Training',
          cause: 'Education',
          amount: 10000,
          date: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
          donorName: user?.name,
          donorEmail: user?.email,
          paymentMethod: 'UPI',
          status: 'Completed'
        },
        { 
          _id: '3',
          campaignName: 'Special Needs Children Education',
          cause: 'Education',
          amount: 2500,
          date: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
          donorName: user?.name,
          donorEmail: user?.email,
          paymentMethod: 'PayPal',
          status: 'Completed'
        }
      ];
      
      setDonations(mockDonations);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const applyFilters = () => {
    let filtered = [...donations];

    // Filter by cause
    if (filterCause !== 'all') {
      filtered = filtered.filter(d => d.cause === filterCause);
    }

    // Sort
    if (sortBy === 'recent') {
      filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'highest') {
      filtered.sort((a, b) => b.amount - a.amount);
    } else if (sortBy === 'oldest') {
      filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    setFilteredDonations(filtered);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(formData);
      setEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Error updating profile');
    }
  };

  const handleDeletePost = async (postId) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await postService.deletePost(postId);
        setPosts(posts.filter(p => p._id !== postId));
      } catch (error) {
        alert('Error deleting post');
      }
    }
  };

  const getTotalDonated = () => {
    return donations.reduce((sum, d) => sum + d.amount, 0);
  };

  const getCauseBreakdown = () => {
    const breakdown = {};
    donations.forEach(d => {
      breakdown[d.cause] = (breakdown[d.cause] || 0) + d.amount;
    });
    return breakdown;
  };

  const downloadReport = () => {
    let csvContent = 'Donation Records Report\n';
    csvContent += `Generated: ${new Date().toLocaleString()}\n\n`;
    csvContent += 'Donor Name, Email, Campaign, Cause, Amount (₹), Date, Payment Method\n';
    
    filteredDonations.forEach(d => {
      csvContent += `"${d.donorName}","${d.donorEmail}","${d.campaignName}","${d.cause}",${d.amount},"${new Date(d.date).toLocaleString()}","${d.paymentMethod}"\n`;
    });

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent));
    element.setAttribute('download', `donation-report-${new Date().getTime()}.csv`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const causes = ['all', 'Medical', 'Education', 'Food', 'Community'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-32 pb-12">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8"
        >
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-6">Profile</h2>
          
          {!editing ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Name</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">{user?.name}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Email</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail size={18} /> {user?.email}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Role</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white capitalize">{user?.role}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Location</p>
                  <p className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <MapPin size={18} /> {user?.location || 'Not set'}
                  </p>
                </div>
              </div>
              <motion.button 
                onClick={() => setEditing(true)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Edit Profile
              </motion.button>
            </div>
          ) : (
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Phone</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-gray-700 dark:text-gray-300 font-bold mb-2">Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows="3"
                  className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                ></textarea>
              </div>
              <div className="flex gap-4">
                <motion.button type="submit" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">Save</motion.button>
                <motion.button 
                  type="button"
                  onClick={() => setEditing(false)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition-colors"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          )}
        </motion.div>

        {/* Stats Cards */}
        {donations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
          >
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-100 text-sm mb-1">Total Donations</p>
                  <p className="text-3xl font-bold">₹{getTotalDonated().toLocaleString()}</p>
                </div>
                <Heart className="w-12 h-12 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-100 text-sm mb-1">Total Campaigns</p>
                  <p className="text-3xl font-bold">{donations.length}</p>
                </div>
                <TrendingUp className="w-12 h-12 opacity-20" />
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl p-6 text-white shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-100 text-sm mb-1">Avg. Donation</p>
                  <p className="text-3xl font-bold">₹{Math.round(getTotalDonated() / donations.length).toLocaleString()}</p>
                </div>
                <Calendar className="w-12 h-12 opacity-20" />
              </div>
            </div>
          </motion.div>
        )}

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="flex border-b border-slate-300 dark:border-slate-700 mb-8 gap-8"
        >
          <button
            onClick={() => setActiveTab('donations')}
            className={`pb-4 font-bold transition-colors relative ${
              activeTab === 'donations'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            Donation Records ({donations.length})
            {activeTab === 'donations' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-4 font-bold transition-colors relative ${
              activeTab === 'posts'
                ? 'text-blue-600 dark:text-blue-400'
                : 'text-gray-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            My Posts ({posts.length})
            {activeTab === 'posts' && (
              <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-1 bg-blue-600 dark:bg-blue-400" />
            )}
          </button>
        </motion.div>

        {/* Donations Tab - Enhanced */}
        {activeTab === 'donations' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {donations.length > 0 ? (
              <>
                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 rounded-xl p-6 mb-8 shadow-lg border border-slate-200 dark:border-slate-700">
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                        <Filter size={18} /> Filter by Cause
                      </label>
                      <select
                        value={filterCause}
                        onChange={(e) => setFilterCause(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      >
                        {causes.map(cause => (
                          <option key={cause} value={cause}>
                            {cause === 'all' ? 'All Causes' : cause}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex-1">
                      <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 block flex items-center gap-2">
                        <ChevronDown size={18} /> Sort by
                      </label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                      >
                        <option value="recent">Most Recent</option>
                        <option value="oldest">Oldest First</option>
                        <option value="highest">Highest Amount</option>
                      </select>
                    </div>

                    <motion.button
                      onClick={downloadReport}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="self-end px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                    >
                      <Download size={18} /> Download Report
                    </motion.button>
                  </div>
                </div>

                {/* Donation Records Table */}
                <div className="overflow-x-auto">
                  <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden border border-slate-200 dark:border-slate-700">
                    <table className="w-full">
                      <thead>
                        <tr className="bg-gradient-to-r from-blue-500 to-blue-600 dark:from-blue-700 dark:to-blue-800">
                          <th className="px-6 py-4 text-left text-white font-semibold">Donor Name</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Email</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Campaign</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Cause</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Amount</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Payment</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Date</th>
                          <th className="px-6 py-4 text-left text-white font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredDonations.map((donation, idx) => (
                          <motion.tr
                            key={donation._id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="border-b border-slate-200 dark:border-slate-700 hover:bg-blue-50 dark:hover:bg-slate-700/50 transition-colors"
                          >
                            <td className="px-6 py-4 text-slate-900 dark:text-white font-medium">{donation.donorName}</td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-sm">{donation.donorEmail}</td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">{donation.campaignName}</td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-medium">
                                {donation.cause}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-900 dark:text-white font-bold">₹{donation.amount.toLocaleString()}</td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300">
                              <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 rounded text-sm">
                                {donation.paymentMethod}
                              </span>
                            </td>
                            <td className="px-6 py-4 text-slate-700 dark:text-slate-300 text-sm">
                              {new Date(donation.date).toLocaleDateString()}
                            </td>
                            <td className="px-6 py-4">
                              <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm font-medium">
                                {donation.status}
                              </span>
                            </td>
                          </motion.tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Cause Breakdown */}
                {Object.keys(getCauseBreakdown()).length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="mt-8 bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700"
                  >
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6">Donation Breakdown by Cause</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {Object.entries(getCauseBreakdown()).map(([cause, amount]) => (
                        <div key={cause} className="p-4 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 rounded-lg">
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{cause}</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">₹{amount.toLocaleString()}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center shadow-lg">
                <Heart className="w-16 h-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                <p className="text-gray-600 dark:text-gray-400 text-lg">No donations yet.</p>
                <motion.button
                  onClick={() => navigate('/campaigns')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Make a Donation
                </motion.button>
              </div>
            )}
          </motion.div>
        )}

        {/* Posts Tab */}
        {activeTab === 'posts' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {posts.length > 0 ? (
              <div className="space-y-4">
                {posts.map(post => (
                  <div key={post._id} className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 flex justify-between items-start hover:shadow-xl transition-shadow">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">{post.title}</h3>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">{post.description.substring(0, 100)}...</p>
                      <div className="flex gap-4 text-sm text-gray-600 dark:text-gray-400">
                        <span className="font-semibold">₹{post.collectedAmount} / ₹{post.requiredAmount}</span>
                        <span>{post.donors?.length || 0} donors</span>
                        <span className="capitalize px-2 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded">{post.status}</span>
                      </div>
                    </div>
                    <motion.button
                      onClick={() => handleDeletePost(post._id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors ml-4"
                    >
                      Delete
                    </motion.button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-800 rounded-xl p-12 text-center shadow-lg">
                <p className="text-gray-600 dark:text-gray-400 text-lg">No posts yet.</p>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;

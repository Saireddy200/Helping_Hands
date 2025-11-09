import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Search, Plus, Filter } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../services';
import { useAuth } from '../context/AuthContext';

const Campaigns = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [campaigns, setCampaigns] = useState([]);
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [likedCampaigns, setLikedCampaigns] = useState(new Set());

  const categories = [
    'all',
    'Medical',
    'Education',
    'Food',
    'Animals',
    'Disaster Relief',
    'Community Development',
    'Other'
  ];

  const statuses = ['all', 'active', 'completed', 'cancelled'];

  // Fallback images based on category
  const getCategoryImage = (category) => {
    const categoryImages = {
      'Medical': 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=500&h=300&fit=crop',
      'Education': 'https://images.unsplash.com/photo-1427504494785-cdbb17a3b519?w=500&h=300&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1588080872657-b6881e4d76bb?w=500&h=300&fit=crop',
      'Animals': 'https://images.unsplash.com/photo-1450747832694-a4e98e6c0f30?w=500&h=300&fit=crop',
      'Disaster Relief': 'https://images.unsplash.com/photo-1476018877519-b44e0e6b4b00?w=500&h=300&fit=crop',
      'Community Development': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&h=300&fit=crop',
      'Other': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=500&h=300&fit=crop'
    };
    return categoryImages[category] || categoryImages['Other'];
  };

  // Category gradient colors for fallback
  const getCategoryGradient = (category) => {
    const gradients = {
      'Medical': 'from-red-400 to-red-600',
      'Education': 'from-blue-400 to-blue-600',
      'Food': 'from-orange-400 to-orange-600',
      'Animals': 'from-green-400 to-green-600',
      'Disaster Relief': 'from-yellow-400 to-yellow-600',
      'Community Development': 'from-purple-400 to-purple-600',
      'Other': 'from-gray-400 to-gray-600'
    };
    return gradients[category] || gradients['Other'];
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const response = await campaignService.getAllCampaigns();
      console.log('Campaigns fetched:', response.data.campaigns);
      setCampaigns(response.data.campaigns);
      setFilteredCampaigns(response.data.campaigns);
      // Reset filters to show all campaigns
      setSelectedCategory('all');
      setSelectedStatus('all');
      setSearchTerm('');
    } catch (error) {
      console.error('Error fetching campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = (campaignsList) => {
    let filtered = [...campaignsList];

    // Search filter
    if (searchTerm && searchTerm.trim()) {
      filtered = filtered.filter(campaign =>
        campaign.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== 'all') {
      filtered = filtered.filter(campaign => campaign.category === selectedCategory);
    }

    // Status filter
    if (selectedStatus && selectedStatus !== 'all') {
      filtered = filtered.filter(campaign => campaign.status === selectedStatus);
    }

    console.log('Applying filters:', { searchTerm, selectedCategory, selectedStatus, totalCampaigns: campaignsList.length, filtered: filtered.length });
    setFilteredCampaigns(filtered);
  };

  useEffect(() => {
    applyFilters(campaigns);
  }, [searchTerm, selectedCategory, selectedStatus, campaigns]);

  const handleLike = async (campaignId) => {
    try {
      if (!user) {
        navigate('/login');
        return;
      }

      await campaignService.likeCampaign(campaignId);
      
      const newLiked = new Set(likedCampaigns);
      if (newLiked.has(campaignId)) {
        newLiked.delete(campaignId);
      } else {
        newLiked.add(campaignId);
      }
      setLikedCampaigns(newLiked);

      // Update campaigns data
      setCampaigns(campaigns.map(c => 
        c._id === campaignId 
          ? { ...c, likes: c.likes + (newLiked.has(campaignId) ? 1 : -1) }
          : c
      ));
    } catch (error) {
      console.error('Error liking campaign:', error);
    }
  };

  const handleDonate = (campaignId) => {
    if (!user) {
      navigate('/login');
      return;
    }
    navigate(`/donate/${campaignId}`);
  };

  const getProgressPercentage = (raised, needed) => {
    return Math.min((raised / needed) * 100, 100);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      y: -8,
      boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05 },
    tap: { scale: 0.95 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-32 pb-12">
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="container mx-auto px-4 mb-12"
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-2">
              Active Campaigns
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Support meaningful causes and make a difference today
            </p>
          </div>
          {user && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/new-post')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:shadow-lg transition-shadow"
            >
              <Plus size={20} />
              Start Campaign
            </motion.button>
          )}
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="container mx-auto px-4 mb-8"
      >
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-md">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-3 text-slate-400" size={20} />
              <input
                type="text"
                placeholder="Search campaigns..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-3 top-3 text-slate-400" size={20} />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white appearance-none"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat === 'all' ? 'All Categories' : cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="px-4 py-2 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status === 'all' ? 'All Status' : status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>

            {/* Results count */}
            <div className="flex items-center justify-center px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg">
              <p className="text-slate-700 dark:text-slate-300 font-medium">
                {filteredCampaigns.length} campaigns found
              </p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Campaigns Grid */}
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center h-96">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
            />
          </div>
        ) : filteredCampaigns.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <p className="text-xl text-slate-600 dark:text-slate-400">
              No campaigns found. Try adjusting your filters.
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {filteredCampaigns.map(campaign => (
              <motion.div
                key={campaign._id}
                variants={cardVariants}
                whileHover="hover"
                className="bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/campaigns/${campaign._id}`)}
              >
                {/* Image */}
                <div className={`relative h-48 bg-gradient-to-br ${getCategoryGradient(campaign.category)} overflow-hidden`}>
                  <img
                    src={campaign.images && campaign.images.length > 0 ? campaign.images[0] : getCategoryImage(campaign.category)}
                    alt={campaign.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      // Fallback to category image if primary image fails to load
                      e.target.src = getCategoryImage(campaign.category);
                    }}
                  />
                  
                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 px-3 py-1 bg-white dark:bg-slate-900 rounded-full text-xs font-semibold">
                    <span className={`
                      ${campaign.status === 'active' ? 'text-green-600' : ''}
                      ${campaign.status === 'completed' ? 'text-blue-600' : ''}
                      ${campaign.status === 'cancelled' ? 'text-red-600' : ''}
                    `}>
                      {campaign.status.charAt(0).toUpperCase() + campaign.status.slice(1)}
                    </span>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white dark:bg-slate-900 rounded-full text-xs font-semibold text-slate-700 dark:text-slate-200">
                    {campaign.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 line-clamp-2">
                    {campaign.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                    {campaign.description}
                  </p>

                  {/* Creator */}
                  {campaign.createdBy && (
                    <div className="flex items-center gap-2 mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                      <img
                        src={campaign.createdBy.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${campaign.createdBy.name}`}
                        alt={campaign.createdBy.name}
                        className="w-8 h-8 rounded-full bg-slate-600 object-cover"
                        onError={(e) => {
                          e.target.src = `https://api.dicebear.com/7.x/initials/svg?seed=${campaign.createdBy.name}`;
                        }}
                      />
                      <span className="text-sm text-slate-700 dark:text-slate-300">
                        {campaign.createdBy.name}
                      </span>
                    </div>
                  )}

                  {/* Progress Bar */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                        ₹{campaign.amountRaised?.toLocaleString() || 0}
                      </span>
                      <span className="text-sm text-slate-600 dark:text-slate-400">
                        Goal: ₹{campaign.amountNeeded?.toLocaleString() || 0}
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgressPercentage(campaign.amountRaised || 0, campaign.amountNeeded)}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                      />
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-400 mt-2">
                      {getProgressPercentage(campaign.amountRaised || 0, campaign.amountNeeded).toFixed(0)}% funded
                    </p>
                  </div>

                  {/* Stats and Actions */}
                  <div className="flex items-center justify-between">
                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleLike(campaign._id);
                      }}
                      className="flex items-center gap-1 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors"
                    >
                      <Heart
                        size={18}
                        fill={likedCampaigns.has(campaign._id) ? 'currentColor' : 'none'}
                        className={likedCampaigns.has(campaign._id) ? 'text-red-500' : ''}
                      />
                      <span className="text-sm">{campaign.likes || 0}</span>
                    </motion.button>

                    <motion.button
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDonate(campaign._id);
                      }}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                    >
                      Donate
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Campaigns;

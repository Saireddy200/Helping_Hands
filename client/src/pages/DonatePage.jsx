import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Gift, Users, TrendingUp, AlertCircle, CheckCircle, X } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import { campaignService, donationService } from '../services';
import { useAuth } from '../context/AuthContext';
import StepperForm from '../components/StepperForm';

const DonatePage = () => {
  const navigate = useNavigate();
  const { campaignId } = useParams();
  const { user } = useAuth();

  const [campaign, setCampaign] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [successAmount, setSuccessAmount] = useState(0);

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

  // Get category image fallback
  const getCategoryImage = (category) => {
    const categoryImages = {
      'Medical': 'https://images.unsplash.com/photo-1576091160550-112173f7f869?w=800&h=400&fit=crop',
      'Education': 'https://images.unsplash.com/photo-1427504494785-cdbb17a3b519?w=800&h=400&fit=crop',
      'Food': 'https://images.unsplash.com/photo-1588080872657-b6881e4d76bb?w=800&h=400&fit=crop',
      'Animals': 'https://images.unsplash.com/photo-1450747832694-a4e98e6c0f30?w=800&h=400&fit=crop',
      'Disaster Relief': 'https://images.unsplash.com/photo-1476018877519-b44e0e6b4b00?w=800&h=400&fit=crop',
      'Community Development': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=400&fit=crop',
      'Other': 'https://images.unsplash.com/photo-1559027615-cd2628902d4a?w=800&h=400&fit=crop'
    };
    return categoryImages[category] || categoryImages['Other'];
  };

  // Top charities data
  const topCharities = [
    {
      id: 1,
      name: 'SaveTheChildren',
      description: 'Working to support children in need across the globe',
      logo: '🎓',
      donations: 45230,
      rating: 4.8
    },
    {
      id: 2,
      name: 'RedCross',
      description: 'Disaster relief and humanitarian assistance worldwide',
      logo: '🏥',
      donations: 89450,
      rating: 4.9
    },
    {
      id: 3,
      name: 'WildlifeNGO',
      description: 'Protecting endangered species and their habitats',
      logo: '🦁',
      donations: 32100,
      rating: 4.7
    }
  ];

  useEffect(() => {
    if (campaignId) {
      fetchCampaign();
    }
  }, [campaignId]);

  const fetchCampaign = async () => {
    try {
      setLoading(true);
      const response = await campaignService.getCampaign(campaignId);
      setCampaign(response.data.campaign);
    } catch (error) {
      console.error('Error fetching campaign:', error);
      setError('Campaign not found');
    } finally {
      setLoading(false);
    }
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-32 pb-12">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          {/* Main Donation Form */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            {/* Campaign Info */}
            {campaign && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6"
              >
                <div className={`bg-gradient-to-br ${getCategoryGradient(campaign.category)} rounded-lg mb-4 overflow-hidden`}>
                  <img
                    src={campaign.images && campaign.images.length > 0 ? campaign.images[0] : getCategoryImage(campaign.category)}
                    alt={campaign.title}
                    className="w-full h-48 object-cover rounded-lg"
                    onError={(e) => {
                      // Fallback to category image if primary image fails
                      e.target.src = getCategoryImage(campaign.category);
                    }}
                  />
                </div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  {campaign.title}
                </h2>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  {campaign.description}
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 rounded-lg p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Raised</p>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                      ₹{campaign.amountRaised?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="bg-green-50 dark:bg-green-900 dark:bg-opacity-20 rounded-lg p-4">
                    <p className="text-sm text-slate-600 dark:text-slate-400">Goal</p>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                      ₹{campaign.amountNeeded?.toLocaleString() || 0}
                    </p>
                  </div>
                </div>
                <div className="mt-4">
                  <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${getProgressPercentage(campaign.amountRaised || 0, campaign.amountNeeded)}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600"
                    />
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                    {getProgressPercentage(campaign.amountRaised || 0, campaign.amountNeeded).toFixed(0)}% funded
                  </p>
                </div>
              </motion.div>
            )}

            {/* StepperForm Component */}
            <StepperForm 
              campaignId={campaignId} 
              campaign={campaign}
              onSuccess={(amount) => {
                setShowSuccess(true);
                setSuccessAmount(amount);
                setTimeout(() => {
                  navigate('/campaigns');
                }, 3000);
              }}
              onError={(errorMessage) => {
                setError(errorMessage);
              }}
            />
          </motion.div>

          {/* Sidebar - Top Charities & Info */}
          <motion.div variants={itemVariants} className="lg:col-span-1 space-y-6">
            {/* Success Modal */}
            {showSuccess && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: 1 }}
                  className="bg-white dark:bg-slate-800 rounded-xl p-8 max-w-md w-full text-center"
                >
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-6">
                    Your donation of ₹{successAmount} has been received. You're making a difference!
                  </p>
                  <button
                    onClick={() => navigate('/campaigns')}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
                  >
                    Back to Campaigns
                  </button>
                </motion.div>
              </motion.div>
            )}

            {/* Top Charities */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <TrendingUp size={22} className="text-blue-500" />
                Top Charities
              </h3>
              <div className="space-y-4">
                {topCharities.map((charity, index) => (
                  <motion.div
                    key={charity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="p-4 bg-slate-50 dark:bg-slate-700 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-3xl">{charity.logo}</span>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-semibold text-slate-900 dark:text-white text-sm">
                          {charity.name}
                        </h4>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                          {charity.description}
                        </p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs text-slate-600 dark:text-slate-400">
                            {charity.donations.toLocaleString()} donors
                          </span>
                          <span className="text-xs font-semibold text-yellow-500">
                            ★ {charity.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Why Donate Info */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
              className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900 dark:from-opacity-20 dark:to-pink-900 dark:to-opacity-20 rounded-xl p-6 border border-purple-200 dark:border-purple-700"
            >
              <h3 className="font-semibold text-purple-900 dark:text-purple-200 mb-4 flex items-center gap-2">
                <Gift size={20} />
                Why Donate?
              </h3>
              <ul className="space-y-2 text-sm text-purple-800 dark:text-purple-300">
                <li>✓ 100% transparent & secure</li>
                <li>✓ Tax deductible donations</li>
                <li>✓ Direct impact stories</li>
                <li>✓ Monthly updates</li>
                <li>✓ Your donation helps now</li>
              </ul>
            </motion.div>

            {/* Impact Stats */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4 }}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6"
            >
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
                <Users size={20} className="text-blue-500" />
                Community Impact
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Donors</span>
                  <span className="font-bold text-slate-900 dark:text-white">2,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Total Raised</span>
                  <span className="font-bold text-slate-900 dark:text-white">₹4.2Cr</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Lives Impacted</span>
                  <span className="font-bold text-slate-900 dark:text-white">50,000+</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default DonatePage;

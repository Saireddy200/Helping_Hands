import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, AlertCircle, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { campaignService } from '../services';
import { useAuth } from '../context/AuthContext';

const CreatePostPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Medical',
    amountNeeded: '',
    images: []
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const categories = [
    'Medical',
    'Education',
    'Food',
    'Animals',
    'Disaster Relief',
    'Community Development',
    'Other'
  ];

  if (!user) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-20"
      >
        <div className="text-center">
          <p className="text-xl text-slate-600 dark:text-slate-400 mb-4">
            Please log in to create a campaign
          </p>
          <button
            onClick={() => navigate('/login')}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-colors"
          >
            Go to Login
          </button>
        </div>
      </motion.div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setError('');
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size should be less than 5MB');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
        setFormData(prev => ({
          ...prev,
          images: [file]
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (formData.title.length > 200) {
      setError('Title must be less than 200 characters');
      return false;
    }
    if (!formData.description.trim()) {
      setError('Description is required');
      return false;
    }
    if (formData.description.length > 2000) {
      setError('Description must be less than 2000 characters');
      return false;
    }
    if (!formData.amountNeeded || parseFloat(formData.amountNeeded) <= 0) {
      setError('Please enter a valid goal amount');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError('');

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append('title', formData.title);
      submitData.append('description', formData.description);
      submitData.append('category', formData.category);
      submitData.append('amountNeeded', parseFloat(formData.amountNeeded));
      
      if (formData.images.length > 0) {
        submitData.append('images', formData.images[0]);
      }

      const response = await campaignService.createCampaign(submitData);
      
      setSuccess('Campaign created successfully!');
      setTimeout(() => {
        navigate('/campaigns');
      }, 2000);
    } catch (error) {
      console.error('Error creating campaign:', error);
      setError(error.response?.data?.message || 'Error creating campaign');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const inputVariants = {
    focus: { scale: 1.01 },
    blur: { scale: 1 }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
              Start a New Campaign
            </h1>
            <p className="text-lg text-slate-600 dark:text-slate-300">
              Share your cause and make a difference
            </p>
          </motion.div>

          {/* Form Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-xl p-8 mb-6"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Error Alert */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900 dark:bg-opacity-20 border border-red-200 dark:border-red-700 rounded-lg"
                >
                  <AlertCircle className="text-red-500 flex-shrink-0" size={20} />
                  <p className="text-red-700 dark:text-red-200">{error}</p>
                </motion.div>
              )}

              {/* Success Alert */}
              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900 dark:bg-opacity-20 border border-green-200 dark:border-green-700 rounded-lg"
                >
                  <CheckCircle className="text-green-500 flex-shrink-0" size={20} />
                  <p className="text-green-700 dark:text-green-200">{success}</p>
                </motion.div>
              )}

              {/* Title */}
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Campaign Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., Emergency Medical Fund for..."
                  maxLength="200"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {formData.title.length}/200 characters
                </p>
              </motion.div>

              {/* Description */}
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Tell us about your campaign, what funds will be used for, etc..."
                  maxLength="2000"
                  rows="5"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none transition-all"
                />
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  {formData.description.length}/2000 characters
                </p>
              </motion.div>

              {/* Category */}
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                >
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </motion.div>

              {/* Amount Needed */}
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Goal Amount (₹) *
                </label>
                <input
                  type="number"
                  name="amountNeeded"
                  value={formData.amountNeeded}
                  onChange={handleChange}
                  placeholder="e.g., 50000"
                  min="1"
                  step="1000"
                  className="w-full px-4 py-3 bg-slate-100 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white transition-all"
                />
              </motion.div>

              {/* Image Upload */}
              <motion.div variants={inputVariants}>
                <label className="block text-sm font-semibold text-slate-700 dark:text-slate-200 mb-2">
                  Campaign Image
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex items-center justify-center gap-2 w-full px-4 py-8 border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <Upload size={20} className="text-slate-600 dark:text-slate-400" />
                    <span className="text-slate-600 dark:text-slate-400">
                      {imagePreviewUrl ? 'Change image' : 'Click to upload image'}
                    </span>
                  </label>
                </div>

                {/* Image Preview */}
                {imagePreviewUrl && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 relative"
                  >
                    <img
                      src={imagePreviewUrl}
                      alt="Preview"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                      Max file size: 5MB
                    </p>
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"
                    />
                    Creating campaign...
                  </span>
                ) : (
                  'Create Campaign'
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-blue-50 dark:bg-blue-900 dark:bg-opacity-20 border border-blue-200 dark:border-blue-700 rounded-xl p-6"
          >
            <h3 className="font-semibold text-blue-900 dark:text-blue-200 mb-3">
              Tips for a successful campaign:
            </h3>
            <ul className="space-y-2 text-sm text-blue-800 dark:text-blue-300">
              <li>✓ Use a clear, descriptive title</li>
              <li>✓ Provide detailed information about your cause</li>
              <li>✓ Set a realistic funding goal</li>
              <li>✓ Add a compelling campaign image</li>
              <li>✓ Choose the most relevant category</li>
            </ul>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreatePostPage;

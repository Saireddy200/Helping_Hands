import React, { useState, useEffect } from 'react';
import { postService } from '../services';
import DonationCard from '../components/DonationCard';

const CharitiesPage = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    location: '',
    search: ''
  });

  useEffect(() => {
    fetchPosts();
  }, [filters]);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      const response = await postService.getAllPosts(filters);
      setPosts(response.data.posts);
    } catch (error) {
      console.error('Error fetching posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container py-12">
      <h1 className="section-title">All Causes</h1>

      {/* Filters */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            name="search"
            placeholder="Search causes..."
            value={filters.search}
            onChange={handleFilterChange}
            className="input-field"
          />
          
          <select
            name="category"
            value={filters.category}
            onChange={handleFilterChange}
            className="input-field"
          >
            <option value="">All Categories</option>
            <option value="medical">Medical</option>
            <option value="education">Education</option>
            <option value="emergency">Emergency</option>
            <option value="community">Community</option>
            <option value="other">Other</option>
          </select>

          <input
            type="text"
            name="location"
            placeholder="Filter by location..."
            value={filters.location}
            onChange={handleFilterChange}
            className="input-field"
          />
        </div>
      </div>

      {/* Posts Grid */}
      {loading ? (
        <div className="text-center py-12">Loading causes...</div>
      ) : posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map(post => (
            <DonationCard key={post._id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No causes found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
};

export default CharitiesPage;
